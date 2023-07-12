import React from 'react';

//import banners
import WomanImg from '../img/woman_hero.png';

import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
      <section className='bg-red-200 h-[800px] bg-no-repeat bg-cover bg-center py-24'>
        <div className='container mx-auto flex justify-around h-full'>
          {/* Text */}
          <div className='flex flex-col justify-center'>
            {/* Pre Title */}
            <div className='font-semibold flex items-center uppercase'>
              <div className='w-10 h-[2px] mr-3 bg-red-400'></div>New Trend
            </div>
            <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
              AUTUMN SALE STYLISH <br/>
              <span>WOMENS</span>
            </h1>
            <Link to={'/shop/special'} className='self-start uppercase font-semibold border-b-2 border-primary'>
              Discover More
            </Link>
          </div>

          <div className='hidden lg:block'>
            <img src={WomanImg} alt=''/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
