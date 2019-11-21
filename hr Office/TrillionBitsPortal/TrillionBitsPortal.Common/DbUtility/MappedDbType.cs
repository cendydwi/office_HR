using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Common
{
    public static class MappedDbType
    {
        private static Dictionary<Type, DbType> typeMap;

        public static DbType GetDbType(Type appType)
        {
            if (MappedDbType.typeMap.IsNull())
            {
                MappedDbType.InitializeDbType();
            }
            DbType item = MappedDbType.typeMap[appType];
            if (!item.IsNull())
            {
                return item;
            }
            return DbType.AnsiString;
        }

        private static void InitializeDbType()
        {
            Dictionary<Type, DbType> types = new Dictionary<Type, DbType>();
            types[typeof(DBNull)] = DbType.AnsiString;
            types[typeof(byte)] = DbType.Byte;
            types[typeof(sbyte)] = DbType.SByte;
            types[typeof(short)] = DbType.Int16;
            types[typeof(ushort)] = DbType.UInt16;
            types[typeof(int)] = DbType.Int32;
            types[typeof(uint)] = DbType.UInt32;
            types[typeof(long)] = DbType.Int64;
            types[typeof(ulong)] = DbType.UInt64;
            types[typeof(float)] = DbType.Single;
            types[typeof(double)] = DbType.Double;
            types[typeof(decimal)] = DbType.Decimal;
            types[typeof(bool)] = DbType.Boolean;
            types[typeof(string)] = DbType.AnsiString;
            types[typeof(char)] = DbType.StringFixedLength;
            types[typeof(Guid)] = DbType.Guid;
            types[typeof(DateTime)] = DbType.DateTime;
            types[typeof(DateTimeOffset)] = DbType.DateTimeOffset;
            types[typeof(byte[])] = DbType.Binary;
            types[typeof(byte?)] = DbType.Byte;
            types[typeof(sbyte?)] = DbType.SByte;
            types[typeof(short?)] = DbType.Int16;
            types[typeof(ushort?)] = DbType.UInt16;
            types[typeof(int?)] = DbType.Int32;
            types[typeof(uint?)] = DbType.UInt32;
            types[typeof(long?)] = DbType.Int64;
            types[typeof(ulong?)] = DbType.UInt64;
            types[typeof(float?)] = DbType.Single;
            types[typeof(double?)] = DbType.Double;
            types[typeof(decimal?)] = DbType.Decimal;
            types[typeof(bool?)] = DbType.Boolean;
            types[typeof(char?)] = DbType.StringFixedLength;
            types[typeof(Guid?)] = DbType.Guid;
            types[typeof(DateTime?)] = DbType.DateTime;
            types[typeof(DateTimeOffset?)] = DbType.DateTimeOffset;
            MappedDbType.typeMap = types;
        }
    }
}
