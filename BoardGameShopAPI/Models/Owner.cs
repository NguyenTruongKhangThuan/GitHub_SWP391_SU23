using System;
using System.Collections.Generic;

namespace BoardGameShopAPI.Models;

public partial class Owner
{
    public string OwnerId { get; set; } = null!;

    public string? OwnerName { get; set; }

    public string? Password { get; set; }

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<GamePack> GamePacks { get; set; } = new List<GamePack>();
}
