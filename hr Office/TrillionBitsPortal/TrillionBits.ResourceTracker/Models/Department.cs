using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class Department
    {
        [Key]
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string DepartmentName { get; set; }
        public string UserId { get; set; }
    }
}
