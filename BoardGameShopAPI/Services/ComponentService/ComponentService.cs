using BoardGameShopAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.ComponentService
{
    public class ComponentService : IComponentService
    {
        private readonly string ModelName = "Components";

        private readonly DbA9bc42BoardgameshopdbContext _context;
        public ComponentService(DbA9bc42BoardgameshopdbContext context)
        {
            _context = context;
        }

        public async Task<string> CreateComponent(Component component)
        {
            try
            {
                string createdId = _context.Components.OrderBy(x => x.ComponentId).LastOrDefault() == null ?
                    "CO00000001" :
                    Regex.Replace(_context.Components.OrderBy(x => x.ComponentId).LastOrDefault().ComponentId,
                    "\\d+", n => (int.Parse(n.Value) + 1).ToString(new string('0', n.Value.Length)));

                component.ComponentId = createdId;
                component.GamePack = _context.GamePacks.Find(component.GamePackId);

                _context.Components.Add(component);
                await _context.SaveChangesAsync();
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteComponent(string componentId)
        {
            try
            {
                Component component = _context.Components.Find(componentId);
                if (component == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.Components.Remove(component);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteListOfComponents(List<Component> components)
        {
            try
            {
                foreach (var component in components)
                {
                    Component deletedComponent = _context.Components.Find(component.ComponentId);

                    _context.Components.Remove(deletedComponent);
                    await _context.SaveChangesAsync();
                }
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<List<Component>> GetGamePackComponents(string gamePackId)
        {
            try
            {
                return await _context.Components.Where(c => c.GamePackId == gamePackId)
                    .OrderBy(c => c.ComponentId).ToListAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<string> UpdateComponent(Component component)
        {
            try
            {
                Component dbComponent = _context.Components.Find(component.ComponentId);
                if (dbComponent == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.Entry(dbComponent).CurrentValues.SetValues(component);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
