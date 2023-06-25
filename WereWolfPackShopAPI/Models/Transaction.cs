using System;
using System.Collections.Generic;

namespace WereWolfPackShopAPI.Models;

public partial class Transaction
{
    public string TransactionId { get; set; } = null!;

    public string? TransactionTypeId { get; set; }

    public string? UserId { get; set; }

    public string? OrderId { get; set; }

    public DateTime? TransactionDate { get; set; }

    public double? AmountOfMoney { get; set; }

    public string? State { get; set; }

    public virtual Order? Order { get; set; }

    public virtual TransactionType? TransactionType { get; set; }

    public virtual User? User { get; set; }
}
