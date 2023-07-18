import React, { useState, useEffect } from "react";
import { getGamePacksAPI } from "../../api/adminAPI";

const GamePackages = () => {
  //Rules Length
  const [showFull, setShowFull] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [gamePackData, setGamePackData] = useState();

  const toggleTextVisibility = () => {
    setShowFull(!showFull);
  };

  const toggleDetailsForm = () => {
    setShowDetailsForm(!showDetailsForm);
  };

  const [gamePacks, setGamePacks] = useState([]);

  useEffect(() => {
    refreshGamePackages();
  }, []);

  const refreshGamePackages = async () => {
    await getGamePacksAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setGamePacks(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="mt-[20px] mb-[30px] font-bold text-2xl">
          Game Packages List
        </h2>
      </div>
      <table className="mt-[10px]">
        <thead>
          <tr className="text-[18px]">
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Gamepack ID
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Gamepack Name
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Gamepack Image
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">
              Gamepack Description
            </th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">Price</th>
            <th className="border-[2px] border-gray-500 pr-5 px-3" colSpan={3}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {gamePacks.map((gamePack, index) => (
            <tr
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
              } text-[16px]`}
            >
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {gamePack.gamePackId}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {gamePack.gamePackName}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                <img
                  src={gamePack.image}
                  alt={gamePack.image}
                  className="w-[160px] p-4"
                />
              </td>
              {gamePack.description.length > 0 && (
                <td className="border-[2px] border-gray-500 pr-5 pl-2">
                  <p>
                    {showFull
                      ? gamePack.description
                      : `${gamePack.description.slice(0, 120)}`}
                  </p>
                  {gamePack.description.length > 80 && (
                    <button
                      className="text-blue-500 mt-2"
                      onClick={toggleTextVisibility}
                    >
                      {showFull ? "View Less" : "View More"}
                    </button>
                  )}
                </td>
              )}
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {gamePack.price} VND
              </td>
              <td className="border-l-[2px] border-b-[2px] border-r-none border-gray-500 pr-5 pl-2">
                <button
                  className="bg-green-400 hover:bg-green-600 w-[160px] p-4 text-[18px] font-bold rounded-md"
                  onClick={() => {
                    toggleDetailsForm();
                    setGamePackData(gamePack);
                  }}
                >
                  View Details
                </button>
              </td>
              <td className="border-r-[2px] border-b-[2px] border-gray-500 pr-5 pl-2">
                <button className="bg-red-400 hover:bg-red-500 w-[160px] p-4 text-[18px] font-bold rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDetailsForm && gamePackData && (
        <div className="flex justify-center">
          <form className="w-[840px]">
            <div className="grid grid-cols-2 mt-4">
              <div className="flex flex-col w-[400px]">
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Gamepack Id</label>
                  <input
                    type="text"
                    id="ownerUsername"
                    value={gamePackData.gamePackId}
                    className="p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Gamepack Name</label>
                  <input
                    type="text"
                    id="ownerPassword"
                    value={gamePackData.gamePackName}
                    className="p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Gamepack Image</label>
                  {/* <input
                    type="text"
                    id="ownerPassword"
                    value={gamePackData.image}
                    className="p-2 rounded-md"
                  /> */}
                  <img
                    src={gamePackData.image}
                    alt={gamePackData.image}
                    id="ownerPassword"
                    className="p-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[400px]">
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Gamepack Description</label>
                  <input
                    type="text"
                    id="ownerFullName"
                    value={gamePackData.description}
                    className="p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Price</label>
                  <input
                    type="number"
                    id="ownerEmail"
                    value={gamePackData.price}
                    className="p-2 rounded-md"
                  />
                </div>
              </div>
            </div>
            <button
              className="bg-red-500 px-4 py-2 text-[18px] rounded-md"
              onClick={toggleDetailsForm}
            >
              Cancel View Details
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GamePackages;
