import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { BsBag } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../img/LogoCopy.svg";
import { getBoardGameAPI } from "../api/productAPI";

const Header = (props) => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { searchFunction } = props;

  //Header State
  const [isActive, setIsActive] = useState(false);
  const [categories, setCategories] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  //Event Listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  useEffect(() => {
    getBoardGameAPI()
      .then((res) => setCategories(res))
      .catch((err) => console.log(err.response));
  },[]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchFunction(searchValue, category);
  };

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="flex justify-start gap-x-8">
          {/* Logo */}
          <Link to={"/shop"}>
            <div>
              {/* Replace this image with an SVG of our project */}
              <img src={Logo} alt="" className="w-[40px]" />
            </div>
          </Link>
          <div className="flex">
            {/* Category Filter */}
            <select
              id="categories"
              className="py-2 PX-3 outline-none b border border-gray-400"
              onChange={(e) => setCategory(e.target.value)}
            >
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
              className="px-3 py-2 w-[100px] border border-gray-400"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-[30px] ">
          <div className="rounded-full w-[100px] px-3 py-2 text-center hover:underline">
            <Link to={"/shop"}>Home</Link>
          </div>
          <div className="rounded-full w-[100px] px-3 py-2 text-center hover:underline">
            <Link to={"/shop/category"}>Browse</Link>
          </div>
          <div className="rounded-full w-[100px] px-3 py-2 text-center hover:underline">
            <Link to={"/shop/special"}>Special</Link>
          </div>
          <div className="hover:underline">
            Hello {sessionStorage.getItem("account")}
          </div>
          <Link to={"/auth"} className="hover:underline" 
            onClick={() => {
              sessionStorage.removeItem("account")}
          }>
            <p>Logout</p>
          </Link>
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
