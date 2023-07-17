﻿using BoardGameShopAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoardGameShopAPI.Models;

public partial class GamePack
{
    public string GamePackId { get; set; } = null!;

    public string? BoardGameId { get; set; }

    public string? OwnerId { get; set; }

    public string? GamePackName { get; set; }

    public string? Image { get; set; }

    public string? Description { get; set; }

    public double? Price { get; set; }

    public int? Age { get; set; }

    public string? NumberOfPlayer { get; set; }

    public int? GameDuration { get; set; }

    public string? Origin { get; set; }

    public double? Weight { get; set; }

    public string? Size { get; set; }

    public string? Material { get; set; }

    public string? GameRule { get; set; }

    public int? AvailableAmount { get; set; }

    [NotMapped]
    public string? ImageSrc { get; set; }

    public virtual BoardGame? BoardGame { get; set; }

    public virtual ICollection<Component> Components { get; set; } = new List<Component>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual Owner? Owner { get; set; }

    public virtual ICollection<TagInPack> TagInPacks { get; set; } = new List<TagInPack>();
}