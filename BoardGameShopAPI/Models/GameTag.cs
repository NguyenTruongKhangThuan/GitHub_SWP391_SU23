using BoardGameShopAPI.Models;
using System;
using System.Collections.Generic;

namespace BoardGameShopAPI.Models;

public partial class GameTag
{
    public string GameTagId { get; set; } = null!;

    public string? GameTagName { get; set; }

    public virtual ICollection<TagInPack> TagInPacks { get; set; } = new List<TagInPack>();
}
