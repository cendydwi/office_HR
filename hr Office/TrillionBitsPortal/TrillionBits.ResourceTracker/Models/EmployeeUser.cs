namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class EmployeeUser : BaseModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Designation { get; set; }
        public string PhoneNumber { get; set; }
        public string ImageFileName { get; set; }
        public string ImageFileId { get; set; }
        public int CompanyId { get; set; }
        public int DepartmentId { get; set; }
        public bool IsAutoCheckPoint { get; set; }
        public string AutoCheckPointTime { get; set; }
        public string MaximumOfficeHours { get; set; }
        public string OfficeOutTime { get; set; }
        public string DepartmentName { get; set; }
        public bool? IsActive { get; set; }
    }
}
