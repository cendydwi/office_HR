import { postApi,  getApi } from "../api";

//export const GetRelatedToMeTasks = async (userId) => getApi("RtTaskApi/GetRelatedToMeTasks?userId="+userId, {}, {});
export const SaveTask = async data =>  postApi("RtTaskApi/SaveTask", {}, data);
export const GetCreatedByme = async (userId) => getApi("RtTaskApi/GetCreatedByMeTasks?userId="+userId, {}, {});
export const GetRelatedToMeTasks = async (userId) => getApi("RtTaskApi/GetAssignedToMeTasks?userId="+userId, {}, {});
export const TaskStatus = async () => getApi("RtTaskApi/GetTaskStatusList", {}, {});
export const PriorityList = async () => getApi("RtTaskApi/GetPriorityList", {}, {});
export const SaveFile = async data =>  postApi("RtTaskApi/SaveTaskAttachment", {}, data);
export const GetTaskAttachments = async (taskId) => getApi("RtTaskApi/GetTaskAttachments?taskId="+taskId, {}, {});




