import React, { useState } from 'react';
import { RiAdminFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const AdminAccount = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCancelEdit = () => {
    setIsEditingAccount(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center w-[95%] hover:underline font-bold justify-end p-6 mr-[20px]"
        onClick={handleAvatarClick}
      >
        Hello {sessionStorage.getItem("account")}
      </button>

      {isDropdownOpen && (
        <div className="absolute top-20 right-8 w-[200px] bg-white rounded shadow-md z-10">
          {/* Dropdown content */}
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-[16px] text-red-400">
              <Link to={"/auth"} 
                onClick={() => {
                  sessionStorage.removeItem("account")
                  sessionStorage.removeItem("accountToken")
                }}
              >
                Logout</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminAccount;