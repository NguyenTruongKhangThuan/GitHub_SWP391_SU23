using System;
using System.Collections.Generic;

namespace BoardGameShopAPI.TempModels2;

public partial class Order
{
    public string OrderId { get; set; } = null!;

    public DateTime? OrderDate { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
