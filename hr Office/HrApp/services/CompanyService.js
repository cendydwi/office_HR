import { postApi,  getApi } from "./api";

//export const CreateCompany = async data =>  postApi("RtCompanyApi/Save", {}, data);

export const CreateCompany = async data => postApi("RtCompanyApi/Save", {}, data);
export const updatedeCompany = async data =>  postApi("RtCompanyApi/UpdateCompany", {}, data);
export const GetCompanyByUserId = async (userId) => getApi("RtCompanyApi/GetCompanyByUserId?userId="+userId, {}, {});
export const GetCompanyByEmpUserId = async (userId) => getApi("RtCompanyApi/GetCompanyByEmpUserId?userId="+userId, {}, {});
export const GetCompanyByIdentity = async () => getApi("RtCompanyApi/GetCompanyByIdentity", {}, {});
