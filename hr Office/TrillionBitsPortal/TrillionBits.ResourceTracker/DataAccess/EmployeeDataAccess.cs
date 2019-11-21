using TrillionBitsPortal.Common;
using TrillionBitsPortal.Common.Models;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using TrillionBits.DataAccess.Common;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Mappers;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.DataAccess
{
    public class EmployeeDataAccess : BaseDatabaseHandler, IEmployee
    {
      
        public EmployeeUser GetEmployeeById(int id)
        {
            string err = string.Empty;
            string sql = @"SELECT E.*,D.DepartmentName from ResourceTracker_EmployeeUser e
                            LEFT JOIN ResourceTracker_Department D ON E.DepartmentId=D.Id where E.Id=@id";
            var queryParamList = new QueryParamList
                    {
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@id", ParamValue =id},
                    };
            var results = ExecuteDBQuery(sql, queryParamList, EmployeeMapper.ToEmployeeModel);
            return results.Any() ? results.FirstOrDefault() : null;
        }

        public List<EmployeeUser> GetEmployeeByCompanyId(int companyId)
        {
            string err = string.Empty;
            string sql = @"SELECT E.*,D.DepartmentName from ResourceTracker_EmployeeUser e
                            LEFT JOIN ResourceTracker_Department D ON E.DepartmentId=D.Id where E.CompanyId=@companyId";
            var queryParamList = new QueryParamList
                    {
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@companyId", ParamValue =companyId},
                    };
            var results = ExecuteDBQuery(sql, queryParamList, EmployeeMapper.ToEmployeeModel);
            return results;
        }

        public EmployeeUser GetByPortalUserId(string userId)
        {
            string err = string.Empty;
            string sql = @"SELECT E.*,D.DepartmentName from ResourceTracker_EmployeeUser e
                            LEFT JOIN ResourceTracker_Department D ON E.DepartmentId=D.Id where E.UserId=@userId";
            var queryParamList = new QueryParamList
                    {
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@userId", ParamValue =userId},
                    };
            var data = ExecuteDBQuery(sql, queryParamList, EmployeeMapper.ToEmployeeModel);
            return (data!=null && data.Count>0)?data.FirstOrDefault():null;
        }

        public EmployeeUser Create(EmployeeUser model)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                    {
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@UserName", ParamValue =model.UserName},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Designation", ParamValue =model.Designation},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CompanyId", ParamValue =model.CompanyId,DBType = DbType.Int32},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@DepartmentId", ParamValue =model.DepartmentId,DBType = DbType.Int32},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@PhoneNumber", ParamValue =model.PhoneNumber},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ImageFileName", ParamValue =model.ImageFileName},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ImageFileId", ParamValue =model.ImageFileId},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@IsAutoCheckPoint", ParamValue =model.IsAutoCheckPoint},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@AutoCheckPointTime", ParamValue =model.AutoCheckPointTime},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@MaximumOfficeHours", ParamValue =model.MaximumOfficeHours},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@OfficeOutTime", ParamValue =model.OfficeOutTime},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@UserId", ParamValue =model.UserId},
                    };
            const string sql = @"INSERT INTO [ResourceTracker_EmployeeUser] ([UserName] ,[Designation] ,[CompanyId], [DepartmentId], [PhoneNumber], [ImageFileName],[ImageFileId],[IsAutoCheckPoint],[AutoCheckPointTime]
                                ,[MaximumOfficeHours],[OfficeOutTime],[UserId],IsActive) VALUES (@UserName, @Designation, @CompanyId, @DepartmentId, @PhoneNumber, @ImageFileName, @ImageFileId, @IsAutoCheckPoint, @AutoCheckPointTime
                                ,@MaximumOfficeHours,@OfficeOutTime,@UserId,1)";

            DBExecCommandEx(sql, queryParamList, ref errMessage);
            
            return model;
        }
        public ResponseModel Delete(string id)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@UserId", ParamValue =id},
                };

            const string sql = @"DELETE FROM ResourceTracker_EmployeeTrack WHERE EmployeeUserId = (SELECT Id FROM ResourceTracker_EmployeeUser WHERE UserId=@UserId)
                                   DELETE FROM ResourceTracker_EmployeeUser WHERE UserId=@UserId ";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
            
        }
        
        public List<TextValuePairModel> GetEmployeeAsTextValue(int companyId)
        {
            const string sql = @"SELECT E.UserId Id,e.UserName Name FROM ResourceTracker_EmployeeUser E
                                INNER JOIN UserCredentials U ON E.UserId=U.Id where E.CompanyId=@companyId and E.IsActive=1";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@companyId", ParamValue = companyId}
                };
            return ExecuteDBQuery(sql, queryParamList, EmployeeMapper.ToTextValuePairModel);
        }

        public ResponseModel UpdateEmployee(PortalUserViewModel model)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue =model.Id},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@UserFullName", ParamValue =model.UserFullName},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@DesignationName", ParamValue =model.DesignationName},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ImageFileName", ParamValue =model.ImageFileName},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ImageFileId", ParamValue =model.ImageFileId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@IsActive", ParamValue =model.IsActive},
                };

            const string sql = @"UPDATE ResourceTracker_EmployeeUser SET UserName=@UserFullName,Designation=@DesignationName,
                                ImageFileName=@ImageFileName,ImageFileId=@ImageFileId,IsActive=@IsActive WHERE Id=@Id";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }
    }
}