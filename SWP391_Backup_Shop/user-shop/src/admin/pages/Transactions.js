import React, { useState, useEffect } from "react";
import { getPaymentAPI } from "../../api/adminAPI";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import AdminAccount from "../components/AdminAccount";

const Transaction = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const [payment, setPayment] = useState();

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  useEffect(() => {
    refreshPaymentsList();
  },[]);

  const refreshPaymentsList = async () => {
    await getPaymentAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setPayments(data))
      .catch((error) => console.log(error));
  };

  //Dropdown
  const Dropdown = ({payment}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen)
    }

    return (
      <div className="relative">
        <button
          className="bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white font-bold rounded-md"
          onClick={toggleDropdown}
        >
          Actions
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                navigate(`/admin/transactions/details/${payment.paymentId}`, {state: {paymentInfo: payment}})
              }}
            >
              View Details
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className='flex justify-end mt-2 mr-4'><AdminAccount/></div>
      <div className="p-8">
        <div className="flex justify-between mt-4">
          <h1 className="mt-[20px] mb-[30px] font-bold text-2xl">
            Transactions Management
          </h1>
        </div>
        <table className="mt-[10px]">
          <thead>
            <tr className="text-[16px]">
              <th className="border-l-[2px] border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                <p className="p-2">Transaction ID</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                <p className="p-2">User ID</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                <p className="p-2">Order ID</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                <p className="p-2">Payment DateTime</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                <p className="p-2">Payment Method</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                <p className="p-2">Total Payment</p>
              </th>
              <th className="border-r-[2px] border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3"></th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {payments.map((payment, index) => (
              <tr
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } text-[16px]`}
              >
                <td className={`${payments[payments.length - 1].paymentId === payment.paymentId ? "border-b-[2px]": ""} border-l-[2px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{payment.paymentId}</p>
                </td>
                <td className={`${payments[payments.length - 1].paymentId === payment.paymentId ? "border-b-[2px]": ""} border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{payment.userId}</p>
                </td>
                <td className={`${payments[payments.length - 1].paymentId === payment.paymentId ? "border-b-[2px]": ""} border-gray-500 pr-5 pl-2`}>
                   <p className="p-2">{payment.orderId}</p>
                </td>
                <td className={`${payments[payments.length - 1].paymentId === payment.paymentId ? "border-b-[2px]": ""} border-gray-500 pr-5 pl-2`}>
                  <div className="flex justify-between gap-x-10 p-2">
                    <p>{moment(payment.paymentDate).format("DD/MM/YYYY")}</p>
                    <p>{moment(payment.paymentDate).format("hh:mm:ss")}</p>
                  </div>
                </td>
                <td className={`${payments[payments.length - 1].paymentId === payment.paymentId ? "border-b-[2px]": ""} border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{payment.method}</p>
                </td>
                <td className={`${payments[payments.length - 1].paymentId === payment.paymentId ? "border-b-[2px]": ""} border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{VND.format(payment.amountOfMoney)}</p>
                </td>
                <td 
                  className={`${payments[payments.length - 1].paymentId === payment.paymentId ? "border-b-[2px]": ""} border-r-[2px] border-gray-500 pr-5 pl-2`}
                  onClick={()=>setPayment(payment)}
                  >
                    <div className="p-2"><Dropdown payment={payment}/></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
