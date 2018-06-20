using System.Configuration;
using System.Linq;
using System.Web.Http;
using Umbraco.Core.Models.Membership;
using Umbraco.Core.Services;
using Umbraco.Web;
using Umbraco.Web.Mvc;
using Umbraco.Web.WebApi;
 
namespace Jaywing.Web.App_Plugins.ProtectedTrueFalse
{ 
    [PluginController("Jaywing")]
    public class ProtectedTrueFalseApiController : UmbracoAuthorizedApiController
    {     
        private readonly UmbracoContext _umbracoContext;
        private readonly IUserService _userService;   
        private readonly IUserGroup _administratorUserGroup;         
         
        public ProtectedTrueFalseApiController(UmbracoContext umbracoContext, IUserService userService)
        {
            _umbracoContext = umbracoContext;  
            _userService = userService;

            _administratorUserGroup = _userService.GetUserGroupByAlias(ConfigurationManager.AppSettings["AdminUserGroupAlias"]); 
        }
         
        [HttpGet]
        public bool IsAuthorised() 
        { 
            var currentUser = _umbracoContext.Security.CurrentUser;

            return currentUser != null &&
                currentUser.IsApproved &&
                currentUser.Groups.Any(x => x.Id == _administratorUserGroup.Id);
        }         
    } 
}