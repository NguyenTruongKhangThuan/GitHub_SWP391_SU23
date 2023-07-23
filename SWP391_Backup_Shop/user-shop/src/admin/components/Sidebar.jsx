import React, {useState} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiDashboardFill } from 'react-icons/ri';
import { FaUserCircle, FaMoneyBillWave, FaTags } from 'react-icons/fa';
import { GiCardRandom, GiRuleBook } from 'react-icons/gi';
import { MdGames, MdAddBusiness } from 'react-icons/md';
import Logo from '../../admin/assets/Logo.png';

const Sidebar = () => {
  const [expand, setExpand] = useState(false)

  const location = useLocation();

  const toggleExpand = () => {
    setExpand(!expand)
  }

  return (
    <div className={`${ !expand ? 'w-[240px]': 'w-[140px]'} bg-[#176B87] text-white duration-300`}>
      <div className="flex flex-col items-center gap-x-4 p-4">
        <img src={Logo} alt="Logo" className="w-[100px]" />
        <h2 className={`text-[18px] text-center font-medium`}>Boardgame Shop</h2>
      </div>
      <div className="flex flex-col justify-center">
        <ul className="p-4">
          <li className="mb-6">
            <NavLink
              to="/admin/dashboard"
              className={`flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black ${
                location.pathname.includes("/admin/dashboard") ? "text-black bg-[#3AA6B9]" : ""
              }`}
            >
              <RiDashboardFill/>
              {!expand ?  <span>Dashboard</span> : ''}
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/users"
              className={`flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black ${
                location.pathname.includes("/admin/users") ? "text-black bg-[#3AA6B9]" : ""
              }`}
            >
              <FaUserCircle />
              {!expand && <span>Users</span>}
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/publishers"
              className={`flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black ${
                location.pathname.includes("/admin/publishers") ? "text-black bg-[#3AA6B9]" : ""
              }`}
            >
              <MdAddBusiness />
              {!expand && <span>Publishers</span>}
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/game-packages"
              className={`flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black ${
                location.pathname.includes("/admin/game-packages") ? "text-black bg-[#3AA6B9]" : ""
              }`}
            >
              <GiCardRandom />
              {!expand && <span>Game Packages</span>}
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/boardgames"
              className={`flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black ${
                location.pathname.includes("/admin/boardgames") ? "text-black bg-[#3AA6B9]" : ""
              }`}
            >
              <MdGames />
              {!expand && <span>Boardgames</span>}
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/transactions"
              className={`flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black ${
                location.pathname.includes("/admin/transactions") ? "text-black bg-[#3AA6B9]" : ""
              }`}
            >
              <FaMoneyBillWave />
              {!expand && <span>Transactions</span>}
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/tags"
              className={`flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black ${
                location.pathname.includes("/admin/tags") ? "text-black bg-[#3AA6B9]" : ""
              }`}
            >
              <FaTags />
              {!expand && (
                <span>Tags</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
