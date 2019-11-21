import { postApi,  getApi } from "./api";

export const CreateTracking = async data =>  postApi("RtEmployeeTrackingApi/CreateTracking", {}, data);
export const CreateLeavingReason = async data =>  postApi("RtEmployeeApi/CreateLeavingReason", {}, data);
export const GetTrackingByUserIdAndTodayDate = async (empId,date) => getApi("RtEmployeeTrackingApi/GetTrackingByUserIdAndTodayDate?employeeId="+empId+"&date="+date, {}, {});
//export const GetAttendanceFeed = async (companyId,trackType,date) => getApi("RtEmployeeApi/GetAttendanceFeed?companyId="+companyId+"&trackType="+trackType+"&date="+date, {}, {});
export const EmployeeList = async (companyId) => getApi("RtEmployeeApi/GetEmployeeAsTextValue?companyId="+companyId, {}, {});
export const GetAttendanceFeed = async (companyId) => getApi("RtAttendanceApi/GetAttendanceFeed?companyId="+companyId, {}, {});
export const GetMyTodayAttendance = async (userId) => getApi("RtAttendanceApi/GetMyTodayAttendance?userId="+userId, {}, {});
export const GetMovementDetails = async (userId) => getApi("RtAttendanceApi/GetMovementDetails?userId="+userId, {}, {});
export const GetLeaderboardData = async (companyId,month,year) => getApi("RtAttendanceApi/GetLeaderboardData?companyId="+companyId+"&month="+month+"&year="+year, {}, {});