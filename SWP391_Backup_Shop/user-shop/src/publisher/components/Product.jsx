import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";

import { BsPlus, BsEyeFill } from "react-icons/bs";

const Product = ({ product }) => {
  const { gamePackId, imageSrc, category, gamePackName, price } = product;

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              src={imageSrc}
              alt=""
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
            ></img>
          </div>
        </div>
        <div className="absolute top-6 right-11 group-hover:right-5 bg-red-500/40 p-2 flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            to={`/shop/publisher/product/${gamePackId}`}
            title="View Details"
            className="w-12 h-12 bg-white flex items-center justify-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500">{category}</div>
        <Link to={`/shop/publisher/product/${gamePackId}`}>
          <h2 className="font-semibold mb-1 ">{gamePackName}</h2>
        </Link>
        <div className="font-semibold">{price}</div>
      </div>
    </div>
  );
};

export default Product;
