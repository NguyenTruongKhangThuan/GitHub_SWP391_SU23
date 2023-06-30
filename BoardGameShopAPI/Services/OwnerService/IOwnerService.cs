using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.OwnerService
{
    public interface IOwnerService
    {
        List<Owner> GetOwners();

        string CreateOwner(Owner owner);

        string UpdateOwner(Owner owner);

        Owner OwnerLogin(string ownername, string password);

        string CreateOwnerToken(Owner owner);

        Owner ReadOwnerToken(string ownerToken);
    }
}
