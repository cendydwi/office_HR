import { postApi,  getApi } from "../api";

export const createLeave = async data => postApi("RtLeaveApi/CreateLeave", {}, data);

export const GetLeaveList = async (userId) => getApi("RtLeaveApi/GetUserLeaves?userId="+userId, {}, {});

export const GetLeaveStatusList = async () => getApi("RtLeaveApi/GetLeaveTypeList", {}, {});


