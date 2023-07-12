import React, { useState, useEffect } from 'react';
import Logo from './../assets/Logo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        setShowNavbar(true); // Scrolling up, show the navbar
      } else {
        setShowNavbar(false); // Scrolling down, hide the navbar
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div>
      <div
        className={`text-white flex items-center max-w-[1240] mx-auto px-4 bg-black-400 justify-between font-sans ${
          showNavbar ? 'fixed top-0 left-0 w-full z-10 border-b-1 border-black-500' : 'absolute'
        }`}
      >
        <img
          src={Logo}
          alt='Logo'
          style={{ width: '100px', height: '124.5px' }}
          className='flex m2-4'
        ></img>
        <ul className='hidden md:flex'>
          <li className='p-4'>
            <button className='rounded-md w-[80px] h-[40px] hover:bg-slate-400 hover:text-black'>
              Home
            </button>
          </li>
          <li className='p-4'>
            <button className='rounded-md w-[80px] h-[40px] hover:bg-slate-400 hover:text-black'>
              About
            </button>
          </li>
          <li className='p-4'>
            <button className='rounded-md w-[80px] h-[40px] hover:bg-slate-400 hover:text-black'>
              Cards
            </button>
          </li>
          <li className='p-4'>
            <Link to={"/auth"}>
              <button className='rounded-md w-[80px] h-[40px] bg-blue-500 hover:bg-blue-700 hover:text-black'>
                Log In
              </button>
            </Link>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Navbar;
