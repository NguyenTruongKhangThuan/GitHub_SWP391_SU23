using System;
using System.Collections.Generic;

namespace WereWolfPackShopAPI.TempModels2;

public partial class TransactionType
{
    public string TransactionTypeId { get; set; } = null!;

    public string? TransactionTypeName { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
