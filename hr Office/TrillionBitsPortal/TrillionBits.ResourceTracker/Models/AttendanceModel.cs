using TrillionBitsPortal.Common;
using System;
using System.Globalization;
using System.Web.Script.Serialization;

namespace TrillionBitsPortal.ResourceTracker.Models
{

    public class AttendanceEntryModel
    {
        public string UserId { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string LogLocation { get; set; }
        public string DeviceName { get; set; }
        public string DeviceOSVersion { get; set; }
        public int? CompanyId { get; set; }
        public string Reason { get; set; }

        public int? OfficeHour { get; set; }
        public int? AllowOfficeLessTime { get; set; }
        public bool? IsLeave { get; set; }
    }
    public class AttendanceTotalModel
    {
        public string UserId { get; set; }
        public string EmployeeName { get; set; }
        public string Designation { get; set; }
        public string DepartmentName { get; set; }
        public string ImageFileName { get; set; }
        public int? TotalPresent { get; set; }
        public int? TotalCheckedOutMissing { get; set; }
        public string TotalStayTime { get; set; }
        public string TotalOfficeHour { get; set; }
        public string OvertimeOrDueHour { get; set; }
        public int? TotalLeave { get; set; }
        public double TotalScore { get; set; }
    }
    public class AttendanceModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [ScriptIgnore]
        public DateTime? AttendanceDate { get; set; }
        [ScriptIgnore]
        public DateTime? CheckInTime { get; set; }
        [ScriptIgnore]
        public DateTime? CheckOutTime { get; set; }
        public bool? IsLeave { get; set; }


        public string LessTimeReason { get; set; }
        public int? DailyWorkingTimeInMin { get; set; }
        public int? AllowOfficeLessTimeInMin { get; set; }
        public int? CompanyId { get; set; }
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string PhoneNumber { get; set; }
        public string Designation { get; set; }
        public string DepartmentName { get; set; }
        public string AttendanceDateVw
        {
            get { return AttendanceDate.HasValue ? AttendanceDate.Value.ToZoneTimeBD().ToString(Constants.DateLongFormat) : string.Empty; }
        }

        public string AttendancceDayName
        {
            get { return AttendanceDate.HasValue ? AttendanceDate.Value.ToZoneTimeBD().ToString("ddd") : string.Empty; }
        }

        public string AttendancceDayNumber
        {
            get { return AttendanceDate.HasValue ? string.Format("{0}",AttendanceDate.Value.ToZoneTimeBD().Day) : string.Empty; }
        }

        public string CheckInTimeVw
        {
            get { return CheckInTime.HasValue ? CheckInTime.Value.ToZoneTimeBD().ToString(Constants.TimeFormat) : (IsLeave.HasValue && IsLeave.Value?"Leave": string.Empty); }
        }
        public string CheckOutTimeVw
        {
            get { return CheckOutTime.HasValue ? CheckOutTime.Value.ToZoneTimeBD().ToString(Constants.TimeFormat) : string.Empty; }
        }

        public string OfficeStayHour
        {
            get
            {
                if (!CheckInTime.HasValue)
                    return string.Empty;
                TimeSpan result = CheckOutTime.HasValue? CheckOutTime.Value.ToZoneTimeBD().Subtract(CheckInTime.Value.ToZoneTimeBD()): DateTime.UtcNow.ToZoneTimeBD().Subtract(CheckInTime.Value.ToZoneTimeBD());
                int hours = result.Hours;
                int minutes = result.Minutes;

                return string.Format("{0}:{1}",hours,minutes);
               }
        }

        public bool IsCheckedIn
        {
            get
            {
                return CheckInTime.HasValue && !CheckOutTime.HasValue;
            }
        }

        public bool IsPresent
        {
            get
            {
                return CheckInTime.HasValue;
            }
        }
        public bool IsCheckedOut
        {
            get
            {
                return CheckInTime.HasValue && CheckOutTime.HasValue;
            }
        }

        public bool NotCheckedOut
        {
            get
            {
                return CheckInTime.HasValue && !CheckOutTime.HasValue;
            }
        }

        public bool NotAttend
        {
            get
            {
                return !CheckInTime.HasValue && !CheckOutTime.HasValue;
            }
        }

        public string ImageFileName { get; set; }
        public string Status
        {
            get
            {
                if (CheckInTime.HasValue && !CheckOutTime.HasValue)
                    return "Checked-In";
                else if (CheckInTime.HasValue && CheckOutTime.HasValue)
                    return "Checked-Out";
                else if (!CheckInTime.HasValue && !CheckOutTime.HasValue && !IsLeave.HasValue)
                    return "Absent";
                else if (!CheckInTime.HasValue && !CheckOutTime.HasValue && IsLeave.HasValue && IsLeave.Value)
                    return "Leave";
                else
                    return string.Empty;
            }
        }
        public int? TotalStayTimeInMinute
        {
            get
            {
                if (!CheckInTime.HasValue)
                    return 0;
                TimeSpan result = CheckOutTime.HasValue ? CheckOutTime.Value.ToZoneTimeBD().Subtract(CheckInTime.Value.ToZoneTimeBD()) : CheckInTime.Value.ToZoneTimeBD().Subtract(CheckInTime.Value.ToZoneTimeBD());
                int hours = result.Hours;
                int minutes = result.Minutes;

                return hours * 60 + minutes;
            }
        }

    }
    public class UserMovementLogModel
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public DateTime? LogDateTime { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string LogLocation { get; set; }
        public bool? IsCheckInPoint { get; set; }
        public bool? IsCheckOutPoint { get; set; }
        public string DeviceName { get; set; }
        public string DeviceOSVersion { get; set; }
        public int? CompanyId { get; set; }
        public string LogTimeVw
        {
            get { return LogDateTime.HasValue ? LogDateTime.Value.ToZoneTimeBD().ToString(Constants.TimeFormat) : string.Empty; }
        }
    }
}
