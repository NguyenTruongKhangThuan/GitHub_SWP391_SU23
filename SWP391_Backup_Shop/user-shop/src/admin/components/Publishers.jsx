import React, { useEffect, useState } from "react";
import { getOwnerAPI, postOwnersAPI, putOwnersAPI } from "../../api/adminAPI";
import AdminAccount from "./AdminAccount";

const Owner = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openDetailsForm, setOpenDetailsForm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(0); //delete according to the index

  const [publishers, setPublishers] = useState([]);
  const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleActionClick = (action) => {
      console.log(`Performing action: ${action}`);
      // Perform the desired action here
      // You can implement different logic for each action
      if (action === "View Details") {
        //view details
        setOpenDetailsForm(true);
        toggleDropdown(false);
      } else {
        setDeleteItem();
        toggleDropdown(false);
      }
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
              onClick={() => handleActionClick("View Details")}
            >
              View Details
            </button>
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={() => handleActionClick("Ban")}
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

  const refreshPublishersList = async () => {
    await getOwnerAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setPublishers(data))
      .catch((error) => console.log(error));
  };

  const toggleAddForm = () => {
    setOpenAddForm(!openAddForm);
    if (openAddForm === true) {
      console.log("Form opened!");
    } else {
      console.log("Form closed!");
    }
  };

  const addFormSubmission = (e) => {
    e.preventDefault();

    let publisherUsername = document.getElementById("ownerUsername").value;
    let publisherPassword = document.getElementById("ownerPassword").value;
    let publisherFullName = document.getElementById("ownerFullName").value;
    let publisherEmail = document.getElementById("ownerEmail").value;
    let publisherPhoneNumber =
      document.getElementById("ownerPhoneNumber").value;

    var formData = new FormData();
    formData.append("ownerId", "empty");
    formData.append("ownerName", publisherUsername);
    formData.append("password", publisherPassword);
    formData.append("fullName", publisherFullName);
    formData.append("email", publisherEmail);
    formData.append("phoneNumber", publisherPhoneNumber);

    // window.alert(publisherPassword)
    postOwnersAPI(sessionStorage.getItem("accountToken"), formData)
      .then((res) => {
        window.alert(res);
        refreshPublishersList();
      })
      .catch((error) => window.alert(error.response.data));

    setOpenAddForm(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2>Publishers Management</h2>
        <button
          className="bg-blue-500 flex justify-center w-[120px] p-2 rounded-md"
          onClick={toggleAddForm}
        >
          Add
        </button>
      </div>
      <table className="mt-[10px]">
        <thead>
          <tr className="text-[16px]">
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Publisher ID
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Publisher Username
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Publisher Password
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Publisher Full Name
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Publisher Email
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Publisher Phone Number
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3"></th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((publisher, index) => (
            <tr
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
              } text-[16px]`}
            >
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {publisher.ownerId}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {publisher.ownerName}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {publisher.password}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {publisher.fullName}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {publisher.email}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {publisher.phoneNumber}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {" "}
                <Dropdown />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openDetailsForm && (
        <div className="flex justify-center">
          <form className="w-[840px]">
            <div className="grid grid-cols-2 mt-4">
              <div className="flex flex-col w-[400px]">
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Publisher Username</label>
                  <input
                    type="text"
                    id="ownerUsername"
                    value
                    className="p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Publisher Password</label>
                  <input
                    type="password"
                    id="ownerPassword"
                    value
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
                    value
                    className="p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Publisher Email</label>
                  <input
                    type="text"
                    id="ownerEmail"
                    value
                    className="p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Publisher Phone Number</label>
                  <input
                    type="text"
                    id="ownerPhoneNumber"
                    value
                    className="p-2 rounded-md"
                  />
                </div>
              </div>
            </div>
            <button
              className="bg-red-500 px-4 py-2 text-[18px] rounded-md"
              onClick={() => setOpenDetailsForm(false)}
            >
              Cancel View Details
            </button>
          </form>
        </div>
      )}
      {openAddForm && (
        <div className="flex justify-center">
          <form className="w-[840px]">
            <div className="grid grid-cols-2 mt-4">
              <div className="flex flex-col w-[400px]">
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Publisher Username</label>
                  <input
                    type="text"
                    id="ownerUsername"
                    placeholder="Enter Publisher username"
                    className="p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Publisher Password</label>
                  <input
                    type="password"
                    id="ownerPassword"
                    placeholder="Enter Publisher Password"
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
                    placeholder="Enter Publisher Fullname"
                    className="p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Publisher Email</label>
                  <input
                    type="text"
                    id="ownerEmail"
                    placeholder="Enter Publisher Email"
                    className="p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Publisher Phone Number</label>
                  <input
                    type="text"
                    id="ownerPhoneNumber"
                    placeholder="Enter Publisher phone number"
                    className="p-2 rounded-md"
                  />
                </div>

                <div className=" flex justify-end items-center gap-x-6">
                  <button
                    onClick={addFormSubmission}
                    className="bg-blue-300 hover:bg-blue-600 items-center mt-4 p-4 w-[120px] rounded-md"
                  >
                    Add
                  </button>
                  <button
                    className="bg-red-300 hover:bg-red-500 items-center mt-4 p-4 w-[120px] rounded-md"
                    onClick={toggleAddForm}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Owner;
