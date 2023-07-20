import React, { useEffect, useState } from "react";
import { getUserAPI } from "../../api/adminAPI";
import AdminAccount from "../components/AdminAccount";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);
  const [userAtIndex, setUserAtIndex] = useState();
  const [userDetail, setUserDetail] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    refreshUserList();
  }, []);

  //call API to get all Users Data
  const refreshUserList = async () => {
    await getUserAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setUserData(data))
      .catch((error) => console.log(error));
  };

  const toggleViewDetails = (index) => {
    setViewDetails(!viewDetails);
    setUserAtIndex(index);
  };

  //Dropdown
  const Dropdown = ({user}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen)
    }

    return (
      <div className="relative">
        <button
          className="bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white font-bold rounded-md"
          onClick={toggleDropdown}
        >
          Actions
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                navigate(`/admin/users/details/${user.userId}`, {state: {userInfo: user}})
              }}
            >
              View Details
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mt-2">
      <div className="flex justify-end mr-[60px]"><AdminAccount/></div>
      <div className="p-8">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Users Management</h2>
        </div>
        <table className="mt-[10px]">
          <thead>
            <tr className="text-[16px]">
              <th 
                className="border-t-[2px] border-b-[2px] border-l-[2px] border-r-none border-gray-500 pr-5 px-3">
                  <p className="p-2">User ID</p>
              </th>
              <th 
                className="border-t-[2px] border-b-[2px] border-l-none border-r-none border-gray-500 pr-5 px-3">
                  <p className="p-2">Username</p>
              </th>
              <th 
                className="border-t-[2px] border-b-[2px] border-l-none border-r-none border-gray-500 pr-5 px-3">
                <p className="p-2">User Fullname</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-l-none border-r-none border-gray-500 pr-5 px-3">
                <p className="p-2">User Email</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-l-none border-r-none border-gray-500 pr-5 px-3">
                <p className="p-2">User Password</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-l-none border-r-[2px] border-gray-500 pr-5 px-3"></th>
            </tr>
          </thead>
          {userData.map((user, index) => (
            <tbody key={user.userId} className="bg-gray-200">
              {/* Dynamically update the data */}
              <tr
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } text-[16px]`}
              >
                {/* Note: The declaration of each td must match with the define in SQL */}
                <td className={`${userData[userData.length - 1].userId === user.userId? 'border-b-[2px]': ''} border-l-[2px] border-gray-500 pr-5 p-4`}>
                  {user.userId}
                </td>
                <td className={`${userData[userData.length - 1].userId === user.userId? 'border-b-[2px]': ''} border-gray-500 pr-5 p-4`}>
                  {user.username}
                </td>
                <td className={`${userData[userData.length - 1].userId === user.userId? 'border-b-[2px]': ''} border-gray-500 pr-5 p-4`}>
                  {user.fullName}
                </td>
                <td className={`${userData[userData.length - 1].userId === user.userId? 'border-b-[2px]': ''} border-gray-500 pr-5 p-4`}>
                  {user.email}
                </td>
                <td className={`${userData[userData.length - 1].userId === user.userId? 'border-b-[2px]': ''} border-gray-500 pr-5 p-4`}>
                  {user.password}
                </td>
                <td className={`${userData[userData.length - 1].userId === user.userId? 'border-b-[2px]': ''} border-r-[2px] border-gray-500 pr-5 pl-2`}>
                  <Dropdown user={user}/>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {viewDetails && userDetail && (
          <div className="flex flex-col ">
            <h2 className="mt-10">User Details</h2>
            <div className="grid grid-cols-3 mt-8">
              <div className="flex flex-col m-2">
                {/* Add value into each input */}
                <label>User ID</label>
                <input
                  type="text"
                  readOnly
                  className="w-[240px] rounded-md"
                  value={userDetail.userId}
                />
              </div>
              <div className="flex flex-col m-2">
                <label>User Name</label>
                <input
                  type="text"
                  readOnly
                  className="w-[240px] rounded-md"
                  value={userDetail.username}
                />
              </div>
              <div className="flex flex-col m-2">
                <label>User Fullname</label>
                <input
                  type="text"
                  readOnly
                  className="w-[240px] rounded-md"
                  value={userDetail.fullName}
                />
              </div>
              <div className="flex flex-col m-2">
                <label>User Email</label>
                <input
                  type="text"
                  readOnly
                  className="w-[240px] rounded-md"
                  value={userDetail.email}
                />
              </div>
              <div className="flex flex-col m-2">
                <label>User Phone Number</label>
                <input
                  type="text"
                  readOnly
                  className="w-[240px] rounded-md"
                  value={userDetail.phoneNumber}
                />
              </div>
              <div className="flex flex-col m-2">
                <label>User Gender</label>
                <input
                  type="text"
                  readOnly
                  className="w-[240px] rounded-md"
                  value={userDetail.gender}
                />
              </div>
              <div className="flex flex-col m-2">
                <label>User Sign Up Date</label>
                <input
                  type="text"
                  readOnly
                  className="w-[240px] rounded-md"
                  value={userDetail.signUpDate}
                />
              </div>
            </div>
            <div>
              <button
                className="p-3 text-[16px] font-bold bg-red-500 w-[200px]  rounded-md"
                onClick={toggleViewDetails}
              >
                Cancel View Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
