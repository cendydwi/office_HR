using TrillionBitsPortal.Common.Models;
using System.Collections.Generic;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.Interfaces
{
    public interface IEmployeeTask
    {
        ResponseModel SaveTaskGroup(TaskGroupModel model);
        ResponseModel SaveToDoTask(ToDoTaskModel model);
        ResponseModel ToDoTaskAsDone(string id);
        ResponseModel ToDoTaskShare(string taskId, List<string> userList);
        ResponseModel SaveTask(TaskModel model);
        ResponseModel SaveTaskAttachment(TaskAttachment model);
        List<TaskAttachment> GetTaskAttachments(string taskId);

        List<TaskGroupModel> GetGroups(string companyId);
        List<ToDoTaskModel> GetToDoList(string userId);
        List<TaskModel> GetTaskList(TaskModel sModel);
        List<TaskModel> GetRelatedToMeTaskList(string userId);
        ResponseModel DeleteTask(string id);
        TaskModel GetTaskDetails(string id);
    }
}