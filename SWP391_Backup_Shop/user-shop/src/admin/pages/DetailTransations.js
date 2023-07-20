import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import AdminAccount from '../components/AdminAccount';
import moment from 'moment';

const DetailTransations = () => {
  const location = useLocation();
  let {paymentInfo} = location.state;
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });


  return (
    <div>
      <div className='flex justify-end mt-2 mr-4'><AdminAccount/></div>
      <h2 className='mt-2 p-[42px] font-bold text-center text-2xl'>Payment Details - {paymentInfo.paymentId}</h2>
      <div className="flex justify-center items-center ">
        <div className='grid grid-cols-2 justify-center gap-x-4'>
          <div className="flex flex-col mt-4">
            <label className="mb-3 font-bold">Transaction ID</label>
            <input
              type="text"
              id="boardgameName"
              placeholder="Enter Boardgame Name"
              className="p-2 w-[240px] rounded-md"
              readOnly
              value={paymentInfo.paymentId}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="mb-3 font-bold">User ID</label>
            <input
              type="text"
              id=""
              value={paymentInfo.userId}
              className="p-2 w-[240px] rounded-md"
              readOnly
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="mb-3 font-bold">Order ID</label>
            <input
              type="text"
              id=""
              readOnly
              value={paymentInfo.orderId}
              className="p-2 w-[240px] rounded-md"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="mb-3 font-bold">Payment Date Time</label>
            <input
              type="text"
              id=""
              readOnly
              value={moment(paymentInfo.paymentDate).format("DD/MM/YYYY")}
              className="p-2 w-[240px] rounded-md"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="mb-3 font-bold">Payment Method</label>
            <input
              type="text"
              id=""
              value={paymentInfo.method}
              readOnly
              className="p-2 w-[240px] rounded-md"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="mb-3 font-bold">Total Pay</label>
            <input
              type="text"
              id=""
              value={VND.format(paymentInfo.amountOfMoney)}
              readOnly
              className="p-2 w-[240px] rounded-md"
            />
          </div>
        </div>
      </div>
        <div className='mt-4 flex justify-end mr-[400px]'>
            <Link to={"/admin/transactions"}>
                <button
                    className="p-3 text-[16px] font-bold bg-red-500 w-[200px] rounded-md"
                >
                    Return
                </button>
            </Link>
        </div>
    </div>
  )
}

export default DetailTransations
