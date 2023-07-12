import React,{useState} from 'react'
import Table from "./Table"
import Test01 from "../assets/SampleDeck_1.png"
import { deleteBoardgameAPI } from '../../api/adminAPI'
import AdminAccount from './AdminAccount'

const CharacterTypes = () => {
  const columns = [
    {label: "ID", field: "PDID"},
    {label: "Name", field: "PDName"},
    {label: "Type", field: "PDType"},
    {label: "Owner", field: "PDOwner"},
    {label: "Image", field: "PDImage"}
  ]

  //Note: this is the fake data for testing the table only.
  const [products, setProducts] = useState([
    {
      PDID: "PD01",
      PDName: "Collection - Test",
      PDType: "Full Deck",
      PDOwner: "Huynh Nguyen Thai Duong",
      PDImage: <img src={Test01} alt="Test_Image" className='w-[140px]'/>
    }
  ])


  return (
    <div>
      <h2 className='mt-[20px] mb-[30px] font-bold text-2xl'>Game Packages List</h2>
      
      <Table
        columns={columns}
        data={products}
        isView
      />
    </div>
  )
}

export default CharacterTypes
