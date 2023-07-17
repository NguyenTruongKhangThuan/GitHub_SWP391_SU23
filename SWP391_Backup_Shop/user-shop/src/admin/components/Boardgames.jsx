import React, {useEffect, useState} from 'react'
import { getBoardgamesAPI, postBoardgamesAPI, putBoardgameAPI, deleteBoardgameAPI } from '../../api/adminAPI';

const BoardgameInformation = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openDetailsForm, setOpenDetailsForm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(0); //delete according to the index
  const [openUpdateForm, setOpenUpdateForm] = useState(false)
  const [boardgames, setBoardgames] = useState([])

  const [imageSrc, setImageSrc] = useState('');


  useEffect(() => {
    refreshBoardgamesList();
  }, [])

  const refreshBoardgamesList = async() => {
    await getBoardgamesAPI(sessionStorage.getItem("accountToken"))
          .then((data) => setBoardgames(data))
          .catch((error) => console.log(error))
  }

  const toggleAddForm = () => {
      setOpenAddForm(!openAddForm)
      if(openAddForm === true) {
          console.log("Form opened!");
      }
      else {
          console.log("Form closed!");
      }
  }

  const addFormSubmission = (e) => {
    e.preventDefault();

    let boardgameName = document.getElementById("boardgameName").value
    let boardgameDescription = document.getElementById("boardgameDescription").value
    let boardgameImageInput = document.getElementById("boardgameImageSrc");
    let boardgameImageName = boardgameImageInput.files[0].name;

    if (boardgameImageInput.files && boardgameImageInput.files[0]) {
      let reader = new FileReader();

      reader.onload = function (event) {
        setImageSrc(event.target.result)
      };

      reader.readAsDataURL(boardgameImageInput.files[0]);
    }

    
    var formData = new FormData();
    formData.append("boardGameId", "empty");
    formData.append('name', boardgameName);
    formData.append('description', boardgameDescription);
    formData.append('imageSrc', imageSrc);
    formData.append('image', boardgameImageName.split('.')[0]);

    postBoardgamesAPI(sessionStorage.getItem("accountToken"), formData)
    .then((res) => {
      window.alert(res);
      refreshBoardgamesList();
    })
    .catch((error) => {
      console.log(error)
      window.alert("Cannot add boardgame")
    })

  }

  const toggleViewDetails = () => {
    setOpenDetailsForm(!openDetailsForm)
  }

  const toggleUpdate = () => {
    setOpenUpdateForm(!openUpdateForm)
  }

  const toggleViewOrUpdate = () => {
    //rotate between view details and update
    if(openDetailsForm) setOpenUpdateForm(false);
    else setOpenUpdateForm(true);
    
  }


  return (
    <div className='mt-[20px]'>
      <div className='flex justify-between'>
        <h2>Boardgames Management</h2>
        <button 
            className='bg-blue-500 flex justify-center w-[120px] p-2 rounded-md'
            onClick={toggleAddForm}
        >
          Add
        </button>
      </div>
      
      <table className='mt-[10px]'>
          <thead>
              <tr className='text-[18px]'>
                <th className='border-[2px] border-gray-500 pr-5 px-3'>Boardgame ID</th>
                <th className='border-[2px] border-gray-500 pr-5 px-3'>Boardgame Name</th>
                <th className='border-[2px] border-gray-500 pr-5 px-3'>Boardgame Image</th>
                <th className='border-[2px] border-gray-500 pr-5 px-3'>Boardgame Description</th>
                <th className='border-[2px] border-gray-500 pr-5 px-3' colSpan={3}>Actions</th>
              </tr>
          </thead>
          <tbody>
            {boardgames.map((boardgame, index) => (
              <tr className={`${index % 2 === 0? 'bg-gray-100': 'bg-gray-300'} text-[16px]`}>
                <td className='border-[2px] border-gray-500 pr-5 pl-2'>{boardgame.boardGameId}</td>
                <td className='border-[2px] border-gray-500 pr-5 pl-2'>{boardgame.name}</td>
                <td className='border-[2px] border-gray-500 pr-5 pl-2'>
                  <img src={boardgame.imageSrc} alt={boardgame.image} className='w-[160px] p-4'/>
                </td>
                <td className='border-[2px] border-gray-500 pr-5 pl-2'>{boardgame.description}</td>
                <td className='border-l-[2px] border-b-[2px] border-r-none border-gray-500 pr-5 pl-2'>
                  <button 
                      className='bg-green-400 hover:bg-green-600 w-[160px] p-4 text-[18px] font-bold rounded-md'
                      onClick={toggleViewDetails}
                  >
                    View Details
                  </button>
                </td>
                <td className='border-b-[2px] border-gray-500 pr-5 pl-2'>
                  <button 
                      className='bg-yellow-400 hover:bg-yellow-500 w-[160px] p-4 text-[18px] font-bold rounded-md'
                      onClick={toggleUpdate}
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
      {openAddForm && (
                <div className='flex justify-center'>
                    <form className='w-[840px]'>
                        <div className='grid grid-cols-2 mt-4'>
                            <div className='flex flex-col w-[400px]'>
                                <div className='flex flex-col mt-4'>
                                    <label className='mb-3'>Boardgame Name</label>
                                    <input 
                                        type='text' 
                                        id='boardgameName' 
                                        placeholder='Enter Boardgame Name'
                                        className='p-2 rounded-md'
                                    />
                                </div>
                                <div className='flex flex-col mt-4'>
                                    <label className='mb-3'>Boardgame Image</label>
                                    <input 
                                        type='file'
                                        accept={'.png' || '.jpg' || '.webp'}
                                        id='boardgameImageSrc'
                                        placeholder='Import Boardgame Image' 
                                        className='p-2 rounded-md'/>
                                </div>
                                <div></div>
                            </div>
                            <div className='flex flex-col w-[400px]'>
                                <div className='flex flex-col mt-4'>
                                    <label className='mb-3'>Boardgame Description</label>
                                    <input 
                                        type='text' 
                                        id='boardgameDescription' 
                                        placeholder='Enter Boardgame Description'
                                        className='p-2 rounded-md'/>
                                </div>
                                <div className=' flex justify-end items-center gap-x-6'>
                                    <button 
                                        onClick={addFormSubmission}
                                        className='bg-blue-300 hover:bg-blue-600 items-center mt-4 p-4 w-[120px] rounded-md'>
                                        Add
                                    </button>
                                    <button 
                                        className='bg-red-300 hover:bg-red-500 items-center mt-4 p-4 w-[120px] rounded-md'
                                        onClick={toggleAddForm}
                                        >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </form>
                </div>
            )}
          {openDetailsForm && (
            <div className='flex justify-center'>
            <form className='w-[840px]'>
                <div className='grid grid-cols-2 mt-4'>
                    <div className='flex flex-col w-[400px]'>
                        <div className='flex flex-col mt-4'>
                            <label className='mb-3'>Boardgame Name</label>
                            <input 
                                type='text' 
                                id='boardgameName' 
                                placeholder='Enter Boardgame Name'
                                className='p-2 rounded-md'
                            />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label className='mb-3'>Boardgame Image</label>
                            <input 
                                type='file'
                                accept={'.png' || '.jpg' || '.webp'}
                                id='boardgameImageSrc'
                                placeholder='Import Boardgame Image' 
                                className='p-2 rounded-md'/>
                        </div>
                        <div></div>
                    </div>
                    <div className='flex flex-col w-[400px]'>
                        <div className='flex flex-col mt-4'>
                            <label className='mb-3'>Boardgame Description</label>
                            <input 
                                type='text' 
                                id='boardgameDescription' 
                                placeholder='Enter Boardgame Description'
                                className='p-2 rounded-md'/>
                        </div>
                        <div className=' flex justify-end items-center gap-x-6'>
                            <button 
                                onClick={toggleViewOrUpdate}
                                className='bg-yellow-300 hover:bg-yellow-600 items-center mt-4 p-4 w-[240px] text-[16px] rounded-md'>
                                Update Boardgames
                            </button>
                            <button 
                                className='bg-red-300 hover:bg-red-500 items-center mt-4 p-4 w-[120px] text-[16px] rounded-md'
                                onClick={toggleViewDetails}
                                >
                                Cancel
                            </button>
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
          )}
          {openUpdateForm && (
             <div className='flex justify-center'>
             <form className='w-[840px]'>
                 <div className='grid grid-cols-2 mt-4'>
                     <div className='flex flex-col w-[400px]'>
                         <div className='flex flex-col mt-4'>
                             <label className='mb-3'>Boardgame Name</label>
                             <input 
                                 type='text' 
                                 id='boardgameName' 
                                 placeholder='Enter Boardgame Name'
                                 className='p-2 rounded-md'
                             />
                         </div>
                         <div className='flex flex-col mt-4'>
                             <label className='mb-3'>Boardgame Image</label>
                             <input 
                                 type='file'
                                 accept={'.png' || '.jpg' || '.webp'}
                                 id='boardgameImageSrc'
                                 placeholder='Import Boardgame Image' 
                                 className='p-2 rounded-md'/>
                         </div>
                         <div></div>
                     </div>
                     <div className='flex flex-col w-[400px]'>
                         <div className='flex flex-col mt-4'>
                             <label className='mb-3'>Boardgame Description</label>
                             <input 
                                 type='text' 
                                 id='boardgameDescription' 
                                 placeholder='Enter Boardgame Description'
                                 className='p-2 rounded-md'/>
                         </div>
                         <div className=' flex justify-end items-center gap-x-6'>
                             <button 
                                 onClick={() => {
                                    toggleUpdate();
                                    //Add a
                                 }}
                                 className='bg-blue-300 hover:bg-blue-600 items-center mt-4 p-4 w-[120px] rounded-md'>
                                 Add
                             </button>
                             <button 
                                 className='bg-red-300 hover:bg-red-500 items-center mt-4 p-4 w-[120px] rounded-md'
                                 onClick={toggleAddForm}
                                 >
                                 Cancel
                             </button>
                         </div>
                     </div>
                     
                 </div>
             </form>
         </div>
          )}
    </div>
  )
}

export default BoardgameInformation
