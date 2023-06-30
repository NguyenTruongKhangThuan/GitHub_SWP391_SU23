using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.ComponentService
{
    public interface IComponentService
    {
        List<Component> GetGamePackComponents(string gamePackId);

        string CreateComponent(Component component);

        string UpdateComponent(Component component);

        string DeleteComponent(string componentId);
    }
}
