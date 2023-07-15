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

  const displayResult = () => {
    if (message === "Success") {
      getMoMoResult(extraData, orderId, orderInfo, amount)
        .then((res) => setResult(res))
        .catch((err) => window.alert(err.response.data));
    }
  }

  displayResult()

  return (
    <div>
      <Header />
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        <section className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center gap-y-5">
          <div className="text-xl">{message}</div>
          <div className="w-full flex justify-between gap-x-12">
            <p className="font-semibold">Order ID:</p>
            <p>{orderId}</p>
          </div>
          <div className="text-lg">{orderInfo}</div>
          <div className="w-full flex justify-between gap-x-20">
            <p className="font-semibold">Total Pay:</p>
            <p>{amount} VND</p>
          </div>
          <Link
            to="/shop"
            className="bg-gray-700 flex p-4 justify-center items-center text-white w-[300px] font-medium"
          >
            Go Back To Shop Page
          </Link>
        </section>
      </div>
    </div>
  );
}

export default PaymentResult;
