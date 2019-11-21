using TrillionBitsPortal.Common;
using TrillionBitsPortal.Common.Models;
using System;
using System.Collections.Generic;
using System.Data;
using TrillionBits.DataAccess.Common;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Mappers;
using TrillionBitsPortal.ResourceTracker.Models;
using System.Linq;

namespace TrillionBitsPortal.ResourceTracker.DataAccess
{
    public class AttendanceDataAccess : BaseDatabaseHandler, IAttendance
    {
        public ResponseModel CheckIn(AttendanceEntryModel model)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@UserId", ParamValue =model.UserId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CompanyId", ParamValue = model.CompanyId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@AttendanceDate", ParamValue =DateTime.UtcNow,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CheckInTime", ParamValue = DateTime.UtcNow,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@DailyWorkingTimeInMin", ParamValue = model.OfficeHour,DBType=DbType.Int32},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@AllowOfficeLessTime", ParamValue = model.AllowOfficeLessTime,DBType=DbType.Int32},
                };

            const string sql = @"IF NOT EXISTS(SELECT * FROM ResourceTracker_Attendance A WHERE A.UserId=@UserId AND CONVERT(DATE,AttendanceDate)=CONVERT(DATE,@AttendanceDate))
                                BEGIN
                                INSERT INTO ResourceTracker_Attendance(UserId,CompanyId,AttendanceDate,CheckInTime,DailyWorkingTimeInMin,AllowOfficeLessTime)
				                                            VALUES(@UserId,@CompanyId,@AttendanceDate,@CheckInTime,@DailyWorkingTimeInMin,@AllowOfficeLessTime)
                                END";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public ResponseModel AddAttendanceAsLeave(AttendanceEntryModel model)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@UserId", ParamValue =model.UserId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CompanyId", ParamValue = model.CompanyId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@AttendanceDate", ParamValue =DateTime.UtcNow,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@IsLeave", ParamValue =true,DBType=DbType.Boolean}
                };

            const string sql = @"IF NOT EXISTS(SELECT * FROM ResourceTracker_Attendance A WHERE A.UserId=@UserId AND CONVERT(DATE,AttendanceDate)=CONVERT(DATE,@AttendanceDate))
                                BEGIN
                                INSERT INTO ResourceTracker_Attendance(UserId,CompanyId,AttendanceDate,IsLeave)
				                    VALUES(@UserId,@CompanyId,@AttendanceDate,@IsLeave)
                                END";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public ResponseModel CheckOut(AttendanceEntryModel model)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@UserId", ParamValue =model.UserId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@LessTimeReason", ParamValue =model.Reason},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CheckOutTime", ParamValue = DateTime.UtcNow,DBType=DbType.DateTime}
                };

            const string sql = @"DECLARE @id bigint
                                SELECT TOP 1 @id=Id FROM ResourceTracker_Attendance WHERE UserId=@UserId AND CheckOutTime IS NULL ORDER BY Id DESC
                                UPDATE ResourceTracker_Attendance SET CheckOutTime=@CheckOutTime,LessTimeReason=@LessTimeReason WHERE Id=@id";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public ResponseModel SaveCheckPoint(UserMovementLogModel model)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue =Guid.NewGuid().ToString()},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@UserId", ParamValue =model.UserId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@LogDateTime", ParamValue =DateTime.UtcNow,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Latitude", ParamValue =model.Latitude},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Longitude", ParamValue =model.Longitude},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@LogLocation", ParamValue =model.LogLocation},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@IsCheckInPoint", ParamValue =model.IsCheckInPoint},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@IsCheckOutPoint", ParamValue =model.IsCheckOutPoint},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@DeviceName", ParamValue =model.DeviceName},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@DeviceOSVersion", ParamValue =model.DeviceOSVersion},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CompanyId", ParamValue =model.CompanyId}
                };

            const string sql = @"INSERT INTO ResourceTracker_UserMovementLog(Id,UserId,LogDateTime,Latitude,Longitude,LogLocation,IsCheckInPoint,
                                    IsCheckOutPoint,DeviceName,DeviceOSVersion,CompanyId)
				                 VALUES(@Id,@UserId,@LogDateTime,@Latitude,@Longitude,@LogLocation,@IsCheckInPoint,
                                    @IsCheckOutPoint,@DeviceName,@DeviceOSVersion,@CompanyId)";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public List<AttendanceModel> GetAttendanceFeed(int companyId, DateTime date)
        {
            const string sql = @"
                                SELECT c.Id,t.UserId,t.AttendanceDate,t.CheckInTime,t.CheckOutTime,t.AllowOfficeLessTime,T.IsLeave,
                                t.LessTimeReason,t.DailyWorkingTimeInMin,t.CompanyId,C.Id EmployeeId
                                ,C.UserName EmployeeName,C.Designation,d.DepartmentName,c.ImageFileName,c.PhoneNumber, null TotalHours, null TotalMinutes 
                                FROM ResourceTracker_Attendance t
                                LEFT JOIN ResourceTracker_EmployeeUser C ON T.UserId=C.UserId 
                                LEFT JOIN UserCredentials CR ON C.UserId=CR.Id
                                left join ResourceTracker_Department d on c.DepartmentId=d.Id
                                where t.CompanyId=@companyId and convert(date,t.AttendanceDate)=convert(date,@date)

                                UNION ALL

                                SELECT t.Id,t.UserId,@date AttendanceDate,NULL CheckInTime,NULL CheckOutTime,NULL AllowOfficeLessTime,NULL IsLeave,
                                NULL LessTimeReason,NULL DailyWorkingTimeInMin,t.CompanyId,t.Id EmployeeId
                                ,t.UserName EmployeeName,t.Designation,d.DepartmentName,t.ImageFileName,t.PhoneNumber, null TotalHours, null TotalMinutes 
                                FROM ResourceTracker_EmployeeUser t
                                LEFT JOIN UserCredentials CR ON T.UserId=CR.Id
                                left join ResourceTracker_Department d on t.DepartmentId=d.Id
                                where t.CompanyId=@companyId  AND t.UserId NOT in (
                                SELECT T.UserId FROM ResourceTracker_Attendance t
                                where t.CompanyId=@companyId and convert(date,t.AttendanceDate)=convert(date,@date)
                                )";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@companyId", ParamValue = companyId,DBType=DbType.Int32},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@date", ParamValue = date,DBType=DbType.DateTime}
                };
            var data = ExecuteDBQuery(sql, queryParamList, AttendanceMapper.ToAttendance);
            return data;
        }

        public List<AttendanceModel> GetAttendance(int companyId, DateTime startDate, DateTime endDate)
        {
            const string sql = @"
                                SELECT c.Id,t.UserId,t.AttendanceDate,t.CheckInTime,t.CheckOutTime,t.AllowOfficeLessTime,T.IsLeave,
                                t.LessTimeReason,t.DailyWorkingTimeInMin,t.CompanyId,C.Id EmployeeId
                                ,C.UserName EmployeeName,C.Designation,d.DepartmentName,c.ImageFileName,c.PhoneNumber, null TotalHours, null TotalMinutes 
                                FROM ResourceTracker_Attendance t
                                LEFT JOIN ResourceTracker_EmployeeUser C ON T.UserId=C.UserId 
                                LEFT JOIN UserCredentials CR ON C.UserId=CR.Id
                                left join ResourceTracker_Department d on c.DepartmentId=d.Id
                                where t.CompanyId=@companyId and (CONVERT(DATE,AttendanceDate) BETWEEN convert(date,@startDate) AND convert(date,@endDate))";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@companyId", ParamValue = companyId,DBType=DbType.Int32},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@startDate", ParamValue = startDate,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@endDate", ParamValue = endDate,DBType=DbType.DateTime}
                };
            var data = ExecuteDBQuery(sql, queryParamList, AttendanceMapper.ToAttendance);
            return data;
        }

        public List<AttendanceModel> GetAttendance(string userId, int companyId, DateTime startDate, DateTime endDate)
        {
            const string sql = @"
                                SELECT c.Id,t.UserId,t.AttendanceDate,t.CheckInTime,t.CheckOutTime,t.AllowOfficeLessTime,T.IsLeave,
                                t.LessTimeReason,t.DailyWorkingTimeInMin,t.CompanyId,C.Id EmployeeId
                                ,C.UserName EmployeeName,C.Designation,d.DepartmentName,c.ImageFileName,c.PhoneNumber, null TotalHours, null TotalMinutes 
                                FROM ResourceTracker_Attendance t
                                LEFT JOIN ResourceTracker_EmployeeUser C ON T.UserId=C.UserId 
                                LEFT JOIN UserCredentials CR ON C.UserId=CR.Id
                                left join ResourceTracker_Department d on c.DepartmentId=d.Id
                                where t.CompanyId=@companyId AND T.UserId=@userId and (CONVERT(DATE,AttendanceDate) BETWEEN convert(date,@startDate) AND convert(date,@endDate))";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@userId", ParamValue = userId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@companyId", ParamValue = companyId,DBType=DbType.Int32},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@startDate", ParamValue = startDate,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@endDate", ParamValue = endDate,DBType=DbType.DateTime}
                };
            var data = ExecuteDBQuery(sql, queryParamList, AttendanceMapper.ToAttendance);
            return data;
        }

        public AttendanceModel GetMyTodayAttendance(string userId, DateTime date)
        {
            const string sql = @"IF EXISTS(SELECT TOP 1 * FROM ResourceTracker_Attendance A WHERE A.UserId=@userId and convert(date,A.AttendanceDate)=convert(date,@date))
                                BEGIN
	                                SELECT T.Id,t.UserId,t.AttendanceDate,t.CheckInTime,t.CheckOutTime,t.AllowOfficeLessTime,T.IsLeave,
	                                t.LessTimeReason,t. DailyWorkingTimeInMin,t.CompanyId,C.Id EmployeeId
	                                ,C.UserName EmployeeName,c.Designation,d.DepartmentName,c.ImageFileName,c.PhoneNumber, null TotalHours, null TotalMinutes FROM ResourceTracker_Attendance t
	                                LEFT JOIN ResourceTracker_EmployeeUser C ON T.UserId=C.UserId 
	                                LEFT JOIN UserCredentials CR ON C.UserId=CR.Id
	                                left join ResourceTracker_Department d on c.DepartmentId=d.Id
	                                where t.UserId=@userId and convert(date,t.AttendanceDate)=convert(date,@date)
                                END
                                ELSE
                                BEGIN
                                  SELECT T.Id,t.UserId,@date AttendanceDate,NULL CheckInTime,NULL CheckOutTime,NULL AllowOfficeLessTime,NULL IsLeave,
                                    NULL LessTimeReason,NULL DailyWorkingTimeInMin,t.CompanyId,t.Id EmployeeId
                                    ,t.UserName EmployeeName,t.Designation,d.DepartmentName,t.ImageFileName,t.PhoneNumber, null TotalHours, null TotalMinutes
                                    FROM ResourceTracker_EmployeeUser t
                                    LEFT JOIN UserCredentials CR ON T.UserId=CR.Id
                                    left join ResourceTracker_Department d on t.DepartmentId=d.Id
                                    where t.UserId=@userId
                                END";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@userId", ParamValue = userId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@date", ParamValue = date,DBType=DbType.DateTime}
                };
            var data = ExecuteDBQuery(sql, queryParamList, AttendanceMapper.ToAttendance);
            return (data != null && data.Count > 0) ? data.FirstOrDefault() : null;
        }

        public List<UserMovementLogModel> GetMovementDetails(string userId, DateTime date)
        {
            const string sql = @"SELECT T.* FROM ResourceTracker_UserMovementLog t
                                where t.UserId=@userId and convert(date,t.LogDateTime)=convert(date,@date)";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@userId", ParamValue = userId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@date", ParamValue = date,DBType=DbType.DateTime}
                };
            var data = ExecuteDBQuery(sql, queryParamList, AttendanceMapper.ToMovementLog);
            return data;
        }
       
    }
}
