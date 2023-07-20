﻿using BoardGameShopAPI.Models;
using BoardGameShopAPI.Services.PaymentService;
using Microsoft.Extensions.Options;
using Nancy.Json;
using Newtonsoft.Json;
using ProGCoder_MomoAPI.Models.Momo;
using ProGCoder_MomoAPI.Models.Order;
using RestSharp;
using System.Security.Cryptography;
using System.Text;

namespace BoardGameShopAPI.Services.MomoService
{
    public class MomoService : IMomoService
    {
        private readonly IOptions<MomoOptionModel> _options;
        private readonly IPaymentService _paymentService;

        public MomoService(IOptions<MomoOptionModel> options, IPaymentService paymentService)
        {
            _options = options;
            _paymentService = paymentService;
        }

        public async Task<MomoCreatePaymentResponseModel> CreatePaymentAsync(string userId, OrderInfoModel model)
        {
            //---------Modify after Successfully Test---------
            model.OrderId = model.OrderId;
            //------------------------------------------------
            model.OrderInfo = "Customer: " + model.FullName + ".\n Detail: " + model.OrderInfo;
            string extradata = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes("{\"userId\": \""+userId+"\"}"));

            var rawData =
                $"partnerCode={_options.Value.PartnerCode}&accessKey={_options.Value.AccessKey}&requestId={model.OrderId}&amount={model.Amount}&orderId={model.OrderId}&orderInfo={model.OrderInfo}&returnUrl={_options.Value.ReturnUrl}&notifyUrl={_options.Value.NotifyUrl}&extraData={extradata}";

            var signature = ComputeHmacSha256(rawData, _options.Value.SecretKey);

            var client = new RestClient(_options.Value.MomoApiUrl);
            var request = new RestRequest() { Method = Method.Post };
            request.AddHeader("Content-Type", "application/json; charset=UTF-8");

            // Create an object representing the request data
            var requestData = new
            {
                accessKey = _options.Value.AccessKey,
                partnerCode = _options.Value.PartnerCode,
                requestType = _options.Value.RequestType,
                notifyUrl = _options.Value.NotifyUrl,
                returnUrl = _options.Value.ReturnUrl,
                orderId = model.OrderId,
                amount = model.Amount.ToString(),
                orderInfo = model.OrderInfo,
                requestId = model.OrderId,
                extraData = extradata,
                signature = signature
            };

            request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);

            var response = await client.ExecuteAsync(request);

            return JsonConvert.DeserializeObject<MomoCreatePaymentResponseModel>(response.Content);
        }

        public async Task<MomoExecuteResponseModel> PaymentExecuteAsync(string extraData, string orderId, string orderInfo, string amount, DateTime time)
        {
            string jsonString = System.Text.Encoding.UTF8.GetString(System.Convert.FromBase64String(extraData));
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            dynamic result = javaScriptSerializer.Deserialize<Object>(jsonString);
            string userId = result["userId"];

            //Create payment data for storing
            Payment payment = new Payment()
            {
                PaymentId = "",
                UserId = userId,
                OrderId = orderId,
                PaymentDate = time,
                Method = "MOMO",
                AmountOfMoney = Convert.ToDouble(amount),
                State = "Pending"
            };
            await _paymentService.CreatePayment(payment);

            return new MomoExecuteResponseModel()
            {
                Amount = amount,
                OrderId = orderId,
                OrderInfo = orderInfo,
            };
        }

        private string ComputeHmacSha256(string message, string secretKey)
        {
            var keyBytes = Encoding.UTF8.GetBytes(secretKey);
            var messageBytes = Encoding.UTF8.GetBytes(message);

            byte[] hashBytes;

            using (var hmac = new HMACSHA256(keyBytes))
            {
                hashBytes = hmac.ComputeHash(messageBytes);
            }

            var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

            return hashString;
        }
    }
}