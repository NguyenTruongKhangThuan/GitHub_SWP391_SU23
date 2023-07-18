import React, { useContext, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { CartContext } from "../contexts/CartContext";

import { ProductContext } from "../contexts/ProductContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  //Get the Product ID from the URL
  const { id } = useParams();
  console.log(id);

  const { products } = useContext(ProductContext);

  const { addToCart } = useContext(CartContext);

  const [showFullRule, setShowFullRule] = useState(false);

  const toggleRuleVisibility = () => {
    setShowFullRule(!showFullRule);
  };

  const product = products.find((item) => {
    return item.gamePackId === id;
  });

  const showSuccessMessage = () => {
    toast.success("Product has been added to your cart!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  //Case: Product Not Found
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  return (
    <>
      <Header />
      <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
        <div className="container mx-auto lg:mx-0">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-10">
              <img
                src={product.image}
                alt=""
                className="max-w-[200px] lg:max-w-sm"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {product.gamePackName}
              </h1>
              <div className="text-xl text-red-500 font-medium mb-6">
                {VND.format(product.price)}
              </div>
              <div className="flex gap-x-20">
                <div className="flex flex-col gap-y-4">
                  <div className="flex justify-between w-[240px]">
                    <p className="font-semibold">Numbers of Players:</p>
                    <p>{product.numberOfPlayer}</p>
                  </div>
                  <div className="flex justify-between w-[240px]">
                    <p className="font-semibold">Appropriate Age:</p>
                    <p>{product.age}</p>
                  </div>
                  <div className="flex justify-between w-[240px]">
                    <p className="font-semibold">Average Duration Match:</p>
                    <p>{product.gameDuration}</p>
                  </div>
                </div>
                <div className="">
                  <div className="flex justify-between w-[320px] mb-4">
                    <p className="font-semibold">Origin:</p>
                    <p>{product.origin}</p>
                  </div>
                  <div className="flex justify-between w-[320px] mb-4">
                    <p className="font-semibold">Weight:</p>
                    <p>{product.weight}</p>
                  </div>
                  <div className="flex justify-between w-[320px] mb-4">
                    <p className="font-semibold">Size:</p>
                    <p>{product.size}</p>
                  </div>
                  <div className="flex justify-between w-[320px] mb-4">
                    <p className="font-semibold">Material:</p>
                    <p>{product.material}</p>
                  </div>
                </div>
              </div>
              {product.description.length > 0 && (
                <div
                  className={`mb-8 ${
                    product.description.length > 250
                      ? "text-[13px]"
                      : "text-[14px]"
                  } w-[800px]`}
                >
                  <p>
                    {showFullRule
                      ? product.description
                      : `${product.description.slice(0, 100)}...`}
                  </p>
                  {product.description.length > 200 && (
                    <button
                      className="text-blue-500 mt-2"
                      onClick={toggleRuleVisibility}
                    >
                      {showFullRule ? "View Less" : "View More"}
                    </button>
                  )}
                </div>
              )}
              <div className="flex gap-x-10">
                <button
                  className="bg-primary py-4 px-8 text-white"
                  onClick={() => {
                    addToCart(product, product.gamePackId);
                    showSuccessMessage();
                  }}
                >
                  Add To Cart
                </button>
                <Link to={"/shop"}>
                  <button className="bg-primary py-4 px-8 text-white">
                    Return and Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
            <ToastContainer className={"mt-14 bg-no-repeat"} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
