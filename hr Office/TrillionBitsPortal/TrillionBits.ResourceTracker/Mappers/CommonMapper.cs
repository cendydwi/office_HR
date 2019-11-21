using TrillionBitsPortal.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Common;
using System.Diagnostics;

namespace TrillionBitsPortal.ResourceTracker.Mappers
{
    public class CommonMapper
    {
             public List<RowsCount> ToPostDetailCountModel(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<RowsCount>();

            while (readers.Read())
            {
                var model = new RowsCount
                {
                    Rows = Convert.ToInt32(readers["CountRows"]),
                };

                models.Add(model);
            }

            return models;
        }

        public List<StringReturnModel> ToStringReturnModel(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<StringReturnModel>();

            while (readers.Read())
            {
                var model = new StringReturnModel
                {
                    Value = Convert.ToString(readers["Name"]),
                };

                models.Add(model);
            }

            return models;
        }

        public List<Dictionary<string, object>> ModelDataCollection(DbDataReader readers)
        {
            if (readers == null)
                return null;
            List<Dictionary<string, object>> dictionaries = new List<Dictionary<string, object>>();
            List<string> strs = new List<string>();
            for (int i = 0; i < readers.FieldCount; i++)
            {
                strs.Add(readers.GetName(i));
            }
            while (readers.Read())
            {
                dictionaries.Add(GetFields(strs, readers));
            }
            return dictionaries;
        }

        [DebuggerStepThrough]
        public List<T> LoadModelCollection<T>(string cmdText, params object[] parameters)
        where T : class
        {
            return LoadModelCollection<T>(cmdText, CommandType.Text, parameters);
        }

        [DebuggerStepThrough]
        public List<T> LoadModelCollection<T>(string cmdText, CommandType cmdType, params object[] parameters)
where T : class
        {
            return this.LoadModelCollection<T>(null, cmdText, cmdType, parameters);
        }

        [DebuggerStepThrough]
        public List<T> LoadModelCollection<T>(DbUtil.OverrideModel<T> mapFunc, string cmdText, params object[] parameters)
       where T : class
        {
            return LoadModelCollection<T>(mapFunc, cmdText, CommandType.Text, parameters);
        }

        //[DebuggerStepThrough]
        //public List<T> LoadModelCollection<T>(DbUtil.OverrideModel<T> mapFunc, string cmdText, CommandType cmdType, params object[] parameters)
        //where T : class
        //{
        //    List<T> ts;
        //    IDataReader dataReader = null;
        //    try
        //    {
        //        dataReader = base.ExecuteReader(cmdText, cmdType, parameters);
        //        ts = this.LoadModelCollection<T>(dataReader, mapFunc);
        //    }
        //    catch (Exception exception)
        //    {
        //        throw exception;
        //    }
        //    finally
        //    {
        //        dataReader.CloseReader();
        //    }
        //    return ts;
        //}

        [DebuggerStepThrough]
        public List<T> LoadModelCollection<T>(IDataReader reader)
        where T : class
        {
            return this.LoadModelCollection<T>(reader, null);
        }

        [DebuggerStepThrough]
        public List<T> LoadModelCollection<T>(IDataReader reader, DbUtil.OverrideModel<T> mapFunc)
        where T : class
        {
            if (!typeof(T).IsBaseModel())
            {
                throw new Exception("Item must be inherited from BaseModel class.");
            }
            List<T> ts = new List<T>();
            while (reader.Read())
            {
                Dictionary<string, object> fields = GetFields(reader);
                ts.Add((mapFunc.IsNotNull() ? mapFunc(fields) : CreateModel<T>(fields)));
            }
            return ts;
        }

        private static T CreateModel<T>(Dictionary<string, object> fields)
        {
            T t = Activator.CreateInstance<T>();
            PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(t);
            foreach (KeyValuePair<string, object> field in fields)
            {
                PropertyDescriptor propertyDescriptor = properties.Find(field.Key, true);
                if (propertyDescriptor.IsNull())
                {
                    continue;
                }
                object obj = field.Value.MapField(propertyDescriptor.PropertyType);
                propertyDescriptor.SetValue(t, obj);
            }
            PropertyDescriptor propertyDescriptor1 = properties.Find("State", true);
            if (propertyDescriptor1.IsNotNull())
            {
                propertyDescriptor1.SetValue(t, ModelState.Unchanged);
            }
            return t;
        }

        private static Dictionary<string, object> GetFields(IDataRecord reader)
        {
            int fieldCount = reader.FieldCount;
            Dictionary<string, object> strs = new Dictionary<string, object>(fieldCount);
            for (int i = 0; i < fieldCount; i++)
            {
                string name = reader.GetName(i);
                int ordinal = reader.GetOrdinal(name);
                strs[name] = reader.GetValue(ordinal);
            }
            return strs;
        }

        private static Dictionary<string, object> GetFields(IEnumerable<string> cols, IDataRecord reader)
        {
            DateTime dateTime;
            Dictionary<string, object> strs = new Dictionary<string, object>();
            foreach (string col in cols)
            {
                int ordinal = reader.GetOrdinal(col);
                string dataTypeName = reader.GetDataTypeName(ordinal);
                object value = reader.GetValue(ordinal);
                if (value.IsNullOrDbNull())
                {
                    strs[col] = value;
                }
                else if (dataTypeName == "bigint")
                {
                    strs[col] = value.ToString();
                }
                else if (dataTypeName == "date")
                {
                    dateTime = (DateTime)value;
                    strs[col] = dateTime.ToString(Util.ConvertedDateFormat);
                }
                else if (dataTypeName == "datetime")
                {
                    dateTime = (DateTime)value;
                    strs[col] = dateTime.ToString(string.Concat(Util.ConvertedDateFormat, " hh:mm:ss tt"));
                }
                else if (dataTypeName == "time")
                {
                    dateTime = DateTime.MinValue.Add((TimeSpan)value);
                    strs[col] = dateTime.ToString("hh:mm tt");
                }
                else
                {
                    strs[col] = value;
                }
            }
            return strs;
        }
    }
}