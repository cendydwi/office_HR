namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class LeavingReason
    {
        public int Id { get; set; }
        public string EmployeeUserId { get; set; }
        public string Description { get; set; }
        public string LeavingDateTime { get; set; }
    }
}
