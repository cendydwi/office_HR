import { postApi,  getApi } from "../api";

export const CheckIn = async data =>  postApi("RtAttendanceApi/CheckIn", {}, data);
export const CheckOut = async data =>  postApi("RtAttendanceApi/CheckOut", {}, data);
export const CheckPoint = async data =>  postApi("RtAttendanceApi/CheckPoint", {}, data);

export const GetMovementDetails = async (userId) => getApi("RtAttendanceApi/GetMovementDetails?userId="+userId, {}, {});
export const GetAttendanceFeed = async (companyId) => getApi("RtAttendanceApi/GetAttendanceFeed?companyId="+companyId, {}, {});
export const GetMyTodayAttendance = async (userId) => getApi("RtAttendanceApi/GetMyTodayAttendance?userId="+userId, {}, {});
export const EmployeeList = async (companyId) => getApi("RtEmployeeApi/GetEmployeeAsTextValue?companyId="+companyId, {}, {});
