import { postApi,  getApi } from "./api";
export const SaveNotice = async data =>  postApi("RtNoticeBoardApi/SaveNoticeBoard", {}, data);
export const getNotice = async (CompanyId) => getApi("RtNoticeBoardApi/GetNoticeBoardByCompanyId?CompanyId="+CompanyId, {}, {});
export const getNoticedetail = async (Id) => getApi("RtNoticeBoardApi/GetNoticeBoardById?Id="+Id, {}, {});

