using System;
using System.Web;
using System.Web.Mvc;
using TrillionBitsPortal.Common;

namespace TrillionBitsPortal.Web.Filters
{

        [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
        public class ValidateUserAttribute : ActionFilterAttribute
        {

            public override void OnActionExecuting(ActionExecutingContext filterContext)
            {
                HttpSessionStateBase session = filterContext.HttpContext.Session;
                var user = session[Constants.CurrentUser];

                if (session != null && (((user == null) && (!session.IsNewSession)) || (session.IsNewSession)))
                {
                    //send them off to the login page
                    var url = new UrlHelper(filterContext.RequestContext);
                    var loginUrl = url.Content("~/Account/RedirectToLogOff");
                    filterContext.HttpContext.Response.Redirect(loginUrl, true);
                }
            }
        
    }
}