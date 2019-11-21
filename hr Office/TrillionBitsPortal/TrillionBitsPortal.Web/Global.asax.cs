using System.Globalization;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Microsoft.Practices.Unity;
using TrillionBits.ResourceTracker;

namespace TrillionBitsPortal.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        private static IUnityContainer _container;
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

            _container = new UnityContainer();
            RTUnityMapper.RegisterComponents(_container);
        }
        protected void Application_BeginRequest()
        {
            var cInf = new CultureInfo("en-US", false)
            {
                DateTimeFormat =
                {
                    DateSeparator = "/",
                    ShortDatePattern = "dd/MM/yyyy",
                    LongDatePattern = "dd/MM/yyyy hh:mm:ss tt"
                }
            };
            // NOTE: change the culture name en-ZA to whatever culture suits your needs

            System.Threading.Thread.CurrentThread.CurrentCulture = cInf;
            System.Threading.Thread.CurrentThread.CurrentUICulture = cInf;

            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");


            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept"); HttpContext.Current.Response.End();
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
                HttpContext.Current.Response.End();

            }

        }
    }
}