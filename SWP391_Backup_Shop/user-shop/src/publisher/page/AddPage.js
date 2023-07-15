import React, { useContext, useState } from "react";
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'




const StepOneForm = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="font-semibold mb-8 text-[32px]">Step 1: Basic Information</h2>
            <form className="h-fit px-[20px] grid grid-cols-2 gap-x-[20px] gap-y-[24px]">
                <div className="flex flex-col gap-y-2">
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

const StepTwoForm = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="font-semibold mb-8 text-[32px]">Step 2: Additional Information</h2>
            <form className="h-fit px-[20px] grid grid-cols-3 gap-x-[20px] gap-y-[24px]">
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
                    <label className="font-bold mb-1">Game Package Size</label>
                    <input
                        type="text"
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

const FinalStepForm = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="font-semibold mb-8 text-[32px]">Step 3: Imports</h2>
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
const AddPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();


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
                            <StepOneForm />
                        )}
                        {currentStep === 2 && (
                            <StepTwoForm />
                        )}
                        {currentStep === 3 && (
                            <FinalStepForm />
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
    )
}

export default AddPage
