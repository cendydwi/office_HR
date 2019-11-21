using TrillionBitsPortal.Common.Models;
using System.Collections.Generic;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Interfaces
{
    public interface IDepartment
    {
        List<Department> GetDepartmentByCompanyId(string companyId);
        Department Create(Department model,string userId);
        ResponseModel UpdateDepartment(Department model);
    }
}