using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TrillionBits.ResourceTracker;
using TrillionBitsPortal.Common;
using TrillionBitsPortal.Common.Models;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.Web.Controllers.Api.ResourceTracker
{
    public class RtTaskApiController : BaseApiController
    {
        private readonly IEmployeeTask _taskRepository;

        public RtTaskApiController()
        {
            _taskRepository = RTUnityMapper.GetInstance<IEmployeeTask>();
        }

        [HttpPost]
        public IHttpActionResult SaveTaskGroup(TaskGroupModel model)
        {
            var result = _taskRepository.SaveTaskGroup(model);
            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult SaveToDoTask(ToDoTaskModel model)
        {
            var result = _taskRepository.SaveToDoTask(model);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult ToDoTaskAsDone(string id)
        {
            var result = _taskRepository.ToDoTaskAsDone(id);
            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult ToDoTaskShare(string taskId, List<string> userList)
        {
            var result = _taskRepository.ToDoTaskShare(taskId, userList);
            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult SaveTask(TaskModel model)
        {
            if (!model.StatusId.HasValue)
            {
                model.StatusId = (int)TaskStatus.ToDo;
            }
            if (!model.PriorityId.HasValue)
            {
                model.PriorityId = (int)TaskPriority.Normal;
            }

            var result = _taskRepository.SaveTask(model);
            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult SaveTaskAttachment(TaskAttachment model)
        {
            var result = _taskRepository.SaveTaskAttachment(model);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetTaskAttachments(string taskId)
        {
            var result = _taskRepository.GetTaskAttachments(taskId);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetGroups(string companyId)
        {
            var result = _taskRepository.GetGroups(companyId);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetToDoList(string userId)
        {
            var result = _taskRepository.GetToDoList(userId);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetTasksByGroup(int groupId)
        {
            var result = _taskRepository.GetTaskList(new TaskModel { TaskGroupId = groupId }).OrderByDescending(x => x.CreatedAt);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetCreatedByMeTasks(string userId)
        {
            var result = _taskRepository.GetTaskList(new TaskModel { CreatedById = userId }).OrderByDescending(x => x.CreatedAt);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetAssignedToMeTasks(string userId)
        {
            var result = _taskRepository.GetTaskList(new TaskModel { AssignedToId = userId }).OrderByDescending(x => x.CreatedAt);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetRelatedToMeTasks(string userId)
        {
            var result = _taskRepository.GetRelatedToMeTaskList(userId).OrderByDescending(x => x.CreatedAt);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult DeleteTask(string id)
        {
            var result = _taskRepository.DeleteTask(id);
            return Ok(result);
        }
        [HttpGet]
        public IHttpActionResult GetTaskDetails(string id)
        {
            var result = _taskRepository.GetTaskDetails(id);
            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetTaskStatusList()
        {
            var list = Enum.GetValues(typeof(TaskStatus)).Cast<TaskStatus>().Select(v => new NameIdPairModel
            {
                Name = EnumUtility.GetDescriptionFromEnumValue(v),
                Id = (int)v
            }).ToList();
            return Ok(list);
        }

        [HttpGet]
        public IHttpActionResult GetPriorityList()
        {
            var list = Enum.GetValues(typeof(TaskPriority)).Cast<TaskPriority>().Select(v => new NameIdPairModel
            {
                Name = EnumUtility.GetDescriptionFromEnumValue(v),
                Id = (int)v
            }).ToList();
            return Ok(list);
        }
    }
}
