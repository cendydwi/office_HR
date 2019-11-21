import { postApi,  getApi } from "./api";

export const GetRelatedToMeTasks = async (userId) => getApi("RtTaskApi/GetRelatedToMeTasks?userId="+userId, {}, {});
export const SaveTask = async data =>  postApi("RtTaskApi/SaveTask", {}, data);
export const GetGroups = async (companyId) => getApi("RtTaskApi/GetGroups?companyId="+companyId, {}, {});
export const SaveTaskGroup = async data =>  postApi("RtTaskApi/SaveTaskGroup", {}, data);
export const TaskStatus = async () => getApi("RtTaskApi/GetTaskStatusList", {}, {});
export const GetTaskByGroup = async (groupId) => getApi("RtTaskApi/GetTasksByGroup?groupId="+groupId, {}, {});
export const deleteTask = async (taskId) => getApi("RtTaskApi/DeleteTask?id="+taskId, {}, {});
export const PriorityList = async () => getApi("RtTaskApi/GetPriorityList", {}, {});
export const SaveFile = async data =>  postApi("RtTaskApi/SaveTaskAttachment", {}, data);
export const GetTaskAttachments = async (taskId) => getApi("RtTaskApi/GetTaskAttachments?taskId="+taskId, {}, {});







