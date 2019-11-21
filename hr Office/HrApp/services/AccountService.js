import {postApi, deleteApi, getApi } from "./api";

export const GetEmpInfoByUserId = async (userId,date) => getApi("RtEmployeeApi/GetEmpInfo?userId="+userId+"&date="+date, {}, {});
export const GetEmployeeWithCompanyId = async (companyId) => getApi("RtEmployeeApi/GetEmployeeByCompanyId?companyId="+companyId, {}, {});
// export const CreateAccount = async data => postApi("User/Register", {}, data);
export const CreateAccount = async data => postApi("RtAccountApi/Register", {}, data);
export const ChangePasswords = async data => postApi("User/changepassword", {}, data);
export const ChangePasswordforEmp = async data => postApi("User/resetpassword", {}, data);

export const CreateEmployee = async data => postApi("RtEmployeeApi/CreateEmployee", {}, data);
export const UpdateEmployee = async data => postApi("RtEmployeeApi/UpdateEmployee", {}, data);

// export const Login = async data => postApi("RtAccountApi/LoginAdmin", {}, data);
export const Login = async data => postApi("RtAccountApi/Login", {}, data);

export const GetUserClaim = async (userKey) => getApi("RtAccountApi/GetUserClaims?userKey="+userKey, {}, {});
export const DeleteEmployee = async (id) => deleteApi("RtEmployeeApi/DeleteEmployee?id="+id, {});
export const getTokenforResetEmptPass = async (userId) => getApi("GetResetPasswordToken?userId="+userId, {}, {});

export const CheckExistPhone = async (PhoneNumber) => getApi("RtAccountApi/CheckExistPhone?phoneno="+PhoneNumber, {}, {});
export const VerifyEmail = async email =>
  postApi("account/VerifyEmail/" + email, {}, {});
export const VerifyCurrentPassword = async password =>
  postApi("account/VerifyCurrentPassword/" + password, {}, {});
export const ResetPassword = async (email, password) =>
  postApi("account/ResetPassword/" + email + "/" + password, {}, {});
  export const SendOTP = async (userName) => postApi("account/SendOTP/" + userName ,{});
export const ChangePassword = async (userName, currentPassword, newPassword) =>
  postApi(
    "account/ChangePassword/" +
      userName +
      "/" + 
      currentPassword +
      "/" +
      newPassword,
    {},
    {},
    {}
  );
export const AddDeviceToken = async deviceToken =>
  postApi("account/DeviceToken/" + deviceToken, null, null);

  export const RemoveDeviceToken = async deviceToken =>
  deleteApi("account/DeviceToken/" + deviceToken, null, null);