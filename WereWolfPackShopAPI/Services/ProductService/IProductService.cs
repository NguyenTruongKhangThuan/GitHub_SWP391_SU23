using WereWolfPackShopAPI.Models;

namespace WereWolfPackShopAPI.Services.ProductService
{
    public interface IProductService
    {
        List<Product> GetAllProducts();

        string CreateProduct(Product product);

        string UpdateProduct(Product product);

        string DeleteProduct(string productId);

        Product GetProductById(string productId);
    }
}
