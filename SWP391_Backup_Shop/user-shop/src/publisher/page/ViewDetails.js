import React, { useContext } from "react";

import { Link, useParams } from "react-router-dom";

import { ProductContext } from "../../contexts/ProductContext";
import Header from "../components/Header";
import Footer from "../../components/Footer";

const ViewDetails = () => {
  //Get the Product ID from the URL
  const { id } = useParams();

  const { products } = useContext(ProductContext);

  const product = products.find((item) => {
    return item.gamePackId === id;
  });

  //Case: Product Not Found
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  //destructure product
  const { title, price, description, image } = product;

  return (
    <>
      <Header />
      <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
        <div className="container mx-auto lg:mx-0">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-10">
              <img src={image} alt="" className="max-w-[200px] lg:max-w-sm" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {title}
              </h1>
              <div className="text-xl text-red-500 font-medium mb-6">
                VND {price}
              </div>
              <p className="mb-8">{description}</p>
              <Link to={`/shop/publisher/product/update/${id}`}>
                <button className="bg-primary py-4 px-8 text-white">
                  Edit Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ViewDetails;