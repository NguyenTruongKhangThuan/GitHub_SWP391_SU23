import { useState } from "react";
import { getMoMoResult, getOrderDetailByOrderId } from "../api/orderAPI";
import { Link, useSearchParams } from "react-router-dom";

function PaymentResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);

  const orderId = searchParams.get("orderId");
  const orderInfo = searchParams.get("orderInfo");
  const amount = searchParams.get("amount");
  const extraData = searchParams.get("extraData");
  const message = searchParams.get("message");

  if (result === null) {
    getMoMoResult(extraData, orderId, orderInfo, amount)
      .then((res) => setResult(res))
      .catch((err) => window.alert(err.response.data));
  }

  if (orderDetail === null) {
    getOrderDetailByOrderId(orderId)
      .then((res) => setOrderDetail(res))
      .catch((err) => window.alert(err.response.data));
  }

  return (
    <div>
      <div>{message}</div>
      <div>{orderId}</div>
      <div>{orderInfo}</div>
      <div>{amount}</div>

      <Link
        to="/shop"
        className="bg-gray-700 flex p-4 justify-center items-center text-white w-[300px] font-medium"
      >
        Go Back To Shop Page
      </Link>
    </div>
  );
}

export default PaymentResult;
