using TrillionBitsPortal.Common.Models;
using System.Collections.Generic;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Interfaces
{
    public interface IEmployeeLeave
    {
        List<EmployeeLeaveModel> GetLeaveByCompanyId(string companyId);
        List<EmployeeLeaveModel> GetUserLeaves(string userId);
        List<EmployeeLeaveModel> GetLeaveById(int id);
        ResponseModel CreateEmployeeLeave(EmployeeLeaveModel model);
        ResponseModel Approved(int id, string userId);
        ResponseModel Rejected(int id);

    }
}