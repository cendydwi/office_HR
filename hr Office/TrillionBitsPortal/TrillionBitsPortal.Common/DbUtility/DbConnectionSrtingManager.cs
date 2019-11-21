using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Common
{
    public class DbConnectionSrtingManager
    {
        private static string dbName;

        private static string dbServer;

        private static string dbUser;

        private static string dbPassword;

        private static int conTimeout;

        static DbConnectionSrtingManager()
        {
            DbConnectionSrtingManager.conTimeout = 15;
        }

        public DbConnectionSrtingManager()
        {
        }

        public static string GetCompanyGroupId()
        {
            string str;
            try
            {
                str = (new AppSettingsReader()).GetValue("CGID", typeof(string)).ToString();
            }
            catch
            {
                throw new CustomException(Resources.CompanyGroupName, null);
            }
            return str;
        }

        private static string GetCompanyGroupName()
        {
            string str;
            try
            {
                str = (new AppSettingsReader()).GetValue("CGNAME", typeof(string)).ToString();
            }
            catch
            {
                throw new CustomException(Resources.CompanyGroupName, null);
            }
            return str;
        }

        private static string GetDb()
        {
            string str;
            try
            {
                str = (new AppSettingsReader()).GetValue("DBNAME", typeof(string)).ToString();
            }
            catch
            {
                throw new CustomException(Resources.DbName, null);
            }
            return str;
        }

        public static string GetDbConnectionString()
        {
            string str;
            //DbConnectionSrtingManager.GetCompanyGroupName();
            try
            {
                if (string.IsNullOrEmpty(DbConnectionSrtingManager.dbUser))
                {
                    DbConnectionSrtingManager.dbName = DbConnectionSrtingManager.GetDb();
                    DbConnectionSrtingManager.dbServer = DbConnectionSrtingManager.GetDbServer();
                    DbConnectionSrtingManager.dbUser = DbConnectionSrtingManager.GetDbUser();
                    DbConnectionSrtingManager.dbPassword = DbConnectionSrtingManager.GetDbPwd();
                    DbConnectionSrtingManager.conTimeout = DbConnectionSrtingManager.GetDbConTimeout();
                }
                str = string.Format("Data Source='{0}'; Initial Catalog='{1}'; User ID='{2}';Password='{3}';Trusted_Connection=False;Connect Timeout={4}; MultipleActiveResultSets=True;", new object[] { DbConnectionSrtingManager.dbServer, DbConnectionSrtingManager.dbName, DbConnectionSrtingManager.dbUser, DbConnectionSrtingManager.dbPassword, DbConnectionSrtingManager.conTimeout });
            }
            catch (Exception exception)
            {
                throw new CustomException(string.Concat("Database configuration fail! ", exception), null);
            }
            return str;
        }

        private static int GetDbConTimeout()
        {
            int num;
            try
            {
                num = Convert.ToInt16((new AppSettingsReader()).GetValue("DBCONTIMEOUT", typeof(string)));
            }
            catch
            {
                num = DbConnectionSrtingManager.conTimeout;
            }
            return num;
        }

        private static string GetDbPwd()
        {
            string str;
            try
            {
                str = (new AppSettingsReader()).GetValue("DBUSERPWD", typeof(string)).ToString();
            }
            catch
            {
                throw new CustomException(Resources.DbPwd, null);
            }
            return str;
        }

        private static string GetDbServer()
        {
            string str;
            try
            {
                str = (new AppSettingsReader()).GetValue("DBSERVER", typeof(string)).ToString();
            }
            catch
            {
                throw new CustomException(Resources.DbServerName, null);
            }
            return str;
        }

        private static void GetDbSettings(string key)
        {
            RegistryKey registryKey = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry64).OpenSubKey(string.Concat("SOFTWARE\\Wow6432Node\\DBDATA\\", key), true) ?? RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry32).OpenSubKey(string.Concat("SOFTWARE\\Wow6432Node\\DBDATA\\", key), true);
            DbConnectionSrtingManager.dbServer = registryKey.GetValue("DBServer").ToString();
            DbConnectionSrtingManager.dbUser = registryKey.GetValue("DBUser").ToString();
            DbConnectionSrtingManager.dbPassword = registryKey.GetValue("DBPassword").ToString();
            DbConnectionSrtingManager.dbName = registryKey.GetValue("DBName").ToString();
            registryKey.Close();
        }

        private static string GetDbUser()
        {
            string str;
            try
            {
                str = (new AppSettingsReader()).GetValue("DBUSERID", typeof(string)).ToString();
            }
            catch
            {
                throw new CustomException(Resources.DbUserName, null);
            }
            return str;
        }
    }
}
