import React from 'react';

import Hero_Image from '../img/Hero.png'

import { Link } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Hero_1 = () => {
    return (
      <div>
        <section className="bg-[url('https://wallpapercave.com/wp/wp3748775.jpg')] h-[800px] bg-no-repeat bg-cover bg-center bg-opacity-30 py-24">
          <div className='container mx-auto flex justify-around h-full'>
            <div className='flex flex-col items-center justify-center text-white'>
              <div className='font-semibold flex items-center uppercase'>
                Strategical Building
              </div>
              <h1 className='text-[64px] leading-[1.1] text-center font-light mb-4'>
                CONQUER AND UNITE AS ONE<br/>
                {/* <span className='text-[48px] font-semibold'>BOARDGAMES</span> */}
              </h1>
              <Link to={'/shop/special'} className='self-center uppercase font-semibold border-b-2 border-white'>
                Discover More
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
}

const Hero_2 = () => {
  return(
    <div>
      <section className="bg-[url('https://c0.wallpaperflare.com/preview/937/656/43/play-board-game-cube-human-don-t-be-angry.jpg')] h-[800px] bg-no-repeat bg-opacity-20 bg-cover bg-center py-24">
        <div className='container mx-auto flex justify-start h-full text-white'>
          {/* Text */}
          <div className='flex flex-col justify-center items-start'>
            {/* Pre Title */}
            <div className='font-semibold flex items-center uppercase'>
              Roll Your Luck
            </div>
            <h1 className='text-[64px] leading-[1.1] text-left justify-center font-light mb-4'>
              READY, SET, ROLL!<br/>
              {/* <span className='text-[48px] font-semibold'>BOARDGAMES</span> */}
            </h1>
            <Link to={'/shop/special'} className='self-start uppercase font-semibold border-b-2 border-white'>
              Discover More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const Hero_3 = () => {
  return(
    <div>
      <section className="bg-[url('https://www.offtheeatenpathblog.com/wp-content/uploads/2020/04/tono-graphy-WtdIwprWnB4-unsplash-1024x683.jpg.webp')] h-[800px] bg-no-repeat bg-cover bg-center py-24">
        <div className='container mx-auto flex justify-start h-full text-gray-200'>
          {/* Text */}
          <div className='flex flex-col justify-center items-start'>
            {/* Pre Title */}
            <div className='font-semibold flex items-center uppercase'>
              Chess
            </div>
            <h1 className='text-[64px] leading-[1.1] text-left justify-center font-light mb-4'>
              PLAN AHEAD <br/> OF YOURSELF<br/>
              {/* <span className='text-[48px] font-semibold'>BOARDGAMES</span> */}
            </h1>
            <Link to={'/shop/special'} className='self-start uppercase font-semibold border-b-2 border-white'>
              Discover More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Slider {...settings}>
        <Hero_1 />
        <Hero_2 />
        <Hero_3 />
      </Slider>
    </div>
  );
};

export default Hero;
