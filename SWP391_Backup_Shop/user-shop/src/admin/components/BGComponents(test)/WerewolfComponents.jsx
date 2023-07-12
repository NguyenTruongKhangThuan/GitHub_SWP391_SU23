import React, {useState} from 'react'
import TestComponentImage_1 from './assets/TestComponentImage_01.png'
import TestComponentImage_2 from './assets/TestComponentImage_02.png'
import TestComponentImage_3 from './assets/TestComponentImage_03.png'
import TestComponentImage_4 from './assets/TestComponentImage_04.png'
import TestComponentImage_5 from './assets/TestComponentImage_05.png'
import Table from '../Table'

const WerewolfComponent = () => {
  const columns = [
    {label: "ID", field: "ComponentID"},
    {label: "Name", field: "ComponentName"},
    {label: "Description", field: "ComponentDescription"},
    {label: "Image", field: "ComponentImage"},
  ]

  const data = [
    { 
      ComponentID : "CW01",
      ComponentName: "Card - Moderator",
      ComponentDescription: "The person who controls the flow of the game",
      ComponentImage: <img src={TestComponentImage_1} alt='Test' className='w-[160px]'/>
    },
    { 
      ComponentID : "CW02",
      ComponentName: "Card - Villager",
      ComponentDescription: "Main protagonist of the game",
      ComponentImage: <img src={TestComponentImage_2} alt='Test' className='w-[160px]'/>
    },
    { 
      ComponentID : "CW03",
      ComponentName: "Card - Werewolf",
      ComponentDescription: "Main antagonist of the game.",
      ComponentImage: <img src={TestComponentImage_3} alt='Test' className='w-[160px]'/>
    },
    {
      ComponentID : "CW04",
      ComponentName: "Card - Seer",
      ComponentDescription: "The most powerful Villager that can predict the roles",
      ComponentImage: <img src={TestComponentImage_4} alt='Test' className='w-[160px]'/>
    },
    {
      ComponentID : "CW05",
      ComponentName: "Card - Doctor",
      ComponentDescription: "Considered a support Villager that can heal any Villagers and keep them from harm",
      ComponentImage: <img src={TestComponentImage_5} alt='Test' className='w-[160px]'/>
    }
  ]

  return (
    <div>
      <Table 
        columns={columns}
        data={data}
        subTable={true}
        isCheckbox
        isView
        isUpdate
        isDelete
      />
    </div>
  )
}

export default WerewolfComponent
