import React from 'react'

const HighlightedItems = ({content, header, imgSrc}) => {
  return (
    <div className='bg-white bg-opacity-50 w-[280px] flex hover:scale-110 duration-300 p-4'>
      <img src={imgSrc} alt="Test" className='w-[100px]'/>
      <div className='flex flex-col ml-2'>
        <h2 className='text-[18px] font-bold'>{header}</h2>
        <p className='text-[16px]'>{content}</p>
      </div>
    </div>
  )
}

export default HighlightedItems
