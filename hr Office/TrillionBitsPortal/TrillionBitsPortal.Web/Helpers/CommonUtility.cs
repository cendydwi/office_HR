using TrillionBitsPortal.Common;
using TrillionBitsPortal.Common.Models;

namespace TrillionBitsPortal.Web.Helpers
{
    public static class CommonUtility
    {
        static CommonUtility()
        {
            
        }
        public static UserSessionModel GetCurrentUser()
        {
            return System.Web.HttpContext.Current.Session[Constants.CurrentUser] as UserSessionModel;
        }

    }
}