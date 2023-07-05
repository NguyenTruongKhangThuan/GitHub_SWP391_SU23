using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.OwnerService
{
    public interface IOwnerService
    {
        Task<List<Owner>> GetOwners();

        Task<string> CreateOwner(Owner owner);

        Task<string> UpdateOwner(Owner owner);

        Task<Owner> OwnerLogin(string ownername, string password);

        string CreateOwnerToken(Owner owner);

        Owner ReadOwnerToken(string ownerToken);
    }
}
