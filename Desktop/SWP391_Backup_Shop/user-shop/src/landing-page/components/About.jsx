import React from 'react'
import Card3D_1 from './../assets/Card-3D-(1).svg'
import Card3D_2 from './../assets/Card-3D-(2).svg'
import Card3D_3 from './../assets/Card-3D-(3).svg'

const About = () => {
  return (
    <div className='h-[1000px] w-full mx-auto grid md:grid-cols-2 bg-gradient-to-br from-[#4850A9] to-[#D99E5C]'>
      <div className='flex flex-col justify-center p-[50px]'>
        <h2 className='text-white font-bold md:text-[50px] sm:text-[45px] '>About the Shop</h2>
        <p className='md:text-[15px] sm:text-1xl text-1xl text-white leading-[35px] py-2'>
          Our shop offers customized Werewolf cards from the some great artistics around the globe.
          Join them in painting your own color to your own village
        </p>
      </div>

      <div className='relative w-[572.3pxpx] h-[552.68px] animate-bounce top-[100px] left-[100px]'>
        <img src={Card3D_1} alt="/" style ={{width: '200px', height: '233.4px'}} className='absolute top-[120px] left-[250px]'></img>
        <img src={Card3D_2} alt="/" style ={{width: '240px', height: '268.9px'}} className='absolute top-[220px] left-[50px]'></img>
        <img src={Card3D_3} alt="/" style ={{width: '240px', height: '268.9px'}} className='absolute top-[320px] left-[300px]'></img>
      </div>

    </div>

    
  )
}

export default About
