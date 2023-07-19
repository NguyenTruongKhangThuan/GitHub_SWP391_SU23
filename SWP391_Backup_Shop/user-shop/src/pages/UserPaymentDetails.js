import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { getOrderDetailsAPI, getUserInfoAPI, getUserPaymentsAPI } from '../api/userAPI';
import { Link } from 'react-router-dom';
import moment from 'moment';

const UserPaymentDetails = () => {
    const [payments, setPayments] = useState([]);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });

    useEffect(() => {
        getAccountID();
        // refreshPaymentList();
    }, [])

    const getAccountID = async() => {
        await getUserInfoAPI(sessionStorage.getItem("accountToken"))
                .then((res) => {
                    refreshPaymentList(res.result.userId)
                })
                .catch((error) => console.log(error))
    }

    const refreshPaymentList = async(userId) => {
        await getUserPaymentsAPI(userId)
            .then((res) => {
                setPayments(res)
            })
            .catch((error) => console.log(error))
    }


  return (
    <div>
      <Header/>
      <section className='py-[120px]'>
        <div className='container mx-auto'>
            <h2 className='text-2xl font-bold'>User's Payment History Details</h2>
            <table className='w-full mt-5'>
                <thead>
                    <tr>
                        <th className='border-[2px] border-gray-300 px-4 py-2'>Payment ID</th>
                        <th className='border-[2px] border-gray-300 px-4 py-2'>Order ID</th>
                        <th className='border-[2px] border-gray-300 px-4 py-2'>Payment Date</th>
                        <th className='border-[2px] border-gray-300 px-4 py-2'>Payment Method</th>
                        <th className='border-[2px] border-gray-300 px-4 py-2'>Total Pay</th>
                        <th className='border-[2px] border-gray-300 px-4 py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr className={`${index % 2 === 0 ? 'bg-gray-100': 'bg-gray-200'}`}>
                            <td className='border-[2px] border-gray-300 px-4 py-2'>{payment.paymentId}</td>
                            <td className='border-[2px] border-gray-300 px-4 py-2'>{payment.orderId}</td>
                            <td className='border-[2px] border-gray-300 px-4 py-2'>{moment(payment.paymentDate).format("DD/MM/YYYY, h:mm:ss")}</td>
                            <td className='border-[2px] border-gray-300 px-4 py-2'>{payment.method}</td>
                            <td className='border-[2px] border-gray-300 px-4 py-2'>{VND.format(payment.amountOfMoney)}</td>
                            <td className='border-[2px] border-gray-300 px-4 py-2'>
                                <Link to={"/shop/user/orderdetails"}>
                                    <div className=' flex items-center justify-center'>
                                        <button    
                                            onClick={() => {
                                                sessionStorage.setItem("orderId", payment.orderId)
                                            }} 
                                            className=' flex items-center justify-center hover:underline'>
                                            View Order Details
                                        </button>
                                    </div>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        <div className='flex justify-end mt-4'>
            <Link 
                to={"/shop"}
                >
                    <button className="bg-red-400 hover:bg-red-500 rounded-md font-bold px-4 py-2">
                        Return to Shop
                    </button>
            </Link>
        </div>
        </div>
      </section>
    </div>
  )
}

export default UserPaymentDetails
