using TrillionBitsPortal.Common.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Mappers
{
    public static class EmployeeTaskMapper
    {

        public static List<TaskGroupModel> ToTaskGroup(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<TaskGroupModel>();

            while (readers.Read())
            {
                var model = new TaskGroupModel
                {
                    Id = Convert.ToInt32(readers["Id"]),
                    Name = Convert.IsDBNull(readers["Name"]) ? string.Empty : Convert.ToString(readers["Name"]),
                    Description = Convert.IsDBNull(readers["Description"]) ? string.Empty : Convert.ToString(readers["Description"]),
                    BackGroundColor = Convert.IsDBNull(readers["BackGroundColor"]) ? string.Empty : Convert.ToString(readers["BackGroundColor"]),
                    CreatedAt = Convert.IsDBNull(readers["CreatedAt"]) ? (DateTime?)null : Convert.ToDateTime(readers["CreatedAt"]),
                    CreatedById = Convert.IsDBNull(readers["CreatedById"]) ? string.Empty : Convert.ToString(readers["CreatedById"]),
                };

                models.Add(model);
            }

            return models;
        }

        public static List<ToDoTaskModel> ToToDoTask(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<ToDoTaskModel>();

            while (readers.Read())
            {
                var model = new ToDoTaskModel
                {
                    Id = Convert.ToString(readers["Id"]),
                    Title = Convert.IsDBNull(readers["Title"]) ? string.Empty : Convert.ToString(readers["Title"]),
                    Description = Convert.IsDBNull(readers["Description"]) ? string.Empty : Convert.ToString(readers["Description"]),
                    Completed = Convert.IsDBNull(readers["Completed"]) ? false : Convert.ToBoolean(readers["Completed"]),
                    CreatedAt = Convert.IsDBNull(readers["CreatedAt"]) ? (DateTime?)null : Convert.ToDateTime(readers["CreatedAt"]),
                    CreatedById = Convert.IsDBNull(readers["CreatedById"]) ? string.Empty : Convert.ToString(readers["CreatedById"]),
                };

                models.Add(model);
            }

            return models;
        }

        public static List<TaskModel> ToTask(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<TaskModel>();

            while (readers.Read())
            {
                var model = new TaskModel
                {
                    Id = Convert.ToString(readers["Id"]),
                    TaskNo = Convert.IsDBNull(readers["TaskNo"]) ? (int?)null : Convert.ToInt32(readers["TaskNo"]),
                    Title = Convert.IsDBNull(readers["Title"]) ? string.Empty : Convert.ToString(readers["Title"]),
                    Description = Convert.IsDBNull(readers["Description"]) ? string.Empty : Convert.ToString(readers["Description"]),
                    AssignedToId = Convert.IsDBNull(readers["AssignedToId"]) ? string.Empty : Convert.ToString(readers["AssignedToId"]),
                    StatusId = Convert.IsDBNull(readers["StatusId"]) ? (int?)null : Convert.ToInt32(readers["StatusId"]),
                    TaskGroupId = Convert.IsDBNull(readers["TaskGroupId"]) ? (int?)null : Convert.ToInt32(readers["TaskGroupId"]),
                    CreatedAt = Convert.IsDBNull(readers["CreatedAt"]) ? (DateTime?)null : Convert.ToDateTime(readers["CreatedAt"]),
                    CreatedById = Convert.IsDBNull(readers["CreatedById"]) ? string.Empty : Convert.ToString(readers["CreatedById"]),
                    DueDate = Convert.IsDBNull(readers["DueDate"]) ? (DateTime?)null : Convert.ToDateTime(readers["DueDate"]),
                    AssignToName = Convert.IsDBNull(readers["AssignToName"]) ? string.Empty : Convert.ToString(readers["AssignToName"]),
                    UpdatedAt = Convert.IsDBNull(readers["UpdatedAt"]) ? (DateTime?)null : Convert.ToDateTime(readers["UpdatedAt"]),
                    PriorityId = Convert.IsDBNull(readers["PriorityId"]) ? (int?)null : Convert.ToInt32(readers["PriorityId"]),
                    CreatedByName = Convert.IsDBNull(readers["CreatedByName"]) ? string.Empty : Convert.ToString(readers["CreatedByName"]),
                    UpdatedByName = Convert.IsDBNull(readers["UpdatedByName"]) ? string.Empty : Convert.ToString(readers["UpdatedByName"]),
                };

                models.Add(model);
            }

            return models;
        }

        public static List<TaskAttachment> ToTaskAttachment(DbDataReader readers)
        {
            if (readers == null)
                return null;
            var models = new List<TaskAttachment>();

            while (readers.Read())
            {
                var model = new TaskAttachment
                {
                    Id = Convert.ToString(readers["Id"]),
                    TaskId = Convert.IsDBNull(readers["TaskId"]) ? string.Empty : Convert.ToString(readers["TaskId"]),
                    FileName = Convert.IsDBNull(readers["FileName"]) ? string.Empty : Convert.ToString(readers["FileName"]),
                    BlobName = Convert.IsDBNull(readers["BlobName"]) ? string.Empty : Convert.ToString(readers["BlobName"]),
                    UpdatedAt = Convert.IsDBNull(readers["UpdatedAt"]) ? (DateTime?)null : Convert.ToDateTime(readers["UpdatedAt"]),
                    UpdatedById = Convert.IsDBNull(readers["UpdatedById"]) ? string.Empty : Convert.ToString(readers["UpdatedById"])
                };

                models.Add(model);
            }

            return models;
        }
    }
}