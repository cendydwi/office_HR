using TrillionBitsPortal.Common;
using TrillionBitsPortal.Common.Models;
using System;
using System.Web.Http;
using TrillionBits.ResourceTracker;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Models;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Web.Controllers.Api.ResourceTracker
{
    public class RtEmployeeApiController : BaseApiController
    {
        private readonly IEmployee _employeeRepository;
        private readonly IUserCredential _userCredential;
        public RtEmployeeApiController()
        {
            _employeeRepository = RTUnityMapper.GetInstance<IEmployee>();
            _userCredential = RTUnityMapper.GetInstance<IUserCredential>();
        }
        [HttpPost]
        public IHttpActionResult CreateEmployee(EmployeeRegistrationModel json)
        {
            if(json==null || json.CompanyId==0)
                return Ok(new { Success = false, Message = "Please create a company from setting menu." });
            var model = new EmployeeRegistrationModel
            {
                Email = json.Email,
                PhoneNumber = json.PhoneNumber,
                Password = json.Password,
                UserName = json.UserName,
                Gender = json.Gender,
                UserFullName = json.UserFullName,
                UserType = json.UserType,
                Designation = json.Designation,
                DepartmentId = json.DepartmentId,
                CompanyId = json.CompanyId,
                IsAutoCheckPoint = json.IsAutoCheckPoint,
                AutoCheckPointTime = json.AutoCheckPointTime,
                MaximumOfficeHours = json.MaximumOfficeHours,
                OfficeOutTime = json.OfficeOutTime
            };

            var response=CreateUser(model);
            if (!response.Success)
                return Ok(response);
            EmployeeUser empUser = new EmployeeUser
            {
                UserId = response.ReturnCode,
                UserName = model.UserFullName,
                PhoneNumber = model.PhoneNumber,
                Designation = model.Designation,
                DepartmentId = Convert.ToInt32(model.DepartmentId),
                CompanyId = model.CompanyId,
                IsAutoCheckPoint = model.IsAutoCheckPoint,
                AutoCheckPointTime = model.AutoCheckPointTime,
                MaximumOfficeHours = model.MaximumOfficeHours,
                OfficeOutTime = model.OfficeOutTime
            };
            var userResponse = _employeeRepository.Create(empUser);
            return Ok(new { Success=true, Message = response.Message});
        }

        private ResponseModel CreateUser(EmployeeRegistrationModel model)
        {
            var userModel = _userCredential.GetByLoginID(model.PhoneNumber, UserType.ResourceTrackerAdmin);
            if (userModel != null)
                return new ResponseModel { Message = "This mobile number already exists." };
            var p = GeneratePassword();
            var password = CryptographyHelper.CreateMD5Hash(p);
            var response = _userCredential.Save(new UserCredentialModel
            {
                FullName = model.UserFullName,
                UserTypeId = (int)UserType.ResourceTrackerUser,
                Email = model.Email,
                ContactNo = model.PhoneNumber,
                LoginID = model.PhoneNumber,
                IsActive = true,
                Password = password
            });

            if (response.Success)
            {
                Task.Run(() => SendMailToUser(model.Email,model.PhoneNumber, p));
            }
            return new ResponseModel { Success = response.Success, Message = response.Success?p:string.Empty,ReturnCode=response.ReturnCode };
        }

        public void SendMailToUser(string email,string loginID, string p)
        {
            if (string.IsNullOrEmpty(email))
                return;

            var sb = new StringBuilder();
            sb.Append(string.Format("Please download App from playstore."));
            sb.Append(string.Format("<div></div>"));
            sb.Append(string.Format("<div>Your Login ID : {0}</div>", loginID));
            sb.Append(string.Format("<div>Your Password : {0}</div>", p));

            var recipient = new List<string> {email};
            new Email(ConfigurationManager.AppSettings["AttndEmailSender"], ConfigurationManager.AppSettings["AttndEmailSender"], "Your User Credential", sb.ToString()).SendEmail(recipient, ConfigurationManager.AppSettings["AttndEmailSenderPassword"]);
        }


        private static string _numbers = "0123456789";
        Random random = new Random();


        private string GeneratePassword()
        {
            StringBuilder builder = new StringBuilder(6);
            string numberAsString = "";

            for (var i = 0; i < 6; i++)
            {
                builder.Append(_numbers[random.Next(0, _numbers.Length)]);
            }

            numberAsString = builder.ToString();
            return numberAsString;
        }


        [HttpDelete]
        public IHttpActionResult DeleteEmployee(string id)
        {
            var userResponse = _employeeRepository.Delete(id);
            return Ok(userResponse);
        }
        [HttpPost]
        public IHttpActionResult UpdateEmployee(PortalUserViewModel json)
        {
            var response = _employeeRepository.UpdateEmployee(json);
            return Ok(response);
        }

        [HttpGet]
        public IHttpActionResult GetEmployeeAsTextValue(int companyId)
        {
            var userResponse = _employeeRepository.GetEmployeeAsTextValue(companyId);
            return Ok(userResponse);
        }

        [HttpGet]
        public IHttpActionResult GetEmployeeByCompanyId(int companyId)
        {
            var userResponse = _employeeRepository.GetEmployeeByCompanyId(companyId);
            var data=(from x in userResponse select new
            {
                x.Id,
                x.UserId,
                x.UserName,
                x.PhoneNumber,
                x.MaximumOfficeHours,
                x.CompanyId,
                x.Designation,
                x.DepartmentId,
                x.DepartmentName,
                x.ImageFileId,
                x.ImageFileName,
                x.IsActive
            });
            return Ok(data);
        }

    }
}
