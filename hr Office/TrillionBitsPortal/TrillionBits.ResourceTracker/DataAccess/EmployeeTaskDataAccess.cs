using TrillionBitsPortal.Common;
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
using TrillionBitsPortal.Common.Models;

namespace TrillionBitsPortal.ResourceTracker.DataAccess
{
    public class EmployeeTaskDataAccess : BaseDatabaseHandler, IEmployeeTask
    {
        public ResponseModel SaveTaskGroup(TaskGroupModel model)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue =model.Id},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Name", ParamValue =model.Name},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Description", ParamValue = model.Description},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@BackGroundColor", ParamValue = model.BackGroundColor},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreatedAt", ParamValue = DateTime.UtcNow,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreatedById", ParamValue = model.CreatedById},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CompanyId", ParamValue = model.CompanyId}
                };

            const string sql = @"IF NOT EXISTS(SELECT TOP 1 P.Id FROM ResourceTracker_TaskGroup P WHERE P.Id=@Id)
                                BEGIN
         
                                 INSERT INTO ResourceTracker_TaskGroup(Name,Description,BackGroundColor,CreatedAt,CreatedById,CompanyId)
				                 VALUES(@Name,@Description,@BackGroundColor,@CreatedAt,@CreatedById,@CompanyId)
                                END
                                ELSE
                                BEGIN
                                  UPDATE ResourceTracker_TaskGroup SET Name=@Name,Description=@Description,BackGroundColor=@BackGroundColor
	                              WHERE Id=@Id
                                END";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public ResponseModel SaveToDoTask(ToDoTaskModel model)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue =string.IsNullOrEmpty(model.Id)?Guid.NewGuid().ToString():model.Id},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Title", ParamValue =model.Title},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Description", ParamValue = model.Description},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreatedAt", ParamValue = DateTime.UtcNow,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreatedById", ParamValue = model.CreatedById}

                };

            const string sql = @"IF NOT EXISTS(SELECT TOP 1 P.Id FROM ResourceTracker_ToDoTask P WHERE P.Id=@Id)
                                BEGIN
                                DECLARE @companyId int
                                 SELECT TOP 1  @companyId=CompanyId FROM ResourceTracker_EmployeeUser WHERE UserId=@CreatedById 
                                 INSERT INTO ResourceTracker_ToDoTask(Id,Title,Description,CreatedAt,CreatedById,CompanyId,Completed)
				                 VALUES(@Id,@Title,@Description,@CreatedAt,@CreatedById,@CompanyId,0)
                                END
                                ELSE
                                BEGIN
                                  UPDATE ResourceTracker_ToDoTask SET Title=@Title,Description=@Description
	                              WHERE Id=@Id
                                END";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public ResponseModel ToDoTaskAsDone(string id)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue =id},
                };

            const string sql = @"UPDATE ResourceTracker_ToDoTask SET Completed=1 WHERE Id=@Id";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public ResponseModel ToDoTaskShare(string taskId, List<string> userList)
        {
            var errMessage = string.Empty;

            foreach (var x in userList)
            {
                var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue =Guid.NewGuid().ToString()},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@TaskId", ParamValue =taskId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ShareWithId", ParamValue =x},
                };

                const string sql = @"INSERT INTO ResourceTracker_ToDoTaskShare(Id,TaskId,ShareWithId) VALUES(@Id,@TaskId,@ShareWithId)";
                DBExecCommandEx(sql, queryParamList, ref errMessage);
            }

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public ResponseModel SaveTask(TaskModel model)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue =string.IsNullOrEmpty(model.Id)?Guid.NewGuid().ToString():model.Id},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Title", ParamValue =model.Title},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Description", ParamValue = model.Description},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreatedAt", ParamValue = DateTime.UtcNow,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreatedById", ParamValue = model.CreatedById},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@AssignedToId", ParamValue = model.AssignedToId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@StatusId", ParamValue = model.StatusId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@TaskGroupId", ParamValue = model.TaskGroupId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@DueDate", ParamValue = model.DueDate.HasValue?model.DueDate.Value(Constants.ServerDateTimeFormat):(DateTime?)null,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CompanyId", ParamValue = model.CompanyId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@PriorityId", ParamValue = model.PriorityId}
                };

            const string sql = @"IF NOT EXISTS(SELECT TOP 1 P.Id FROM ResourceTracker_Task P WHERE P.Id=@Id)
                                BEGIN
                                 DECLARE @tNo INT=0
                                 SELECT @tNo=count(t.Id) FROM ResourceTracker_Task T WHERE T.CompanyId=@CompanyId
                                 INSERT INTO ResourceTracker_Task(Id,TaskNo,Title,Description,CreatedAt,CreatedById,AssignedToId,StatusId,TaskGroupId,DueDate,CompanyId,PriorityId)
				                 VALUES(@Id,@tNo+1,@Title,@Description,@CreatedAt,@CreatedById,@AssignedToId,@StatusId,@TaskGroupId,@DueDate,@CompanyId,@PriorityId)
                                END
                                ELSE
                                BEGIN
                                  UPDATE ResourceTracker_Task SET Title=@Title,Description=@Description,AssignedToId=@AssignedToId,PriorityId=@PriorityId,
                                    StatusId=@StatusId,TaskGroupId=@TaskGroupId,DueDate=@DueDate,UpdatedById=@CreatedById,UpdatedAt=@CreatedAt WHERE Id=@Id
                                END";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public ResponseModel SaveTaskAttachment(TaskAttachment model)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue = Guid.NewGuid().ToString()},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@TaskId", ParamValue =model.TaskId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@FileName", ParamValue =model.FileName},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@BlobName", ParamValue =model.BlobName},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@UpdatedAt", ParamValue =DateTime.UtcNow,DBType=DbType.DateTime},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@UpdatedById", ParamValue =model.UpdatedById},
                };

            const string sql = @"INSERT INTO ResourceTracker_TaskAttachments(Id,TaskId,FileName,BlobName,UpdatedAt,UpdatedById) 
                                VALUES (@Id,@TaskId,@FileName,@BlobName,@UpdatedAt,@UpdatedById)";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }

        public List<TaskAttachment> GetTaskAttachments(string taskId)
        {
            const string sql = @"SELECT * FROM ResourceTracker_TaskAttachments where TaskId=@taskId";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@taskId", ParamValue = taskId}
                };
            return ExecuteDBQuery(sql, queryParamList, EmployeeTaskMapper.ToTaskAttachment);
        }

        public List<TaskGroupModel> GetGroups(string companyId)
        {
            const string sql = @"SELECT * FROM ResourceTracker_TaskGroup where CompanyId=@companyId";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@companyId", ParamValue = companyId}
                };
            return ExecuteDBQuery(sql, queryParamList, EmployeeTaskMapper.ToTaskGroup);
        }

        public List<ToDoTaskModel> GetToDoList(string userId)
        {
            const string sql = @"SELECT * FROM ResourceTracker_ToDoTask where CreatedById=@userId";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@userId", ParamValue = userId}
                };
            return ExecuteDBQuery(sql, queryParamList, EmployeeTaskMapper.ToToDoTask);
        }

        public List<TaskModel> GetTaskList(TaskModel sModel)
        {

            const string sql = @"SELECT T.*,C.FullName AssignToName,CreatedBy.FullName CreatedByName,UpdatedBy.FullName UpdatedByName 
                                FROM ResourceTracker_Task t
                                LEFT JOIN UserCredentials C ON T.AssignedToId=C.Id 
                                    LEFT JOIN UserCredentials CreatedBy ON T.CreatedById=CreatedBy.Id 
                                    LEFT JOIN UserCredentials UpdatedBy ON T.UpdatedById=UpdatedBy.Id 
                                    where 
                                   (@CreatedById is null or t.CreatedById=@CreatedById)
                                    and (@AssignedToId is null or t.AssignedToId=@AssignedToId)
                                    and (@TaskGroupId is null or t.TaskGroupId=@TaskGroupId)";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreatedById", ParamValue =string.IsNullOrEmpty(sModel.CreatedById)?null:sModel.CreatedById},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@AssignedToId", ParamValue = string.IsNullOrEmpty(sModel.AssignedToId)?null:sModel.AssignedToId},
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@TaskGroupId", ParamValue = sModel.TaskGroupId},
                };
            return ExecuteDBQuery(sql, queryParamList, EmployeeTaskMapper.ToTask);
        }

        public List<TaskModel> GetRelatedToMeTaskList(string userId)
        {
            const string sql = @"SELECT T.*,C.FullName AssignToName,CreatedBy.FullName CreatedByName,UpdatedBy.FullName UpdatedByName 
                                FROM ResourceTracker_Task t
                                LEFT JOIN UserCredentials C ON T.AssignedToId=C.Id  
                                    LEFT JOIN UserCredentials CreatedBy ON T.CreatedById=CreatedBy.Id 
                                    LEFT JOIN UserCredentials UpdatedBy ON T.UpdatedById=UpdatedBy.Id  where (T.AssignedToId=@userId OR T.CreatedById=@userId)";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@userId", ParamValue =userId}
                };
            return ExecuteDBQuery(sql, queryParamList, EmployeeTaskMapper.ToTask);
        }

        public TaskModel GetTaskDetails(string id)
        {
            const string sql = @"SELECT T.*,C.FullName AssignToName,CreatedBy.FullName CreatedByName,UpdatedBy.FullName UpdatedByName 
                                FROM ResourceTracker_Task t
                                LEFT JOIN UserCredentials C ON T.AssignedToId=C.Id  
                                    LEFT JOIN UserCredentials CreatedBy ON T.CreatedById=CreatedBy.Id 
                                    LEFT JOIN UserCredentials UpdatedBy ON T.UpdatedById=UpdatedBy.Id  where T.Id=@id";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@id", ParamValue =id}
                };
            var data = ExecuteDBQuery(sql, queryParamList, EmployeeTaskMapper.ToTask);
            return (data != null && data.Count > 0) ? data.FirstOrDefault() : null;
        }

        public ResponseModel DeleteTask(string id)
        {
            var errMessage = string.Empty;
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id", ParamValue =id},
                };

            const string sql = @"DELETE FROM ResourceTracker_Task WHERE Id=@Id";
            DBExecCommandEx(sql, queryParamList, ref errMessage);

            return new ResponseModel { Success = string.IsNullOrEmpty(errMessage) };
        }
    }
}
