using System;
using System.Collections.Generic;
using System.Data.Common;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Mappers
{
    public static class EmployeeTrackingMapper
    {

        public static List<EmployeeTrack> ToEmployeeTrackModel(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<EmployeeTrack>();

            while (readers.Read())
            {
                var model = new EmployeeTrack
                {
                    Id = Convert.ToInt32(readers["Id"]),
                    EmployeeUserId = Convert.ToInt32(readers["EmployeeUserId"]),
                    TrackTypeName = Convert.IsDBNull(readers["TrackTypeName"]) ? string.Empty : Convert.ToString(readers["TrackTypeName"]),
                    TrackDateTime = Convert.IsDBNull(readers["TrackDateTime"]) ? string.Empty : Convert.ToDateTime(readers["TrackDateTime"]).ToString(),
                    TrackLatitude = Convert.IsDBNull(readers["TrackLatitude"]) ? (decimal?)null : Convert.ToDecimal(readers["TrackLatitude"]),
                    TrackLongitude = Convert.IsDBNull(readers["TrackLongitude"]) ? (decimal?)null : Convert.ToDecimal(readers["TrackLongitude"]),
                    TrackPlaceName = Convert.IsDBNull(readers["TrackPlaceName"]) ? string.Empty : Convert.ToString(readers["TrackPlaceName"]),
                };

                models.Add(model);
            }

            return models;
        }
    }
}