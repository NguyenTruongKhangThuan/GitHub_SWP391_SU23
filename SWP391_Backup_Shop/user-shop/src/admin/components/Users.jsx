import React,{useState} from 'react'
import Table from './Table'
import AdminAccount from './AdminAccount'

const UserRole = () => {
  return(
    <div className='w-32 bg-[#48aed0] rounded-2xl flex items-center justify-center gap-x-4'>
      <div className='rounded-full w-[14px] h-[14px] bg-[#024490]'></div>
      <p>User</p>
    </div>
  )
}

const AdminRole = () => {
  return(
    <div className='w-32 bg-[#9DB2BF] flex items-center justify-center rounded-2xl gap-x-4'>
      <div className='rounded-full w-[14px] h-[14px] bg-[#526D82]'></div>
      <p>Admin</p>
    </div>
  )
}

const Users = () => {
  const [users, setUsers] = useState([
    { 
      ID: "U1", 
      Name: 'John Doe', 
      Email: 'john@example.com', 
      Phone_Number: '0123456789', 
      Gender: "Male", 
      Date_of_Birth: "12/09/2003", 
      Address: "12 This Street, This Distreet" ,
      Role: <UserRole/>
    },
    { ID: "U2", 
      Name: 'Jane Smith', 
      Email: 'jane@example.com', 
      Phone_Number: '0123456789', 
      Gender: "Male", 
      Date_of_Birth: "12/09/2003", 
      Address: "12 This Street, This Distreet",
      Role: <UserRole/> 
    },
    // Add more user objects as needed
    { ID: "U3", 
      Name: 'Admin', 
      Email: 'admin@example.com', 
      Phone_Number: '0123456789', 
      Gender: "Other", 
      Date_of_Birth: "12/09/2003", 
      Address: "12 This Street, This Distreet",
      Role: <AdminRole/> 
    }
  ]);

  const columns = [
    {label: "ID", field: "ID"},
    {label: "Name", field: "Name"},
    {label: "Email", field:"Email"},
    {label: "Phone Number", field:"Phone_Number"},
    {label: "Gender", field:"Gender", hidden: true},
    {label: "Date Of Birth", field:"Date_of_Birth", hidden: true},
    {label: "Address", field:"Address", hidden: true},
    {label: "Roles", field:"Role"}
  ];

  return (
    <div>
      <h1 className='mt-[20px] mb-[30px] font-bold text-2xl'>User Management</h1>
      
      <Table
        columns={columns}
        data={users}
        isView
      />
    </div>
  );
}

export default Users
