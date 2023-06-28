namespace BoardGameShopAPI.Services.FirebaseCloundService
{
    public interface IFirebaseCloundService
    {
        void UploadImage(string imageSource, string id, string modelName);

        string RetrieveImage(string id, string modelName);

        void UpdateImage(string imageSource, string id, string modelName);

        void DeleteImage(string id, string modelName);

        string setImageName(IFormFile imgFile);
    }
}
