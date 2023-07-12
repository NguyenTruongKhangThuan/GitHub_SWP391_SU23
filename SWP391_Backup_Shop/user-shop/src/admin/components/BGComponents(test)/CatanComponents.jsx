import React from 'react'
import CatanMap from './assets/Catan/BoardgameComponents/CatanMap.png'
import CatanBuildingCostCards from './assets/Catan/BoardgameComponents/CatanBuildingCostCard.png'
import CatanDevelopmentCards from './assets/Catan/BoardgameComponents/CatanDevelopmentCards.png'
import CatanNumberTokens from './assets/Catan/BoardgameComponents/CatanNumberTokens.png'
import CatanResourcesCard from './assets/Catan/BoardgameComponents/CatanResourcesCards.png'
import CatanSpecialCards from './assets/Catan/BoardgameComponents/CatanSpecialCards.png'
import CatanWoodSet from './assets/Catan/BoardgameComponents/CatanWoodSet.png'
import CatanDice from './assets/Catan/BoardgameComponents/Six_Sided_Dice.png'
import Table from '../Table'

const CatanComponents = () => {
    const columns = [
        {label: "ID", field: "ComponentID"},
        {label: "Name", field: "ComponentName"},
        {label: "Description", field: "ComponentDescription"},
        {label: "Image", field: "ComponentImage"},
      ]

    const data = [
        {
            ComponentID: "CT01",
            ComponentName: "Map",
            ComponentDescription: "Main map use for playing the game",
            ComponentImage: <img src={CatanMap} alt="Test" className='w-[140px]'/>
        },
        {
            ComponentID: "CT02",
            ComponentName: "Dice",
            ComponentDescription: "Dice use for gathering resources based on the number in the map",
            ComponentImage: <img src={CatanDice} alt="Test" className='w-[140px]'/>
        },
        {
            ComponentID: "CT03",
            ComponentName: "Wood Sets",
            ComponentDescription: "Main Wood Tokens use for building in the map",
            ComponentImage: <img src={CatanWoodSet} alt="Test" className='w-[140px]'/>
        },
        {
            ComponentID: "CT04",
            ComponentName: "Building Cost Cards",
            ComponentDescription: "This card will tell players how much resources they need to place the Wood Component into the map to build it",
            ComponentImage: <img src={CatanBuildingCostCards} alt="Test" className='w-[140px]'/>
        },
        {
            ComponentID: "CT05",
            ComponentName: "Development Cards",
            ComponentDescription: "Cards are similar to Events. Each Card's Events will beneficial to any of the players or not",
            ComponentImage: <img src={CatanDevelopmentCards} alt="Test" className='w-[140px]'/>
        },
        {
            ComponentID: "CT06",
            ComponentName: "Number Tokens",
            ComponentDescription: "These Number tokens will be displayed in random in each of the hexagon tiles.",
            ComponentImage: <img src={CatanNumberTokens} alt="Test" className='w-[140px]'/>
        },
        {
            ComponentID: "CT07",
            ComponentName: "Resources Cards",
            ComponentDescription: "These are the main currency of the game. Use it to build wood's component",
            ComponentImage: <img src={CatanResourcesCard} alt="Test" className='w-[140px]'/>
        },
        {
            ComponentID: "CT08",
            ComponentName: "Special Card",
            ComponentDescription: "Unlike the Development Card, these Special Cards can be trade and can be used to gain an advantage ahead of other players",
            ComponentImage: <img src={CatanSpecialCards} alt="Test" className='w-[140px]'/>
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

export default CatanComponents
