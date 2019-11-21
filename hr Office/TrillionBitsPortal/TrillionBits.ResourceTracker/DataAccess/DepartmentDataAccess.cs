using TrillionBitsPortal.Common;
using TrillionBitsPortal.Common.Models;
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
    public class DepartmentDataAccess : BaseDatabaseHandler, IDepartment
    {
        public DepartmentDataAccess() { }
        public List<Department> GetDepartmentByCompanyId(string companyId)
        {
            string err = string.Empty;
            string sql = @"SELECT * from ResourceTracker_Department where CompanyId='" + companyId + "'";
            var results = ExecuteDBQuery(sql, null, DepartmentMapper.ToDepartmentModel);
            return results.Any() ? results : null;
        }
        public Department Create(Department model,string userId)
        {
            var err = string.Empty;
            Database db = GetSQLDatabase();
            var returnId = -1;
            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();
                DbTransaction trans = conn.BeginTransaction();
                try
                {
                    returnId = SaveDepartment(model, db, trans);
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    err = ex.Message;
                }
                if ( returnId >= 1 )
                {
                    string sql = @"select * from ResourceTracker_Department where Id in (select top 1 Id from ResourceTracker_Department where CompanyId='" + model.CompanyId + "' order by Id desc)";
                    var results = ExecuteDBQuery( sql , null , DepartmentMapper.ToDepartmentModel );
                    model = results.Any() ? results.FirstOrDefault() : null;
                }
            }
            return model;
        }

        public ResponseModel UpdateDepartment(Department model)
        {
            var err = string.Empty;
            Database db = GetSQLDatabase();
            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();
                DbTransaction trans = conn.BeginTransaction();
                try
                {
                    const string sql = @"UPDATE ResourceTracker_Department SET DepartmentName = @DepartmentName WHERE Id=@Id";
                    var queryParamList = new QueryParamList
                           {
                                new QueryParamObj { ParamName = "@DepartmentName", ParamValue = model.DepartmentName},
                                new QueryParamObj { ParamName = "@Id", ParamValue = model.Id}
                            };
                    DBExecCommandEx(sql, queryParamList, ref err);
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    err = ex.Message;
                }
            }
            return new ResponseModel { Success = string.IsNullOrEmpty(err) };
        }
        public int SaveDepartment(Department model, Database db, DbTransaction trans)
        {

            var errMessage = string.Empty;

            var queryParamList = new QueryParamList
                    {
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CompanyId", ParamValue =model.CompanyId},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@DepartmentName", ParamValue =model.DepartmentName},
                    };
            const string sql = @"INSERT INTO ResourceTracker_Department(CompanyId,DepartmentName) VALUES(@CompanyId,@DepartmentName)";
            return DBExecCommandExTran(sql, queryParamList, trans, db, ref errMessage);
        }
        
    }
}