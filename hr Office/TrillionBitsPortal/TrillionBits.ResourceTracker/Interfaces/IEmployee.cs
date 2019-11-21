using TrillionBitsPortal.Common.Models;
using System.Collections.Generic;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Interfaces
{
    public interface IEmployee
    {
        EmployeeUser Create(EmployeeUser model);
        List<EmployeeUser> GetEmployeeByCompanyId(int companyId);
        ResponseModel Delete(string id);
        EmployeeUser GetEmployeeById(int id);
        List<TextValuePairModel> GetEmployeeAsTextValue(int companyId);
        EmployeeUser GetByPortalUserId(string userId);
        ResponseModel UpdateEmployee(PortalUserViewModel model);
    }
}