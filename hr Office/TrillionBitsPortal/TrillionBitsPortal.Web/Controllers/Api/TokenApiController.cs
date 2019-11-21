using TrillionBitsPortal.Common;
using TrillionBitsPortal.Web.Models;
using System.Web.Http;
using TrillionBits.ResourceTracker;
using TrillionBitsPortal.ResourceTracker.Interfaces;

namespace TrillionBitsPortal.Web.Controllers.Api
{
    public class TokenApiController : ApiController
    {
        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult CreateToken([FromBody] LoginModel model)
        {
            var password = CryptographyHelper.CreateMD5Hash(model.Password);
            var user = RTUnityMapper.GetInstance<IUserCredential>().Get(model.LoginID, password);
            if (user == null)
            {
                return BadRequest();
            }
            var token = TokenManager.GenerateToken(model.LoginID);
            return Ok(new { Success = true, Token = TokenManager.GenerateToken(model.LoginID), UserKey = user.DoctorId });
        }
    }
}
