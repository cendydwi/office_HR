using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Common
{
    public class ErrorLog : BaseModel
    {
        public string ActionName
        {
            get;
            set;
        }

        public string AppVersion
        {
            get;
            set;
        }

        public string BranchId
        {
            get;
            set;
        }

        public string CompanyId
        {
            get;
            set;
        }

        public string ControllerName
        {
            get;
            set;
        }

        public string ErrorCode
        {
            get;
            set;
        }

        public string ErrorMessage
        {
            get;
            set;
        }

        public string ErrorType
        {
            get;
            set;
        }

        public string Exception
        {
            get;
            set;
        }

        public int Id
        {
            get;
            set;
        }

        public bool IsEmailRequired
        {
            get;
            set;
        }

        public string ItemName
        {
            get;
            set;
        }

        public string MethodName
        {
            get;
            set;
        }

        public string ModuleName
        {
            get;
            set;
        }

        public DateTime RecordTime
        {
            get;
            set;
        }

        public string RefNumber
        {
            get;
            set;
        }

        public string ServiceName
        {
            get;
            set;
        }

        public string UserId
        {
            get;
            set;
        }

        public ErrorLog()
        {
        }
    }
}
