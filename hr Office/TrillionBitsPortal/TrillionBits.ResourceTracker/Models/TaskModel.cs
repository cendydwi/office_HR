using System;
using System.ComponentModel;
using System.Web.Script.Serialization;
using TrillionBitsPortal.Common;

namespace TrillionBitsPortal.ResourceTracker.Models
{

    public class TaskModel
    {
        public string Id { get; set; }
        public int? TaskNo { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreatedById { get; set; }
        [ScriptIgnore]
        public DateTime? CreatedAt { get; set; }
        public string AssignedToId { get; set; }
        public int? StatusId { get; set; }
        public int? TaskGroupId { get; set; }
        public DateTime? DueDate { get; set; }
        public int? CompanyId { get; set; }
        public int? PriorityId { get; set; }
        public string UpdatedByName { get; set; }
        [ScriptIgnore]
        public DateTime? UpdatedAt { get; set; }

        public string DueDateVw
        {
            get { return DueDate.HasValue ? DueDate.Value.ToString(Constants.DateLongFormat) : string.Empty; }
        }

        public string CreatedAtVw
        {
            get { return CreatedAt.HasValue ? CreatedAt.Value.ToString(Constants.DateTimeLongFormat) : string.Empty; }
        }

        public string UpdatedAtVw
        {
            get { return UpdatedAt.HasValue ? UpdatedAt.Value.ToString(Constants.DateTimeLongFormat) : string.Empty; }
        }

        public string StatusName
        {
            get
            {
                if (!StatusId.HasValue)
                    return string.Empty;
                return EnumUtility.GetDescriptionFromEnumValue((TaskStatus)StatusId);
            }
        }

        public string PriorityName
        {
            get
            {
                if (!PriorityId.HasValue)
                {
                    PriorityId = (int)TaskPriority.Normal;
                }
                return EnumUtility.GetDescriptionFromEnumValue((TaskPriority)PriorityId);
            }
        }

        public bool HasAttachments
        {
            get { return false; }
        }
        public string AssignToName { get; set; }
        public string CreatedByName { get; set; }
        public bool CanDelete { get; set; }
    }

    public class TaskAttachment
    {
        public string Id { get; set; }
        public string TaskId { get; set; }
        public string FileName { get; set; }
        public string BlobName { get; set; }
        public string FilePath
        {
            get
            {
                if (string.IsNullOrEmpty(BlobName))
                    return string.Empty;
                return Constants.AzureBlobRootPath + "/" + AzureStorageContainerType.resourcetracker + "/" + BlobName;
            }
        }
        public string UpdatedById { get; set; }
        [ScriptIgnore]
        public DateTime? UpdatedAt { get; set; }
        public string UpdatedAtVw
        {
            get { return UpdatedAt.HasValue ? UpdatedAt.Value.ToString(Constants.DateTimeLongFormat) : string.Empty; }
        }
    }
    public class TaskGroupModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string BackGroundColor { get; set; }
        public string CreatedById { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? CompanyId { get; set; }

        public int TotalTask { get; set; }

    }
    public class ToDoTaskShareModel
    {
        public string Id { get; set; }
        public string TaskId { get; set; }
        public string ShareWithId { get; set; }

    }
    public class ToDoTaskModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreatedById { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? CompanyId { get; set; }
        public bool Completed { get; set; }

    }

    public enum TaskStatus
    {
        [Description("To Do")]
        ToDo = 1,
        [Description("In Progress")]
        InProgress = 2,
        [Description("Pause")]
        Pause = 3,
        [Description("Completed")]
        Completed = 4,
        [Description("Done & Bill Collected")]
        BillCollected = 5,
        [Description("Cancelled")]
        Cancelled = 6
    }

    public enum TaskPriority
    {
        [Description("Normal")]
        Normal = 1,
        [Description("High")]
        High = 2,
        [Description("Low")]
        Low = 3
    }
}
