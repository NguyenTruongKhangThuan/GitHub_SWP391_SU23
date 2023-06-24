using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WereWolfPackShopAPI.TempModels2;

public partial class CharacterType
{
    public string CharacterTypeId { get; set; } = null!;

    public string? ProductId { get; set; }

    public string? CharacterTypeName { get; set; }

    public string? Description { get; set; }

    public string? Image { get; set; }

    public int? NumberOfCharacter { get; set; }

    [NotMapped]
    public IFormFile? ImageFile { get; set; }

    [NotMapped]
    public string? ImageSrc { get; set; }

    public virtual Product? Product { get; set; }
}
