using System;
using System.Collections.Generic;
using System.Data.Common;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Mappers
{
    public static class LeavingReasonMapper
    {

        public static List<LeavingReason> ToLeavingReasonModel(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<LeavingReason>();

            while (readers.Read())
            {
                var model = new LeavingReason
                {
                    Id = Convert.ToInt32(readers["Id"]),
                    EmployeeUserId = Convert.IsDBNull(readers["DepartmentName"]) ? string.Empty : Convert.ToString(readers["DepartmentName"]),
                    Description = Convert.IsDBNull(readers["Description"]) ? string.Empty : Convert.ToString(readers["Description"]),
                    LeavingDateTime = Convert.IsDBNull(readers["LeavingDateTime"]) ? string.Empty : Convert.ToDateTime(readers["LeavingDateTime"]).ToString(),
                };

                models.Add(model);
            }

            return models;
        }
    }
}