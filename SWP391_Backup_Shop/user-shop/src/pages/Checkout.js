import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import { FiTrash2 } from "react-icons/fi";

import CartItem from "../components/CartItem";

import Momo from "../img/Momo_2.png";

import { CartContext } from "../contexts/CartContext";
import Header from "../components/Header";
import moment from "moment";

//Import API
import {
  createMoMoPayment,
  createOrderAPI,
  createOrderDetailAPI,
} from "../api/orderAPI";

import { readUserInfoAPI } from "../api/userAPI";
import { useEffect } from "react";
import { Result } from "postcss";

function Checkout() {
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const [isOrderMade, setIsOrderMade] = useState(false);

  //Create order payment:
  const createOrder = async () => {
    var formData = new FormData();
    formData.append("orderId", "temp");
    formData.append(
      "orderDate",
      moment(new Date()).format("Y-MM-DD HH:mm:ss.SSS")
    );
    await createOrderAPI(formData).then((result) => {
      setOrderId(result);
      createOrderDetail(result);
    });
  };

  const createOrderDetail = (orderId) => {
    cart.forEach((item) => {
      var formData = new FormData();
      formData.append("orderDetailId", "temp");
      formData.append("orderId", orderId);
      formData.append("gamePackId", item.gamePackId);
      formData.append("amount", itemAmount);
      formData.append("price", item.price);
      formData.append("order.orderId", "temp");
      formData.append("gamePack.gamePackId", "temp");
      formData.append("gamePack.owner.ownerId", "temp");
      formData.append("gamePack.boardGame.boardGameId", "temp");

      createOrderDetailAPI(formData)
        .then((res) => {})
        .catch((err) => {
          window.alert(err.response.data);
        });
    });
  };

  const momoPayMethod = async (orderId) => {
    var userName = sessionStorage.getItem("account");
    var orderInfo = {
      fullName: `${userName}`,
      orderId: orderId,
      orderInfo: `Buy ${cart.length} items`,
      amount: total,
    };

    await createMoMoPayment(orderInfo, sessionStorage.getItem("accountToken"))
      .then((res) => {
        window.location.replace(res);
      })
      .catch((err) => window.alert(err.response));
  };

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
              {parseFloat(total).toFixed(2)}
            </div>
            <div
              onClick={clearCart}
              className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            >
              <FiTrash2 />
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-10">
            <Link
              to={"/shop/category"}
              className="bg-gray-700 flex p-[18px] justify-center items-center text-white w-[300px] font-medium rounded-md"
            >
              Continue Shopping
            </Link>

            {!isOrderMade && (
              <div
                to={"/shop/category"}
                className="bg-gray-700 flex p-[18px] justify-center items-center text-white w-[300px] font-medium rounded-md cursor-pointer"
                onClick={() => {
                  createOrder();
                  setIsOrderMade(true);
                }}
              >
                Make Order
              </div>
            )}

            {isOrderMade && (
              <Link className="bg-[#D82D8B] flex justify-center items-center text-white w-[300px] font-medium rounded-md">
                <button
                  className="flex items-center justify-center p-3 "
                  onClick={() => {
                    momoPayMethod(orderId);
                  }}
                >
                  <img src={Momo} alt="" className="w-[40px] " />
                  <p className="flex items-center text-center mx-auto">Pay with Momo</p>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
