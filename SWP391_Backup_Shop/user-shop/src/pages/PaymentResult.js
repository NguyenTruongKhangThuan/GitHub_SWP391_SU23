import { useState } from "react";
import { getMoMoResult, deleteOrderAPI } from "../api/orderAPI";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import moment from "moment/moment";

function PaymentResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [time, setTime] = useState();

  const orderId = searchParams.get("orderId");
  const orderInfo = searchParams.get("orderInfo");
  const amount = searchParams.get("amount");
  const extraData = searchParams.get("extraData");
  const message = searchParams.get("message");

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  function PaymentRequest() {
    if (message === "Success") {
      getMoMoResult(extraData, orderId, orderInfo, amount, time).catch((err) =>
        window.alert(err.response.data)
      );
    } else {
      deleteOrderAPI(orderId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.data.response));
    }
  }

  return (
    <div
      onLoad={() => {
        var date = moment(Date.now.time)
          .format("DD/MM/YYYY h:mm:ss")
          .toString();
        setTime(date);
      }}
    >
      <Header />
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center gap-y-5 bg-white p-8 rounded-lg shadow-md">
          <div
            className={`relative ${
              message === "Success" ? "border-green-500" : "border-red-500"
            }`}
          >
            {message === "Success" ? (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  className="w-12 h-12 text-[#34D399]"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" fill="#34D399" />
                  <path d="M9 12l2 2 4-4" stroke="#fff" />
                </svg>
              </div>
            ) : (
              <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  className="w-12 h-12 text-red-500"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" fill="#EF4444" />
                  <path
                    fill="#FFFFFF"
                    d="M15.536 8.464a1 1 0 0 0-1.414 0L12 10.586l-2.122-2.122a1 1 0 1 0-1.414 1.414L10.586 12l-2.122 2.122a1 1 0 1 0 1.414 1.414L12 13.414l2.122 2.122a1 1 0 0 0 1.414-1.414L13.414 12l2.122-2.122a1 1 0 0 0 0-1.414z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div
            className={` p-4 text-center ${
              message === "Success" ? "text-[#4B8673]" : "text-red-500"
            } text-2xl font-semibold`}
          >
            {message}
          </div>
          <div className="w-full flex justify-between gap-x-8">
            <p className="text-gray-600 font-semibold">Order ID:</p>
            <p>{orderId}</p>
          </div>
          <div className="text-lg">{orderInfo}</div>
          <div className="w-full flex justify-between gap-x-8">
            <p className="font-semibold text-gray-600">Total Pay:</p>
            <p>{VND.format(amount)}</p>
          </div>
          <Link
            to="/shop"
            className="bg-gray-700 flex p-4 justify-center items-center text-white w-full max-w-sm mt-8 rounded-md font-medium hover:bg-gray-800"
            onClick={PaymentRequest}
          >
            Go Back To Shop Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentResult;
