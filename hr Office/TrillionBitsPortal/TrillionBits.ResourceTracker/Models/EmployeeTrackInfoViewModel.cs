using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class EmployeeTrackInfoViewModel
    {
        public int? EmployeeId { get; set; }
        public string UserName { get; set; }
        public string UserFullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public string CompanyName { get; set; }
        public string DepartmentName { get; set; }
        public int? DepartmentId { get; set; }


        public string CompanyId { get; set; }
        public string Designation { get; set; }
        public string TrackDateTime { get; set; }
        public string ImageFileName { get; set; }
        public bool? IsCheckInToday { get; set; }
        public bool? IsCheckOutToday { get; set; }
        public string LastTrackDateTime { get; set; }
        public decimal? LastTrackLatitude { get; set; }
        public decimal? LastTrackLongitude { get; set; }
        public bool IsAutoCheckPoint { get; set; }
        public string MaximumOfficeHours { get; set; }
        public string OfficeOutTime { get; set; }
        public string CheckOutTime { get; set; }

    }
}
