using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.OwnerService
{
    public interface IOwnerService
    {
        Task<List<Owner>> GetOwners();

        Task<string> CreateOwner(Owner owner);

        Task<string> UpdateOwner(Owner owner);

        Task<string> DeleteOwner(string ownerId);

        Task<Owner> OwnerLogin(string ownername, string password);

        Task<string> CreateOwnerToken(Owner owner);

        Task<Owner> ReadOwnerToken(string ownerToken);

        //Authentication
        Task<string> CreateValidation(Owner owner);
    }
}
