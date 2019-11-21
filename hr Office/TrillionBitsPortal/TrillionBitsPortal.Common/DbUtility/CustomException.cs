using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Common
{
    public class CustomException : Exception
    {
        public ErrorLog ErrorInfo
        {
            get;
            set;
        }

        //public override string Message
        //{
        //    get
        //    {
        //        if (base.InnerException is DbUpdateConcurrencyException)
        //        {
        //            throw new Exception();
        //        }
        //        DbUpdateException innerException = base.InnerException as DbUpdateException;
        //        DbUpdateException dbUpdateException = innerException;
        //        if (innerException != null && dbUpdateException != null && dbUpdateException.InnerException != null && dbUpdateException.InnerException.InnerException != null)
        //        {
        //            return (dbUpdateException.InnerException.InnerException as SqlException).Message;
        //        }
        //        DbEntityValidationException dbEntityValidationException = base.InnerException as DbEntityValidationException;
        //        DbEntityValidationException dbEntityValidationException1 = dbEntityValidationException;
        //        if (dbEntityValidationException == null)
        //        {
        //            return base.Message;
        //        }
        //        StringBuilder stringBuilder = new StringBuilder();
        //        stringBuilder.AppendLine();
        //        stringBuilder.AppendLine();
        //        foreach (DbEntityValidationResult entityValidationError in dbEntityValidationException1.EntityValidationErrors)
        //        {
        //            stringBuilder.AppendLine(string.Format("- Entity of type \"{0}\" in state \"{1}\" has the following validation errors:", entityValidationError.Entry.Entity.GetType().FullName, entityValidationError.Entry.State));
        //            foreach (DbValidationError validationError in entityValidationError.ValidationErrors)
        //            {
        //                stringBuilder.AppendLine(string.Format("-- Property: \"{0}\", Value: \"{1}\", Error: \"{2}\"", validationError.PropertyName, entityValidationError.Entry.CurrentValues.GetValue<object>(validationError.PropertyName), validationError.ErrorMessage));
        //            }
        //        }
        //        stringBuilder.AppendLine();
        //        return stringBuilder.ToString();
        //    }
        //}

        public CustomException()
        {
        }

        public CustomException(string message, ErrorLog errorLog = default(ErrorLog)) : base(message)
        {
            this.ErrorInfo = errorLog;
        }

        public CustomException(string message, Exception cause, ErrorLog errorLog = default(ErrorLog)) : base(message, cause)
        {
            this.ErrorInfo = null;
            this.ErrorInfo = errorLog;
        }

        public CustomException(Exception cause) : base(null, cause)
        {
            this.ErrorInfo = null;
        }
    }
}
