import React, { useContext } from "react";

import { ProductContext } from "../contexts/ProductContext";

import Product from "../components/Product";

import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CategoryShops = () => {
  const { products } = useContext(ProductContext);

  //Modify Search
  const filteredProducts = products.filter((item) => {
    return item.category !== "";
  });

  return (
    <div>
      <Header />
      <section className="py-16">
        <div className="container mx-auto mt-8">
          <h2 className="font-semibold text-[24px] mb-4">
            Categorial Shop -- All
          </h2>
          <div
            className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl: grid-cols-5 gap-[30px]
            max-w-sm mx-auto md:max-w-none md:mx-0"
          >
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.gamePackId} />;
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CategoryShops;
