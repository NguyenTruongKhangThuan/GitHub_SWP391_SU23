using ProGCoder_MomoAPI.Models.Momo;
using ProGCoder_MomoAPI.Models.Order;

namespace BoardGameShopAPI.Services.MomoService
{
    public interface IMomoService
    {
        Task<MomoCreatePaymentResponseModel> CreatePaymentAsync(string userId, OrderInfoModel model);
        MomoExecuteResponseModel PaymentExecuteAsync(IQueryCollection collection);
    }
}
