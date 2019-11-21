using TrillionBitsPortal.Common;
using TrillionBitsPortal.Common.Models;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using TrillionBits.DataAccess.Common;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Mappers;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.DataAccess
{
    public class EmployeeLeaveDataAccess : BaseDatabaseHandler, IEmployeeLeave
    {
        public EmployeeLeaveDataAccess() { }

        public List<EmployeeLeaveModel> GetLeaveByCompanyId(string companyId)
        {
            string err = string.Empty;
            string sql = @"SELECT la.* ,uc.FullName as EmployeeName,AP.FullName ApprovedBy from ResourceTracker_LeaveApplication as la
                            Left JOIN ResourceTracker_EmployeeUser eu on eu.id= la.EmployeeId
                            Left JOIN UserCredentials uc on uc.id= eu.UserId
                            LEFT JOIN UserCredentials AP ON LA.ApprovedById=AP.Id
                            where la.CompanyId='" + companyId + "' order by la.Id desc";
            var results = ExecuteDBQuery(sql, null, EmployeeLeaveMapper.ToEmployeeLeaveMapperModel);
            return results.Any() ? results : null;
        }

        public List<EmployeeLeaveModel> GetUserLeaves(string userId)
        {
            string err = string.Empty;
            string sql = @"SELECT la.* ,uc.FullName as EmployeeName,AP.FullName ApprovedBy from ResourceTracker_LeaveApplication as la
                            Left JOIN ResourceTracker_EmployeeUser eu on eu.id= la.EmployeeId
                            Left JOIN UserCredentials uc on uc.id= eu.UserId
                            LEFT JOIN UserCredentials AP ON LA.ApprovedById=AP.Id
                            where  eu.UserId ='" + userId + "'  order by la.Id desc";
            var results = ExecuteDBQuery(sql, null, EmployeeLeaveMapper.ToEmployeeLeaveMapperModel);
            return results.Any() ? results : null;
        }

        public ResponseModel CreateEmployeeLeave(EmployeeLeaveModel model)
        {
            var errMessage = string.Empty;
            Database db = GetSQLDatabase();
            var returnId = -1;
            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();
                DbTransaction trans = conn.BeginTransaction();
                try
                {
                    returnId = SaveEmployeeLeave(model, db, trans);
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    errMessage = ex.Message;
                }
            }
            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage), Message = errMessage };
        }

        public int SaveEmployeeLeave(EmployeeLeaveModel model, Database db, DbTransaction trans)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                    {
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CompanyId", ParamValue = model.CompanyId,DBType = DbType.Int32},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@userId", ParamValue = model.UserId},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@FromDate", ParamValue = model.FromDate.ToString(Constants.ServerDateTimeFormat), DBType=DbType.DateTime},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ToDate", ParamValue = model.ToDate.ToString(Constants.ServerDateTimeFormat), DBType=DbType.DateTime},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@IsHalfDay", ParamValue =model.IsHalfDay, DBType=DbType.Boolean},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@LeaveTypeId", ParamValue =model.LeaveTypeId, DBType = DbType.Int32},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@LeaveReason", ParamValue = model.LeaveReason},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreatedAt", ParamValue =  Convert.ToDateTime(model.CreatedAt),DBType = DbType.DateTime},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@IsApproved", ParamValue = model.IsApproved, DBType=DbType.Boolean},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@IsRejected", ParamValue =model.IsRejected, DBType=DbType.Boolean},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@RejectReason", ParamValue =model.RejectReason},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ApprovedById", ParamValue =model.ApprovedById},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ApprovedAt", ParamValue =model.ApprovedAt, DBType = DbType.DateTime},
                    };
            const string sql = @"
                            DECLARE @employeeId INT
                            SELECT TOP 1 @employeeId=U.Id FROM ResourceTracker_EmployeeUser U WHERE U.UserId=@userId
                            INSERT INTO ResourceTracker_LeaveApplication (CompanyId ,EmployeeId ,FromDate ,ToDate ,IsHalfDay,LeaveTypeId ,LeaveReason,CreatedAt,IsApproved,IsRejected,RejectReason,ApprovedById,ApprovedAt) 
                            VALUES (@CompanyId ,@employeeId ,@FromDate ,@ToDate ,@IsHalfDay,@LeaveTypeId ,@LeaveReason,@CreatedAt,@IsApproved,@IsRejected,@RejectReason,@ApprovedById,@ApprovedAt)";
            return DBExecCommandExTran(sql, queryParamList, trans, db, ref errMessage);
        }

       

        public List<EmployeeLeaveModel> GetLeaveById(int id)
        {
            string err = string.Empty;
            string sql = @"SELECT la.* ,uc.FullName as EmployeeName,AP.FullName ApprovedBy from ResourceTracker_LeaveApplication as la
                            Left JOIN ResourceTracker_EmployeeUser eu on eu.id= la.EmployeeId
                            Left JOIN UserCredentials uc on uc.id= eu.UserId
                            LEFT JOIN UserCredentials AP ON LA.ApprovedById=AP.Id
                            where la.Id ='" + id + "'";
            var results = ExecuteDBQuery(sql, null, EmployeeLeaveMapper.ToEmployeeLeaveMapperModel);
            return results.Any() ? results : null;
        }

        public ResponseModel Approved(int id,string userId)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue =id},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ApprovedById", ParamValue =userId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ApprovedAt", ParamValue =DateTime.UtcNow,DBType=DbType.DateTime},
                };

            const string sql = @"UPDATE ResourceTracker_LeaveApplication SET IsApproved=1,ApprovedById=@ApprovedById,ApprovedAt=@ApprovedAt WHERE Id=@Id";
            DBExecCommandEx(sql, queryParamList, ref errMessage);
            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public ResponseModel Rejected(int id)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue =id},
                };

            const string sql = @"UPDATE ResourceTracker_LeaveApplication SET IsRejected=1 WHERE Id=@Id";
            DBExecCommandEx(sql, queryParamList, ref errMessage);
            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }
    }
}