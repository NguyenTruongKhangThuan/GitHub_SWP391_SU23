using System;
using System.Collections.Generic;

namespace BoardGameShopAPI.TempModels2;

public partial class BoardGame
{
    public string BoardGameId { get; set; } = null!;

    public string? Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<GamePack> GamePacks { get; set; } = new List<GamePack>();
}
