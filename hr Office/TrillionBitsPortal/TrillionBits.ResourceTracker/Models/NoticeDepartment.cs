using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class NoticeDepartment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public int DepartmentId { get; set; }

        public string NoticeId { get; set; }
    }
}
