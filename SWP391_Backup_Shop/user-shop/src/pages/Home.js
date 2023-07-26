import React, { useContext, useState, useEffect } from "react";

import { ProductContext } from "../contexts/ProductContext";

import Product from "../components/Product";

import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { getGamePacksBestSellerAPI } from "../api/productAPI";

import { getBestSellerAPI } from "../api/productAPI";

const Home = () => {
  const { products } = useContext(ProductContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    refreshBestSellersList();
  });

  const refreshBestSellersList = async () => {
    await getBestSellerAPI()
      .then((data) => setBestSellers(data))
      .catch((error) => alert(error));
  };

  return (
    <div>
      <Header />
      <Hero />
      <section className="py-10 bg-gradient-to-tr from-[#C0EEF2] to-[#146C94]">
        <div className="container mx-auto">
          <h2 className="font-semibold text-2xl">Best Seller</h2>
        </div>
        <div className="container mx-auto">
          <div
            className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl: grid-cols-5 gap-[30px]
          max-w-sm mx-auto md:max-w-none md:mx-0"
          >
            {bestSellers.length > 0 &&
              bestSellers.slice(0, 4).map((product) => {
                return (
                  <div>
                    <Product product={product} key={product.gamePackId} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
