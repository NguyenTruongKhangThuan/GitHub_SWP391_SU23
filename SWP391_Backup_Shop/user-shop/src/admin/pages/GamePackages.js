import React, { useState, useEffect } from "react";
import { getGamePacksAPI } from "../../api/adminAPI";
import AdminAccount from "../components/AdminAccount";
import { useNavigate } from "react-router-dom";

const GamePackages = () => {
  //Rules Length
  const [showFull, setShowFull] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [gamePackData, setGamePackData] = useState();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedImage, setClickedImage] = useState("");

  const handleImageClick = (imageUrl) => {
    setClickedImage(imageUrl);
    setModalVisible(true);
  };

  const toggleTextVisibility = () => {
    setShowFull(!showFull);
  };

  const toggleDetailsForm = () => {
    setShowDetailsForm(!showDetailsForm);
  };

  //Dropdown
  const Dropdown = ({gamepack}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen)
    }

    return (
      <div className="relative">
        <button
          className="bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white font-bold rounded-md"
          onClick={toggleDropdown}
        >
          Actions
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                navigate(`/admin/game-packages/details/${gamepack.gamePackId}`, {state: {gamePackData: gamepack}})
              }}
            >
              View Details
            </button>
          </div>
        )}
      </div>
    )
  }

  const [gamePacks, setGamePacks] = useState([]);

  useEffect(() => {
    refreshGamePackages();
  }, []);

  const refreshGamePackages = async () => {
    await getGamePacksAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setGamePacks(data))
      .catch((error) => console.log(error));
  };

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div className="mt-2">
      <div className="flex justify-end mr-[60px]"><AdminAccount/></div>
      <div className="p-[48px]">
        <div className="flex justify-between">
          <h2 className="mt-[16px] mb-[30px] font-bold text-2xl">
            Game Packages List
          </h2>
        </div>
        <table className="mt-[10px]">
          <thead>
            <tr className="text-[16px]">
              <th className="border-t-[2px] border-b-[2px] border-l-[2px] border-gray-500 pr-5 px-3">
                Gamepack ID
              </th>
              <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                Gamepack Name
              </th>
              <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                Gamepack Image
              </th>
              <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                Gamepack Description
              </th>
              <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">Price</th>
              <th className="border-t-[2px] border-b-[2px] border-r-[2px] border-gray-500 pr-5 px-3">
                
              </th>
            </tr>
          </thead>
          {gamePacks.map((gamePack, index) => (
          <tbody key={gamePack.gamePackId}>
              <tr
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } text-[16px]`}
              >
                <td className={`${gamePacks[gamePacks.length - 1].gamePackId === gamePack.gamePackId? 'border-b-[2px]': ''} border-l-[2px]  border-gray-500 pr-5 p-4`}>
                  {gamePack.gamePackId}
                </td>
                <td className={`${gamePacks[gamePacks.length - 1].gamePackId === gamePack.gamePackId? 'border-b-[2px]': ''}  border-gray-500 pr-5 p-4`}>
                  {gamePack.gamePackName}
                </td>
                <td className={`${gamePacks[gamePacks.length - 1].gamePackId === gamePack.gamePackId? 'border-b-[2px]': ''}  border-gray-500 pr-5 p-4`}>
                  <img
                    src={gamePack.image}
                    className="w-[120px] p-2 cursor-pointer"
                    onClick={() => handleImageClick(gamePack.image)}
                  />
                </td>
                {gamePack.description.length > 0 && (
                  <td className={`${gamePacks[gamePacks.length - 1].gamePackId === gamePack.gamePackId? 'border-b-[2px]': ''}  border-gray-500 pr-5 p-4`}>
                    <p>
                      {showFull
                        ? gamePack.description
                        : `${gamePack.description.slice(0, 70)}`}
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
                <td className={`${gamePacks[gamePacks.length - 1].gamePackId === gamePack.gamePackId? 'border-b-[2px]': ''}  border-gray-500 pr-5 p-4`}>
                  {VND.format(gamePack.price)}
                </td>
                <td 
                  className={`${gamePacks[gamePacks.length - 1].gamePackId === gamePack.gamePackId? 'border-b-[2px]': ''} border-r-[2px] border-gray-500 pr-5 p-4`}
                  onClick={() => setGamePackData(gamePack)}
                  >
                      <Dropdown gamepack={gamePack}/>
                </td>
              </tr>
          </tbody>
          ))}
        </table>
  
        {/* Image Modal */}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="max-w-[90%] max-h-[90%]">
              <img src={clickedImage} alt="Enlarged" className="w-full h-auto" />
              <button
                className="absolute top-10 right-0 p-2 mr-4 rounded-md text-white bg-red-500 hover:bg-red-600"
                onClick={() => setModalVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePackages;
