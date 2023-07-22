import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='text-white font-sans'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-white md:text-4xl font-medium p-2 text-4xl'>COLORFUL BOARDGAME SHOP</p>
        <h4 className=' text-cyan-200 md:text-2xl md:py-6'>Color your imagination, as one with the sky</h4>
        <div>
            <p className='md:text-lg sm:text-2xl text-xl font-medium text-white'>
              Have fun around as we join with many publishers across the globe in this festive full of colors
            </p>
                <Link to={"/shop"}>
                  <button 
                  className='bg-gradient-to-r from-cyan-500 to-blue-500 w-[240px] rounded-md font-medium my-6 mx-auto py-3 hover:bg-gradient-to-l hover:text-black'>
                    Ready to Duel? Enter Now
                  </button>
                </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
