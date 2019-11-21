import { postApi,  getApi,loginPostApi } from "./api";

export const CreateDepartment = async data =>  postApi("RtDepartmentApi/Save", {}, data);
export const updatedepartment = async data =>  postApi("RtDepartmentApi/UpdateDepartment", {}, data);
export const GetDepartmentByCompanyId = async (companyId) => getApi("RtDepartmentApi/GetDepartmentByCompanyId?companyId="+companyId, {}, {});