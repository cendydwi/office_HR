using System.Net;
using System.Net.Http;
using System.Web.Http;
using TrillionBits.ResourceTracker;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.Web.Controllers.Api.ResourceTracker
{
    public class RtCompanyApiController : BaseApiController
    {
        private readonly ICompany _companyRepository;
        public RtCompanyApiController()
        {
            _companyRepository = RTUnityMapper.GetInstance<ICompany>();
        }
        [HttpGet]
        public HttpResponseMessage GetCompanyByUserId(string userId)
        {
            var result = _companyRepository.GetCompanyByUserId(userId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpGet]
        public HttpResponseMessage GetCompanyByEmpUserId(string userId)
        {
            var result = _companyRepository.GetCompanyByEmpUserId(userId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [HttpGet]
        public HttpResponseMessage GetCompanyByIdentity(string userId)
        {
            var result = _companyRepository.GetCompanyByIdentity(userId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public IHttpActionResult Save([FromBody]Company json)
        {
            var company = new Company
            {
                CompanyName = json.CompanyName,
                Address = json.Address,
                PhoneNumber = json.PhoneNumber,
                MaximumOfficeHours = json.MaximumOfficeHours,
                OfficeOutTime = json.OfficeOutTime,
                PortalUserId = json.PortalUserId,
                ImageFileName = json.ImageFileName,
                ImageFileId = json.ImageFileId
            };
            var response = _companyRepository.Create(company);
            return Ok(response);
        }
        [HttpPost]
        public IHttpActionResult UpdateCompany(Company json)
        {
            var company = new Company
            {
                Id = json.Id,
                CompanyName = json.CompanyName,
                Address = json.Address,
                PhoneNumber = json.PhoneNumber,
                MaximumOfficeHours = json.MaximumOfficeHours,
                OfficeOutTime = json.OfficeOutTime,
                ImageFileName = json.ImageFileName,
                ImageFileId = json.ImageFileId
            };
            var response = _companyRepository.UpdateCompany(company);
            return Ok(response);
        }

    }
}
