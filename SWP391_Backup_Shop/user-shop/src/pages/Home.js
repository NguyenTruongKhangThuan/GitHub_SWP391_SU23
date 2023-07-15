import React, { useContext, useState } from "react";

import { ProductContext } from "../contexts/ProductContext";

import Product from "../components/Product";

import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { searchGamePackAPI } from "../api/productAPI";

const Home = () => {
  const { products } = useContext(ProductContext);
  const [searchedProduct, setSearchedProduct] = useState(null);

  const searchFunction = (searchValue, category) => {
    searchGamePackAPI(searchValue, category)
      .then((res) => setSearchedProduct(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header searchFunction={searchFunction} />
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div
            className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl: grid-cols-5 gap-[30px]
          max-w-sm mx-auto md:max-w-none md:mx-0"
          >
            {searchedProduct === null
              ? products.map((product) => {
                  return <Product product={product} key={product.gamePackId} />;
                })
              : searchedProduct.map((product) => {
                  console.log("alo");
                  return <Product product={product} key={product.gamePackId} />;
                })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
