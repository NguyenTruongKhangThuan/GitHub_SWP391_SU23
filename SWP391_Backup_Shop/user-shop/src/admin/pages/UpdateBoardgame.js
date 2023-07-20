import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
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

const UpdateBoardgame = () => {
  const [updatedBoardGame, setUpdatedBoardGame] = useState();
  const location = useLocation();
  let {boardGameData} = location.state;
  // const [updatedBoardGameData, setUpdatedBoardGameData] =
  //   useState(updatedBoardGame);

  const [updatedName, setUpdatedName] = useState(boardGameData.name);
  const [updatedDescription, setUpdatedDescription] = useState(boardGameData.description);
  //Upload File
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  const navigate = useNavigate();

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
    else{
      UpdateBoardGame(boardGameData.image);
    }
  };

  const UpdateBoardGame = (imageUrl) => {
    var formData = new FormData();
    formData.append("boardGameId", boardGameData.boardGameId);
    formData.append("name", updatedName);
    formData.append("description", updatedDescription);
    formData.append("image", imageUrl);

    putBoardgameAPI(sessionStorage.getItem("accountToken"), formData)
      .then((res) => {
        window.alert(res);
        navigate("/admin/boardgames")
      })
      .catch((error) => {
        console.log(error);
        window.alert("Cannot add boardgame");
      });
  };

  return (
    <div>
      <div className="flex justify-end p-4"><AdminAccount/></div>
      <h2 className="text-center font-bold text-2xl">Update Boardgame: {boardGameData.name}</h2>
      <div className="flex justify-center">
            <form className="w-[840px]">
              <div className="grid grid-cols-2 mt-4">
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Boardgame Name</label>
                    <input
                      type="text"
                      id="boardgameName"
                      placeholder="Enter Boardgame Name"
                      className="p-2 rounded-md"
                      defaultValue={boardGameData.name}
                      onChange={(e) =>
                        // getUpdatedBoardGameData("name", e.target.value)
                        setUpdatedName(e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Boardgame Image</label>
                    <input
                      type="file"
                      accept={"image/*"}
                      id="boardgameImageSrc"
                      placeholder="Import Boardgame Image"
                      className="p-2 rounded-md"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-[400px]">
                  <div className="flex flex-col mt-4">
                    <label className="mb-3 font-bold">Boardgame Description</label>
                    <input
                      type="text"
                      id="boardgameDescription"
                      placeholder="Enter Boardgame Description"
                      className="p-2 rounded-md"
                      defaultValue={boardGameData.description}
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
                      }}
                      className="bg-blue-500 hover:bg-blue-600 font-bold items-center mt-4 p-4 w-[120px] rounded-md"
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 font-bold items-center mt-4 p-4 w-[120px] rounded-md"
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

export default UpdateBoardgame
