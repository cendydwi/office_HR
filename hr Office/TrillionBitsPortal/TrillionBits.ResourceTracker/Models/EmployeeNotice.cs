using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class EmployeeNotice
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string NoticeBoardId { get; set; }
        public int EmployeeUserId { get; set; }
        public bool IsNoticeRead { get; set; }
    }
}
