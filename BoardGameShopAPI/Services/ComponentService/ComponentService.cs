using BoardGameShopAPI.Models;
using BoardGameShopAPI.Services.FirebaseCloundService;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.ComponentService
{
    public class ComponentService : IComponentService
    {
        private readonly string ModelName = "Components";

        private readonly BoardGameShopDbContext _context;
        private readonly IFirebaseCloundService _firebaseCloundService;
        public ComponentService(BoardGameShopDbContext context, IFirebaseCloundService firebaseCloundService)
        {
            _context = context;
            _firebaseCloundService = firebaseCloundService;
        }

        public async Task<string> CreateComponent(Component component)
        {
            try
            {
                string tempId = _context.Components.OrderBy(x => x.ComponentId).LastOrDefault().ComponentId;
                string createdId = tempId == null ?
                    "O00000001" :
                    Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value) + 1)
                                  .ToString(new string('0', n.Value.Length)));

                _firebaseCloundService.UploadImage(component.ImageSrc, component.Image, ModelName);

                component.ComponentId = createdId;
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
                    _firebaseCloundService.DeleteImage(component.Image, ModelName);

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

        public async Task<List<Component>> GetGamePackComponents(string gamePackId)
        {
            try
            {
                return await _context.Components.Select(c => new Component()
                {
                    ComponentId = c.ComponentId,
                    GamePackId = c.GamePackId,
                    Type = c.Type,
                    Amount = c.Amount,
                    Description = c.Description,
                    Image = c.Image,
                    ImageSrc = _firebaseCloundService.RetrieveImage(c.Image, ModelName),
                }).Where(c => c.GamePackId == gamePackId)
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
                if(_context.Components.Find(component.ComponentId) == null)
                {
                    return "NotFound";
                }
                else
                {
                    _firebaseCloundService.UpdateImage(component.ImageSrc, component.Image, ModelName);

                    _context.Components.Update(component);
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
