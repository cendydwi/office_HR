using TrillionBitsPortal.Common;
using TrillionBitsPortal.Web.AzureService;
using System;
using System.IO;
using System.Web;
using System.Web.Http;

namespace TrillionBitsPortal.Web.Controllers.Api
{
    public class AzureFileStorageApiController : BaseApiController
    {
        private readonly IFileStorageService _fileStorageService;
        public AzureFileStorageApiController()
        {
            _fileStorageService = new AzureStorageService();
        }

        [HttpPost]
        public IHttpActionResult Upload(AzureStorageContainerType containerName)
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;

                if (httpRequest.Files.Count > 0)
                {
                    HttpFileCollection fileCollection;
                    HttpPostedFile postedFile;
                    Stream fileStream;

                    fileCollection = httpRequest.Files;
                    postedFile = fileCollection[0];

                    fileStream = postedFile.InputStream;

                    var fileType = Path.GetExtension(postedFile.FileName);

                    string blobName = Guid.NewGuid() + fileType;

                    _fileStorageService.Upload(fileStream, blobName, containerName);

                    return Ok(new { Success = true, Message = string.Empty, ReturnCode = blobName });
                }
            }
            catch (Exception exception)
            {
                return Ok(new {Success=false,Message=exception.Message });
            }
            return Ok(new { Success = false, Message = string.Empty });
        }
    }
}
