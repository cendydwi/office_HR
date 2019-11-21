using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Common
{
    public static class Util
    {
        public const string DateFormat = "dd-MMM-yyyy";

        public const string TimeFormat = "hh:mm:ss tt";

        public const string EntryTimeFormat = "hh:mm tt";

        public const string DateTimeFormat = "yyyy-MM-dd hh:mm:ss.fff";

        public static string ConvertedDateFormat;

        public static string DbDateFormat;

        static Util()
        {
            Util.ConvertedDateFormat = "MM/dd/yyyy";
            Util.DbDateFormat = "yyyy-MM-dd";
        }

        public static int GetEnumValue(Type enumType, string value)
        {
            if (value == "Integer")
            {
                value = "int";
            }
            else if (value == "Float")
            {
                value = "double";
            }
            return (int)Enum.Parse(enumType, value);
        }
    }
}
