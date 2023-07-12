import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { BsBag } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.svg'

const Header = () => {
  const {isOpen, setIsOpen} = useContext(SidebarContext)
  const {itemAmount} = useContext(CartContext)

  //Header State
  const [isActive, setIsActive] = useState(false);

  //Event Listener
  useEffect(() => {
    window.addEventListener('scroll', () =>{
      window.scrollY > 60 ? setIsActive(true): setIsActive(false)
    })
  })

  return (
    <header className={ `${isActive ?  'bg-white py-4 shadow-md' : 'bg-none py-6' } fixed w-full z-10 transition-all`}>
        <div className='container mx-auto flex items-center justify-between h-full'>
          {/* Logo */}
          <Link to={'/shop'}>
            <div>
              {/* Replace this image with an SVG of our project */}
              <img src={Logo} alt='' className='w-[40px]'/>
            </div>
          </Link>
          {/* Cart Quantity */}
          <div onClick={()=> setIsOpen(!isOpen)} 
                className='cursor-pointer flex relative max-w-[50px]'
          >
            <BsBag className='text-2xl'/>
            <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] rounded-full flex justify-center items-center text-white text-center'>{itemAmount}</div>
          </div>
        </div>
    </header>
  );
};

export default Header;
