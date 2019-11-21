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
    public class CompanyDataAccess : BaseDatabaseHandler, ICompany
    {

        public List<Company> GetCompanyByUserId( string userId )
        {
            string err = string.Empty;
            string sql = @"select * from ResourceTracker_Company where PortalUserId='" + userId+"'";
            var results = ExecuteDBQuery ( sql , null , CompanyMapper.ToCompanyModel );
            return results.Any () ? results : null;
        }
        public List<Company> GetCompanyByEmpUserId(string userId)
        {
            string err = string.Empty;
            string sql = @"SELECT c.* FROM  ResourceTracker_EmployeeUser eu
            left join ResourceTracker_Company c on eu.CompanyId=c.Id
            where eu.UserId='" + userId + "'";
            var results = ExecuteDBQuery(sql, null, CompanyMapper.ToCompanyModel);
            return results.Any() ? results : null;
        }
        public Company GetCompanyByIdentity( string userId )
        {
            string err = string.Empty;
            string sql = @"select * from ResourceTracker_company where Id in (select top 1 Id from Company where PortalUserId='" + userId+"' order by Id desc)";
            var results = ExecuteDBQuery ( sql , null , CompanyMapper.ToCompanyModel );
            return results.Any () ? results.FirstOrDefault () : null;
        }

        public Company GetCompanyById(int companyId)
        {
            string err = string.Empty;
            string sql = @"select * from ResourceTracker_company where Id=@id";
            var queryParamList = new QueryParamList
                    {
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@id", ParamValue =companyId},
                    };
            var results = ExecuteDBQuery(sql, queryParamList, CompanyMapper.ToCompanyModel);
            return results.Any() ? results.FirstOrDefault() : null;
        }

        public Company Create( Company model )
        {
            var err = string.Empty;
            Database db = GetSQLDatabase ();
            var returnId = -1;
            using ( DbConnection conn = db.CreateConnection () )
            {
                conn.Open ();
                DbTransaction trans = conn.BeginTransaction ();
                try
                {
                    returnId=SaveCompany ( model , db , trans );
                    trans.Commit ();
                }
                catch ( Exception ex )
                {
                    trans.Rollback ();
                    err=ex.Message;
                }
                if ( returnId>=1 )
                {
                    string sql = @"select * from ResourceTracker_company where Id in (select top 1 Id from ResourceTracker_Company where PortalUserId='" + model.PortalUserId+"' order by Id desc)";
                    var results = ExecuteDBQuery ( sql , null , CompanyMapper.ToCompanyModel );
                    model=results.Any () ? results.FirstOrDefault () : null;
                }
            }
            return model;
        }
        public ResponseModel UpdateCompany( Company model )
        {
            var err = string.Empty;
            Database db = GetSQLDatabase ();
            using ( DbConnection conn = db.CreateConnection () )
            {
                conn.Open ();
                DbTransaction trans = conn.BeginTransaction ();
                try
                {
                    const string sql = @"UPDATE ResourceTracker_Company  SET CompanyName=@CompanyName, Address =@Address ,PhoneNumber = @PhoneNumber,MaximumOfficeHours=@MaximumOfficeHours,OfficeOutTime=@OfficeOutTime WHERE Id=@Id";
                    var queryParamList = new QueryParamList
                           {
                                new QueryParamObj { ParamName = "@CompanyName", ParamValue = model.CompanyName},
                                new QueryParamObj { ParamName = "@Address", ParamValue = model.Address},
                                new QueryParamObj { ParamName = "@PhoneNumber", ParamValue = model.PhoneNumber},
                                new QueryParamObj { ParamName = "@MaximumOfficeHours", ParamValue =model.MaximumOfficeHours},
                                new QueryParamObj { ParamName = "@OfficeOutTime", ParamValue =model.OfficeOutTime},
                                new QueryParamObj { ParamName = "@Id", ParamValue = model.Id}
                            };
                    DBExecCommandEx ( sql , queryParamList , ref err );
                    trans.Commit ();
                }
                catch ( Exception ex )
                {
                    trans.Rollback ();
                    err=ex.Message;
                }
            }
            return new ResponseModel { Success=string.IsNullOrEmpty ( err ) };
        }

        public int SaveCompany( Company model , Database db , DbTransaction trans )
        {

            var errMessage = string.Empty;

            var queryParamList = new QueryParamList
                    {
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@PortalUserId", ParamValue =model.PortalUserId},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CompanyName", ParamValue =model.CompanyName},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@Address", ParamValue =model.Address},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@PhoneNumber", ParamValue =model.PhoneNumber},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@MaximumOfficeHours", ParamValue =model.MaximumOfficeHours},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@OfficeOutTime", ParamValue =model.OfficeOutTime},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ImageFileName", ParamValue =model.ImageFileName},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@ImageFileId", ParamValue =model.ImageFileId},
                        new QueryParamObj { ParamDirection = ParameterDirection.Input, ParamName = "@CreatedDate", ParamValue =DateTime.UtcNow,DBType=DbType.DateTime},
                    };
            const string sql = @"IF NOT EXISTS(SELECT TOP 1 * FROM ResourceTracker_Company C WHERE C.CompanyName=@CompanyName AND PortalUserId=@PortalUserId)
                                BEGIN
                                INSERT INTO ResourceTracker_Company(PortalUserId,CompanyName,Address,PhoneNumber,MaximumOfficeHours,OfficeOutTime,ImageFileName,ImageFileId,CreatedDate) 
                                VALUES(@PortalUserId,@CompanyName,@Address,@PhoneNumber,@MaximumOfficeHours,@OfficeOutTime,@ImageFileName,@ImageFileId,@CreatedDate)
                                END";
            return DBExecCommandExTran ( sql , queryParamList , trans , db , ref errMessage );
        }

        public List<CompanyListModel> GetCompanyList()
        {
            const string sql = @"DECLARE @T AS TABLE(Id INT,TotalEmployee INT) 

                            INSERT INTO @T(Id,TotalEmployee)
                            SELECT U.CompanyId,Count(U.Id) FROM ResourceTracker_EmployeeUser U WHERE U.IsActive=1 GROUP BY U.CompanyId

                            SELECT C.Id,C.CompanyName,C.Address,c.PhoneNumber OfficePhone,C.CreatedDate,CR.Email,
                            cr.FullName ContactPerson,cr.ContactNo ContactPersonMobile,ISNULL(T.TotalEmployee,0) TotalEmployee
                             FROM UserCredentials CR
                            left JOIN ResourceTracker_Company C ON c.PortalUserId=cr.Id
                            LEFT JOIN @T T ON C.Id=T.Id
                            where cr.UserTypeId=6";
            var data = ExecuteDBQuery(sql, null, CompanyMapper.ToList);
            return data;
        }
    }
}