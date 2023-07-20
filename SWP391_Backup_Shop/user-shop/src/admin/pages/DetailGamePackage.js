import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment'
import AdminAccount from '../components/AdminAccount'

const DetailGamePackage = () => {
  const location = useLocation();
  let {gamePackData} = location.state;
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div className='mt-2'>
      <div className="flex justify-end mr-[60px]"><AdminAccount/></div>
      <h2 className='text-center font-bold text-2xl'>Gamepack Detail - {gamePackData.gamePackId}</h2>
      <div className="flex justify-center">
            <form className="w-[840px]">
              <div className="grid grid-cols-2 mt-4">
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Gamepack Id</label>
                    <input
                      type="text"
                      value={gamePackData.gamePackId}
                      className="p-2 rounded-md"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Gamepack Name</label>
                    <input
                      type="text"
                      value={gamePackData.gamePackName}
                      className="p-2 rounded-md"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Gamepack Image</label>
                    {/* <input
                      type="text"
                      id="ownerPassword"
                      value={gamePackData.image}
                      className="p-2 rounded-md"
                    /> */}
                    <img
                      src={gamePackData.image}
                      alt=""
                      className="p-2 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Gamepack Description</label>
                    <textarea
                      type="text"
                      value={gamePackData.description}
                      className="p-2 rounded-md h-full"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Price</label>
                    <input
                      type="text"
                      value={VND.format(gamePackData.price)}
                      className="p-2 rounded-md"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Number of Players Required</label>
                    <input
                      type="text"
                      value={gamePackData.numberOfPlayer + " players"}
                      readOnly
                      className="p-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Origin</label>
                    <input
                      type="text"
                      value={gamePackData.origin}
                      className="p-2 rounded-md"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Size</label>
                    <input
                      type="text"
                      value={gamePackData.size}
                      className="p-2 rounded-md"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Weight</label>
                    <input
                      type="text"
                      value={gamePackData.weight + "g"}
                      className="p-2 rounded-md"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className='flex justify-end'>
                <Link to={"/admin/game-packages"}>
                  <button
                    className="bg-red-500 px-4 py-2 mt-4 text-[18px] rounded-md font-bold"
                  >
                    Return
                  </button>
                </Link>
              </div>
            </form>
      </div>
    </div>
  )
}

export default DetailGamePackage
