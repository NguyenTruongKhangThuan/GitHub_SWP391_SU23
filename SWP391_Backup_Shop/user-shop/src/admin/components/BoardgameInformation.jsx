import React, {useState} from 'react'
import Table from './Table'
import TestImage_1 from '../assets/TestImage_01.png'
import TestImage_2 from '../assets/TestImage_02.png'
import TestImage_3 from '../assets/TestImage_03.png'
import TestImage_4 from '../assets/TestImage_04.png'
import TestImage_5 from '../assets/TestImage_05.png'
import CatanRules from './rules/CatanRules'
import MonopolyRules from './rules/MonopolyRules'
import WerewolfRules from './rules/WerewolfRules'
import RootRules from './rules/RootRules'
import SpudnetRules from './rules/SpudnetRules'
import WerewolfComponent from './BGComponents(test)/WerewolfComponents'
import MonopolyComponents from './BGComponents(test)/MonopolyComponents'
import CatanComponents from './BGComponents(test)/CatanComponents'

const Tag = ({content}) => {
  let tagBgColor;

  if(content === "Monopoly")
  {
    tagBgColor = '#FF8989';
  }
  else if(content === "Werewolves")
  {
    tagBgColor = '#526D82';
  }
  else if(content === "Root")
  {
    tagBgColor = '#5C469C';
  }
  else if(content === "Catan")
  {
    tagBgColor = '#91684A';
  }
  else if(content === "Spudnet")
  {
    tagBgColor = '#FFD93D';
  }

  const tagStyle = {
    backgroundColor: tagBgColor,
    color: 'white',
    padding: '5px',
    borderRadius: '20px',
  };

  return (
    <div className='w-32 text-center text-[16px]' style={tagStyle}>
      {content}
    </div>
  );
}

const BoardgameInformation = () => {
  const columns = [
    {label: "ID", field: "BoardgameID"},
    {label: "Name", field: "BoardgameName"},
    {label: "Owner", field: "BoardgameOwner"},
    {label: "Number of Players", field: "PlayersNum"},
    {label: "Duration", field: "BoardgameDuration"},
    {label: "Age", field:"BoardgameAgeRating"},
    {label: "Description", field: "BoardgameDescription", hidden: true},
    {label: "Tag", field: "BoardgameTag", hidden:true},
    {label: "Image", field: "BoardgameImage"},
    {label: "Price (VND)", field: "BoardgamePrice"},
    {label: "ImageSrc", field: "ImageSrc", hidden: true, hiddenPopup: true},
    {label: "Rules", field: "BoardgameRules", hidden: true, hiddenPopup: true},
    {label: "Components", field: "BoardgameComponents", hidden: true, hiddenPopup: true}
  ]

  //These are fake datas use to check the table visualization
  const [boardgameInfo, setBoardgameInfo] = useState([
    {
      BoardgameID: "BG01",
      BoardgameName: "Monopoly-Basic",
      BoardgameOwner: "Lizzie Magie, Charles Darrow",
      BoardgameDuration: "30-45 minutes",
      PlayersNum: "2-4 players",
      BoardgameAgeRating: "8+",
      BoardgameDescription: "Be a true economist in this tactical financial tour of wonders",
      BoardgameTag: <Tag content='Monopoly'/>,
      BoardgameImage: <img src={TestImage_1} alt="TestImage" className='w-[140px]'/>,
      BoardgamePrice: "100000",
      BoardgameRules: <MonopolyRules/>,
      BoardgameComponents: <MonopolyComponents/>
    },
    {
      BoardgameID: "BG02",
      BoardgameName: "Werewolf - Stella Factory",
      BoardgameOwner: "Stella Factory",
      BoardgameDuration: "30-60 minutes",
      PlayersNum: "10-50 players",
      BoardgameAgeRating: "10+",
      BoardgameDescription: "Debate with up 50 people in this classic intense match or duel in 2 simutaneous competitive matches",
      BoardgameTag: <Tag content='Werewolves'/>,
      BoardgameImage:<img src={TestImage_3} alt='TestImage_2' className='w-[140px]'/>,
      BoardgamePrice: "250000",
      BoardgameRules: <WerewolfRules/>,
      BoardgameComponents: <WerewolfComponent/>,
    },
    {
      BoardgameID: "BG03",
      BoardgameName: "Catan",
      BoardgameOwner: "Klaus Teuber",
      BoardgameDuration: "30-45 minutes",
      PlayersNum: "2-4 players",
      BoardgameAgeRating: "8+",
      BoardgameDescription: "Collect and trade resources to build up the island of Catan in this modern classic.",
      BoardgameTag: <Tag content='Catan'/>,
      BoardgameImage: <img src={TestImage_2} alt='TestImage_3' className='w-[140px]'/>,
      BoardgamePrice: "100000",
      BoardgameRules: <CatanRules/>,
      BoardgameComponents: <CatanComponents/>
    },
    {
      BoardgameID: "BG04",
      BoardgameName: "Root",
      BoardgameOwner: "Cole Wehrle, Kyle Ferrin, Leder Games",
      BoardgameDuration: "45-75 minutes",
      PlayersNum: "2-4 players",
      BoardgameAgeRating: "12+",
      BoardgameDescription: "Decide the fate of the forest as woodland factions fight for contrasting goals.",
      BoardgameTag: <Tag content='Root'/>,
      BoardgameImage: <img src={TestImage_4} alt='Test_Image_4' className='w-[140px]'/>,
      BoardgamePrice: "100000",
      BoardgameRules: <RootRules/>
    },
    {
      BoardgameID: "BG05",
      BoardgameName: "Potato Pirates: Enter the Spudnet",
      BoardgameOwner: "unknown",
      BoardgameDuration: "30-60 minutes",
      PlayersNum: "2-6 players",
      BoardgameAgeRating: "12+",
      BoardgameDescription: "Test your logic as pirates and conquer the sea in this sweet tactical boardgame adventure",
      BoardgameImage: <img src={TestImage_5} alt='Test_Image_5' className='w-[140px]' />,
      BoardgameTag: <Tag content='Spudnet'/>,
      BoardgamePrice: "500000",
      BoardgameRules: <SpudnetRules/>
    }
  ])

  return (
    <div className='mt-[20px]'>
      <h2 className='mt-[20px] mb-[24px] font-bold text-2xl'>Boardgame's List</h2>
      <Table
        columns={columns}
        data={boardgameInfo}
        isView
        isUpdate
        isDetails
        isAdd
      />
    </div>
  )
}

export default BoardgameInformation
