import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";

import { CartContext } from "../contexts/CartContext";

const CartItem = ({ item }) => {


  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  const { gamePackId, gamePackName, image, price, amount } = item;

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/shop/product/${gamePackId}`}>
          <img className="max-w-[80px]" src={image} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              to={`/shop/product/${gamePackId}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {gamePackName}
            </Link>
            <div
              className="text-xl cursor-pointer"
              onClick={() => removeFromCart(gamePackId)}
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex flex-row gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div
                onClick={() => decreaseAmount(gamePackId)}
                className="flex-1 flex justify-center items-center h-full cursor-pointer "
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {parseInt(amount)}
              </div>
              <div
                onClick={() => increaseAmount(gamePackId)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            {/* <div className="flex-1 flex items-center justify-around">
               {price} VND
            </div> */}
            <div className="flex-1 flex justify-end items-center text-primary font-medium">
              {` ${VND.format(price * amount)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
