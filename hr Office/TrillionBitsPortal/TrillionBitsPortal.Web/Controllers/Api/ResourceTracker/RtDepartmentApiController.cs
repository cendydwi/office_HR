using System.Net;
using System.Net.Http;
using System.Web.Http;
using TrillionBits.ResourceTracker;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.Web.Controllers.Api.ResourceTracker
{
    public class RtDepartmentApiController : BaseApiController
    {
        private readonly IDepartment _departmentRepository;
        public RtDepartmentApiController()
        {
            _departmentRepository = RTUnityMapper.GetInstance<IDepartment>();
        }
        [HttpGet]
        public HttpResponseMessage GetDepartmentByCompanyId(string companyId)
        {
            var result = _departmentRepository.GetDepartmentByCompanyId(companyId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public IHttpActionResult Save(Department json)
        {
            var department = new Department
            {
                CompanyId = json.CompanyId,
                DepartmentName = json.DepartmentName,
            };
            var response = _departmentRepository.Create(department, json.UserId);
            return Ok(response);
        }

        [HttpPost]
        public IHttpActionResult UpdateDepartment(Department json)
        {
            var department = new Department
            {
                Id = json.Id,
                CompanyId = json.CompanyId,
                DepartmentName = json.DepartmentName,
            };
            var response = _departmentRepository.UpdateDepartment(department);
            return Ok(response);
        }
    }
}
