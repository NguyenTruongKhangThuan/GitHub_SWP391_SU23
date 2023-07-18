import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { FiTrash2 } from "react-icons/fi";

import CartItem from "../components/CartItem";

import { CartContext } from "../contexts/CartContext";
import Header from "../components/Header";

function ViewCart() {
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  return (
    <>
      <Header />
      <div
        className="w-full mt-[80px] bg-white fixed top-0 h-full shadow-2xl 
            md:w-[35vw] xl:w-full"
      >
        <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b">
          {cart.map((item) => {
            return <CartItem item={item} key={item.gamePackId} />;
          })}
        </div>
        <div className="flex flex-col gap-y-3 py-4 mt-3">
          <div className="flex w-full justify-between items-center">
            <div className="uppercase font-semibold">
              <span className="mr-2">Total:</span>VND{" "}
              {parseInt(total)}
            </div>
            <div
              onClick={clearCart}
              className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            >
              <FiTrash2 />
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              to={"/shop/category"}
              className="bg-gray-700 flex p-4 justify-center items-center text-white w-[300px] font-medium"
            >
              Continue Shopping
            </Link>
            <Link
              to={"/shop/checkout"}
              className="bg-gray-700 flex p-4 justify-center items-center text-white w-[300px] font-medium"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCart;
