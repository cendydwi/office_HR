import { postApi,  getApi } from "./api";

export const GetAllEmployeeAttendanceWithMonth = async ( companyId,month,year) => getApi("RtAttendanceApi/GetAllEmployeeAttendanceWithMonth?companyId="+companyId+"&month="+month+"&year="+year, {}, {});
export const GetEmpInfoByUserId = async (userId,date) => getApi("RtEmployeeApi/GetEmpInfo?userId="+userId+"&date="+date, {}, {});
export const GetMonthlyAttendanceDetails = async ( userId,companyId,year,month) => getApi("RtAttendanceApi/GetMonthlyAttendanceDetails?userId="+userId+"&companyId="+companyId+"&year="+year+"&month="+month, {}, {});


