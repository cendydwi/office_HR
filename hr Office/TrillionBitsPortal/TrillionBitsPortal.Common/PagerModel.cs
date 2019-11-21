using System;
using System.Data;

namespace TrillionBitsPortal.Common
{
    public class FilterModel
    {
        public int? UserId { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public string StatusName { get; set; }
        public string TicketType { get; set; }
        public PagerModel PagerModel { get; set; }
    }

    public class PagerModel
    {
        public int PageSize { get; set; }
        public int PageNo { get; set; }
        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
        public DataTable FilterModel { get; set; }
    }
}
