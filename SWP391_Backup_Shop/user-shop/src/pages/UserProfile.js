import { useEffect, useState } from "react";
import React from "react";
import Header from "../components/Header";
import { getUserInfoAPI } from "../api/userAPI";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    getAccountInfo();
  }, []);

  const getAccountInfo = async () => {
    await getUserInfoAPI(sessionStorage.getItem("accountToken"))
      .then((res) => setAccountInfo(res.result))
      .catch((error) => console.log(error));
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  return (
    <div className="bg-[url('https://wallpaperaccess.com/full/3146686.jpg')] h-screen bg-center bg-no-repeat">
      <Header />
      {accountInfo !== null && (
        <div className="py-[100px]">
          <section className="container mx-auto">
            <h2 className="text-2xl font-bold">User Profile</h2>
            <form className="w-fit container mt-2">
              <div className="grid grid-cols-2 gap-x-[200px]">
                <section>
                  <h2 className="my-2 text-xl font-bold">
                    Account Information
                  </h2>
                  <div className="flex justify-between items-center mt-3">
                    <label>Username</label>
                    <input
                      type="text"
                      className="p-2 w-[240px] rounded-md"
                      defaultValue={accountInfo.username}
                      readOnly={!isEditable}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="p-2 w-[240px] rounded-md"
                      defaultValue={accountInfo.password}
                      readOnly={!isEditable}
                    />
                  </div>
                </section>
                <section className="gap-y-4">
                  <h2 className="my-2 text-xl font-bold">User Information</h2>
                  <div className="gird grid-cols-2">
                    <div className="flex justify-between items-center mt-3 gap-x-3">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="p-2 w-[240px] rounded-md"
                        defaultValue={accountInfo.fullName}
                        readOnly={!isEditable}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-3 gap-x-3">
                      <label>Email</label>
                      <input
                        type="text"
                        className="p-2 w-[240px] rounded-md"
                        defaultValue={accountInfo.email}
                        readOnly={!isEditable}
                      />
                    </div>
                    <div className="flex justify-between mt-3 items-center gap-x-3">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="p-2 w-[240px] rounded-md"
                        defaultValue={accountInfo.phoneNumber}
                        readOnly={!isEditable}
                      />
                    </div>
                    <div className="flex justify-between mt-3 items-center gap-x-3">
                      <label>Address</label>
                      <input
                        type="text"
                        className="p-2 w-[240px] rounded-md"
                        defaultValue={accountInfo.address}
                        readOnly={!isEditable}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </form>
            <div className="flex justify-end gap-x-4 mt-8">
              <Link to={"/shop"}>
                <button className="text-[16px] font-bold bg-red-500 px-6 py-3 rounded-md">
                  Return to Shop
                </button>
              </Link>
              {!isEditable ? (
                <button
                  className="text-[16px] font-bold bg-yellow-500 px-6 py-3 rounded-md"
                  onClick={handleEditClick}
                >
                  Update Profile
                </button>
              ) : (
                <button
                  className="text-[16px] font-bold bg-green-500 px-6 py-3 rounded-md"
                  onClick={() => setIsEditable(false)}
                >
                  Save Changes
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
