using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.ComponentService
{
    public interface IComponentService
    {
        Task<List<Component>> GetGamePackComponents(string gamePackId);

        Task<string> CreateComponent(Component component);

        Task<string> UpdateComponent(Component component);

        Task<string> DeleteComponent(string componentId);

        Task<string> DeleteListOfComponents(List<Component> components);
    }
}
