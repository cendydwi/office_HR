using System;
using System.Collections.Generic;
using System.Data.Common;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Mappers
{
   public class AttendanceMapper
    {
        public static List<AttendanceModel> ToAttendance(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<AttendanceModel>();

            while (readers.Read())
            {
                var model = new AttendanceModel
                {
                    EmployeeId = Convert.ToInt32(readers["EmployeeId"]),
                    UserId = Convert.IsDBNull(readers["UserId"]) ? string.Empty : Convert.ToString(readers["UserId"]),
                    EmployeeName = Convert.IsDBNull(readers["EmployeeName"]) ? string.Empty : Convert.ToString(readers["EmployeeName"]),
                    PhoneNumber = Convert.IsDBNull(readers["PhoneNumber"]) ? string.Empty : Convert.ToString(readers["PhoneNumber"]),
                    AttendanceDate = Convert.IsDBNull(readers["AttendanceDate"]) ? (DateTime?)null : Convert.ToDateTime(readers["AttendanceDate"]),
                    CheckInTime = Convert.IsDBNull(readers["CheckInTime"]) ? (DateTime?)null : Convert.ToDateTime(readers["CheckInTime"]),
                    CheckOutTime = Convert.IsDBNull(readers["CheckOutTime"]) ? (DateTime?)null : Convert.ToDateTime(readers["CheckOutTime"]),
                    CompanyId = Convert.ToInt32(readers["CompanyId"]),
                    LessTimeReason = Convert.IsDBNull(readers["LessTimeReason"]) ? string.Empty : Convert.ToString(readers["LessTimeReason"]),
                    DepartmentName = Convert.IsDBNull(readers["DepartmentName"]) ? string.Empty : Convert.ToString(readers["DepartmentName"]),
                    Designation = Convert.IsDBNull(readers["Designation"]) ? string.Empty : Convert.ToString(readers["Designation"]),
                    ImageFileName = Convert.IsDBNull(readers["ImageFileName"]) ? string.Empty : Convert.ToString(readers["ImageFileName"]),
                    DailyWorkingTimeInMin = Convert.IsDBNull(readers["DailyWorkingTimeInMin"]) ? (int?)null: Convert.ToInt32(readers["DailyWorkingTimeInMin"]),

                    AllowOfficeLessTimeInMin = Convert.IsDBNull(readers["AllowOfficeLessTime"]) ? (int?)null : Convert.ToInt32(readers["AllowOfficeLessTime"]),
                    IsLeave = Convert.IsDBNull(readers["IsLeave"]) ? (bool?)null : Convert.ToBoolean(readers["IsLeave"]),
                };

                models.Add(model);
            }

            return models;
        }
        public static List<UserMovementLogModel> ToMovementLog(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<UserMovementLogModel>();

            while (readers.Read())
            {
                var model = new UserMovementLogModel
                {
                    Id = Convert.IsDBNull(readers["Id"]) ? string.Empty : Convert.ToString(readers["Id"]),
                    UserId = Convert.IsDBNull(readers["UserId"]) ? string.Empty : Convert.ToString(readers["UserId"]),
                    LogDateTime = Convert.IsDBNull(readers["LogDateTime"]) ? (DateTime?)null : Convert.ToDateTime(readers["LogDateTime"]),
                    Latitude = Convert.IsDBNull(readers["Latitude"]) ? (decimal?)null : Convert.ToDecimal(readers["Latitude"]),
                    Longitude = Convert.IsDBNull(readers["Longitude"]) ? (decimal?)null : Convert.ToDecimal(readers["Longitude"]),
                    CompanyId = Convert.ToInt32(readers["CompanyId"]),
                    LogLocation = Convert.IsDBNull(readers["LogLocation"]) ? string.Empty : Convert.ToString(readers["LogLocation"]),
                    DeviceName = Convert.IsDBNull(readers["DeviceName"]) ? string.Empty : Convert.ToString(readers["DeviceName"]),
                    DeviceOSVersion = Convert.IsDBNull(readers["DeviceOSVersion"]) ? string.Empty : Convert.ToString(readers["DeviceOSVersion"]),
                    IsCheckInPoint = Convert.IsDBNull(readers["IsCheckInPoint"]) ? (bool?)null : Convert.ToBoolean(readers["IsCheckInPoint"]),
                    IsCheckOutPoint = Convert.IsDBNull(readers["IsCheckOutPoint"]) ? (bool?)null : Convert.ToBoolean(readers["IsCheckOutPoint"]),
                };

                models.Add(model);
            }

            return models;
        }
    }
}
