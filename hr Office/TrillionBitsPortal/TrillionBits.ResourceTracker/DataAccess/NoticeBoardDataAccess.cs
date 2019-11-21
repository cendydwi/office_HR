using TrillionBitsPortal.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using TrillionBits.DataAccess.Common;
using TrillionBitsPortal.ResourceTracker.Interfaces;
using TrillionBitsPortal.ResourceTracker.Mappers;
using TrillionBitsPortal.ResourceTracker.Models;

namespace TrillionBitsPortal.ResourceTracker.DataAccess
{
    public class NoticeBoardDataAccess : BaseDatabaseHandler, INoticeBoard
    {
        private readonly IEmployee _employee;
        public NoticeBoardDataAccess(IEmployee employee)
        {
            _employee = employee;

        }


        public List<NoticeBoard> GetNoticeBoardByCompanyId(int companyId)
        {
            string err = string.Empty;
            string sql = @"SELECT nb.*  FROM [ResourceTracker_NoticeBoard] as nb WHERE NB.CompanyId=@companyId  order by CreateDate Desc";
            var queryParamList = new QueryParamList
                {
                    new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@companyId", ParamValue =companyId,DBType=DbType.Int32},
                };
            var results = ExecuteDBQuery( sql , queryParamList, NoticeBoardMapper.ToNoticeBoardModel );


            return results;
        }

        public NoticeBoard GetNoticeBoardById(string noticeId )
        {
            string err = string.Empty;
            string sql = @"select * from ResourceTracker_NoticeBoard Where Id='" + noticeId+"'";
            var results = ExecuteDBQuery( sql , null , NoticeBoardMapper.ToNoticeBoardModel );
            return results.Any() ? results.FirstOrDefault() : null;
        }

        public NoticeDepartmentVIewModel CreateNoticeBoard( NoticeDepartmentVIewModel model)
        {
            var err = string.Empty;
            Database db = GetSQLDatabase();
            var returnId = -1;
            using ( DbConnection conn = db.CreateConnection() )
            {
                conn.Open();
                DbTransaction trans = conn.BeginTransaction();
                try
                {
                    model.Id = Guid.NewGuid().ToString();
                    returnId = SaveToNoticeBoard( model , db , trans );
                    trans.Commit();
                }
                catch ( Exception ex )
                {
                    trans.Rollback();
                    err = ex.Message;
                }
            }
            return model;
        }


        public int SaveToNoticeBoard( NoticeDepartmentVIewModel model , Database db , DbTransaction trans )
        {
            var errMessage = string.Empty;

            var queryParamList = new QueryParamList
                    {
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Id",ParamValue =model.Id ,DBType = DbType.String},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Details",ParamValue =model.Details},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@PostingDate", ParamValue =DateTime.UtcNow, DBType=DbType.DateTime},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ImageFileName", ParamValue =model.ImageFileName},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreatedBy", ParamValue =model.CreatedBy},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CompanyId", ParamValue =model.CompanyId},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreateDate", ParamValue =DateTime.UtcNow, DBType=DbType.DateTime},
                    };
            const string sql = @"INSERT INTO ResourceTracker_NoticeBoard (Id, Details, PostingDate, ImageFileName, CreatedBy, CreateDate,CompanyId) VALUES( @Id, @Details, @PostingDate,@ImageFileName, @CreatedBy, @CreateDate,@CompanyId)";
            return DBExecCommandExTran( sql , queryParamList , trans , db , ref errMessage );
        }

       
    }
}
