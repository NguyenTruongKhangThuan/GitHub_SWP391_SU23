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
      <div className='flex justify-between'>
                <h2>Users Management</h2>
                <button
                    className='bg-blue-500 flex justify-center w-[120px] p-2 rounded-md'

                >
                    Add
                </button>
            </div>
      <table className='mt-[10px]'>
        <thead>
          <tr className='text-[16px]'>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>User ID</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>Username</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>User Fullname</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>User Email</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>User Password</th>
            <th className='border-[2px] border-gray-500 pr-5 px-3'>Actions</th>
          </tr>
        </thead>
        <tbody className='bg-gray-200'>
          {/* Dynamically update the data */}
          {userData.map((user, index) => (
            <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'} text-[16px]`}>
              {/* Note: The declaration of each td must match with the define in SQL */}
              <td className='border-[2px] border-gray-500 pr-5 pl-2'>{user.userId}</td>
              <td className='border-[2px] border-gray-500 pr-5 pl-2'>{user.username}</td>
              <td className='border-[2px] border-gray-500 pr-5 pl-2'>{user.fullName}</td>
              <td className='border-[2px] border-gray-500 pr-5 pl-2'>{user.email}</td>
              <td className='border-[2px] border-gray-500 pr-5 pl-2'>{user.password}</td>
              <td className='border-l-[2px] border-b-[2px] border-r-none border-gray-500 pr-5 pl-2'>
                  <button
                      className='bg-green-400 hover:bg-green-600 w-[160px] p-4 text-[18px] font-bold rounded-md'

                  >
                      View Details
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users
