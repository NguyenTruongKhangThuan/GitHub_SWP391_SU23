using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp;

namespace WereWolfPackShopAPI.Services.ImageService
{
    public class ImageService : I_ImageService
    {
        private static IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "eczYU2hdfpDjPe9difUeKmBoT5vOCk4iC64czuSM",
            BasePath = "https://imagestorage-206cf-default-rtdb.asia-southeast1.firebasedatabase.app/"
        };
        private IFirebaseClient client = new FirebaseClient(config);

        public string RetrieveImage(string id, string modelName)
        {
            var get = client.Get($"{modelName}/{id}");
            string image = get.ResultAs<string>();
            return image;
        }

        public void UpdateImage(string imageSource, string id, string modelName)
        {
            var update = client.Set($"{modelName}/{id}", imageSource);
        }

        public void UploadImage(string imageSource, string id, string modelName)
        {
            var set = client.Set($"{modelName}/{id}", imageSource);
        }

        public string setImageName(IFormFile imgFile)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(imgFile.FileName)
                .Take(25).ToArray()).Replace(" ", "_");
            imageName = imageName + Path.GetExtension(imgFile.FileName);
            return imageName;
        }

        public void DeleteImage(string id, string modelName)
        {
            client.Delete($"{modelName}/{id}");
        }
    }
}
