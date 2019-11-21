using System.Collections.Generic;
using TrillionBitsPortal.Common.Models;
using TrillionBitsPortal.Common;

namespace TrillionBitsPortal.ResourceTracker.Interfaces
{
    public interface IUserCredential
    {
        ResponseModel Save(UserCredentialModel model);
        
        UserCredentialModel Get(string username, string password);

        ResponseModel ChangePassword(string userInitial, string newPassword);
        UserCredentialModel GetProfileDetails(string userId);
        UserCredentialModel GetByLoginID(string loginID);
        UserCredentialModel GetByLoginID(string loginID, UserType uType);
        UserCredentialModel GetByLoginID(string loginID, string password, UserType uType);
        UserCredentialModel GetUserFullInfo(string userId);
    }
}