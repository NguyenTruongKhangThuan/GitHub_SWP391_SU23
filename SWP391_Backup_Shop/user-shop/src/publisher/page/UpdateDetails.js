import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";

const UpdateDetails = () => {
  //Get the Product ID from the URL
  const { id } = useParams();

  const { products } = useContext(ProductContext);

  const navigate = useNavigate();

  const product = products.find((item) => {
    return item.id === parseInt(id);
  });

  const stepOneForm = () => {
    return (
      <div>
        <form className="h-fit px-[20px] gap-[10px]">
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Game Package Name:</label>
            <input
              type="text"
              id="update-gpname"
              placeholder="Enter game package name"
              className="border-b-solid border-b-[1px] bg-[#ffffff] p-1"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">
              Game Package Description
            </label>
            <input
              type="text"
              id="update-gpdescription"
              placeholder="Enter Game Package Description"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Game Package Price</label>
            <input
              type="number"
              id="update-gpdescription"
              placeholder="Enter Game Package Price"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">
              Game Package Based Boardgame Tag
            </label>
            <select>
              <option>Monopoly</option>
              <option>Catan</option>
              <option>Werewolf</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">
              Game Package Other Tags
            </label>
            <select>
              <option>Family</option>
              <option>Party</option>
              <option>Strategy</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Game Package Quantity</label>
            <input
              type="number"
              id="update-gpdescription"
              placeholder="Enter Game Package Quantity"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
        </form>
      </div>
    )
  }

  const stepTwoForm = () => {
    return (
      <div>
        <form className="h-fit px-[20px] gap-[10px]">
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Appropriate Age</label>
            <input
              type="text"
              id="update-gpdescription"
              placeholder="Enter Game Package Price"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">
              Numbers of Players Required
            </label>
            <input
              type="number"
              id="update-gpdescription"
              placeholder="Enter Game Package Price"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Average Match Duration</label>
            <input
              type="number"
              id="update-gpdescription"
              placeholder="Enter Game Package Price"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Origin</label>
            <input
              type="text"
              id="update-gpdescription"
              placeholder="Enter Game Package Price"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Game Package Weight</label>
            <input
              type="number"
              id="update-gpdescription"
              placeholder="Enter Game Package Price"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Game Package Material</label>
            <input
              type="text"
              id="update-gpdescription"
              placeholder="Enter Game Package Price"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
        </form>
      </div>
    )
  }

  const finalStepForm = () => {
    return (
      <div>
        <form className="h-fit px-[20px] gap-[10px]">
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Game Package Rules</label>
            <input
              type="file"
              accept={".docx" || ".doc"}
              id="update-gpdescription"
              placeholder="Enter Game Package Price"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Game Package Size</label>
            <input
              type="text"
              id="update-gpdescription"
              placeholder="Enter Game Package Price"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">Game Package Image</label>
            <input
              type="file"
              accept={".jpg" || ".png" || ".webp"}
              id="update-gpdescription"
              placeholder="Enter Game Package Price"
              className="border-b-solid bg-[#ffffff] p-1 border-b-[1px]"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="font-bold mb-1">
              Game Package Components
            </label>
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
    )
  }

  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = () => {
    // Perform form validation and submission logic
    console.log("Updated!");
    navigate('/shop/publisher')
  };
  return (
    <div>
      <Header />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full p-8 h-fit rounded-lg">
          <form className="h-fit px-[20px] gap-[10px]">
            {currentStep === 1 && (
              <stepOneForm />
            )}
            {currentStep === 2 && (
              <stepTwoForm />
            )}
            {currentStep === 3 && (
              <finalStepForm />
            )}
            <div className="flex justify-center items-center">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="border w-1/3 rounded-full font-bold mx-8 my-5 py-2 bg-[#0e6486] hover:bg-[#28c4dc]  text-white text-center"
                >
                  Back
                </button>
              )}
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="border w-1/3 rounded-full font-bold mx-8 my-5 py-2 bg-[#0e6486] hover:bg-[#28c4dc]  text-white text-center"
                >
                  Next
                </button>
              )}
              {currentStep === 3 && (
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="border w-1/3 rounded-full font-bold mx-8 my-5 py-2 bg-[#0e6486] hover:bg-[#28c4dc]  text-white text-center"
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

export default UpdateDetails;