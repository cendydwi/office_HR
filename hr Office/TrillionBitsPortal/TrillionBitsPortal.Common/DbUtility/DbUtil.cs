using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Common
{
    public static class DbUtil
    {
        public static DataSet DataReaderToDataSet(IDataReader reader)
        {
            DataSet dataSet = new DataSet();
            do
            {
                int fieldCount = reader.FieldCount;
                DataTable dataTable = new DataTable();
                for (int i = 0; i < fieldCount; i++)
                {
                    dataTable.Columns.Add(reader.GetName(i), reader.GetFieldType(i));
                }
                dataTable.BeginLoadData();
                object[] objArray = new object[fieldCount];
                while (reader.Read())
                {
                    reader.GetValues(objArray);
                    dataTable.LoadDataRow(objArray, true);
                }
                dataTable.EndLoadData();
                dataSet.Tables.Add(dataTable);
            }
            while (reader.NextResult());
            reader.Close();
            return dataSet;
        }

        public static DataTable DataReaderToDataTable(IDataReader reader)
        {
            DataTable dataTable = new DataTable();
            do
            {
                int fieldCount = reader.FieldCount;
                for (int i = 0; i < fieldCount; i++)
                {
                    dataTable.Columns.Add(reader.GetName(i), reader.GetFieldType(i));
                }
                dataTable.BeginLoadData();
                object[] objArray = new object[fieldCount];
                while (reader.Read())
                {
                    reader.GetValues(objArray);
                    dataTable.LoadDataRow(objArray, true);
                }
                dataTable.EndLoadData();
            }
            while (reader.NextResult());
            reader.Close();
            return dataTable;
        }

        public delegate T OverrideModel<out T>(Dictionary<string, object> fields);
    }
}
