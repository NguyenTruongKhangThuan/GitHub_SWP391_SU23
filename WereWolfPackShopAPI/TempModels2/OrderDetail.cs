using System;
using System.Collections.Generic;

namespace WereWolfPackShopAPI.TempModels2;

public partial class OrderDetail
{
    public string OrderDetailId { get; set; } = null!;

    public string? OrderId { get; set; }

    public string? ProductId { get; set; }

    public int? Amount { get; set; }

    public double? Price { get; set; }

    public double? Discount { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Product? Product { get; set; }
}
