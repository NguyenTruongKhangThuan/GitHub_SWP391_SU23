﻿using ProGCoder_MomoAPI.Models.Momo;
using ProGCoder_MomoAPI.Models.Order;

namespace BoardGameShopAPI.Services.MomoService
{
    public interface IMomoService
    {
        Task<MomoCreatePaymentResponseModel> CreatePaymentAsync(string userId, OrderInfoModel model);
        Task<MomoExecuteResponseModel> PaymentExecuteAsync(string extraData, string orderId, string orderInfo, string amount, DateTime time);
    }
}