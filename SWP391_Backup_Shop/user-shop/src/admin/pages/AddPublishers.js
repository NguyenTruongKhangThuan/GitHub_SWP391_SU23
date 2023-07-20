import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {
  getOwnerAPI,
  postOwnersAPI
} from "../../api/adminAPI";
import AdminAccount from '../components/AdminAccount';

const AddPublishers = () => {
  const navigate = useNavigate();

  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    refreshPublishersList();
  }, []);

  const refreshPublishersList = async () => {
    await getOwnerAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setPublishers(data))
      .catch((error) => console.log(error));
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
        refreshPublishersList();
        navigate("/admin/publishers")
      })
      .catch((error) => window.alert(error.response.data));
  };

  return (
    <div>
      <div className='flex justify-end p-4'><AdminAccount/></div>
      <div className="flex justify-center">
        <form className="w-[840px]">
          <div className="grid grid-cols-2 mt-4">
            <div className="flex flex-col w-[400px]">
              <div className="flex flex-col mt-4">
                <label className="mb-3 font-bold">Publisher Username</label>
                <input
                  type="text"
                  id="ownerUsername"
                  placeholder="Enter Publisher username"
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="mb-3 font-bold">Publisher Password</label>
                <input
                  type="password"
                  id="ownerPassword"
                  placeholder="Enter Publisher Password"
                  className="p-2 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col w-[400px]">
              <div className="flex flex-col mt-4">
                <label className="mb-3 font-bold">Publisher Fullname</label>
                <input
                  type="text"
                  id="ownerFullName"
                  placeholder="Enter Publisher Fullname"
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="mb-3 font-bold">Publisher Email</label>
                <input
                  type="text"
                  id="ownerEmail"
                  placeholder="Enter Publisher Email"
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="mb-3 font-bold">Publisher Phone Number</label>
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
                  className="bg-blue-500 hover:bg-blue-600 font-bold items-center mt-4 p-4 w-[120px] rounded-md"
                >
                  Add
                </button>
                <button
                  className="bg-red-500 hover:bg-red-500 font-bold items-center mt-4 p-4 w-[120px] rounded-md"
                  onClick={() =>navigate("/admin/publishers")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPublishers
