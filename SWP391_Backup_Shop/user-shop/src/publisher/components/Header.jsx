import React, { useContext, useEffect, useState } from 'react';
import { BsBag } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png'

const Header = () => {

  //Header State
  const [isActive, setIsActive] = useState(false);

  //Event Listener
  useEffect(() => {
    window.addEventListener('scroll', () =>{
      window.scrollY > 60 ? setIsActive(true): setIsActive(false)
    })
  })

  return (
    <header className={ `${isActive ?  'bg-[#03001C] py-4 shadow-md' : 'bg-none py-6' } fixed w-full z-10 transition-all text-white`}>
        <div className='container mx-auto flex items-center justify-between h-full'>
          <div className='flex justify-start gap-x-4'>
            {/* Logo */}
            <Link to={'/shop/publisher'}>
              <div>
                {/* Replace this image with an SVG of our project */}
                <img src={Logo} alt='' className='w-[40px]'/>
              </div>
            </Link>
          </div>
          <div className='flex items-center justify-end gap-x-8 '>
            <div className='rounded-full w-[120px] px-3 py-2 text-center hover:underline'>
              <Link to={'/shop/publisher'} >Home</Link>
            </div>
            <div className='rounded-full w-[120px] px-3 py-2 text-center hover:underline'>
              <Link to={'/shop/publisher/viewsales'}>Sales</Link>
            </div>
            <div className='rounded-full w-[120px] px-3 py-2 text-center hover:underline'>
              <Link to={'/shop/publisher/product/add'}>Add Items</Link>
            </div>
            <div className='hover:underline'>Hello {sessionStorage.getItem("account")}</div>
            <Link to={'/'} 
              className='hover:underline'
              onClick={() => {
                sessionStorage.removeItem("account")
                sessionStorage.removeItem("accountToken")
              }}
              >
              <p>Logout</p>
            </Link>
            
          </div>
          
        </div>
    </header>
  );
};

export default Header;
