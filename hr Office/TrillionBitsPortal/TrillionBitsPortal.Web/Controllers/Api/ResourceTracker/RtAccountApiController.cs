using TrillionBitsPortal.Common;
using TrillionBitsPortal.Web.Models;
using System.Web.Http;
using TrillionBits.ResourceTracker;
using TrillionBitsPortal.ResourceTracker.Interfaces;

namespace TrillionBitsPortal.Web.Controllers.Api.ResourceTracker
{
    public class RtAccountApiController : BaseApiController
    {
        private readonly IEmployee _emplpoyeeRepository;
        private readonly IUserCredential _userCredential;

        public RtAccountApiController()
        {
            _emplpoyeeRepository = RTUnityMapper.GetInstance<IEmployee>();
            _userCredential = RTUnityMapper.GetInstance<IUserCredential>();
        }

        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult Register([FromBody]ResourceTrackerRegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var userModel = _userCredential.GetByLoginID(model.PhoneNumber, UserType.ResourceTrackerAdmin);
                if (userModel != null)
                    return BadRequest("This mobile number already exists.");
                var password = CryptographyHelper.CreateMD5Hash(model.Password);
                var response = _userCredential.Save(new Common.Models.UserCredentialModel
                {
                    FullName = model.UserFullName,
                    UserTypeId = (int)UserType.ResourceTrackerAdmin,
                    Email = model.Email,
                    ContactNo = model.PhoneNumber,
                    LoginID = model.PhoneNumber,
                    IsActive = true,
                    Password = password
                });

                return Ok(response);
            }

            return BadRequest("Invalid model.");
        }

        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult Login([FromBody]ResourceTrackerLoginModel model)
        {
            if (ModelState.IsValid)
            {
                var password = CryptographyHelper.CreateMD5Hash(model.Password);
                var user = _userCredential.Get(model.UserName, password);
                if (user == null)
                    return Ok(new { Success = false, message = "Invalid userid/password" });

                int companyId = 0;
                if (user.UserTypeId == (int)UserType.ResourceTrackerUser)
                {
                    var userProfileModel = _emplpoyeeRepository.GetByPortalUserId(user.Id);
                    companyId = userProfileModel == null ? 0 : userProfileModel.CompanyId;
                }

                return Ok(new
                {
                    Success = true,
                    Token = TokenManager.GenerateToken(model.UserName),
                    UserKey = user.Id,
                    UserName = user.FullName,
                    IsAdmin = user.UserTypeId == (int)UserType.ResourceTrackerAdmin,
                    IsEmployee = user.UserTypeId == (int)UserType.ResourceTrackerUser,
                    CompanyId = companyId
                });
            }

            return BadRequest();
        }


        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult LoginAdmin([FromBody]ResourceTrackerLoginModel model)
        {
            if (ModelState.IsValid)
            {
                var password = CryptographyHelper.CreateMD5Hash(model.Password);
                var user = _userCredential.GetByLoginID(model.UserName, password, UserType.ResourceTrackerAdmin);
                if (user == null)
                    return Ok(new { Success = false, message = "Invalid userid/password" });
                if (user.UserTypeId == (int)UserType.ResourceTrackerAdmin)
                    return Ok(new { Success = true, Token = TokenManager.GenerateToken(model.UserName), UserKey = user.Id, UserName = user.FullName });
                return Ok(new { Success = false, message = "Login failed" });
            }

            return BadRequest();
        }

        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult LoginUser([FromBody]ResourceTrackerLoginModel model)
        {
            if (ModelState.IsValid)
            {
                var password = CryptographyHelper.CreateMD5Hash(model.Password);
                var user = _userCredential.GetByLoginID(model.UserName, password, UserType.ResourceTrackerUser);
                if (user == null)
                    return Ok(new { Success = false, message = "Invalid userid/password" });
                if (user.UserTypeId == (int)UserType.ResourceTrackerUser)
                {
                    var userProfileModel = _emplpoyeeRepository.GetByPortalUserId(user.Id);
                    return Ok(new { Success = true, Token = TokenManager.GenerateToken(model.UserName), UserKey = user.Id, CompanyId = userProfileModel == null ? 0 : userProfileModel.CompanyId, UserName = user.FullName });
                }

                return Ok(new { Success = false, message = "Login failed" });
            }

            return BadRequest();
        }

        [HttpGet]
        public ResourceTrackerRegisterModel GetUserClaims(string userKey)
        {
            var dd = _userCredential.GetProfileDetails(userKey);
            ResourceTrackerRegisterModel model = new ResourceTrackerRegisterModel()
            {
                Id = dd.Id,
                UserName = dd.LoginID,
                PhoneNumber = dd.ContactNo,
                Email = dd.Email,
                Gender = "Male",
                UserFullName = dd.FullName,
                UserType = dd.UserTypeId == (int)UserType.ResourceTrackerAdmin ? "admin" : "user"
            };
            return model;
        }
        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult CheckExistPhone(string phoneno)
        {
            var userModel = _userCredential.GetByLoginID(phoneno, UserType.ResourceTrackerAdmin);
            if (userModel != null)
                return BadRequest("This mobile number already exists.");
            return  Ok(new { Success = true});

        }

        [HttpPost]
        public IHttpActionResult ChangePassword(LocalPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                var password = CryptographyHelper.CreateMD5Hash(model.OldPassword);
                var user = _userCredential.GetByLoginID(model.UserName);
                if (user == null)
                    return Ok(new { Success = false, Message = "Invalid userid/password." });

                var response = _userCredential.ChangePassword(user.Id, CryptographyHelper.CreateMD5Hash(model.ConfirmPassword));
                return Ok(response);
            }
            return Ok(new { Success = false, Message = "Oops!try again." });
        }

    }
}
