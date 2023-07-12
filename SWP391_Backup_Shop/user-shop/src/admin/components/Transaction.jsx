import React, { useState } from 'react'
import Table from './Table'
import AdminAccount from './AdminAccount'

const PendingStatus = () => {
  return(
    <div className='w-40 bg-yellow-300 rounded-2xl flex items-center justify-center gap-x-4'>
      <div className='rounded-full w-[14px] h-[14px] bg-yellow-500'></div>
      <p>Pending</p>
    </div>
  )
}

const CompleteStatus = () => {
  return(
    <div className='w-40 bg-green-500 flex items-center justify-center rounded-2xl gap-x-4'>
      <div className='rounded-full w-[14px] h-[14px] bg-green-700'></div>
      <p>Complete</p>
    </div>
  )
}

const Transaction = () => {
  const columns = [
    {label: "ID", field: "TransID"},
    {label: "Date", field: "TransDate"},
    {label: "Type", field: "TransType"},
    {label: "Purchase Status", 
    field: "TransStatus"},
    {label: "Total Price", field: "TransTotalPrice"}
  ];

  const [transactions, setTransactions] = useState([
    {
      TransID: 'TR01', 
      TransDate: '12/09/2023', 
      TransType: 'E-Wallet Purchase', 
      TransStatus: <CompleteStatus/>,
      TransTotalPrice: '100000 VND'
    }
  ]);

  const handleDeleteTransaction = (transaction) => {
    const updatedTransactions = transactions.filter((u) => u.ID !== transaction.ID);
    setTransactions(updatedTransactions);
  }

  const handleUpdateTransaction = (transaction) => {
    console.log('Updating transaction:', transaction);
  }

  return (
    <div>
      <h1 className='mt-[20px] mb-[30px] font-bold text-2xl'>Transactions Management</h1>
      
      <Table 
        columns={columns}
        data={transactions}
        onDelete={handleDeleteTransaction}
        onUpdate={handleUpdateTransaction}
        isView
        isUpdate
      />
    </div>
  )
}

export default Transaction
