import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminAccount from '../components/AdminAccount';

const DetailBoardgame = () => {
  const location = useLocation();
  let {boardGameData} = location.state;
  const navigate = useNavigate();

  return (
    <div className='mt-2'>
      <div className="flex justify-center">
            <form className="w-[840px]">
              <div className="grid grid-cols-2 mt-4">
                <div className="flex flex-col w-[400px]">
                <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Boardgame ID</label>
                    <input
                      type="text"
                      readOnly
                      placeholder="Enter Boardgame Name"
                      className="p-2 rounded-md"
                      value={boardGameData.boardGameId}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Boardgame Name</label>
                    <input
                      type="text"
                      readOnly
                      placeholder="Enter Boardgame Name"
                      className="p-2 rounded-md"
                      value={boardGameData.name}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Boardgame Description</label>
                    <textarea
                      type="text"
                      readOnly
                      placeholder="Enter Boardgame Description"
                      className="p-2 rounded-md h-full"
                      value={boardGameData.description}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Boardgame Image</label>
                    {/* <input
                      type="file"
                      accept={"/image/*"}
                      id="boardgameImageSrc"
                      placeholder="Import Boardgame Image"
                      className="p-2 rounded-md"
                    /> */}
                    <img
                      src={boardGameData.image}
                      alt=""
                      id="boardgameImage"
                      className="p-2 rounded-md"
                    />
                  </div>                  
                  <div className=" flex justify-end items-center gap-x-6">
                    <button
                      onClick={() => navigate(`/admin/boardgames/update/${boardGameData.boardGameId}`, {state: {boardGameData: boardGameData}})}
                      className="bg-yellow-500 hover:bg-yellow-600 items-center mt-4 p-4 w-[240px] text-[16px] rounded-md font-bold"
                    >
                      Update Boardgames
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 items-center mt-4 p-4 w-[120px] text-[16px] rounded-md font-bold"
                      onClick={() => navigate("/admin/boardgames")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
    </div>
  )
}

export default DetailBoardgame
