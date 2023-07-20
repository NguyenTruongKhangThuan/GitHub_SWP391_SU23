import React, { useState, useEffect } from "react";
import { getPaymentAPI } from "../../api/adminAPI";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import AdminAccount from "../components/AdminAccount";

const Transaction = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const [payment, setPayment] = useState();

  //Step 1: Declare 
  const itemsPerPage = 10; // Adjust this value as per your preference
  const [currentPage, setCurrentPage] = useState(1);

  //Step 2: Pagination Function
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Modify the following line to calculate the starting and ending index of the items to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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
        {payments.slice(startIndex,endIndex).map((payment, index) => (
          <tbody className="bg-gray-200">
              <tr
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } text-[16px]`}
              >
                <td className={`border-b-[1px] border-l-[2px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{payment.paymentId}</p>
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{payment.userId}</p>
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 pl-2`}>
                   <p className="p-2">{payment.orderId}</p>
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 pl-2`}>
                  <div className="flex justify-between gap-x-10 p-2">
                    <p>{moment(payment.paymentDate).format("DD/MM/YYYY")}</p>
                    <p>{moment(payment.paymentDate).format("hh:mm:ss")}</p>
                  </div>
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{payment.method}</p>
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{VND.format(payment.amountOfMoney)}</p>
                </td>
                <td 
                  className={`border-b-[1px] border-r-[2px] border-gray-500 pr-5 pl-2`}
                  onClick={()=>setPayment(payment)}
                  >
                    <div className="p-2"><Dropdown payment={payment}/></div>
                </td>
              </tr>
          </tbody>
        ))}
        </table>
         {/* Add the pagination controls */}
        <div className="flex justify-end mr-[160px]">
          <div className="flex justify-center items-center mt-4">
            <button
              className="mr-2 bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white font-bold rounded-md"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-xl font-bold mx-4">
              Page {currentPage} of {Math.ceil(payments.length / itemsPerPage)}
            </p>
            <button
              className="ml-2 bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white font-bold rounded-md"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={endIndex >= payments.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
