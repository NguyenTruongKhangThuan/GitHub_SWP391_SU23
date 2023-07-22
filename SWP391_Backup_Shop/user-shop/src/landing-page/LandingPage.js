import './LandingPage.css';

import React, { useState, useEffect } from 'react';

import ForestBackground from './assets/Forest.png'

import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {  
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
    <div className='w-screen overflow-y-hidden'>
      <Navbar hidden={!showNavbar} />
      <div
        className="bg-cover bg-center h-[880px] items-center"
        style={{
          backgroundImage: `url(${ForestBackground})`, // Use the imported image as background
          marginTop: showNavbar ? 0 : '-80px',
        }}
      >
        <div className='flex justify-center'>
          <Hero/>
        </div>
      </div>
    </div>
  );
}

export default App;