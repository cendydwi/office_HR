import {postApi, deleteApi, getApi } from "../api";

export const ChangePasswords = async data => postApi("User/changepassword", {}, data);

export const ChangePasswordforEmp = async data => postApi("User/resetpassword", {}, data);

export const Login = async data => postApi("RtAccountApi/LoginUser", {}, data);

export const UpdateEmployee = async data => postApi("RtEmployeeApi/UpdateEmployee", {}, data);

export const GetUserClaim = async (userKey) => getApi("RtAccountApi/GetUserClaims?userKey="+userKey, {}, {});
