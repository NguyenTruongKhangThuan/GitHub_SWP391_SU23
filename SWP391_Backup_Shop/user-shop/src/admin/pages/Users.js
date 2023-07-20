import React, { useEffect, useState } from "react";
import { getUserAPI } from "../../api/adminAPI";
import AdminAccount from "../components/AdminAccount";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [viewDetails, setViewDetails] = useState(false);
  const [userAtIndex, setUserAtIndex] = useState();
  const [userDetail, setUserDetail] = useState();

  //Pagination

  //Step 1: Declare 
  const itemsPerPage = 10; // Adjust this value as per your preference
  const [currentPage, setCurrentPage] = useState(1);

  //Step 2: Pagination Function
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
  const Dropdown = ({ user }) => {
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
                navigate(`/admin/users/details/${user.userId}`, { state: { userInfo: user } })
              }}
            >
              View Details
            </button>
          </div>
        )}
      </div>
    )
  }
  // Modify the following line to calculate the starting and ending index of the items to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="mt-2">
      <div className="flex justify-end mr-[60px]"><AdminAccount /></div>
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
          {userData.slice(startIndex, endIndex).map((user, index) => (
            <tbody key={user.userId} className="bg-gray-200">
              {/* Dynamically update the data */}
              <tr
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  } text-[16px]`}
              >
                {/* Note: The declaration of each td must match with the define in SQL */}
                <td className={`border-b-[1px] border-l-[2px] border-gray-500 pr-5 p-4`}>
                  {user.userId}
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 p-4`}>
                  {user.username}
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 p-4`}>
                  {user.fullName}
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 p-4`}>
                  {user.email}
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 p-4`}>
                  {user.password}
                </td>
                <td className={`border-b-[1px] border-r-[2px] border-gray-500 pr-5 pl-2`}>
                  <Dropdown user={user} />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {/* Add the pagination controls */}
        <div className="flex justify-end mr-[380px]">
          <div className="flex justify-center items-center mt-4">
            <button
              className="mr-2 bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white font-bold rounded-md"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-xl font-bold mx-4">
                Page {currentPage} of {Math.ceil(userData.length / itemsPerPage)}
            </p>
            <button
              className="ml-2 bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white font-bold rounded-md"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={endIndex >= userData.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
