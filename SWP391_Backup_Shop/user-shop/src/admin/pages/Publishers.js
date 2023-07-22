import React, { useEffect, useState } from "react";
import {
  getOwnerAPI,
  postOwnersAPI,
  putOwnersAPI,
  banOwnerAPI,
} from "../../api/adminAPI";
import AdminAccount from "../components/AdminAccount";
import { Link, useNavigate } from "react-router-dom";

const Owner = () => {
  const [publishers, setPublishers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshPublishersList();
  }, []);

  const refreshPublishersList = async () => {
    await getOwnerAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setPublishers(data))
      .catch((error) => console.log(error));
  };

  const [deleteItem, setDeleteItem] = useState(0); //delete according to the index
  const [publisherData, setPublisherData] = useState();

  const Dropdown = ({publisher}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };



    const handleBan = () => {
      banOwnerAPI(sessionStorage.getItem("accountToken"), deleteItem)
        .then((res) => {
          console.log(res);
          refreshPublishersList();
        })
        .catch((err) => console.log(err));
    };

    
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
                navigate(`/admin/publisher/details/${publisher.ownerId}`, {state: {publisherInfo: publisher}})
              }}
            >
              View Details
            </button>
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={handleBan}
            >
              Ban
            </button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    refreshPublishersList();
  }, []);

  //Step 1: Declare 
  const itemsPerPage = 10; // Adjust this value as per your preference
  const [currentPage, setCurrentPage] = useState(1);

  //Step 2: Pagination Function
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Modify the following line to calculate the starting and ending index of the items to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  return (
    <div className="mt-2">
      <div className="p-[60px]">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">Publishers Management</h2>
          <Link to={"/admin/publishers/create"}>
            <button
              className="bg-blue-500 flex justify-center mr-4 w-[100px] p-2 rounded-md font-bold"
            >
              Add
            </button>
          </Link>
        </div>
        <table className="mt-[10px]">
          <thead>
            <tr className="text-[16px]">
              <th className="border-l-[2px] border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                <p className="p-2">Publisher ID</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-l-none border-r-none border-gray-500 pr-5 px-3">
                <p className="p-2">Publisher Username</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-l-none border-r-none border-gray-500 pr-5 px-3">
                <p className="p-2">Publisher Password</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-l-none border-r-none border-gray-500 pr-5 px-3">
                <p className="p-2">Publisher Full Name</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-l-none border-r-none border-gray-500 pr-5 px-3">
                <p className="p-2">Publisher Email</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-l-none border-r-none border-gray-500 pr-5 px-3">
                <p className="p-2">Publisher Phone Number</p>
              </th>
              <th className="border-t-[2px] border-b-[2px] border-l-none border-r-[2px] border-gray-500 pr-5 px-3"></th>
            </tr>
          </thead>
          {publishers.slice(startIndex,endIndex).map((publisher, index) => (
            
            <tbody key={publisher.ownerId}>
              <tr
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } text-[16px]`}
              >
                <td className={`border-b-[1px] border-l-[2px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{publisher.ownerId}</p>
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{publisher.ownerName}</p>
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{publisher.password}</p>
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{publisher.fullName}</p>
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{publisher.email}</p>
                </td>
                <td className={`border-b-[1px] border-gray-500 pr-5 pl-2`}>
                  <p className="p-2">{publisher.phoneNumber}</p>
                </td>
                <td
                  className={`border-b-[1px] border-r-[2px] border-gray-500 pr-5 pl-2`}
                  onClick={() => {
                    setDeleteItem(publisher.ownerId);
                    setPublisherData(publisher);
                  }}
                >
                  <Dropdown publisher={publisher}/>
                </td>
              </tr>
          </tbody>
          ))}
        </table>
        <div className="flex justify-end mr-[60px]">
          <div className="flex justify-center items-center mt-4">
            <button
              className="mr-2 bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white font-bold rounded-md"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="text-xl font-bold mx-4">
                Page {currentPage} of {Math.ceil(publishers.length / itemsPerPage)}
            </p>
            <button
              className="ml-2 bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white font-bold rounded-md"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={endIndex >= publishers.length}
            >
              Next
            </button>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Owner;
