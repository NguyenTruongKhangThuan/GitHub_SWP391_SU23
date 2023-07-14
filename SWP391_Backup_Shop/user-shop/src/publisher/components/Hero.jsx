import React from 'react';

import Hero_Publisher from '../assets/Hero_Publisher.png'

import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
      <section className="bg-[url('https://rayark.com/news/20200331_cytusii30/screenshot_3.jpg')] h-[800px] bg-no-repeat bg-cover bg-center py-24">
        <div className='container mx-auto flex justify-start  h-full text-white'>
          {/* Text */}
          <div className='flex flex-col justify-center'>
            <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
              Welcome Onboard,<br/> {sessionStorage.getItem("account")} <br/>
              <span>Time to Publish your art!</span>
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;