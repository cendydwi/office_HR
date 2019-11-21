using TrillionBitsPortal.Common.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Mappers
{
    public static class EmployeeMapper
    {

        public static List<EmployeeUser> ToEmployeeModel(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<EmployeeUser>();
            while (readers.Read())
            {
                var model = new EmployeeUser
                {
                    Id = Convert.ToInt32(readers["Id"]),
                    UserName = Convert.IsDBNull(readers["UserName"]) ? string.Empty : Convert.ToString(readers["UserName"]),
                    Designation = Convert.IsDBNull(readers["Designation"]) ? string.Empty : Convert.ToString(readers["Designation"]),
                    CompanyId = Convert.ToInt32(readers["CompanyId"]),
                    DepartmentId = Convert.ToInt32(readers["DepartmentId"]),
                    PhoneNumber = Convert.IsDBNull(readers["PhoneNumber"]) ? string.Empty : Convert.ToString(readers["PhoneNumber"]),
                    ImageFileName = Convert.IsDBNull(readers["ImageFileName"]) ? string.Empty : Convert.ToString(readers["ImageFileName"]),
                    ImageFileId = Convert.IsDBNull(readers["ImageFileId"]) ? string.Empty : Convert.ToString(readers["ImageFileId"]),
                    UserId = Convert.IsDBNull(readers["UserId"]) ? string.Empty : Convert.ToString(readers["UserId"]),
                    DepartmentName = Convert.IsDBNull(readers["DepartmentName"]) ? string.Empty : Convert.ToString(readers["DepartmentName"]),
                    IsActive = Convert.IsDBNull(readers["IsActive"]) ? (bool?)null : Convert.ToBoolean(readers["IsActive"]),
                };
                models.Add(model);
            }
            return models;
        }

        public static List<TextValuePairModel> ToTextValuePairModel(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<TextValuePairModel>();
            while (readers.Read())
            {
                var model = new TextValuePairModel
                {
                    Text = Convert.IsDBNull(readers["Name"]) ? string.Empty : Convert.ToString(readers["Name"]),
                    Value = Convert.IsDBNull(readers["Id"]) ? string.Empty : Convert.ToString(readers["Id"])
                };
                models.Add(model);
            }
            return models;
        }
    }
}