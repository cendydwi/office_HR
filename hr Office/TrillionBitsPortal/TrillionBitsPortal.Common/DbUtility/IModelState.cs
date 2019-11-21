using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Common
{
    public interface IModelState
    {
        ModelState ModelState
        {
            get;
            set;
        }
    }
}
