
namespace TrillionBitsPortal.Common.Models
{
    public class TextValuePairModel
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
    public class NameIdPairModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
        public string Description { get; set; }
        public int SerialNo { get; set; }
    }

    public class LabelIdModel
    {
        public int id { get; set; }
        public string label { get; set; }
    }
}
