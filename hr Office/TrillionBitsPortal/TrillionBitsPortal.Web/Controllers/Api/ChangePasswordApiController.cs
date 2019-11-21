using TrillionBitsPortal.Common;
using TrillionBitsPortal.Web.Models;
using System.Web.Http;
using TrillionBits.ResourceTracker;
using TrillionBitsPortal.ResourceTracker.Interfaces;

namespace TrillionBitsPortal.Web.Controllers.Api
{
    public class ChangePasswordApiController : BaseApiController
    {

        [HttpPost]
        public IHttpActionResult Post(LocalPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                var response = RTUnityMapper.GetInstance<IUserCredential>().ChangePassword(model.UserName, CryptographyHelper.CreateMD5Hash(model.ConfirmPassword));
                return Ok(response);
            }
            return Ok(new { Success = false, Message = "Oops!try again." });
        }
    }
}
