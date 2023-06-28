using BoardGameShopAPI.TempModels2;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.ComponentService
{
    public class ComponentService : IComponentService
    {
        private readonly BoardGameShopDbContext _context;
        public ComponentService(BoardGameShopDbContext context)
        {
            _context = context;
        }

        public string CreateComponent(Component component)
        {
            try
            {
                string tempId = _context.Components.LastOrDefault().ComponentId;
                string createdId = tempId == null ?
                    "O00000001" :
                    Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value) + 1)
                                  .ToString(new string('0', n.Value.Length)));

                component.ComponentId = createdId;
                _context.Components.Add(component);
                _context.SaveChanges();
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeleteComponent(string componentId)
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
                    _context.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public List<Component> GetGamePackComponents(string gamePackId)
        {
            try
            {
                return _context.Components.Where(c => c.GamePackId == gamePackId)
                    .OrderBy(c => c.ComponentId).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string UpdateComponent(Component component)
        {
            try
            {
                if(_context.Components.Find(component.ComponentId) == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.Components.Update(component);
                    _context.SaveChanges();
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
