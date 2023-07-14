import React, { useState } from "react";
import Logo from '../admin/assets/Logo.svg'
import Dashboard from '../admin/components/Dashboard'
import Users from '../admin/components/Users'
import GamePackages from './components/GamePackages'
import Transactions from '../admin/components/Transactions'
import Boardgames from './components/Boardgames'
import { MdGames, MdAddBusiness } from 'react-icons/md'
import { BsArrowLeftCircleFill} from 'react-icons/bs'
import { FaUserCircle, FaMoneyBillWave, FaTags } from 'react-icons/fa'
import { GiCardRandom, GiRuleBook } from 'react-icons/gi'
import { RiDashboardFill } from 'react-icons/ri'
import Publishers from "./components/Publishers";
import AdminAccount from "./components/AdminAccount"
import Tags from "./components/Tags";

function Admin() {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(0);

  const Menu = [
    {
      title: "Dashboard",
      page: Dashboard,
      icon: <RiDashboardFill />
    },
    {
      title: "User",
      page: Users,
      icon: <FaUserCircle />
    },
    {
      title: "Publisher",
      page: Publishers,
      icon: <MdAddBusiness />
    },
    {
      title: "Game Packages",
      page: GamePackages,
      icon: <GiCardRandom />
    },
    {
      title: "Boardgames",
      page: Boardgames,
      icon: <MdGames/>
    },
    {
      title: "Transactions",
      page: Transactions,
      icon: <FaMoneyBillWave />
    },
    {
      title: "Tags",
      page: Tags,
      icon: <FaTags/>
    }
  ];

  const handleMenuClick = (index) => {
      setSelectedMenu(index);
  };


  return (
    <div className="flex min-h-screen">
      <div className={`${open ? "w-[240px]" : "w-[100px]"} duration-500 min-h-screen bg-[#176B87] relative`}>
        <div className={`${open ? "flex flex-col justify-center items-center gap-x-4" : "flex flex-col items-center justify-center"} `}>
          <img src={Logo} alt="Logo" className="w-[100px]" />
          {open && <h2 className="text-[18px] text-center font-medium text-white duration-500">Werewolf Card Shop</h2>}
        </div>

        <BsArrowLeftCircleFill
          className={`absolute cursor-pointer left-8 bottom-10 text-[40px] font-bold text-white w-7 ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
          title={open ? "Collapse Sidebar" : "Expand Sidebar"}
        />
        <ul className="flex-col p-[36px]">
          {Menu.map((menu, index) => (
            <>
            <li
              key={index}
              className={`mb-[30px] flex items-center flex-col ${
                selectedMenu === index ? "bg-[#3AA6B9] rounded-md justify-center" : " justify-center"
              }`}
            >
              <button
                className="flex text-white text-[16px] gap-x-3 hover:bg-[#baeae6] hover:text-black w-full py-[10px] rounded-md"
                onClick={() => handleMenuClick(index)}
                title={open ? "" : menu.title}
              >
                <p className={"ml-[5px]"}>{menu.icon}</p>
                {open && <p>{menu.title}</p>}
              </button>

              
            </li>
            </>
          ))}
        </ul>
        
      </div>
      <div className="px-7 py-2 text-[20px] bg-[#A5C0DD] font-semibold flex-1 bg-cover overflow-y-auto">
          <div className="flex justify-end"><AdminAccount/></div>
          {Menu[selectedMenu].page && (
            React.createElement(Menu[selectedMenu].page, { isSidebarOpen: open, toggleSidebar: () => setOpen(!open) })
          )}
      </div>
    </div>
  );
}

export default Admin;
