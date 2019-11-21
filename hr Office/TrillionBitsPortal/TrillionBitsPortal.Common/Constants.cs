
using System;
using System.ComponentModel;

namespace TrillionBitsPortal.Common
{
    public class Constants
    {
        public const string ConnectionStringName = "IsahakCon";
        public static string CurrentUser = "A5151013-DF9F-4234-B0BA-7556A035011D";
        public const string DateFormat = "dd/MM/yyyy";
        public const string TimeFormat = "hh:mm tt";
        public const string DateTimeFormat = "dd/MM/yyyy hh:mm:ss tt";
        public const string DateSeparator = "/";
        public const string ServerDateTimeFormat = "yyyy-MM-dd HH:mm:ss";
        public const string DateLongFormat = "dd-MMM-yyyy";
        public const string DateTimeLongFormat = "dd-MMM-yyyy hh:mm";

        public const string AzureBlobConnectionName = "AzureBlogConnection";
        public const string AzureBlobRootPath = "https://medilifesolutions.blob.core.windows.net/";
        public const string AzureBlobStorageHttpFilePath = "http://medilifesolutions.blob.core.windows.net";

    }

    public static class DateTimeConverter
    {
        public static DateTime ToZoneTimeBD(this DateTime t)
        {
            string bnTimeZoneKey = "Bangladesh Standard Time";
            TimeZoneInfo bdTimeZone = TimeZoneInfo.FindSystemTimeZoneById(bnTimeZoneKey);
            return TimeZoneInfo.ConvertTimeFromUtc((t), bdTimeZone);

        }
    }
    
    public enum AzureStorageContainerType
    {
        resourcetracker
    }
   
    public enum UserType
    {
        ResourceTrackerAdmin=6,
        ResourceTrackerUser=7
    }
   
}
