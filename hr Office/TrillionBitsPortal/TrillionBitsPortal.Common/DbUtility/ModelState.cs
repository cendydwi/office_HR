using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrillionBitsPortal.Common
{
    [Flags]
    public enum ModelState
    {
        Added = 1,
        Modified = 2,
        Deleted = 3,
        Unchanged = 4,
        Detached = 5
    }
}
