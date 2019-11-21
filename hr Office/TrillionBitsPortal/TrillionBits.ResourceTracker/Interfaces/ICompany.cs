using TrillionBitsPortal.Common.Models;
using System.Collections.Generic;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Interfaces
{
    public interface ICompany
    {
        List<Company> GetCompanyByUserId(string userId);
        List<Company> GetCompanyByEmpUserId(string userId);
        Company Create(Company model);
        ResponseModel UpdateCompany(Company model);

        Company GetCompanyByIdentity(string userId);
        Company GetCompanyById(int companyId);
        List<CompanyListModel> GetCompanyList();
    }
}