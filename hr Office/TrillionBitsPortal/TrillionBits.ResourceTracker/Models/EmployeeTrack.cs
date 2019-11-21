namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class EmployeeTrack 
    {
        public int Id { get; set; }
        public int EmployeeUserId { get; set; }
        public string TrackTypeName { get; set; }
        public string TrackDateTime { get; set; }
        public decimal? TrackLatitude { get; set; }
        public decimal? TrackLongitude { get; set; }
        public string TrackPlaceName { get; set; }
        public string UserId { get; set; }
    }
}
