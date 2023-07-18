import React, { useState, useEffect } from "react";
import { getPaymentAPI } from "../../api/adminAPI";

const Transaction = () => {
  const [payments, setPayments] = useState([]);
  const [openDetailsForm, setOpenDetailsForm] = useState(false);
  const [transactionData, setTransactionData] = useState();

  useEffect(() => {
    refreshPaymentsList();
  });

  const refreshPaymentsList = async () => {
    await getPaymentAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setPayments(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="flex justify-between mt-4">
        <h1 className="mt-[20px] mb-[30px] font-bold text-2xl">
          Transactions Management
        </h1>
      </div>
      <table className="mt-[10px]">
        <thead>
          <tr className="text-[16px]">
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Transaction ID
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">User ID</th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">Order ID</th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Payment DateTime
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Payment Method
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Total Payment
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">State</th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {payments.map((payment, index) => (
            <tr
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
              } text-[16px]`}
            >
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {payment.paymentId}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {payment.userId}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {payment.orderId}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {payment.paymentDate}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {payment.method}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {payment.amountOfMoney}
              </td>
              <td
                className={`border-[2px] border-gray-500 pr-5 pl-2 ${
                  payment.state === "Pending"
                    ? "text-yellow-600"
                    : "text-green-400"
                }`}
              >
                {payment.state}
              </td>
              <td className="border-l-[2px] border-b-[2px] border-r-none border-gray-500 pr-5 pl-2">
                <button
                  className="bg-green-400 hover:bg-green-600 w-[160px] py-2 text-[18px] font-bold rounded-md"
                  onClick={() => {
                    setOpenDetailsForm(true);
                    setTransactionData(payment);
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openDetailsForm && transactionData && (
        <div className="flex justify-center">
          <form className="w-[840px] grid grid-cols-4">
            <div className="flex flex-col w-[400px]">
              <div className="flex flex-col mt-4">
                <label className="mb-3">Transaction ID</label>
                <input
                  type="text"
                  id="boardgameName"
                  placeholder="Enter Boardgame Name"
                  className="p-2 rounded-md"
                  value={transactionData.paymentId}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="mb-3">User ID</label>
                <input
                  type="text"
                  id=""
                  value={transactionData.userId}
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="mb-3">Order ID</label>
                <input
                  type="text"
                  id=""
                  value={transactionData.orderId}
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="mb-3">Payment Date Time</label>
                <input
                  type="text"
                  id=""
                  value={transactionData.paymentDate}
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="mb-3">Payment Method</label>
                <input
                  type="text"
                  id=""
                  value={transactionData.method}
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="mb-3">Total Pay</label>
                <input
                  type="text"
                  id=""
                  value={transactionData.amountOfMoney}
                  className="p-2 rounded-md"
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Transaction;
