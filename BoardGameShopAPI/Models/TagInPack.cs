using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace BoardGameShopAPI.Models;

public partial class TagInPack
{
    public int Id { get; set; }

    public string GamePackId { get; set; } = null!;

    public string GameTagId { get; set; } = null!;

    public virtual GamePack GamePack { get; set; } = null!;

    public virtual GameTag GameTag { get; set; } = null!;
}
