using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Common
{
    public static class ExtensionMethods
    {
        public const string UserCookieName = "LogUserInfo";

        public static void AcceptChanges<T>(this List<T> list)
        where T : class
        {
            if (!typeof(T).IsBaseModel())
            {
                return;
            }
            BaseModel[] array = list.Cast<BaseModel>().ToArray<BaseModel>();
            int num = 0;
            while (num < (int)array.Length)
            {
                BaseModel baseModel = array[num];
                switch (baseModel.ModelState)
                {
                    case ModelState.Added:
                    case ModelState.Modified:
                        {
                            baseModel.SetUnchanged();
                            goto case ModelState.Unchanged;
                        }
                    case ModelState.Deleted:
                    case ModelState.Detached:
                        {
                            list.Remove((T)Convert.ChangeType(baseModel, typeof(T)));
                            goto case ModelState.Unchanged;
                        }
                    case ModelState.Unchanged:
                        {
                            num++;
                            continue;
                        }
                    default:
                        {
                            goto case ModelState.Unchanged;
                        }
                }
            }
        }

        public static string BuildXmlString(string xmlRootName, IEnumerable<string> values)
        {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.AppendFormat("<{0}>", xmlRootName);
            foreach (string value in values)
            {
                stringBuilder.AppendFormat("<value>{0}</value>", value);
            }
            stringBuilder.AppendFormat("</{0}>", xmlRootName);
            return stringBuilder.ToString();
        }

        public static void CloseReader(this IDataReader reader)
        {
            if (reader.IsNotNull() && !reader.IsClosed)
            {
                reader.Close();
            }
        }

        public static bool Compare<T>(T x, T y)
        {
            return EqualityComparer<T>.Default.Equals(x, y);
        }

        public static void Copy(this object dst, object src)
        {
            PropertyInfo[] properties = src.GetType().GetProperties();
            for (int i = 0; i < (int)properties.Length; i++)
            {
                PropertyInfo propertyInfo = properties[i];
                if (propertyInfo.CanRead && propertyInfo.GetIndexParameters().Length == 0)
                {
                    PropertyInfo property = dst.GetType().GetProperty(propertyInfo.Name);
                    if (property != null && property.CanWrite)
                    {
                        property.SetValue(dst, propertyInfo.GetValue(src, null), null);
                    }
                }
            }
        }

        public static List<T> Copy<T>(this List<T> list)
        {
            MemoryStream memoryStream = new MemoryStream();
            BinaryFormatter binaryFormatter = new BinaryFormatter();
            binaryFormatter.Serialize(memoryStream, list);
            memoryStream.Position = (long)0;
            return (List<T>)binaryFormatter.Deserialize(memoryStream);
        }

        public static string FromDictionaryToJson(this Dictionary<string, string> dictionary)
        {
            IEnumerable<string> strs =
                from kvp in dictionary
                select string.Format("\"{0}\":\"{1}\"", kvp.Key, string.Concat(",", kvp.Value));
            return string.Concat("{", string.Join(",", strs), "}");
        }

        public static Dictionary<string, string> FromJsonToDictionary(this string json)
        {
            return json.Replace("{", string.Empty).Replace("}", string.Empty).Replace("\"", string.Empty).Split(new char[] { ',' }).ToDictionary<string, string, string>((string item) => item.Split(new char[] { ':' })[0], (string item) => item.Split(new char[] { ':' })[1]);
        }

        public static int GetAge(this DateTime dateOfBirth)
        {
            DateTime today = DateTime.Today;
            int year = (today.Year * 100 + today.Month) * 100 + today.Day;
            int num = (dateOfBirth.Year * 100 + dateOfBirth.Month) * 100 + dateOfBirth.Day;
            return (year - num) / 10000;
        }

        public static List<KeyValuePair<int, string>> GetAllMonths()
        {
            List<KeyValuePair<int, string>> keyValuePairs = new List<KeyValuePair<int, string>>();
            for (int i = 1; i <= 12; i++)
            {
                if (DateTimeFormatInfo.CurrentInfo != null)
                {
                    keyValuePairs.Add(new KeyValuePair<int, string>(i, DateTimeFormatInfo.CurrentInfo.GetMonthName(i)));
                }
            }
            return keyValuePairs;
        }

        public static bool GetBoolean(this IDataRecord reader, string columnName)
        {
            if (reader[columnName].Equals(DBNull.Value))
            {
                return false;
            }
            return (bool)reader[columnName];
        }

        public static byte[] GetBytes(this DbDataRecord reader, string columnName)
        {
            if (reader[columnName].Equals(DBNull.Value))
            {
                return null;
            }
            return (byte[])reader[columnName];
        }

        public static IEnumerable<BaseModel> GetChanges(this IEnumerable<BaseModel> list)
        {
            return list.Where<BaseModel>((BaseModel item) =>
            {
                if (item.IsAdded || item.IsModified)
                {
                    return true;
                }
                return item.IsDeleted;
            });
        }

        public static IEnumerable<BaseModel> GetChanges(this IEnumerable<BaseModel> list, ModelState itemState)
        {
            return
                from item in list
                where item.ModelState.Equals(itemState)
                select item;
        }

        public static DateTime GetDateTime(this IDataRecord reader, string columnName)
        {
            if (reader[columnName].Equals(DBNull.Value))
            {
                return DateTime.MinValue;
            }
            return DateTime.Parse(reader[columnName].ToString());
        }

        public static decimal GetDecimal(this IDataRecord reader, string columnName)
        {
            if (!reader[columnName].Equals(DBNull.Value))
            {
                return (decimal)reader[columnName];
            }
            return new decimal(0, 0, 0, false, 1);
        }

        public static double GetDouble(this IDataRecord reader, string columnName)
        {
            if (reader[columnName].Equals(DBNull.Value))
            {
                return 0;
            }
            return (double)reader[columnName];
        }

        public static short GetInt16(this IDataRecord reader, string columnName)
        {
            if (reader[columnName].Equals(DBNull.Value))
            {
                return 0;
            }
            return (short)reader[columnName];
        }

        public static int GetInt32(this IDataRecord reader, string columnName)
        {
            if (reader[columnName].Equals(DBNull.Value))
            {
                return 0;
            }
            return (int)reader[columnName];
        }

        public static long GetInt64(this IDataRecord reader, string columnName)
        {
            if (reader[columnName].Equals(DBNull.Value))
            {
                return (long)0;
            }
            return (long)reader[columnName];
        }

        public static string GetRandomNumber(int count)
        {
            if (count < 4)
            {
                count = 4;
            }
            Random random = new Random();
            return new string((
                from s in Enumerable.Repeat<string>("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", count)
                select s[random.Next(s.Length)]).ToArray<char>());
        }

        public static string GetString(this IDataRecord reader, string columnName)
        {
            return reader[columnName].ToString();
        }

        public static Type GetTypeFromName(this string typeName)
        {
            if (typeName == null)
            {
                throw new ArgumentNullException("typeName");
            }
            bool flag = false;
            bool flag1 = false;
            if (typeName.IndexOf("[]", StringComparison.Ordinal) != -1)
            {
                flag = true;
                typeName = typeName.Remove(typeName.IndexOf("[]", StringComparison.Ordinal), 2);
            }
            if (typeName.IndexOf("?", StringComparison.Ordinal) != -1)
            {
                flag1 = true;
                typeName = typeName.Remove(typeName.IndexOf("?", StringComparison.Ordinal), 1);
            }
            typeName = typeName.ToLower();
            string str = null;
            switch (typeName)
            {
                case "bool":
                case "boolean":
                    {
                        str = "System.bool";
                        break;
                    }
                case "byte":
                    {
                        str = "System.Byte";
                        break;
                    }
                case "char":
                    {
                        str = "System.Char";
                        break;
                    }
                case "datetime":
                    {
                        str = "System.DateTime";
                        break;
                    }
                case "datetimeoffset":
                    {
                        str = "System.DateTimeOffset";
                        break;
                    }
                case "decimal":
                    {
                        str = "System.Decimal";
                        break;
                    }
                case "double":
                    {
                        str = "System.Double";
                        break;
                    }
                case "float":
                    {
                        str = "System.Single";
                        break;
                    }
                case "int16":
                case "short":
                    {
                        str = "System.Int16";
                        break;
                    }
                case "int32":
                case "int":
                    {
                        str = "System.int";
                        break;
                    }
                case "int64":
                case "long":
                    {
                        str = "System.Int64";
                        break;
                    }
                case "object":
                    {
                        str = "System.object";
                        break;
                    }
                case "sbyte":
                    {
                        str = "System.SByte";
                        break;
                    }
                case "string":
                    {
                        str = "System.string";
                        break;
                    }
                case "timespan":
                    {
                        str = "System.TimeSpan";
                        break;
                    }
                case "uint16":
                case "ushort":
                    {
                        str = "System.UInt16";
                        break;
                    }
                case "uint32":
                case "uint":
                    {
                        str = "System.UInt32";
                        break;
                    }
                case "uint64":
                case "ulong":
                    {
                        str = "System.UInt64";
                        break;
                    }
            }
            if (str == null)
            {
                str = typeName;
            }
            else
            {
                if (flag)
                {
                    str = string.Concat(str, "[]");
                }
                if (flag1)
                {
                    str = string.Concat("System.Nullable`1[", str, "]");
                }
            }
            return Type.GetType(str);
        }

        public static bool IsBaseModel(this Type type)
        {
            if (type.BaseType == null)
            {
                return false;
            }
            if (type.BaseType == typeof(BaseModel))
            {
                return true;
            }
            return type.BaseType.IsBaseModel();
        }

        public static bool IsFalse(this bool val)
        {
            return !val;
        }

        public static bool IsMinValue(this DateTime obj)
        {
            return obj == DateTime.MinValue;
        }

        public static bool IsNotMinValue(this DateTime obj)
        {
            return obj != DateTime.MinValue;
        }

        public static bool IsNotNull(this BaseModel obj)
        {
            return obj != null;
        }

        public static bool IsNotNull(this object obj)
        {
            return obj != null;
        }

        public static bool IsNotZero(this long val)
        {
            return !val.Equals((long)0);
        }

        public static bool IsNotZero(this decimal val)
        {
            return !val.Equals(decimal.Zero);
        }

        public static bool IsNotZero(this double val)
        {
            return !val.Equals(0);
        }

        public static bool IsNotZero(this int val)
        {
            return !val.Equals(0);
        }

        public static bool IsNull(this BaseModel obj)
        {
            return obj == null;
        }

        public static bool IsNull(this object obj)
        {
            return obj == null;
        }

        public static bool IsNullable<T>(this T obj)
        {
            if (obj.IsNull())
            {
                return true;
            }
            Type type = typeof(T);
            if (!type.IsValueType)
            {
                return true;
            }
            return Nullable.GetUnderlyingType(type).IsNotNull();
        }

        public static bool IsNullable(this Type type)
        {
            if (type.IsNull())
            {
                return true;
            }
            if (!type.IsValueType)
            {
                return true;
            }
            return Nullable.GetUnderlyingType(type).IsNotNull();
        }

        public static bool IsNullOrDbNull(this object obj)
        {
            if (obj == null)
            {
                return true;
            }
            return obj == DBNull.Value;
        }

        public static bool IsNullOrMinValue(this DateTime? obj)
        {
            if (!obj.HasValue)
            {
                return true;
            }
            DateTime? nullable = obj;
            DateTime minValue = DateTime.MinValue;
            if (!nullable.HasValue)
            {
                return false;
            }
            if (!nullable.HasValue)
            {
                return true;
            }
            return nullable.GetValueOrDefault() == minValue;
        }

        public static bool IsTrue(this bool val)
        {
            return val;
        }

        public static bool IsZero(this long val)
        {
            return val.Equals((long)0);
        }

        public static bool IsZero(this decimal val)
        {
            return val.Equals(decimal.Zero);
        }

        public static bool IsZero(this double val)
        {
            return val.Equals(0);
        }

        public static bool IsZero(this int val)
        {
            return val.Equals(0);
        }

        public static IList<dynamic> ListFrom<T>()
        {
            List<object> objs = new List<object>();
            Type type = typeof(T);
            foreach (object value in Enum.GetValues(type))
            {
                objs.Add(new { Name = Enum.GetName(type, value), Value = value });
            }
            return objs;
        }

        public static T MapField<T>(this object value)
        {
            if (value.GetType() == typeof(T))
            {
                return (T)value;
            }
            if (value == DBNull.Value)
            {
                return default(T);
            }
            Type underlyingType = Nullable.GetUnderlyingType(typeof(T));
            if (underlyingType.IsNull())
            {
                underlyingType = typeof(T);
            }
            return (T)Convert.ChangeType(value, underlyingType);
        }

        public static object MapField(this object value, Type type)
        {
            if (value.GetType() == type)
            {
                return value;
            }
            if (value == DBNull.Value)
            {
                return null;
            }
            if (type.IsEnum)
            {
                if (value is string)
                    return Enum.Parse(type, value as string);
                else
                    return Enum.ToObject(type, value);
            }
            if (!type.IsInterface && type.IsGenericType)
            {
                Type innerType = type.GetGenericArguments()[0];
                object innerValue = Convert.ChangeType(value, innerType);
                return Activator.CreateInstance(type, new object[] { innerValue });
            }
            if (value is string && type == typeof(Guid)) return new Guid(value as string);
            if (value is string && type == typeof(Version)) return new Version(value as string);
            if (!(value is IConvertible)) return value.ToString();
            Type underlyingType = Nullable.GetUnderlyingType(type);
            if (underlyingType.IsNull())
            {
                underlyingType = type;
            }
            return Convert.ChangeType(value, underlyingType);
        }

        public static DateTime MapTimeField(this object value)
        {
            DateTime minValue;
            if (value != DBNull.Value)
            {
                minValue = DateTime.MinValue;
                return minValue.Add((TimeSpan)value);
            }
            if (!value.IsNullable<object>())
            {
                throw new NullReferenceException();
            }
            minValue = new DateTime();
            return minValue;
        }

        public static DateTime? MapTimeNullableField(this object value)
        {
            if (value != DBNull.Value)
            {
                return new DateTime?(DateTime.MinValue.Add((TimeSpan)value));
            }
            if (!value.IsNullable<object>())
            {
                throw new NullReferenceException();
            }
            return null;
        }

        public static bool NotEquals<T>(this T val, T compVal)
        {
            return !ExtensionMethods.Compare<T>(val, compVal);
        }

        public static IEnumerable<BaseModel>[] Reverse(this IEnumerable<BaseModel>[] list)
        {
            IEnumerable<BaseModel>[] enumerableArrays = new IEnumerable<BaseModel>[(int)list.Length];
            int num = 0;
            for (int i = (int)list.Length; i >= 1; i--)
            {
                enumerableArrays[num] = list[i - 1];
                num++;
            }
            return enumerableArrays;
        }

        public static void Sort<T, TU>(this List<T> list, Func<T, TU> expression, IComparer<TU> comparer)
        where TU : IComparable<TU>
        {
            list.Sort((T x, T y) => comparer.Compare(expression(x), expression(y)));
        }

        public static string StringValue(this DateTime dateTime)
        {
            if (dateTime.Equals(DateTime.MinValue))
            {
                return string.Empty;
            }
            return dateTime.ToShortDateString();
        }

        public static string StringValue(this DateTime? dateTime)
        {
            if (!dateTime.HasValue)
            {
                return string.Empty;
            }
            return Convert.ToDateTime(dateTime).ToShortDateString();
        }

        public static object Value(this object value)
        {
            object obj = value;
            if (obj == null)
            {
                obj = DBNull.Value;
            }
            return obj;
        }

        public static object Value(this DateTime dateTime, string format = "dd-MMM-yyyy")
        {
            if (dateTime.Equals(DateTime.MinValue))
            {
                return DBNull.Value;
            }
            return dateTime.ToString(format);
        }

        public static object Value(this DateTime? dateTime, string format = "dd-MMM-yyyy")
        {
            if (!dateTime.HasValue || dateTime.Equals(DateTime.MinValue))
            {
                return DBNull.Value;
            }
            return Convert.ToDateTime(dateTime).ToString(format);
        }
    }
}
