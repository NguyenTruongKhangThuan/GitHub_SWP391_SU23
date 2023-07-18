import React from 'react';

import Hero_Image from '../img/Hero.png'

import { Link } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Hero_1 = () => {
    return (
      <div>
        <section className="bg-[url('https://wallpaperaccess.com/full/2402653.jpg')] h-[800px] bg-no-repeat bg-cover bg-center py-24">
          <div className='container mx-auto flex justify-around h-full'>
            <div className='flex flex-col items-center justify-center'>
              <div className='font-semibold flex items-center uppercase'>
                New Trend
              </div>
              <h1 className='text-[64px] leading-[1.1] text-center font-light mb-4'>
                CHILL OUT AND HAVE FUN<br/>
                <span className='text-[48px] font-semibold'>BOARDGAMES</span>
              </h1>
              <Link to={'/shop/special'} className='self-center uppercase font-semibold border-b-2 border-primary'>
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
      <section className="bg-[url('https://wallpapers.com/images/hd/anime-landscape-mirroring-lake-h6y2zxu7bdzep5kx.jpg')] h-[800px] bg-no-repeat bg-cover bg-center py-24">
        <div className='container mx-auto flex justify-start h-full'>
          {/* Text */}
          <div className='flex flex-col justify-center items-start'>
            {/* Pre Title */}
            <div className='font-semibold flex items-center uppercase'>
              New Trend
            </div>
            <h1 className='text-[64px] leading-[1.1] text-left justify-center font-light mb-4'>
              CHILL OUT AND HAVE FUN<br/>
              <span className='text-[48px] font-semibold'>BOARDGAMES</span>
            </h1>
            <Link to={'/shop/special'} className='self-start uppercase font-semibold border-b-2 border-primary'>
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
      <section className="bg-[url('https://wallpaperaccess.com/full/3443.jpg')] h-[800px] bg-no-repeat bg-cover bg-center py-24">
        <div className='container mx-auto flex justify-end h-full'>
          {/* Text */}
          <div className='flex flex-col justify-center items-end'>
            {/* Pre Title */}
            <div className='font-semibold flex items-center uppercase'>
              New Trend
            </div>
            <h1 className='text-[64px] leading-[1.1] text-right justify-center font-light mb-4'>
              CHILL OUT AND HAVE FUN<br/>
              <span className='text-[48px] font-semibold'>BOARDGAMES</span>
            </h1>
            <Link to={'/shop/special'} className='self-end uppercase font-semibold border-b-2 border-primary'>
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
