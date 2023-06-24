using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WereWolfPackShopAPI.TempModels2;

public partial class Product
{
    public string ProductId { get; set; } = null!;

    public string? DiscountId { get; set; }

    public string? ProductName { get; set; }

    public string? Description { get; set; }

    public double? Price { get; set; }

    public int? AvailableAmount { get; set; }

    public string? Image { get; set; }

    [NotMapped]
    public IFormFile? ImageFile { get; set; }

    [NotMapped]
    public string? ImageSrc { get; set; }

    public virtual ICollection<CharacterType> CharacterTypes { get; set; } = new List<CharacterType>();

    public virtual Discount? Discount { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<ProductComment> ProductComments { get; set; } = new List<ProductComment>();
}
