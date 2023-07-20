import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import {
  getBoardgamesAPI,
  postBoardgamesAPI,
  putBoardgameAPI,
  deleteBoardgameAPI,
} from "../../api/adminAPI";

//Import Firebase
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AdminAccount from "../components/AdminAccount";

const initalData = {
  boardGameId: "temp",
  name: "",
  description: "",
  image: "",
};

const BoardgameInformation = () => {
  const [boardgames, setBoardgames] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedImage, setClickedImage] = useState("");

  const handleImageClick = (imageUrl) => {
    setClickedImage(imageUrl);
    setModalVisible(true);
  };

  useEffect(() => {
    refreshBoardgamesList();
  }, []);

  const navigate = useNavigate();
  

  const refreshBoardgamesList = async () => {
    await getBoardgamesAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setBoardgames(data))
      .catch((error) => console.log(error));
  };

  const Dropdown = ({boardgame}) => {
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
                navigate(`/admin/boardgames/details/${boardgame.boardGameId}`, {state: {boardGameData: boardgame}})
              }}
            >
              View Details
            </button>
            <button
               className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
               onClick={() => {
                navigate(`/admin/boardgames/update/${boardgame.boardGameId}`, {state: {boardGameData: boardgame}})
              }}
            >
              Update
            </button>
            <button
               className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                onClick={(e)=>{
                  setDeleteBoardGameId(boardgame.boardGameId)
                  deleteBoardGame(e)
                }
                }
            >
              Remove
            </button>
          </div>
        )}
      </div>
    )

  }

  const [deleteBoardGameId, setDeleteBoardGameId] = useState();
  const deleteBoardGame = (e) => {
    e.preventDefault();
    
    if (deleteBoardGameId) {
      deleteBoardgameAPI(
        sessionStorage.getItem("accountToken"),
        deleteBoardGameId
      )
        .then((res) => {
          window.alert(res);
          refreshBoardgamesList();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="p-[40px] h-screen overflow-y-auto">
      <div className="flex justify-end"><AdminAccount/></div>
      <div className="mt-[20px]">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">Boardgames Management</h2>
          <button
            className="bg-blue-500 flex justify-center w-[120px] p-2 font-medium rounded-md"
            onClick={() => {
              navigate("/admin/boardgames/create")
            }}
          >
            Add
          </button>
        </div>
  
          <table className="mt-[10px]">
            <thead>
              <tr className="text-[18px]">
                <th className="border-l-[2px] border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                  <p className="p-2">Boardgame ID</p>
                </th>
                <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                  <p className="p-2">Boardgame Name</p>
                </th>
                <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                  <p className="p-2">Boardgame Image</p>
                </th>
                <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                  <p className="p-2">Boardgame Description</p>
                </th>
                <th className="border-r-[2px] border-b-[2px] border-t-[2px] border-gray-500 pr-5 px-3">
                </th>
              </tr>
            </thead>
            {boardgames &&
              boardgames.map((boardgame, index) => (
            <tbody>
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
                    } text-[16px]`}
                  >
                    <td className={`${boardgames[boardgames.length - 1].boardGameId === boardgame.boardGameId? 'border-b-[2px]': ''} border-l-[2px] border-gray-500 pr-5 p-4`}>
                      <p className="p-2">{boardgame.boardGameId}</p>
                    </td>
                    <td className={`${boardgames[boardgames.length - 1].boardGameId === boardgame.boardGameId? 'border-b-[2px]': ''} border-gray-500 pr-5 p-4`}>
                      <p className="p-2">{boardgame.name}</p>
                    </td>
                    <td className={`${boardgames[boardgames.length - 1].boardGameId === boardgame.boardGameId? 'border-b-[2px]': ''} border-gray-500 pr-5 p-4`}>
                      <img
                        src={boardgame.image}
                        alt=""
                        className="w-[120px] p-4 cursor-pointer"
                        onClick={() => handleImageClick(boardgame.image)}
                      />
                    </td>
                    <td className={`${boardgames[boardgames.length - 1].boardGameId === boardgame.boardGameId? 'border-b-[2px]': ''} border-gray-500 pr-5 p-4`}>
                      <p className="p-2">{boardgame.description}</p>
                    </td>
                    <td className={`${boardgames[boardgames.length - 1].boardGameId === boardgame.boardGameId? 'border-b-[2px]': ''} border-r-[2px] border-gray-500 pr-5 p-4`}>
                      <Dropdown boardgame={boardgame} />
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
                className="absolute top-10 right-0 py-2 px-4 mr-4 rounded-md text-white bg-red-500 hover:bg-red-600"
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

export default BoardgameInformation;
