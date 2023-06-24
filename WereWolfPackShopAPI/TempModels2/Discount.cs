using System;
using System.Collections.Generic;

namespace WereWolfPackShopAPI.TempModels2;

public partial class Discount
{
    public string DiscountId { get; set; } = null!;

    public string? DiscountName { get; set; }

    public string? Description { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public double? DiscountValue { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
