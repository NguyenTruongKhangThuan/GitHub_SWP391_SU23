using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoardGameShopAPI.Models;

public partial class BoardGame
{
    public string BoardGameId { get; set; } = null!;

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Image { get; set; }

    [NotMapped]
    public string? ImageSrc { get; set; }

    public virtual ICollection<GamePack> GamePacks { get; set; } = new List<GamePack>();
}
