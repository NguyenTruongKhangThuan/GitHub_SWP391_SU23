import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { RiDashboardFill } from 'react-icons/ri';
import { FaUserCircle, FaMoneyBillWave, FaTags } from 'react-icons/fa';
import { GiCardRandom, GiRuleBook } from 'react-icons/gi';
import { MdGames, MdAddBusiness } from 'react-icons/md';
import Logo from '../../admin/assets/Logo.svg';
import {BsArrowLeftCircle, BsArrowRightCircle} from 'react-icons/bs'

const Sidebar = () => {
  const [expand, setExpand] = useState(false)

  const toggleExpand = () => {
    setExpand(!expand)
  }

  return (
    <div className={`${ !expand ? 'w-[240px]': 'w-[140px]'} bg-[#176B87] text-white duration-300`}>
      <div className="flex flex-col items-center gap-x-4 p-4">
        <img src={Logo} alt="Logo" className="w-[100px]" />
        <h2 className={`text-[18px] text-center font-medium`}>Werewolf Card Shop</h2>
      </div>
      <div className="flex flex-col justify-center">
        <ul className="p-4">
          <li className="mb-6">
            <NavLink
              to="/admin/dashboard"
              activeClassName="text-black bg-[#3AA6B9]"
              className="flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black"
            >
              <RiDashboardFill />
              <span hidden={expand}>Dashboard</span>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/users"
              activeClassName="text-black bg-[#3AA6B9]"
              className="flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black"
            >
              <FaUserCircle />
              <span hidden={expand}>Users</span>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/publishers"
              activeClassName="text-black bg-[#3AA6B9]"
              className="flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black"
            >
              <MdAddBusiness />
              <span hidden={expand}>Publishers</span>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/game-packages"
              activeClassName="text-black bg-[#3AA6B9]"
              className="flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black"
            >
              <GiCardRandom />
              <span hidden={expand}>Game Packages</span>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/boardgames"
              activeClassName="text-black bg-[#3AA6B9]"
              className="flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black"
            >
              <MdGames />
              <span hidden={expand}>Boardgames</span>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/transactions"
              activeClassName="text-black bg-[#3AA6B9]"
              className="flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black"
            >
              <FaMoneyBillWave />
              <span hidden={expand}>Transactions</span>
            </NavLink>
          </li>
          <li className="mb-6">
            <NavLink
              to="/admin/tags"
              activeClassName="text-black bg-[#3AA6B9]"
              className="flex items-center p-2 text-[16px] gap-x-3 text-white rounded-md hover:bg-[#baeae6] hover:text-black"
            >
              <FaTags />
              <span hidden={expand}>Tags</span>
            </NavLink>
          </li>
        </ul>
        <div className="flex justify-center cursor-pointer">
          {expand ?
            <BsArrowRightCircle size={30} onClick={toggleExpand} title="Expand"/>
            :
            <BsArrowLeftCircle size={30} onClick={toggleExpand} title="Close"/>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
