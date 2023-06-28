using System;
using System.Collections.Generic;

namespace BoardGameShopAPI.TempModels2;

public partial class OrderDetail
{
    public string OrderDetailId { get; set; } = null!;

    public string? OrderId { get; set; }

    public string? GamePackId { get; set; }

    public int? Amount { get; set; }

    public double? Price { get; set; }

    public virtual GamePack? GamePack { get; set; }

    public virtual Order? Order { get; set; }
}
