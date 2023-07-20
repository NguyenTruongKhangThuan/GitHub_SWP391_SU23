import React from 'react'
import AdminAccount from '../components/AdminAccount'
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment'

const UserDetails = () => {
    const location = useLocation();
    let {userInfo} = location.state;
    return (
        <div>
            <div className='flex justify-end'><AdminAccount/></div>
            <div className="flex flex-col items-center">
                <h2 className="mt-10 font-bold text-2xl text-center">User Details - {userInfo.userId}</h2>
                <div className="grid grid-cols-2 mt-8 w-[640px] justify-center items-center">
                    <div className="flex flex-col m-2">
                        {/* Add value into each input */}
                        <label className='font-bold mb-2'>User ID</label>
                        <input
                            type="text"
                            readOnly
                            className="w-[240px] rounded-md p-1"
                            value={userInfo.userId}
                        />
                    </div>
                    <div className="flex flex-col m-2">
                        <label className='font-bold mb-2'>User Name</label>
                        <input
                            type="text"
                            readOnly
                            className="w-[240px] rounded-md p-1"
                            value={userInfo.username}
                        />
                    </div>
                    <div className="flex flex-col m-2">
                        <label className='font-bold mb-2'>User Fullname</label>
                        <input
                            type="text"
                            readOnly
                            className="w-[240px] rounded-md p-1"
                            value={userInfo.fullName}
                        />
                    </div>
                    <div className="flex flex-col m-2">
                        <label className='font-bold mb-2'>User Email</label>
                        <input
                            type="text"
                            readOnly
                            className="w-[240px] rounded-md p-1"
                            value={userInfo.email}
                        />
                    </div>
                    <div className="flex flex-col m-2">
                        <label className='font-bold mb-2'>User Phone Number</label>
                        <input
                            type="text"
                            readOnly
                            className="w-[240px] rounded-md p-1"
                            value={userInfo.phoneNumber}
                        />
                    </div>
                    <div className="flex flex-col m-2">
                        <label className='font-bold mb-2'>User Gender</label>
                        <input
                            type="text"
                            readOnly
                            className="w-[240px] rounded-md p-1"
                            value={userInfo.gender}
                        />
                    </div>
                    <div className="flex flex-col m-2">
                        <label className='font-bold mb-2'>User Sign Up Date</label>
                        <input
                            type="text"
                            readOnly
                            className="w-[240px] rounded-md p-1"
                            value={moment(userInfo.signUpDate).format("DD/MM/YYYY")}
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <Link to={"/admin/users"}>
                        <button
                            className="p-3 text-[16px] font-bold bg-red-500 w-[200px] rounded-md"
                            
                        >
                            Cancel View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
