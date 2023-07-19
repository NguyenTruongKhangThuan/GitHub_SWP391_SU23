import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment'
import AdminAccount from '../components/AdminAccount'

const PublisherDetails = () => {
    const location = useLocation();
    let {publisher} = location.state;

    console.log(publisher);

  return (
    <div>
      <div className='flex justify-end'><AdminAccount/></div>
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
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Publisher Username</label>
                    <input
                      type="text"
                      id="ownerUsername"
                      className="p-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Publisher Password</label>
                    <input
                      type="password"
                      id="ownerPassword"
                      className="p-2 rounded-md"
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
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Publisher Email</label>
                    <input
                      type="text"
                      id="ownerEmail"
                      className="p-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Publisher Phone Number</label>
                    <input
                      type="text"
                      id="ownerPhoneNumber"
                      className="p-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <Link to={"/admin/publishers"}>
                  <button
                    className="bg-red-500 px-4 py-2 text-[18px] rounded-md"
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
