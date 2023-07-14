import React,{useEffect, useState} from 'react'
import { getUserAPI } from '../../api/adminAPI';


const Users = () => {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    refreshUserList();
  },[])

  //call API to get all Users Data
  const refreshUserList = async() => {
    await getUserAPI(sessionStorage.getItem("accountToken"))
          .then((data) => setUserData(data))
          .catch((error) => console.log(error))
  }

  
  return (
    <div>
      <h1 className='mt-[20px] mb-[30px] font-bold text-2xl'>User Management</h1>
      <table className='border-[2px] w-full text-left text-[18px]'>
        <thead className='border-b-[1px]'>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>User Fullname</th>
            <th>User Email</th>
            <th>User Password</th>
          </tr>
        </thead>
        <tbody className='bg-gray-200'>
          {/* Dynamically update the data */}
          {userData.map((user) => (
            <tr>
              {/* Note: The declaration of each td must match with the define in SQL */}
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users
