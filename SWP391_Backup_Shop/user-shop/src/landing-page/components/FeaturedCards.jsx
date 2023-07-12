import React, {useState} from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SampleDeck_1 from '../assets/SampleDeck_1.png'
import SampleDeck_2 from '../assets/SampleDeck_2.png'
import SampleDeck_3 from '../assets/SampleDeck_3.png'
import SampleDeck_4 from '../assets/SampleDeck_4.png'

const settings = {
  dots: true, // Show navigation dots
  infinite: true, // Allow infinite loop
  speed: 500, // Animation speed in milliseconds
  slidesToShow: 1, // Number of slides to show at a time
  slidesToScroll: 1, // Number of slides to scroll per interaction
  centerMode: true,
  centerPadding: '500px',
  autoplay: true, // Autoplay the carousel
  autoplaySpeed: 2000, // Autoplay interval in milliseconds
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Review_Card = ({title,description, imgSRC, name, isActive}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardClasses = `max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center w-[400px] p-10 ${
    isActive ? 'ring-10 ring-blue-500' : ''
  }`;
  return (
    <div class='max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center w-[400px] p-10 '>
      <img 
      src={imgSRC} 
      alt={name} 
      className='w-[150px] h-[150px] cursor-pointer'  
      onClick={() => setIsVisible(!isVisible)}></img>
      <div className='px-6 py-4 text-center text-white'>
        <h1 className='pl-2 font-bold text-[16px] '>{title}</h1>
        {isVisible && 
          <p className="text-gray text-center font-semibold text-[12px] mt-5 pl-2">{description}</p>
      }
      </div>
      
    </div>
  )
}

const Roles = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className='w-full h-[950px] mx-auto md:grid-cols-2 bg-gradient-to-br from-[#BA5DB7] to-[#4651D6] flex flex-col items-center justify-center py-10'>
      <div className='text-center p-20'>
        <h1 className='font-bold text-3xl leading-[50px] text-white mb-5'>Featured Card Sets</h1>
        <p className='text-white'>Some of the highlighted role cards featured in the shop</p>
      </div>
      <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative'>
        <Slider {...settings} afterChange={slideIndex => setActiveSlide(slideIndex)}>
          <Review_Card title="Standard Party 1"  imgSRC={SampleDeck_1} isActive={activeSlide === 0}/>
          <Review_Card title="Stella Factory Edition"  imgSRC={SampleDeck_2} isActive={activeSlide === 1}/>
          <Review_Card title="Standard Party 2"  imgSRC={SampleDeck_3} isActive={activeSlide === 2}/>
          <Review_Card title="Basic Edition"  imgSRC={SampleDeck_4} isActive={activeSlide === 3}/>
        </Slider>
      </div>
        
    </div>
  )
}

export default Roles
