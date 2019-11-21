using System;
using System.Collections.Generic;
using System.Data.Common;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Mappers
{
    public static class CompanyMapper
    {

        public static List<Company> ToCompanyModel(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<Company>();

            while (readers.Read())
            {
                var model = new Company
                {
                    Id = Convert.ToInt32(readers["Id"]),
                    PortalUserId = Convert.IsDBNull(readers["PortalUserId"]) ? string.Empty : Convert.ToString(readers["PortalUserId"]),
                    CompanyName = Convert.IsDBNull(readers["CompanyName"]) ? string.Empty : Convert.ToString(readers["CompanyName"]),
                    Address = Convert.IsDBNull(readers["Address"]) ? string.Empty : Convert.ToString(readers["Address"]),
                    PhoneNumber = Convert.IsDBNull(readers["PhoneNumber"]) ? string.Empty : Convert.ToString(readers["PhoneNumber"]),
                    MaximumOfficeHours = Convert.IsDBNull(readers["MaximumOfficeHours"]) ? string.Empty : Convert.ToString(readers["MaximumOfficeHours"]),
                    OfficeOutTime = Convert.IsDBNull(readers["OfficeOutTime"]) ? string.Empty : Convert.ToString(readers["OfficeOutTime"]),
                    ImageFileName = Convert.IsDBNull(readers["ImageFileName"]) ? string.Empty : Convert.ToString(readers["ImageFileName"]),
                    ImageFileId = Convert.IsDBNull(readers["ImageFileId"]) ? string.Empty : Convert.ToString(readers["ImageFileId"]),
                };

                models.Add(model);
            }

            return models;
        }

        public static List<CompanyListModel> ToList(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<CompanyListModel>();

            while (readers.Read())
            {
                var model = new CompanyListModel
                {
                    CompanyName = Convert.IsDBNull(readers["CompanyName"]) ? string.Empty : Convert.ToString(readers["CompanyName"]),
                    Address = Convert.IsDBNull(readers["Address"]) ? string.Empty : Convert.ToString(readers["Address"]),
                    OfficePhone = Convert.IsDBNull(readers["OfficePhone"]) ? string.Empty : Convert.ToString(readers["OfficePhone"]),
                    ContactPerson = Convert.IsDBNull(readers["ContactPerson"]) ? string.Empty : Convert.ToString(readers["ContactPerson"]),
                    ContactPersonMobile = Convert.IsDBNull(readers["ContactPersonMobile"]) ? string.Empty : Convert.ToString(readers["ContactPersonMobile"]),
                    Email = Convert.IsDBNull(readers["Email"]) ? string.Empty : Convert.ToString(readers["Email"]),
                    CreatedDate = Convert.IsDBNull(readers["CreatedDate"]) ? (DateTime?)null : Convert.ToDateTime(readers["CreatedDate"]),
                    TotalEmployee = Convert.IsDBNull(readers["TotalEmployee"]) ? 0 : Convert.ToInt32(readers["TotalEmployee"]),
                };

                models.Add(model);
            }

            return models;
        }
    }
}