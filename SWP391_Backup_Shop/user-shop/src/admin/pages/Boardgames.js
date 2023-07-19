import React, { useEffect, useState } from "react";
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
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openDetailsForm, setOpenDetailsForm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(0); //delete according to the index
  const [boardgames, setBoardgames] = useState();
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [boardGameInfo, setBoardGameInfo] = useState();

  //Upload File
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    refreshBoardgamesList();
  }, []);

  const refreshBoardgamesList = async () => {
    await getBoardgamesAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setBoardgames(data))
      .catch((error) => console.log(error));
  };

  const toggleAddForm = () => {
    setOpenAddForm(!openAddForm);
    if (openAddForm === true) {
      console.log("Form opened!");
    } else {
      console.log("Form closed!");
    }
  };

  const updateFormSubmission = (e) => {
    e.preventDefault();

    //Take Value In Document

    if (file) {
      const storageRef = ref(storage, `/files/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          //downloadUrl
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            UpdateBoardGame(url);
          });
        }
      );
    }
  };

  const [updatedBoardGame, setUpdatedBoardGame] = useState();
  // const [updatedBoardGameData, setUpdatedBoardGameData] =
  //   useState(updatedBoardGame);

  const [updatedName, setUpdatedName] = useState();
  const [updatedDescription, setUpdatedDescription] = useState();

  // const getUpdatedBoardGameData = (name, value) => {
  //   setUpdatedBoardGameData({
  //     ...updatedBoardGameData,
  //     [name]: value,
  //   });
  // };

  const UpdateBoardGame = (imageUrl) => {
    var formData = new FormData();
    formData.append("boardGameId", updatedBoardGame.boardGameId);
    formData.append("name", updatedName);
    formData.append("description", updatedDescription);
    formData.append("image", imageUrl);

    putBoardgameAPI(sessionStorage.getItem("accountToken"), formData)
      .then((res) => {
        window.alert(res);
        refreshBoardgamesList();
      })
      .catch((error) => {
        console.log(error);
        window.alert("Cannot add boardgame");
      });
  };

  const addFormSubmission = (e) => {
    e.preventDefault();

    //Take Value In Document

    if (file) {
      const storageRef = ref(storage, `/files/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          //downloadUrl
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            addNewBoardGame(url);
          });
        }
      );
    }
  };

  const [boardGameData, setBoardGameData] = useState(initalData);
  const getBoardGameData = (name, value) => {
    setBoardGameData({
      ...boardGameData,
      [name]: value,
    });
  };

  const addNewBoardGame = (imageUrl) => {
    var formData = new FormData();
    formData.append("boardGameId", "empty");
    formData.append("name", boardGameData.name);
    formData.append("description", boardGameData.description);
    formData.append("image", imageUrl);

    postBoardgamesAPI(sessionStorage.getItem("accountToken"), formData)
      .then((res) => {
        window.alert(res);
        refreshBoardgamesList();
      })
      .catch((error) => {
        console.log(error);
        window.alert("Cannot add boardgame");
      });
  };

  const toggleViewDetails = () => {
    setOpenDetailsForm(!openDetailsForm);
  };

  const toggleUpdate = () => {
    setOpenUpdateForm(!openUpdateForm);
  };

  const toggleViewOrUpdate = () => {
    //rotate between view details and update
    if (openDetailsForm) setOpenUpdateForm(false);
    else setOpenUpdateForm(true);
  };

  const [deleteBoardGameId, setDeleteBoardGameId] = useState();
  const deleteBoardGame = (e) => {
    // e.preventDefault();
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
    <div>
      <div className="flex justify-end mt-2"><AdminAccount/></div>
      <div className="mt-[20px]">
        <div className="flex justify-between">
          <h2>Boardgames Management</h2>
          <button
            className="bg-blue-500 flex justify-center w-[120px] p-2 rounded-md"
            onClick={toggleAddForm}
          >
            Add
          </button>
        </div>
  
        <table className="mt-[10px]">
          <thead>
            <tr className="text-[18px]">
              <th className="border-[2px] border-gray-500 pr-5 px-3">
                Boardgame ID
              </th>
              <th className="border-[2px] border-gray-500 pr-5 px-3">
                Boardgame Name
              </th>
              <th className="border-[2px] border-gray-500 pr-5 px-3">
                Boardgame Image
              </th>
              <th className="border-[2px] border-gray-500 pr-5 px-3">
                Boardgame Description
              </th>
              <th className="border-[2px] border-gray-500 pr-5 px-3" colSpan={3}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {boardgames &&
              boardgames.map((boardgame, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
                  } text-[16px]`}
                >
                  <td className="border-[2px] border-gray-500 pr-5 pl-2">
                    {boardgame.boardGameId}
                  </td>
                  <td className="border-[2px] border-gray-500 pr-5 pl-2">
                    {boardgame.name}
                  </td>
                  <td className="border-[2px] border-gray-500 pr-5 pl-2">
                    <img
                      src={boardgame.image}
                      alt={boardgame.image}
                      className="w-[160px] p-4"
                    />
                  </td>
                  <td className="border-[2px] border-gray-500 pr-5 pl-2">
                    {boardgame.description}
                  </td>
                  <td className="border-l-[2px] border-b-[2px] border-r-none border-gray-500 pr-5 pl-2">
                    <button
                      className="bg-green-400 hover:bg-green-600 w-[160px] p-4 text-[18px] font-bold rounded-md"
                      onClick={() => {
                        toggleViewDetails();
                        setBoardGameInfo(boardgame);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                  <td className="border-b-[2px] border-gray-500 pr-5 pl-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 w-[160px] p-4 text-[18px] font-bold rounded-md"
                      onClick={() => {
                        toggleUpdate();
                        setUpdatedBoardGame(boardgame);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td className="border-r-[2px] border-b-[2px] border-gray-500 pr-5 pl-2">
                    <button
                      className="bg-red-400 hover:bg-red-500 w-[160px] p-4 text-[18px] font-bold rounded-md"
                      onClick={(e) => {
                        // window.alert("test");
                        setDeleteBoardGameId(boardgame.boardGameId);
                        deleteBoardGame(e);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {openAddForm && (
          <div className="flex justify-center">
            <form className="w-[840px]">
              <div className="grid grid-cols-2 mt-4">
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Boardgame Name</label>
                    <input
                      type="text"
                      id="boardgameName"
                      placeholder="Enter Boardgame Name"
                      className="p-2 rounded-md"
                      onChange={(e) => getBoardGameData("name", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Boardgame Image</label>
                    <input
                      type="file"
                      accept={"image/*"}
                      id="boardgameImageSrc"
                      placeholder="Import Boardgame Image"
                      className="p-2 rounded-md"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <div></div>
                </div>
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Boardgame Description</label>
                    <input
                      type="text"
                      id="boardgameDescription"
                      placeholder="Enter Boardgame Description"
                      className="p-2 rounded-md"
                      onChange={(e) =>
                        getBoardGameData("description", e.target.value)
                      }
                    />
                  </div>
                  <div className=" flex justify-end items-center gap-x-6">
                    <button
                      onClick={addFormSubmission}
                      className="bg-blue-300 hover:bg-blue-600 items-center mt-4 p-4 w-[120px] rounded-md"
                    >
                      Add
                    </button>
                    <button
                      className="bg-red-300 hover:bg-red-500 items-center mt-4 p-4 w-[120px] rounded-md"
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
        {openDetailsForm && boardGameInfo && (
          <div className="flex justify-center">
            <form className="w-[840px]">
              <div className="grid grid-cols-2 mt-4">
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Boardgame Name</label>
                    <input
                      type="text"
                      id="boardgameName"
                      placeholder="Enter Boardgame Name"
                      className="p-2 rounded-md"
                      value={boardGameInfo.name}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Boardgame Image</label>
                    {/* <input
                      type="file"
                      accept={"/image/*"}
                      id="boardgameImageSrc"
                      placeholder="Import Boardgame Image"
                      className="p-2 rounded-md"
                    /> */}
                    <img
                      src={boardGameInfo.image}
                      alt={boardGameInfo.name}
                      id="boardgameImage"
                      className="p-2 rounded-md"
                    />
                  </div>
                  <div></div>
                </div>
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Boardgame Description</label>
                    <input
                      type="text"
                      id="boardgameDescription"
                      placeholder="Enter Boardgame Description"
                      className="p-2 rounded-md"
                      value={boardGameInfo.description}
                    />
                  </div>
                  <div className=" flex justify-end items-center gap-x-6">
                    <button
                      onClick={toggleViewOrUpdate}
                      className="bg-yellow-300 hover:bg-yellow-600 items-center mt-4 p-4 w-[240px] text-[16px] rounded-md"
                    >
                      Update Boardgames
                    </button>
                    <button
                      className="bg-red-300 hover:bg-red-500 items-center mt-4 p-4 w-[120px] text-[16px] rounded-md"
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
        {openUpdateForm && updatedBoardGame && (
          <div className="flex justify-center">
            <form className="w-[840px]">
              <div className="grid grid-cols-2 mt-4">
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Boardgame Name</label>
                    <input
                      type="text"
                      id="boardgameName"
                      placeholder="Enter Boardgame Name"
                      className="p-2 rounded-md"
                      // value={updatedBoardGame.name}
                      onChange={(e) =>
                        // getUpdatedBoardGameData("name", e.target.value)
                        setUpdatedName(e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Boardgame Image</label>
                    <input
                      type="file"
                      accept={"image/*"}
                      id="boardgameImageSrc"
                      placeholder="Import Boardgame Image"
                      className="p-2 rounded-md"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <div></div>
                </div>
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3">Boardgame Description</label>
                    <input
                      type="text"
                      id="boardgameDescription"
                      placeholder="Enter Boardgame Description"
                      className="p-2 rounded-md"
                      // value={updatedBoardGame.description}
                      onChange={(e) =>
                        // getUpdatedBoardGameData("description", e.target.value)
                        setUpdatedDescription(e.target.value)
                      }
                    />
                  </div>
                  <div className=" flex justify-end items-center gap-x-6">
                    <button
                      onClick={(e) => {
                        updateFormSubmission(e);
                        toggleUpdate();
                        //Add a
                      }}
                      className="bg-blue-300 hover:bg-blue-600 items-center mt-4 p-4 w-[120px] rounded-md"
                    >
                      Add
                    </button>
                    <button
                      className="bg-red-300 hover:bg-red-500 items-center mt-4 p-4 w-[120px] rounded-md"
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
    </div>
  );
};

export default BoardgameInformation;
