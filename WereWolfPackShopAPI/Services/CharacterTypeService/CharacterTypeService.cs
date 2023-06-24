using WereWolfPackShopAPI.Services.ImageService;
using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.CharacterTypeService
{
    public class CharacterTypeService : ICharacterTypeService
    {
        private readonly string ModelName = "Character";
        private readonly WereWolfPackShopDbContext _dbContext;
        private readonly I_ImageService _imageService;
        public CharacterTypeService(WereWolfPackShopDbContext db, I_ImageService i_ImageService)
        {
            _dbContext = db;
            _imageService = i_ImageService;
        }

        public string CreateCharacterType(string productId, CharacterType characterType)
        {
            try
            {
                string id = "Char";
                bool check = true;
                if(_dbContext.CharacterTypes.Where(
                    c => c.CharacterTypeName == characterType.CharacterTypeName).FirstOrDefault() == null)
                {
                    do
                    {
                        Random random = new Random();
                        id += random.Next(1, 100000).ToString();

                        if (_dbContext.CharacterTypes.Find(id) == null)
                        {
                            check = false;
                        }
                        else
                        {
                            id = "Char";
                        }
                    } while (check);

                    _imageService.UploadImage(characterType.ImageSrc, id, ModelName);
                    characterType.CharacterTypeId = id;
                    characterType.Image = _imageService.setImageName(characterType.ImageFile);
                    characterType.ProductId = productId;
                    _dbContext.SaveChanges();
                    return "Success";
                }
                else
                {
                    return "Duplicated";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeleteCharacterType(string characterTypeId)
        {
            try
            {
                CharacterType characterType = _dbContext.CharacterTypes.Find(characterTypeId);
                if(characterType == null)
                {
                    return "Not Found";
                }
                else
                {
                    _imageService.DeleteImage(characterType.CharacterTypeId, ModelName);
                    _dbContext.CharacterTypes.Remove(characterType);
                    _dbContext.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public List<CharacterType> GetAllCharacterTypes(string productId)
        {
            try
            {
                return _dbContext.CharacterTypes.Where(c => c.ProductId == productId)
                    .OrderBy(c => c.CharacterTypeId).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string UpdateCharacterType(CharacterType characterType)
        {
            try
            {
                CharacterType dbCharacterType = _dbContext.CharacterTypes.Find(characterType.CharacterTypeId);
                if(dbCharacterType != null)
                {
                    dbCharacterType.CharacterTypeName = characterType.CharacterTypeName;
                    dbCharacterType.Description = characterType.Description;
                    dbCharacterType.NumberOfCharacter = characterType.NumberOfCharacter;
                    dbCharacterType.ImageFile = characterType.ImageFile;
                    dbCharacterType.ImageSrc = characterType.ImageSrc;

                    if(characterType.ImageFile != null)
                    {
                        dbCharacterType.Image = _imageService.setImageName(characterType.ImageFile);
                    }
                    else
                    {
                        dbCharacterType.Image = characterType.Image;
                    }

                    _dbContext.SaveChanges();
                    return "Success";
                }
                else
                {
                    return "Not Found";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
