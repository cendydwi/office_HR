using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TrillionBits.ResourceTracker;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Models;
using System.Linq;
using TrillionBitsPortal.Common;
using TrillionBitsPortal.Common.Models;

namespace TrillionBitsPortal.Web.Controllers.Api.ResourceTracker
{
    public class RtLeaveApiController : BaseApiController
    {
        private readonly IEmployeeLeave _leaveRepository;
        private readonly IDepartment _departmentRepository;
        private readonly INoticeBoard _noticeBoardRepository;
        private readonly IAttendance _attendance;

        public RtLeaveApiController()
        {
            _leaveRepository = RTUnityMapper.GetInstance<IEmployeeLeave>();
            _departmentRepository = RTUnityMapper.GetInstance<IDepartment>();
            _noticeBoardRepository = RTUnityMapper.GetInstance<INoticeBoard>();
            _attendance = RTUnityMapper.GetInstance<IAttendance>();
        }

        [HttpGet]
        public HttpResponseMessage GetLeaveByCompanyId(string companyId)
        {
            var result = _leaveRepository.GetLeaveByCompanyId(companyId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GetUserLeaves(string userId)
        {
            var result = _leaveRepository.GetUserLeaves(userId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public IHttpActionResult CreateLeave(EmployeeLeaveModel json)
        {
            var model = new EmployeeLeaveModel
            {
                CompanyId = json.CompanyId,
                EmployeeId = json.EmployeeId,
                FromDate =Convert.ToDateTime(json.LeaveApplyFrom),
                ToDate = Convert.ToDateTime(json.LeaveApplyTo),
                IsHalfDay = json.IsHalfDay,
                LeaveTypeId = json.LeaveTypeId,
                LeaveReason = json.LeaveReason,
                CreatedAt = DateTime.Now.ToString(),
                IsApproved = false,
                IsRejected = false,
                RejectReason = json.RejectReason,
                ApprovedById = null,
                ApprovedAt = null,
                UserId=json.UserId
            };
            var response = _leaveRepository.CreateEmployeeLeave(model);
            if (!response.Success)
                return Ok(response);
            return Ok(new { Success = true });
        }

        [HttpGet]
        public IHttpActionResult Approved(int id,string userId)
        {
            var response = _leaveRepository.Approved(id,userId);
            if (response.Success)
            {
                var result = _leaveRepository.GetLeaveById(id).First();
                if (result.IsApproved && !result.IsRejected)
                {
                    var noticeBoard = new NoticeDepartmentVIewModel
                    {
                        Details = string.Format("{0} is taking leave from {1} to {2}.", result.EmployeeName, result.FromDate.ToString(Constants.DateLongFormat), result.ToDate.ToString(Constants.DateLongFormat)),
                        PostingDate = DateTime.Now.ToString(),
                        CompanyId = result.CompanyId,
                        CreatedBy = result.ApprovedById,
                        CreateDate = DateTime.Now.ToString()
                    };
                    var noticeResponse = _noticeBoardRepository.CreateNoticeBoard(noticeBoard);

                    _attendance.AddAttendanceAsLeave(new AttendanceEntryModel
                    {
                        UserId=userId,
                        CompanyId=result.CompanyId
                    });
                }

            }
            return Ok(response);
        }

        [HttpGet]
        public IHttpActionResult Rejected(int id)
        {
            var response = _leaveRepository.Rejected(id);
            return Ok(response);
        }

        [HttpGet]
        public IHttpActionResult GetLeaveTypeList()
        {
            var list = Enum.GetValues(typeof(LeaveType)).Cast<LeaveType>().Select(v => new NameIdPairModel
            {
                Name = EnumUtility.GetDescriptionFromEnumValue(v),
                Id = (int)v
            }).ToList();
            return Ok(list);
        }
    }
}
