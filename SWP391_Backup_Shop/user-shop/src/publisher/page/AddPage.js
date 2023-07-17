import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

import { getBoardGameAPI, getGameTagsAPI } from "../../api/productAPI";
import { createGamePackAPI } from "../../api/publisherAPI";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { useEffect } from "react";

const StepOneForm = (props) => {
  const { getPackData, boardGames, gameTags, packData } = props;

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
        <div
          className="flex flex-col gap-y-3"
          onLoad={
            (document.getElementById("boardGameId").value =
              document.getElementById(packData.boardGameId))
          }
        >
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
          <select>
            {gameTags.map((item) => (
              <option>{item.gameTagName}</option>
            ))}
          </select>
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
            type="number"
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
            type="number"
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
  const { getPackData, getPackImage } = props;

  const getImageData = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (x) => {
        getPackImage(file.name, x.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRuleContent = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        const content = x.target.result;
        var doc = new Docxtemplater(new PizZip(content), {
          delimiters: {
            start: "12op1j2po1j2poj1po",
            end: "op21j4po21jp4oj1op24j",
          },
        });
        var text = doc.getFullText();
        getPackData("gameRule", text);
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-semibold mb-8 text-[32px]">Step 3: Imports</h2>
      <form className="h-fit px-[20px] gap-[10px]">
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Rules</label>
          <input
            type="file"
            accept={".docx" || ".doc"}
            id="gameRule"
            placeholder="Enter Game Package Price"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            onChange={getRuleContent}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Image</label>
          <input
            type="file"
            accept={".jpg" || ".png" || ".webp"}
            id="image"
            placeholder="Enter Game Package Price"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            onChange={getImageData}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="font-bold mb-1">Game Package Components</label>
          <input
            type="file"
            accept={".xlsx" || ".xls"}
            id="update-gpdescription"
            placeholder="Enter Game Package Price"
            className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
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
  imageSrc: "",
};

const AddPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = (e) => {
    // Perform form validation and submission logic
    e.preventDefault();
    const formData = new FormData();
    formData.append("gamePackId", packData.gamePackId);
    formData.append("boardGameId", packData.boardGameId);
    formData.append("ownerId", sessionStorage.getItem("publisherId"));
    formData.append("gamePackName", packData.gamePackName);
    formData.append("image", packData.image);
    formData.append("description", packData.description);
    formData.append("price", packData.price);
    formData.append("age", packData.age);
    formData.append("numberOfPlayer", packData.numberOfPlayer);
    formData.append("gameDuration", packData.gameDuration);
    formData.append("origin", packData.origin);
    formData.append("weight", packData.weight);
    formData.append("size", packData.size);
    formData.append("material", packData.material);
    formData.append("gameRule", packData.gameRule);
    formData.append("availableAmount", packData.availableAmount);
    formData.append("imageSrc", packData.imageSrc);
    formData.append("owner.ownerId", "temp");
    formData.append("boardGame.boardGameId", "temp");
    createGamePackAPI(sessionStorage.getItem("accountToken"), formData)
      .then((res) => window.alert(res))
      .catch((err) => window.alert(err.data));

    navigate("/shop/publisher");
  };

  const [packData, setPackData] = useState(initalPackData);

  const getPackData = (name, value) => {
    setPackData({
      ...packData,
      [name]: value,
    });
  };

  const getPackImage = (name, source) => {
    setPackData({
      ...packData,
      image: name,
      imageSrc: source,
    });
  };

  const [boardGames, setBoardGames] = useState([]);
  const [gameTags, setGameTags] = useState([]);

  useEffect(() => {
    loadDropDownList();
  }, []);

  const loadDropDownList = () => {
    getBoardGameAPI()
      .then((res) => setBoardGames(res))
      .catch((err) => console.log(err));

    getGameTagsAPI()
      .then((res) => setGameTags(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full p-8 h-fit rounded-lg">
          <form className="h-fit px-[20px] gap-[10px]">
            {currentStep === 1 && (
              <StepOneForm
                getPackData={getPackData}
                boardGames={boardGames}
                gameTags={gameTags}
                packData={packData}
              />
            )}
            {currentStep === 2 && (
              <StepTwoForm getPackData={getPackData} packData={packData} />
            )}
            {currentStep === 3 && (
              <FinalStepForm
                getPackData={getPackData}
                getPackImage={getPackImage}
                packData={packData}
              />
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
