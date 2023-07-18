﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoardGameShopAPI.Models;

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
