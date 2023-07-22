import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { getOrderDetailsAPI } from "../api/userAPI";
import { getGamePackBasedOnIDAPI } from "../api/productAPI";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const UserOrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [PackName, setPackName] = useState([]);

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  // useEffect(()=> {
  //     refreshOrderDetailsList();
  // },[])

  const refreshOrderDetailsList = async () => {
    await getOrderDetailsAPI(sessionStorage.getItem("orderId"))
      .then((res) => {
        setOrderDetails(res);
        getProductName(res);
      })
      .catch((error) => console.log(error));
  };

  const getProductName = (arr) => {
    arr.forEach((element) => {
      getGamePackBasedOnIDAPI(element.gamePackId).then((res) => {
        // window.alert(res.gamePackName);
        setPackName((PackName) => [
          ...PackName,
          { id: res.gamePackId, name: res.gamePackName },
        ]);
      });
    });
  };

  return (
    <div
      onLoad={() => {
        refreshOrderDetailsList();
        setPackName([]);
      }}
    >
      <Header />
      <section className="py-[120px] bg-gradient-to-tr from-[#C0EEF2] to-[#146C94]">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold">
            Order Details - Order {sessionStorage.getItem("orderId")}{" "}
          </h2>
          <table className="w-full mt-5">
            <thead>
              <tr>
                <th className="border-l-[2px] border-t-[2px] border-b-[2px] border-gray-600 px-4 py-2">
                  Gamepack ID
                </th>
                <th className="border-t-[2px] border-b-[2px] border-gray-600 px-4 py-2">
                  Gamepack Name
                </th>
                <th className="border-t-[2px] border-b-[2px] border-gray-600 px-4 py-2">
                  Unit Price
                </th>
                <th className="border-t-[2px] border-b-[2px] border-gray-600 px-4 py-2">
                  Quantity purchased
                </th>
                <th className="border-r-[2px] border-t-[2px] border-b-[2px] border-gray-600 px-4 py-2">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetails &&
                orderDetails.map((orderDetail, index) => (
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-gray-200" : "bg-gray-400"
                    }`}
                  >
                    <td className="border-[2px] border-gray-600 px-4 py-2">
                      {orderDetail.gamePackId}
                    </td>
                    <td className="border-[2px] border-gray-600 px-4 py-2">
                      {PackName.map((pname, key) => (
                        <p key={key}>
                          {pname.id === orderDetail.gamePackId
                            ? pname.name
                            : ""}
                        </p>
                      ))}
                    </td>
                    <td className="border-[2px] border-gray-600 px-4 py-2">
                      {VND.format(orderDetail.price)}
                    </td>
                    <td className="border-[2px] border-gray-600 px-4 py-2">
                      {orderDetail.amount}
                    </td>
                    <td className="border-[2px] border-gray-600 px-4 py-2">
                      {VND.format(orderDetail.price * orderDetail.amount)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <Link to={"/shop/user/paymentdetails"}>
              <button
                className="bg-red-400 hover:bg-red-500 rounded-md font-bold px-4 py-2"
                onClick={() => {
                  sessionStorage.removeItem("orderId");
                  console.log(PackName);
                  setPackName([]);
                }}
              >
                Exit View
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default UserOrderDetails;
