import React from 'react';
import Logo from '../img/Logo.png'

const Footer = () => {
  return (
    <footer className='bg-primary py-12'>
      <div className='flex flex-col justify-center items-center'>
        <img src={Logo} alt='logo' className='w-[120px]'/>
        <div className='container mx-auto'>
          <p className='text-white text-center'> Copyright &copy; SWP391_Boardgame Shop, All rights reserved</p>
        </div>
      </div>
    </footer>
    );
};

export default Footer;
