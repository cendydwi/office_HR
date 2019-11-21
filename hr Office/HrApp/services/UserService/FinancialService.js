import { postApi,  getApi } from "../api";

export const SaveInvoice = async data =>  postApi("RtFinancialApi/SaveInvoice", {}, data);
export const SaveBillCollection = async data =>  postApi("RtFinancialApi/SaveBillCollection", {}, data);

export const GetInvoice = async (id) => getApi("RtFinancialApi/GetInvoice?id="+id, {}, {});
export const GetInvoiceList = async (userId) => getApi("RtFinancialApi/GetMyInvoiceList?userId="+userId, {}, {});

export const GetMyCollectedBills = async (userId) => getApi("RtFinancialApi/GetMyCollectedBills?userId="+userId, {}, {});
export const GetMyDepositedBills = async (userId) => getApi("RtFinancialApi/GetMyDepositedBills?userId="+userId, {}, {});
export const GetBillSummary = async (userId) => getApi("RtFinancialApi/GetBillSummary?userId="+userId, {}, {});

