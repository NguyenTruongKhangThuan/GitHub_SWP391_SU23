namespace WereWolfPackShopAPI.Services.ImageService
{
    public interface I_ImageService
    {
        void UploadImage(string imageSource, string id, string modelName);

        string RetrieveImage(string id, string modelName);

        void UpdateImage(string imageSource, string id, string modelName);

        void DeleteImage(string id, string modelName);

        string setImageName(IFormFile imgFile);
    }
}
