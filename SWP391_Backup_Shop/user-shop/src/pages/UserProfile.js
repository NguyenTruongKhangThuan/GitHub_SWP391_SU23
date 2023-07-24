import { useEffect, useState } from "react";
import React from "react";
import Header from "../components/Header";
import { getUserInfoAPI, updateUserAPI } from "../api/userAPI";
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

  const handleInputChange = (name, value) => {
    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };

  const confirmUpdate = (e) => {
    // e.preventDefault();
    setIsEditable(false);
    console.log(accountInfo);
    updateUserAPI(accountInfo)
      .then((res) => {
        sessionStorage.setItem("accountToken", res);
        window.alert("Update Complete");
      })
      .catch((err) => window.alert("Error Occur"));
  };

  return (
    <div className="bg-gradient-to-tr from-[#C0EEF2] to-[#146C94] h-screen bg-center bg-no-repeat">
      <Header />
      {accountInfo !== null && (
        <div className="py-[100px]">
          <section className="container mx-auto">
            <h2 className="text-2xl font-bold">User Profile</h2>
            <div className="flex justify-center">
              <form className="w-fit container mt-2 bg-white/10 p-10 drop-shadow-lg">
                <div className="flex flex-col gap-x-[120px]">
                  <div className="p-2 border-b-[1px]">
                    <section className="mb-4">
                      <h2 className="my-2 text-xl font-bold">
                        Account Information
                      </h2>
                      <div className="flex justify-between items-center mt-3">
                        <label className="font-semibold">Username</label>
                        <input
                          type="text"
                          className="p-2 w-[240px] rounded-md"
                          defaultValue={accountInfo.username}
                          readOnly={!isEditable}
                          onChange={(e) =>
                            handleInputChange("username", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <label className="font-semibold">Password</label>
                        <input
                          type="password"
                          className="p-2 w-[240px] rounded-md"
                          defaultValue={accountInfo.password}
                          readOnly={!isEditable}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                        />
                      </div>
                    </section>
                  </div>
                  <div className="p-2">
                    <section className="mt-4">
                      <h2 className="my-2 text-xl font-bold">
                        User Information
                      </h2>
                      <div className="">
                        <div className="flex justify-between items-center mt-3 gap-x-3">
                          <label className="font-semibold">Full Name</label>
                          <input
                            type="text"
                            className="p-2 w-[240px] rounded-md"
                            defaultValue={accountInfo.fullName}
                            readOnly={!isEditable}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                          />
                        </div>
                        <div className="flex justify-between items-center mt-3 gap-x-3">
                          <label className="font-semibold">Email</label>
                          <input
                            type="text"
                            className="p-2 w-[240px] rounded-md"
                            defaultValue={accountInfo.email}
                            readOnly={!isEditable}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                          />
                        </div>
                        <div className="flex justify-between mt-3 items-center gap-x-3">
                          <label className="font-semibold">Phone Number</label>
                          <input
                            type="text"
                            className="p-2 w-[240px] rounded-md"
                            defaultValue={accountInfo.phoneNumber}
                            readOnly={!isEditable}
                            onChange={(e) =>
                              handleInputChange("phoneNumber", e.target.value)
                            }
                          />
                        </div>
                        <div className="flex justify-between mt-3 items-center gap-x-3">
                          <label className="font-semibold">Address</label>
                          <input
                            type="text"
                            className="p-2 w-[240px] rounded-md"
                            defaultValue={accountInfo.address}
                            readOnly={!isEditable}
                            onChange={(e) =>
                              handleInputChange("address", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex justify-end gap-x-4 mt-8 mr-[160px]">
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
                  onClick={() => confirmUpdate()}
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
