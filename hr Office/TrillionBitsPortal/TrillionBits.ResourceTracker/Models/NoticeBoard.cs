using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.ResourceTracker.Models
{
    public class NoticeBoard
    {
        public string Id { get; set; }

        public string Details { get; set; }

        public string PostingDate { get; set; }

        public string ImageFileName { get; set; }

        public string CreatedBy { get; set; }

        public string CreateDate { get; set; }
    }
}
