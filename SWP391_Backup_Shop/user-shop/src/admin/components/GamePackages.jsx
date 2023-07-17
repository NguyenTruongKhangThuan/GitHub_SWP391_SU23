import React,{useState, useEffect} from 'react'
import { getGamePacksAPI } from '../../api/adminAPI'


const GamePackages = () => {
  const [gamePacks, setGamePacks] = useState([])

  useEffect(()=> {
    refreshGamePackages();
  },[])

  const refreshGamePackages = async() => {
    await getGamePacksAPI(sessionStorage.getItem("accountToken"))
          .then((data) => setGamePacks(data))
          .catch((error) => console.log(error))
  }

  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='mt-[20px] mb-[30px] font-bold text-2xl'>Game Packages List</h2>
        <button 
            className='bg-blue-500 flex justify-center w-[120px] p-2 rounded-md'
            
        >
          Add
        </button>
      </div>
      <table className='mt-[10px]'>
          <thead>
              <tr className='text-[18px]'>
                <th className='border-[2px] border-gray-500 pr-5 px-3'>Gamepack ID</th>
                <th className='border-[2px] border-gray-500 pr-5 px-3'>Gamepack Name</th>
                <th className='border-[2px] border-gray-500 pr-5 px-3'>Gamepack Image</th>
                <th className='border-[2px] border-gray-500 pr-5 px-3'>Gamepack Description</th>
                <th className='border-[2px] border-gray-500 pr-5 px-3'>Price</th>
                <th className='border-[2px] border-gray-500 pr-5 px-3' colSpan={3}>Actions</th>
              </tr>
          </thead>
          <tbody>
            {gamePacks.map((gamePack, index) => (
              <tr className={`${index % 2 === 0? 'bg-gray-100': 'bg-gray-300'} text-[16px]`}>
              <td className='border-[2px] border-gray-500 pr-5 pl-2'>{gamePack.gamePackId}</td>
              <td className='border-[2px] border-gray-500 pr-5 pl-2'>{gamePack.gamePackName}</td>
              <td className='border-[2px] border-gray-500 pr-5 pl-2'>
                <img src={gamePack.imageSrc} alt={gamePack.image} className='w-[160px] p-4'/>
              </td>
              <td className='border-[2px] border-gray-500 pr-5 pl-2'>{gamePack.description}</td>
              <td className='border-[2px] border-gray-500 pr-5 pl-2'>{gamePack.price} VND</td>
              <td className='border-l-[2px] border-b-[2px] border-r-none border-gray-500 pr-5 pl-2'>
                <button 
                    className='bg-green-400 hover:bg-green-600 w-[160px] p-4 text-[18px] font-bold rounded-md'
                    
                >
                  View Details
                </button>
              </td>
              <td className='border-b-[2px] border-gray-500 pr-5 pl-2'>
                <button 
                    className='bg-yellow-400 hover:bg-yellow-500 w-[160px] p-4 text-[18px] font-bold rounded-md'
                    
                >
                      Update
                </button>
              </td>
              <td className='border-r-[2px] border-b-[2px] border-gray-500 pr-5 pl-2'>
                <button 
                    className='bg-red-400 hover:bg-red-500 w-[160px] p-4 text-[18px] font-bold rounded-md'
                    
                >
                  Delete
                </button>
              </td>
            </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default GamePackages
