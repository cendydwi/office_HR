using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TrillionBits.ResourceTracker;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.Web.Controllers.Api.ResourceTracker
{
    public class RtNoticeBoardApiController : BaseApiController
    {
        private readonly INoticeBoard _noticeBoardRepository;
        public RtNoticeBoardApiController()
        {
            _noticeBoardRepository = RTUnityMapper.GetInstance<INoticeBoard>();
        }
        [HttpGet]
        public HttpResponseMessage GetNoticeBoardByCompanyId(int CompanyId)
        {
            var result = _noticeBoardRepository.GetNoticeBoardByCompanyId(CompanyId);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpGet]
        public HttpResponseMessage GetNoticeBoardById(string Id)
        {
            var result = _noticeBoardRepository.GetNoticeBoardById(Id);
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        public IHttpActionResult SaveNoticeBoard(JObject jObject)
        {
            dynamic json = jObject;
            var noticeBoard = new NoticeDepartmentVIewModel
            {
                Details = json.Details,
                ImageFileName = json.ImageFileName,
                CompanyId = json.CompanyId,
                CreatedBy = json.CreatedBy
            };
            
            var response = _noticeBoardRepository.CreateNoticeBoard(noticeBoard);
            return Ok(response);
            
        }
    }
}
