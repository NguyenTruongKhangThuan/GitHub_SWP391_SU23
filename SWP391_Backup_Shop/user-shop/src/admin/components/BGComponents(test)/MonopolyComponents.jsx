import React, {useState} from 'react'
import Table from '../Table'
import TestComponentMonopoly_1 from './assets/TestComponentImage_06.png'
import TestComponentMonopoly_2 from './assets/TestComponentImage_07.png'
import TestComponentMonopoly_3 from './assets/TestComponentImage_08.png'
import TestComponentMonopoly_4 from './assets/TestComponentImage_09.png'
import TestComponentMonopoly_5 from './assets/TestComponentImage_10.png'
import TestComponentMonopoly_6 from './assets/TestComponentImage_11.png'
import TestComponentMonopoly_7 from './assets/TestComponentImage_12.png'
import TestComponentMonopoly_8 from './assets/TestComponentImage_13.png'

const MonopolyComponents = () => {
    const columns = [
        {label: "ID", field: "ComponentID"},
        {label: "Name", field: "ComponentName"},
        {label: "Description", field: "ComponentDescription"},
        {label: "Image", field: "ComponentImage"},
    ]

    const data = [
        { 
            ComponentID : "CM01",
            ComponentName: "Map - Monopoly Basic Map",
            ComponentDescription: "This is the map for playing Monopoly",
            ComponentImage: <img src={TestComponentMonopoly_1} alt='Test' className='w-[160px]'/>
        },
        { 
            ComponentID : "CM02",
            ComponentName: "Card - Money",
            ComponentDescription: "Main resources to use for taking certain actions",
            ComponentImage: <img src={TestComponentMonopoly_2} alt='Test' className='w-[160px]'/>
        },
        { 
            ComponentID : "CM03",
            ComponentName: "Dice - Monopoly Dice",
            ComponentDescription: "Dice to take actions and perform certain events in game",
            ComponentImage: <img src={TestComponentMonopoly_3} alt='Test' className='w-[160px]'/>
        },
        { 
            ComponentID : "CM04",
            ComponentName: "Token - Character Token",
            ComponentDescription: "These are tokens used as characters to move within the map",
            ComponentImage: <img src={TestComponentMonopoly_4} alt='Test' className='w-[160px]'/>
        },
        { 
            ComponentID : "CM05",
            ComponentName: "Token - Property",
            ComponentDescription: "Houses and Hotels used for building in certain land",
            ComponentImage: <img src={TestComponentMonopoly_5} alt='Test' className='w-[160px]'/>
        },
        { 
            ComponentID : "CM06",
            ComponentName: "Card - Chance Cards",
            ComponentDescription: "Chance Type event cards. These can help players obtain more money",
            ComponentImage: <img src={TestComponentMonopoly_6} alt='Test' className='w-[160px]'/>
        },
        { 
            ComponentID : "CM07",
            ComponentName: "Card - Community Cards",
            ComponentDescription: "Community Type event cards. These can subtract players's total income",
            ComponentImage: <img src={TestComponentMonopoly_7} alt='Test' className='w-[160px]'/>
        },
        { 
            ComponentID : "CM08",
            ComponentName: "Card - Property Title Deed Cards",
            ComponentDescription: "Certification of the current owner of the specific land",
            ComponentImage: <img src={TestComponentMonopoly_8} alt='Test' className='w-[160px]'/>
        },
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

export default MonopolyComponents
