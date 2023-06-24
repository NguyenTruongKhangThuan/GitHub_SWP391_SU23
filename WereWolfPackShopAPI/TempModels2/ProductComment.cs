using System;
using System.Collections.Generic;

namespace WereWolfPackShopAPI.TempModels2;

public partial class ProductComment
{
    public string ProductCommentId { get; set; } = null!;

    public string? ProductId { get; set; }

    public string? UserId { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public DateTime? CreatedDate { get; set; }

    public bool? Approval { get; set; }

    public int? Ranking { get; set; }

    public virtual Product? Product { get; set; }

    public virtual User? User { get; set; }
}
