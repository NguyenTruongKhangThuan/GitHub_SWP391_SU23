import { useState } from "react";
import { getMoMoResult, deleteOrderAPI } from "../api/orderAPI";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";

function PaymentResult() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const orderInfo = searchParams.get("orderInfo");
  const amount = searchParams.get("amount");
  const extraData = searchParams.get("extraData");
  const message = searchParams.get("message");

  function PaymentRequest() {
    if (message === "Success") {
      getMoMoResult(extraData, orderId, orderInfo, amount).catch((err) =>
        window.alert(err.response.data)
      );
    } else {
      deleteOrderAPI(orderId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.data.response));
    }
  }

  return (
    <div>
      <Header />
      <div className="w-full h-screen flex justify-center items-center">
        <sesion className="flex flex-col items-center gap-y-5  ">
          <div>{message}</div>
          <div className="flex items-center justify-between gap-x-[156px]">
            <p>OrderID:</p>
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
            onClick={PaymentRequest}
          >
            Go Back To Shop Page
          </Link>
        </sesion>
      </div>
    </div>
  );
}

export default PaymentResult;
