using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;
using System.Web.Http;

namespace TrillionBitsPortal.Web.Controllers.Api
{
    [JwtAuthentication]
    public class BaseApiController : ApiController
    {

    }
}
