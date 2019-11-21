using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Resources;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Common
{
    [CompilerGenerated]
    [DebuggerNonUserCode]
    [GeneratedCode("System.Resources.Tools.StronglyTypedResourceBuilder", "15.0.0.0")]
    internal class Resources
    {
        private static ResourceManager resourceMan;

        private static CultureInfo resourceCulture;

        internal static string CompanyGroupName
        {
            get
            {
                return Resources.ResourceManager.GetString("CompanyGroupName", Resources.resourceCulture);
            }
        }

        [EditorBrowsable(EditorBrowsableState.Advanced)]
        internal static CultureInfo Culture
        {
            get
            {
                return Resources.resourceCulture;
            }
            set
            {
                Resources.resourceCulture = value;
            }
        }

        internal static string DbName
        {
            get
            {
                return Resources.ResourceManager.GetString("DbName", Resources.resourceCulture);
            }
        }

        internal static string DbPwd
        {
            get
            {
                return Resources.ResourceManager.GetString("DbPwd", Resources.resourceCulture);
            }
        }

        internal static string DbServerName
        {
            get
            {
                return Resources.ResourceManager.GetString("DbServerName", Resources.resourceCulture);
            }
        }

        internal static string DbUserName
        {
            get
            {
                return Resources.ResourceManager.GetString("DbUserName", Resources.resourceCulture);
            }
        }

        internal static string EfConfiguration
        {
            get
            {
                return Resources.ResourceManager.GetString("EfConfiguration", Resources.resourceCulture);
            }
        }

        [EditorBrowsable(EditorBrowsableState.Advanced)]
        internal static ResourceManager ResourceManager
        {
            get
            {
                if (Resources.resourceMan == null)
                {
                    Resources.resourceMan = new ResourceManager("TrillionBitsPortal.Common", typeof(Resources).Assembly);
                }
                return Resources.resourceMan;
            }
        }

        internal Resources()
        {
        }
    }
}
