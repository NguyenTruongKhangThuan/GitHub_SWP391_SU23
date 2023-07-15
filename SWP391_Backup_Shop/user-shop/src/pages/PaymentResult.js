import { useState } from "react";
import { getMoMoResult, getOrderDetailByOrderId } from "../api/orderAPI";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";

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
      <Header/>
      <div className="w-full h-screen flex justify-center items-center">
        <sesion className="flex flex-col items-center gap-y-5  ">
          <div>{message}</div>
          <div className="flex items-center justify-between gap-x-[156px]">
            <p>OrderID:</p> 
            <p>{orderId}</p>
          </div>
          <div>{orderInfo}</div>
          <div className="flex items-center justify-between gap-x-[180px]">
            <p>Total Pay:</p>
            <p>{amount}</p>
          </div>
          <Link
            to="/shop"
            className="bg-gray-700 flex p-4 justify-center items-center text-white w-[300px] font-medium"
          >
            Go Back To Shop Page
          </Link>
        </sesion>
  
      </div>
    </div>
  );
}

export default PaymentResult;
