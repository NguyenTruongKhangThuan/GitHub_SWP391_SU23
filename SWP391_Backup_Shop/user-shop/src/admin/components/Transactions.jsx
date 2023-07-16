import React, { useState, useEffect } from 'react'
import { getPaymentAPI } from '../../api/adminAPI'

const Transaction = () => {

  const [payments, setPayments] = useState([])

  useEffect(() => {
    refreshPaymentsList();
  })

  const refreshPaymentsList = async () => {
    await getPaymentAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setPayments(data))
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <div className='flex justify-between mt-4'>
        <h1 className='mt-[20px] mb-[30px] font-bold text-2xl'>Transactions Management</h1>
        <button
          className='bg-blue-500 flex items-center justify-center w-[120px] h-[80px] rounded-md'

        >
          Add
        </button>
      </div>
      <table className='mt-[10px]'>
        <thead>
          <tr className='text-[16px]'>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>Transaction ID</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>User ID</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>Order ID</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>Payment DateTime</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>Payment Method</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>Total Payment</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>State</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>Actions</th>
          </tr>
        </thead>
        <tbody className='bg-gray-200'>
          {payments.map((payment, index) => (
            <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'} text-[16px]`}>
                <td className='border-[2px] border-gray-500 pr-5 pl-2'>{payment.paymentId}</td>
                <td className='border-[2px] border-gray-500 pr-5 pl-2'>{payment.userId}</td>
                <td className='border-[2px] border-gray-500 pr-5 pl-2'>{payment.orderId}</td>
                <td className='border-[2px] border-gray-500 pr-5 pl-2'>{payment.paymentDate}</td>
                <td className='border-[2px] border-gray-500 pr-5 pl-2'>{payment.method}</td>
                <td className='border-[2px] border-gray-500 pr-5 pl-2'>{payment.amountOfMoney}</td>
                <td className={`border-[2px] border-gray-500 pr-5 pl-2 ${payment.state === "Pending" ? 'text-yellow-600' : 'text-green-400'}`}>{payment.state}</td>
                <td className='border-l-[2px] border-b-[2px] border-r-none border-gray-500 pr-5 pl-2'>
                    <button
                        className='bg-green-400 hover:bg-green-600 w-[160px] py-2 text-[18px] font-bold rounded-md'

                    >
                        View Details
                    </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transaction
