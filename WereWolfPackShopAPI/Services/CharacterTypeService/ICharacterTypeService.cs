using WereWolfPackShopAPI.Models;

namespace WereWolfPackShopAPI.Services.CharacterTypeService
{
    public interface ICharacterTypeService
    {
        List<CharacterType> GetAllCharacterTypes(string productId);

        string CreateCharacterType(string productId ,CharacterType characterType);

        string UpdateCharacterType(CharacterType characterType);

        string DeleteCharacterType(string characterTypeId);
    }
}
