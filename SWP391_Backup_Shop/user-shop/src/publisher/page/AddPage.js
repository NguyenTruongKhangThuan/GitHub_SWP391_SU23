import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

import {
  getBoardGameAPI,
  getGameTagsAPI,
  addGameTagIntoGamePack,
} from "../../api/productAPI";
import { createGamePackAPI } from "../../api/publisherAPI";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { useEffect } from "react";

import Select from "react-select";

import defaultImage from "../assets/defaultImg.jpg";
//import firebase
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const StepOneForm = (props) => {
  const {
    getPackData,
    boardGames,
    gameTags,
    packData,
    handelTagChance,
    selectedTag,
  } = props;
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-semibold mb-8 text-[32px]">
        Step 1: Basic Information
      </h2>
      <form className="h-fit px-[20px] grid grid-cols-2 gap-x-[20px] gap-y-[24px]">
        <div className="flex flex-col gap-y-2">
          <label className="font-bold mb-1">Game Package Name:</label>
          <input
            type="text"
            id="gamePackName"
            placeholder="Enter game package name"
            className="border-b-solid border-b-[1px] bg-[#ffffff] p-1"
            value={packData.gamePackName}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter Game Package Description"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            value={packData.description}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Game Package Price"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            value={packData.price}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">
            Game Package Based Boardgame Tag
          </label>
          <select
            id="boardGameId"
            onChange={(e) => {
              const index = e.target.selectedIndex;
              const el = e.target.childNodes[index];
              const option = el.getAttribute("id");
              getPackData(e.currentTarget.id, option);
            }}
          >
            <option>{"(None)"}</option>
            {boardGames.map((item) => (
              <option id={item.boardGameId}>{item.name}</option>
            ))}
          </select>
        </div>
        {/* game tag */}
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Other Tags</label>

          {gameTags && (
            <Select
              options={gameTags}
              isSearchable={true}
              isMulti={true}
              onChange={handelTagChance}
              defaultValue={selectedTag}
            />
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Quantity</label>
          <input
            type="number"
            id="availableAmount"
            placeholder="Enter Game Package Quantity"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            value={packData.availableAmount}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

const StepTwoForm = (props) => {
  const { getPackData, packData } = props;
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-semibold mb-8 text-[32px]">
        Step 2: Additional Information
      </h2>
      <form className="h-fit px-[20px] grid grid-cols-3 gap-x-[20px] gap-y-[24px]">
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Appropriate Age</label>
          <input
            type="text"
            id="age"
            placeholder="Enter Appropriate Age"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            value={packData.age}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Numbers of Players Required</label>
          <input
            type="text"
            id="numberOfPlayer"
            placeholder="Enter Numbers of Players Required"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            value={packData.numberOfPlayer}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Size</label>
          <input
            type="text"
            id="size"
            placeholder="Enter Game Package Size"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            value={packData.size}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Average Match Duration</label>
          <input
            type="text"
            id="gameDuration"
            placeholder="Enter Average Match Duration"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            value={packData.gameDuration}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Origin</label>
          <input
            type="text"
            id="origin"
            placeholder="Enter Game Package Origin"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            value={packData.origin}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Weight</label>
          <input
            type="number"
            id="weight"
            placeholder="Enter Game Package Weight"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            value={packData.weight}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Material</label>
          <input
            type="text"
            id="material"
            placeholder="Enter Game Package Material"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            value={packData.material}
            onChange={(e) => getPackData(e.currentTarget.id, e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

const FinalStepForm = (props) => {
  const { getPackData } = props;
  const [image, setImage] = useState(defaultImage);

  const getImageData = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImage(x.target.result);
      };
      reader.readAsDataURL(file);
      getPackData("imageFile", file);
    } else {
      setImage(defaultImage);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <h2 className="font-semibold mb-8 text-[32px]">Step 3: Imports</h2>
      <form className="h-fit px-[20px] gap-[10px]">
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Image</label>
          <img className="w-[360px] h-[300px]" src={image} alt="" />
          <input
            type="file"
            accept={"image/*"}
            id="image"
            placeholder="Enter Game Package Price"
            className="p-1 border-b-[1px]"
            onChange={getImageData}
          />
        </div>
      </form>
    </div>
  );
};

const initalPackData = {
  gamePackId: "GP",
  boardGameId: "",
  gamePackName: "",
  image: "",
  description: "",
  price: 0,
  age: 0,
  numberOfPlayer: "",
  gameDuration: 0,
  origin: "",
  weight: 0,
  size: "",
  material: "",
  gameRule: "",
  availableAmount: 0,
  imageFile: null,
};

const AddPage = () => {
  const [percent, setPercent] = useState(0);

  const [packData, setPackData] = useState(initalPackData);

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `/files/${packData.imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, packData.imageFile);

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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          AddGamePack(url);
        });
      }
    );
  };

  const tagIds = [];
  const AddGamePack = (url) => {
    selectedTag.map((tag, index) => {
      tagIds[index] = tag.value;
    });

    const formData = new FormData();
    formData.append("gamePackId", packData.gamePackId);
    formData.append("boardGameId", packData.boardGameId);
    formData.append("ownerId", sessionStorage.getItem("publisherId"));
    formData.append("gamePackName", packData.gamePackName);
    formData.append("image", url);
    formData.append("description", packData.description);
    formData.append("price", packData.price);
    formData.append("age", packData.age);
    formData.append("numberOfPlayer", packData.numberOfPlayer);
    formData.append("gameDuration", packData.gameDuration);
    formData.append("origin", packData.origin);
    formData.append("weight", packData.weight);
    formData.append("size", packData.size);
    formData.append("material", packData.material);
    formData.append("gameRule", "empty");
    formData.append("availableAmount", packData.availableAmount);
    formData.append("owner.ownerId", "temp");
    formData.append("boardGame.boardGameId", "temp");
    createGamePackAPI(sessionStorage.getItem("accountToken"), formData)
      .then((res) => {
        addGameTagIntoGamePack(res, tagIds).catch((err) => console.log(err));
        window.alert("Create Successfully");
      })
      .catch((err) => window.alert("Error Occur"));

    navigate("/shop/publisher");
  };

  const getPackData = (name, value) => {
    setPackData({
      ...packData,
      [name]: value,
    });
  };

  const [boardGames, setBoardGames] = useState([]);
  const [options, setOption] = useState([]);

  useEffect(() => {
    loadDropDownList();
  }, []);

  const loadDropDownList = () => {
    getBoardGameAPI()
      .then((res) => setBoardGames(res))
      .catch((err) => console.log(err));

    getGameTagsAPI()
      .then((res) => {
        res.map((tag, i) => {
          options[i] = { value: tag.gameTagId, label: tag.gameTagName };
        });
      })
      .catch((err) => console.log(err));
  };

  const [selectedTag, setSelectedTag] = useState();
  const handelTagChance = (tags) => {
    setSelectedTag(tags);
  };

  return (
    <div>
      <Header />
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-tr from-[#C0EEF2] to-[#146C94]">
        <div className="w-full p-8 h-fit rounded-lg">
          <form className="h-fit px-[20px] gap-[10px]">
            {currentStep === 1 && (
              <StepOneForm
                getPackData={getPackData}
                boardGames={boardGames}
                gameTags={options}
                packData={packData}
                handelTagChance={handelTagChance}
                selectedTag={selectedTag}
              />
            )}
            {currentStep === 2 && (
              <StepTwoForm getPackData={getPackData} packData={packData} />
            )}
            {currentStep === 3 && (
              <FinalStepForm getPackData={getPackData} packData={packData} />
            )}
            <div className="flex justify-center items-center">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="border w-[160px] rounded-full font-bold mx-8 my-5 py-2 bg-[#0e6486] hover:bg-[#28c4dc]  text-white text-center"
                >
                  Back
                </button>
              )}
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="border w-[160px] rounded-full font-bold mx-8 my-5 py-2 bg-[#0e6486] hover:bg-[#28c4dc]  text-white text-center"
                >
                  Next
                </button>
              )}
              {currentStep === 3 && (
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="border w-[160px] rounded-full font-bold mx-8 my-5 py-2 bg-[#0e6486] hover:bg-[#28c4dc]  text-white text-center"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
