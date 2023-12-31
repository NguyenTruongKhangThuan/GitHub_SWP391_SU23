import React, { useContext, useEffect, useState, useRef } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { BsBag } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../img/Logo.png";
import { getBoardGameAPI } from "../api/productAPI";

const Header = (props) => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { searchFunction, getBoardGame } = props;

  //Header State
  const [isActive, setIsActive] = useState(false);
  const [categories, setCategories] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  //Account State
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  //Event Listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  useEffect(() => {
    getBoardGameAPI()
      .then((res) => {
        setCategories(res);
        getBoardGame(res);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    searchFunction(searchValue, category);
  };

  const handleFilter = (value) => {
    searchFunction(value, "");
  };

  return (
    <header
      className={`${
        isActive ? "bg-[#03001C] py-2 shadow-md" : "bg-[#181818] py-2"
      } fixed w-full z-10 transition-all duration-300`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="flex justify-start gap-x-8">
          {/* Logo */}
          <Link to={"/shop"}>
            <div>
              {/* Replace this image with an SVG of our project */}
              <img src={Logo} alt="" className="w-[80px]" />
            </div>
          </Link>
          <div className="flex items-center">
            <div className="flex h-[50px] justify-center">
              {/* Category Filter */}
              <select
                id="categories"
                className="py-1 outline-none b border border-gray-400"
                onChange={(e) => {
                  setCategory(e.target.value);
                  handleFilter(e.target.value);
                  searchFunction("", e.target.value);
                }}
              >
                <option>All</option>
                {categories &&
                  categories.map((item) => <option>{item.name}</option>)}
              </select>
              <input
                type="text"
                placeholder="Search..."
                id="searchValue"
                className="px-3 py-2 w-[400px] border border-gray-400"
                onChange={(e) => setSearchValue(e.target.value)}
              ></input>
              <button
                className="px-3 py-2 w-[100px] border border-gray-400 bg-[#ffffff] rounded-r-xl"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-[30px] text-gray-200">
          <div className="rounded-full w-[100px] px-3 py-2 text-center hover:underline">
            <Link to={"/shop"}>Home</Link>
          </div>
          <div className="rounded-full w-[100px] px-3 py-2 text-center hover:underline">
            <Link to={"/shop/category"}>Shop</Link>
          </div>
          <div className="rounded-full w-[100px] px-3 py-2 text-center hover:underline">
            <Link to={"/shop/special"}>Special</Link>
          </div>
          <div
            className="hover:underline cursor-pointer"
            onClick={toggleDropdown}
          >
            {sessionStorage.getItem("account") !== null ? (
              <p>Hello {sessionStorage.getItem("account")}</p>
            ) : (
              <Link to={"/auth"}>
                <p>Log In</p>
              </Link>
            )}
          </div>
          {dropdown && (
            <div className="dropdown absolute right-[230px] top-[56px] mt-2 h-[100px] bg-white rounded-lg shadow-lg">
              <div className="flex flex-col justify-center items-center gap-y-4">
                <Link to={"/shop/user/profile"}>
                  <button className="mt-1 px-4 py-2 text-sm text-center flex justify-center items-center text-gray-800 hover:bg-gray-100 hover:rounded-md">
                    My Profile
                  </button>
                </Link>
                <Link to={"/shop/user/paymentdetails"}>
                  <button className="px-4 py-2 text-sm text-center flex justify-center items-center text-gray-800 hover:bg-gray-100 hover:rounded-md">
                    My Order
                  </button>
                </Link>
              </div>
            </div>
          )}
          {sessionStorage.getItem("account") !== null && (
            <Link
              to={"/"}
              className="hover:underline"
              onClick={() => {
                sessionStorage.removeItem("account");
                sessionStorage.removeItem("accountToken");
              }}
            >
              <p>Logout</p>
            </Link>
          )}
          {/* Cart Quantity */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative max-w-[50px]"
          >
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] rounded-full flex justify-center items-center text-white text-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
