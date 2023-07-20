import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment'
import AdminAccount from '../components/AdminAccount'

const PublisherDetails = () => {
  const location = useLocation();
  let {publisherInfo} = location.state;
  return (
    <div>
      <div className='flex justify-end p-2'><AdminAccount/></div>
      <h2 className='text-center font-bold text-2xl'>Publisher Information: {publisherInfo.ownerId}</h2>
      <div className="flex justify-center">
            <form className="w-[840px]">
              <div className="grid grid-cols-2 mt-4">
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Publisher ID</label>
                    <input
                      type="text"
                      id="ownerId"
                      className="p-2 rounded-md"
                      value={publisherInfo.ownerId}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Publisher Username</label>
                    <input
                      type="text"
                      id="ownerUsername"
                      className="p-2 rounded-md"
                      value={publisherInfo.ownerName}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Publisher Password</label>
                    <input
                      type="password"
                      id="ownerPassword"
                      className="p-2 rounded-md"
                      value={publisherInfo.password}
                    />
                  </div>
                  <div></div>
                </div>
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Publisher Fullname</label>
                    <input
                      type="text"
                      id="ownerFullName"
                      className="p-2 rounded-md"
                      value={publisherInfo.fullName}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Publisher Email</label>
                    <input
                      type="text"
                      id="ownerEmail"
                      className="p-2 rounded-md"
                      value={publisherInfo.email}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Publisher Phone Number</label>
                    <input
                      type="text"
                      id="ownerPhoneNumber"
                      className="p-2 rounded-md"
                      value={publisherInfo.phoneNumber}
                    />
                  </div>
                </div>
              </div>
              <Link to={"/admin/publishers"} className='flex justify-end'>
                  <button
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 mt-4 text-[18px] font-bold rounded-md"
                  >
                    Cancel View Details
                  </button>
              </Link>
            </form>
          </div>
    </div>
  )
}

export default PublisherDetails
