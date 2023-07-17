import React, { useEffect, useState } from 'react'
import { getUserAPI } from '../../api/adminAPI';


const Users = () => {
  const [userData, setUserData] = useState([])
  const [viewDetails, setViewDetails] = useState(false)
  const [userAtIndex, setUserAtIndex]= useState()

  useEffect(() => {
    refreshUserList();
  }, [])

  //call API to get all Users Data
  const refreshUserList = async () => {
    await getUserAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setUserData(data))
      .catch((error) => console.log(error))
  }

  const toggleViewDetails = (index) => {
    setViewDetails(!viewDetails)
    setUserAtIndex(index)

  }

  return (
    <div>
      <div className='flex justify-between'>
        <h2>Users Management</h2>
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
        {userData.map((user, index) => (
          <tbody className='bg-gray-200'>
            {/* Dynamically update the data */}
            <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'} text-[16px]`}>
              {/* Note: The declaration of each td must match with the define in SQL */}
              <td className='border-[2px] border-gray-500 pr-5 p-4'>{user.userId}</td>
              <td className='border-[2px] border-gray-500 pr-5 p-4'>{user.username}</td>
              <td className='border-[2px] border-gray-500 pr-5 p-4'>{user.fullName}</td>
              <td className='border-[2px] border-gray-500 pr-5 p-4'>{user.email}</td>
              <td className='border-[2px] border-gray-500 pr-5 p-4'>{user.password}</td>
              <td className='border-l-[2px] border-b-[2px] border-r-[2px] border-gray-500 pr-5 pl-2'>
                <button
                  className='bg-green-400 hover:bg-green-600 w-[160px] p-2 text-[18px] font-bold rounded-md'
                  onClick={toggleViewDetails}
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        ))}

      </table>
      {viewDetails && (
        <div className='flex flex-col '>
          <h2 className='mt-10'>User Details</h2>
          <div className='grid grid-cols-3 mt-8'>
            <div className='flex flex-col m-2'>
              {/* Add value into each input */}
              <label>User ID</label>
              <input type='text' readOnly className='w-[240px] rounded-md' value={userData[userAtIndex]}/>
            </div>
            <div className='flex flex-col m-2'>
              <label>User Name</label>
              <input type='text' readOnly className='w-[240px] rounded-md' />
            </div>
            <div className='flex flex-col m-2'>
              <label>User Fullname</label>
              <input type='text' readOnly className='w-[240px] rounded-md' />
            </div>
            <div className='flex flex-col m-2'>
              <label>User Email</label>
              <input type='text' readOnly className='w-[240px] rounded-md' />
            </div>
            <div className='flex flex-col m-2'>
              <label>User Phone Number</label>
              <input type='text' readOnly className='w-[240px] rounded-md' />
            </div>
            <div className='flex flex-col m-2'>
              <label>User Gender</label>
              <input type='text' readOnly className='w-[240px] rounded-md' />
            </div>
            <div className='flex flex-col m-2'>
              <label>User Sign Up Date</label>
              <input type='text' readOnly className='w-[240px] rounded-md'/>
            </div>
          </div>
          <div>
            <button className='p-3 text-[16px] font-bold bg-red-500 w-[200px]  rounded-md'
              onClick={toggleViewDetails}>
              Cancel View Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users
