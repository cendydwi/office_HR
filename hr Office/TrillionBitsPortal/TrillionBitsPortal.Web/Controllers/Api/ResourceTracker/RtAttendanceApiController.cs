using System;
using System.Web.Http;
using TrillionBits.ResourceTracker;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Models;
using System.Linq;
using TrillionBitsPortal.Common.Models;
using System.Globalization;
using System.Collections.Generic;

namespace TrillionBitsPortal.Web.Controllers.Api.ResourceTracker
{
    public class RtAttendanceApiController : BaseApiController
    {
        private readonly IAttendance _attendance;
        private readonly ICompany _company;
        public RtAttendanceApiController()
        {
            _attendance = RTUnityMapper.GetInstance<IAttendance>();
            _company = RTUnityMapper.GetInstance<ICompany>();
        }
        [HttpPost]
        public IHttpActionResult CheckIn(AttendanceEntryModel model)
        {
            var attendanceFeed = _attendance.GetAttendanceFeed(model.CompanyId.Value, DateTime.UtcNow).ToList();
            if (attendanceFeed.Any(x => x.UserId == model.UserId && x.IsCheckedIn))
                return Ok(new ResponseModel {Message="Already checked-in." });

            var companyModel = _company.GetCompanyById(model.CompanyId.Value);
            if(companyModel!=null && !string.IsNullOrEmpty(companyModel.MaximumOfficeHours))
            {
                var maxOfficeHourList = companyModel.MaximumOfficeHours.Split(':');
                model.OfficeHour = (Convert.ToInt32(maxOfficeHourList[0]) * 60) + Convert.ToInt32(maxOfficeHourList[1]);
            }

            if (companyModel != null && !string.IsNullOrEmpty(companyModel.OfficeOutTime))
            {
                var outTimeList = companyModel.OfficeOutTime.Split(':');
                model.AllowOfficeLessTime = (Convert.ToInt32(outTimeList[0]) * 60) + Convert.ToInt32(outTimeList[1]);

            }

            var response = _attendance.CheckIn(model);
            if (response.Success)
            {
                _attendance.SaveCheckPoint(new UserMovementLogModel {
                    UserId=model.UserId,
                    CompanyId=model.CompanyId,
                    Latitude=model.Latitude,
                    Longitude=model.Longitude,
                    LogLocation=model.LogLocation,
                    DeviceName=model.DeviceName,
                    DeviceOSVersion=model.DeviceOSVersion,
                    IsCheckInPoint=true
                });
            }
            return Ok(response);
        }

        [HttpPost]
        public IHttpActionResult CheckOut(AttendanceEntryModel model)
        {
            var response = _attendance.CheckOut(model);
            if (response.Success)
            {
                _attendance.SaveCheckPoint(new UserMovementLogModel
                {
                    UserId = model.UserId,
                    CompanyId = model.CompanyId,
                    Latitude = model.Latitude,
                    Longitude = model.Longitude,
                    LogLocation = model.LogLocation,
                    DeviceName = model.DeviceName,
                    DeviceOSVersion = model.DeviceOSVersion,
                    IsCheckOutPoint = true
                });
            }
            return Ok(response);
        }

        [HttpPost]
        public IHttpActionResult CheckPoint(AttendanceEntryModel model)
        {
            if (string.IsNullOrEmpty(model.LogLocation))
                return Ok(new ResponseModel { Message="LogLocation is required."});

            var response= _attendance.SaveCheckPoint(new UserMovementLogModel
            {
                UserId = model.UserId,
                CompanyId = model.CompanyId,
                Latitude = model.Latitude,
                Longitude = model.Longitude,
                LogLocation = model.LogLocation,
                DeviceName = model.DeviceName,
                DeviceOSVersion = model.DeviceOSVersion
            });
            return Ok(response);
        }

        [HttpGet]
        public IHttpActionResult GetAttendanceFeed(int companyId)
        {
            var result = _attendance.GetAttendanceFeed(companyId, DateTime.UtcNow);
            return Ok(new
            {
                EmployeeList = result,
                StatusCount = new
                {
                    TotalEmployee = result.Count,
                    TotalCheckIn = result.Count(x => x.CheckInTime.HasValue),
                    TotalCheckOut = result.Count(x => x.CheckOutTime.HasValue),
                    TotalNotAttend = result.Count(x => !x.CheckInTime.HasValue)
                }
            });
        }

        [HttpGet]
        public IHttpActionResult GetMyTodayAttendance(string userId)
        {
            var data = _attendance.GetMyTodayAttendance(userId, DateTime.UtcNow);
            if (data == null)
                return Ok(new { EmployeeName =string.Empty});
            return Ok(
                new {
                    data.EmployeeId,
                    data.EmployeeName,
                    data.Designation,
                    data.DepartmentName,
                    data.CheckInTimeVw,
                    data.CheckOutTimeVw,
                    data.AttendanceDateVw,
                    data.IsCheckedIn,
                    data.IsCheckedOut,
                    data.ImageFileName,
                    data.Status,
                    data.OfficeStayHour,
                    data.IsLeave
                });
        }



        [HttpGet]
        public IHttpActionResult GetMovementDetails(string userId)
        {
            return Ok(_attendance.GetMovementDetails(userId, DateTime.UtcNow).OrderBy(x=>x.LogDateTime));
        }

        [HttpGet]
        public IHttpActionResult GetEmployeeAttendanceFeedWithDate(int companyId,DateTime startDate,DateTime endDate, string userId)
        {
            userId = userId == "null" ? null : userId;
            var result = _attendance.GetAttendance(userId,companyId,startDate,endDate);
            return Ok(new
            {
                EmployeeList = result,
                StatusCount = new
                {
                    TotalEmployee = result.Count,
                    TotalCheckIn = result.Count(x => x.CheckInTime.HasValue),
                    TotalCheckOut = result.Count(x => x.CheckOutTime.HasValue),
                    TotalNotAttend = result.Count(x => !x.CheckInTime.HasValue)
                }
            });
        }
        [HttpGet]
        public IHttpActionResult GetAllEmployeeAttendance(int companyId,DateTime startdate, DateTime enddate)
        {
            var result = _attendance.GetAttendance(companyId, startdate, enddate);
            if (result == null)
                return Ok(new { EmployeeName = string.Empty });
            return Ok(new
            {
                EmployeeList = result,
                StatusCount = new
                {
                    TotalEmployee = result.Count,
                    TotalPresent = result.Count(x => x.CheckInTime.HasValue),
                    TotalNotAttend = result.Count(x => !x.CheckInTime.HasValue)
                }
            });
        }
        private List<AttendanceTotalModel> GetMonthlySummary(int companyId, string month, int year)
        {
            int monthnumber = DateTime.ParseExact(month, "MMMM", CultureInfo.InvariantCulture).Month;
            var startDate = new DateTime(year, monthnumber, 1);
            var endDate = new DateTime(year, monthnumber, DateTime.DaysInMonth(year, monthnumber));
            var result = _attendance.GetAttendance(companyId, startDate, endDate);
            if (result == null)
                return new List<AttendanceTotalModel>();

            var aList = new List<AttendanceTotalModel>();
            var empList = result.GroupBy(x => x.UserId).ToList();

            foreach (var e in empList)
            {
                var aModel = new AttendanceTotalModel();
                var employee = result.FirstOrDefault(x => x.UserId == e.Key);
                aModel.EmployeeName = employee.EmployeeName;
                aModel.DepartmentName = employee.DepartmentName;
                aModel.Designation = employee.Designation;
                aModel.ImageFileName = employee.ImageFileName;
                aModel.UserId = e.Key;

                aModel.TotalPresent = result.Count(y => y.UserId == e.Key && y.IsPresent);
                aModel.TotalLeave = result.Count(y => y.UserId == e.Key && y.IsLeave.HasValue && y.IsLeave.Value);

                aModel.TotalCheckedOutMissing = result.Count(y => y.UserId == e.Key && y.NotCheckedOut);
                var totalMinute = result.Where(y => y.UserId == e.Key).Sum(x => x.TotalStayTimeInMinute);
                aModel.TotalStayTime = string.Format("{0}:{1}", totalMinute / 60, totalMinute % 60);

                var officeHourInMin = result.Where(y => y.UserId == e.Key).Sum(x => x.DailyWorkingTimeInMin);
                aModel.TotalOfficeHour = string.Format("{0}:{1}", officeHourInMin / 60, officeHourInMin % 60);

                var overTimeOrDue = totalMinute - officeHourInMin;
                aModel.OvertimeOrDueHour = string.Format("{0}:{1}", overTimeOrDue / 60, overTimeOrDue % 60);

                aList.Add(aModel);
            }

            return aList;
        }

        [HttpGet]
        public IHttpActionResult GetAllEmployeeAttendanceWithMonth(int companyId, string month, int year)
        {
            var aList = GetMonthlySummary(companyId, month, year);
            aList = aList.OrderBy(x => x.EmployeeName).ToList();
            return Ok(aList);
        }
        [HttpGet]
        public IHttpActionResult GetLeaderboardData(int companyId, string month, int year)
        {
            var aList = GetMonthlySummary(companyId, month, year);
            foreach (var x in aList)
            {
                x.TotalScore = x.TotalPresent.HasValue ? (x.TotalPresent.Value * 0.5) - ((x.TotalCheckedOutMissing.HasValue ? x.TotalCheckedOutMissing.Value : 0) * 0.5) : 0;
            }
            aList = aList.OrderByDescending(x => x.TotalScore).ToList();
            return Ok(aList);
        }

        [HttpGet]
        public IHttpActionResult GetMonthlyAttendanceDetails(string userId, int companyId, int year, string month)
        {
            int monthnumber = DateTime.ParseExact(month, "MMMM", CultureInfo.InvariantCulture).Month;
            var startDate = new DateTime(year, monthnumber, 1);
            var endDate = new DateTime(year, monthnumber, DateTime.DaysInMonth(year, monthnumber));
            var result = _attendance.GetAttendance(userId,companyId, startDate, endDate).OrderBy(x=>x.AttendanceDate);
            return Ok(result);
        }

    }
}
