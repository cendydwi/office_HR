import { postApi, getApi } from "./api";

export const createLeave = async data => postApi("RtLeaveApi/CreateLeave", {}, data);
export const acceptrequest = async data => postApi("RtLeaveApi/UpdateLeaveStatus", {}, data);


export const GetLeaveList = async (CompanyId) => getApi("RtLeaveApi/GetLeaveByCompanyId?companyId=" + CompanyId, {}, {});
export const GetUserLeaves = async (userId) => getApi("RtLeaveApi/GetUserLeaves?&userId=" + userId, {}, {});

export const LeaveApproved = async (id, userId) => getApi("RtLeaveApi/Approved?id=" + id + "&userId=" + userId, {}, {});
export const LeaveRejected = async (id) => getApi("RtLeaveApi/Rejected?id=" + id, {}, {});
