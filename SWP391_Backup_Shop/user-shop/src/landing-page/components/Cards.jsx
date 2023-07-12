import React from 'react'
import CardLogo from './../assets/cards.svg'
import MicLogo from './../assets/mic.svg'
import SettingLogo from './../assets/settings.svg'

const Card_Component = () => {
  return (
      <div class="flex flex-wrap justify-around gap-[10px]">
        <Cards description="Unique role abilities for each player." iconSrc={CardLogo} />
        <Cards description="Voice-Focused Match" iconSrc={MicLogo} />
        <Cards description="Customizable Game Settings" iconSrc={SettingLogo} />
      </div>
  )
}

const Cards = ({ description, iconSrc }) => {
    return (
        <div class='flex flex-col items-center w-[300px] p-10'>
          <img src={iconSrc} alt='Icon' class="w-[90px] h-[90px]  fill-white"></img>
          <p class="text-white font-bold text-center mt-5 ">{description}</p>
        </div>
      )
}

export default Cards
