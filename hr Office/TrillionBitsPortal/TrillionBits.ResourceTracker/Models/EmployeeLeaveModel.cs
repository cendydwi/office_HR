using TrillionBitsPortal.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class EmployeeLeaveModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool? IsHalfDay { get; set; }
        public int LeaveTypeId { get; set; }
        public string LeaveReason { get; set; }
        public string CreatedAt { get; set; }
        public bool IsApproved { get; set; }
        public bool IsRejected { get; set; }
        public string RejectReason { get; set; }
        public string ApprovedById { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public string ApprovedBy { get; set; }

        public string LeaveApplyFrom { get; set; }
        public string LeaveApplyTo { get; set; }
        public string UserId { get; set; }

        public string LeaveType
        {
            get
            {
                return EnumUtility.GetDescriptionFromEnumValue((LeaveType)LeaveTypeId);
            }
        }

        public int LeaveInDays
        {
            get { return ((int)ToDate.Subtract(FromDate).TotalDays)+1; }
        }
        public string FromDateVw
        {
            get { return FromDate.ToString(Constants.DateLongFormat); }
        }
        public string ApprovedAtVw
        {
            get { return ApprovedAt.HasValue? ApprovedAt.Value.ToString(Constants.DateLongFormat):string.Empty; }
        }
        public string ToDateVw
        {
            get { return ToDate.ToString(Constants.DateLongFormat); }
        }
    }

    public enum LeaveType
    {
        [Description("Casual Leave")]
        CasualLeave = 1,
        [Description("Sick Leave")]
        SickLeave = 2
    }
}
