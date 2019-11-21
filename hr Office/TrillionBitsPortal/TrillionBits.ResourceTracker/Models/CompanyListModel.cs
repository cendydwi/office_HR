using TrillionBitsPortal.Common;
using System;

namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class CompanyListModel
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string OfficePhone { get; set; }
        public string ContactPerson { get; set; }
        public string ContactPersonMobile { get; set; }
        public string Country { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedAt
        {
            get { return CreatedDate.HasValue ? CreatedDate.Value.ToZoneTimeBD().ToString(Constants.DateTimeLongFormat) : string.Empty; }
        }
        public int TotalEmployee { get; set; }
        public string Email { get; set; }
    }
}
