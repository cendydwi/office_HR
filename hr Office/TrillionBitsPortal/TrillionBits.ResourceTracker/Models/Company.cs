namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class Company
    {
        public int Id { get;set; }
        public string PortalUserId { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string MaximumOfficeHours { get; set; }
        public string OfficeOutTime { get; set; }
        public string PhoneNumber { get; set; }
        public string ImageFileName { get; set; }
        public string ImageFileId { get; set; }

    }
}
