using System;
using System.Collections.Generic;

namespace BoardGameShopAPI.Models;

public partial class Payment
{
    public string PaymentId { get; set; } = null!;

    public string? UserId { get; set; }

    public string? OrderId { get; set; }

    public DateTime? PaymentDate { get; set; }

    public string? Method { get; set; }

    public double? AmountOfMoney { get; set; }

    public string? State { get; set; }

    public virtual Order? Order { get; set; }

    public virtual User? User { get; set; }
}
