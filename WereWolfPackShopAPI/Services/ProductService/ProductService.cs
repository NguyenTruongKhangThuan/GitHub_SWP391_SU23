using Microsoft.EntityFrameworkCore;
using WereWolfPackShopAPI.Services.ImageService;
using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly string ModelName = "Products";
        private readonly WereWolfPackShopDbContext _dbContext;
        private readonly I_ImageService _imageService;
        public ProductService(WereWolfPackShopDbContext context,I_ImageService imageService)
        {
            _dbContext = context;
            _imageService = imageService;
        }

        public string CreateProduct(Product product)
        {
            try
            {
                bool check = true;
                string id = "P";

                Product dbProduct = _dbContext.Products.Where(p => p.ProductName == product.ProductName).FirstOrDefault();
                if (dbProduct == null)
                {
                    do
                    {
                        Random random = new Random();
                        id += random.Next(1, 100).ToString();

                        if (_dbContext.Products.Find(id) == null)
                        {
                            check = false;
                        }
                        else
                        {
                            id = "P";
                        }
                    } while (check);

                    _imageService.UploadImage(product.ImageSrc, id, ModelName);

                    product.ProductId = id;
                    product.Image = _imageService.setImageName(product.ImageFile);
                    product.Discount = null;
                    _dbContext.Products.Add(product);
                    _dbContext.SaveChanges();
                    return "Success";
                }
                else
                {
                    return "Duplicated";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        public string DeleteProduct(string productId)
        {
            try
            {
                Product product = _dbContext.Products.Find(productId);
                if (product != null)
                {
                    product.AvailableAmount = -1;
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

        public List<Product> GetAllProducts()
        {
            try
            {
                return _dbContext.Products.Where(p => p.AvailableAmount != -1)
                    .OrderBy(p => p.ProductId).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Product GetProductById(string productId)
        {
            try
            {
                Product product = _dbContext.Products.Find(productId);
                if(product != null && product.AvailableAmount != -1)
                {
                    return product;
                }
                else
                {
                    return new Product();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public string UpdateProduct(Product product)
        {
            try
            {
                Product dbProduct = _dbContext.Products.Find(product.ProductId);
                if (dbProduct != null)
                {
                    dbProduct.ProductName       = product.ProductName;
                    dbProduct.Description       = product.Description;
                    dbProduct.Price             = product.Price;    
                    dbProduct.AvailableAmount   = product.AvailableAmount;
                    dbProduct.ImageFile         = product.ImageFile;
                    dbProduct.ImageSrc          = product.ImageSrc;

                    _imageService.UpdateImage(product.ImageSrc, product.ProductId, ModelName);
                    if(product.ImageFile != null)
                    {
                        dbProduct.Image = _imageService.setImageName(product.ImageFile);
                    }
                    else
                    {
                        dbProduct.Image = product.Image;
                    }

                    _dbContext.SaveChanges();
                    return "Success";
                }
                else
                    return "Not Found";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
