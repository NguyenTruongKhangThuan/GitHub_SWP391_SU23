import React, { useContext, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { ProductContext } from "../../contexts/ProductContext";
import Header from "../components/Header";
import Footer from "../../components/Footer";
import { getGameTagOfGamPack } from "../../api/productAPI";

const ViewDetails = () => {
  //Get the Product ID from the URL
  const { id } = useParams();

  const { products } = useContext(ProductContext);

  const [showFullRule, setShowFullRule] = useState(false);

  const toggleRuleVisibility = () => {
    setShowFullRule(!showFullRule);
  };

  const product = products.find((item) => {
    return item.gamePackId === id;
  });

  const [tags, setTags] = useState([]);

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
  } else {
    getGameTagOfGamPack(product.gamePackId)
      .then((res) => {
        setTags(res);
      })
      .catch((err) => console.log("Error Occur"));
  }

  //destructure product
  // const { title, price, description, image } = product;

  return (
    <>
      <Header />
      <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center bg-gradient-to-tr from-[#C0EEF2] to-[#146C94]">
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
              <div className="flex justify-between">
                <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                  {product.gamePackName}
                </h1>
                <div className="flex gap-x-[80px]">
                  <Link
                    to={`/shop/publisher/product/update/${product.gamePackId}`}
                    className="flex justify-center items-center rounded-md bg-yellow-400 py-2 px-4 font-bold text-[14px]"
                  >
                    Update Product
                  </Link>
                  <Link
                    to={"/shop/publisher"}
                    className="flex justify-center items-center rounded-md mr-[120px]  bg-red-500 py-2 px-4 font-bold text-[14px]"
                  >
                    Return
                  </Link>
                </div>
              </div>
              <div className="text-xl text-red-500 font-medium mb-6">
                {VND.format(product.price)}
              </div>
              <div className="flex gap-x-[120px]">
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
              <div className="flex justify-start  gap-x-[20px] mb-4">
                <p className="p-2 font-bold">Tags:</p>
                {tags &&
                  tags.map((tag) => (
                    <p className="border rounded bg-[#d2d2d2] p-2">
                      {tag.gameTagName}
                    </p>
                  ))}
              </div>
              {product.description.length > 0 && (
                <div className={`mb-8 text-[14px] w-[800px]`}>
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
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ViewDetails;
