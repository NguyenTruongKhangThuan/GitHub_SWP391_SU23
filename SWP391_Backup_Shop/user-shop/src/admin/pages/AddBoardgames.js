import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminAccount from "../components/AdminAccount";
import {
  getBoardgamesAPI,
  postBoardgamesAPI,
  putBoardgameAPI,
  deleteBoardgameAPI,
} from "../../api/adminAPI";

import defaultImage from "../assets/defaultImg.jpg";
//Import Firebase
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const initalData = {
  boardGameId: "temp",
  name: "",
  description: "",
  image: "",
};

const AddBoardgames = () => {
  //Upload File
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [boardgames, setBoardgames] = useState();

  const [image, setImage] = useState(defaultImage);
  const navigate = useNavigate();

  useEffect(() => {
    refreshBoardgamesList();
  }, []);

  const refreshBoardgamesList = async () => {
    await getBoardgamesAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setBoardgames(data))
      .catch((error) => console.log(error));
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

  const getImageData = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImage(x.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(defaultImage);
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
        navigate("/admin/boardgames");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Cannot add boardgame");
      });
  };

  return (
    <div className="p-[40px]">
      <div className="flex justify-end">
        <AdminAccount />
      </div>
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
                  onChange={(e) => getBoardGameData("name", e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="mb-3 font-bold">Boardgame Image</label>
                <img className="w-[360px] h-[300px]" src={image} alt="" />
                <input
                  type="file"
                  accept={"image/*"}
                  id="boardgameImageSrc"
                  placeholder="Import Boardgame Image"
                  className="p-2 rounded-md"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    getImageData(e);
                  }}
                />
              </div>
              <div></div>
            </div>
            <div className="flex flex-col w-[400px]">
              <div className="flex flex-col mt-4">
                <label className="mb-3 font-bold">Boardgame Description</label>
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
                  className="bg-blue-300 hover:bg-blue-600 font-bold items-center mt-4 p-4 w-[120px] rounded-md"
                >
                  Add
                </button>
                <button
                  className="bg-red-300 hover:bg-red-500 font-bold items-center mt-4 p-4 w-[120px] rounded-md"
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
  );
};

export default AddBoardgames;
