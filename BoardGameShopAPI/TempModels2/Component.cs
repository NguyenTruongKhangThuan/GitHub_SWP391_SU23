using System;
using System.Collections.Generic;

namespace BoardGameShopAPI.TempModels2;

public partial class Component
{
    public string ComponentId { get; set; } = null!;

    public string? GamePackId { get; set; }

    public string? Type { get; set; }

    public int? Amount { get; set; }

    public string? Description { get; set; }

    public string? Image { get; set; }

    public virtual GamePack? GamePack { get; set; }
}
