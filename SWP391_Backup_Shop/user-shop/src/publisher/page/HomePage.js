import React, { useContext } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";

import { ProductContext } from "../../contexts/ProductContext";
import Product from "../components/Product";

import {
  readPublisherInfoAPI,
  getCreatedGamePackAPI,
} from "../../api/publisherAPI";
import useSessionStorageState from "use-session-storage-state";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/Footer";

const HomePage = () => {
  const [publisherId, setPublisherId] = useSessionStorageState("publisherId");
  const [products, setProducts] = useState([]);

  const load = () => {
    readPublisherInfoAPI(sessionStorage.getItem("accountToken")).then((res) => {
      sessionStorage.setItem("publisherId", res);
    });
  };

  useEffect(() => {
    loadCreatedGamePack();
  });

  const loadCreatedGamePack = () => {
    getCreatedGamePackAPI(
      sessionStorage.getItem("accountToken"),
      sessionStorage.getItem("publisherId")
    )
      .then((res) => setProducts(res))
      .catch((err) => console.log(err));
  };

  return (
    <div
      onLoad={() => {
        load();
      }}
    >
      <Header />
      <Hero />
      <h2 className="ml-[100px] mt-[40px] font-bold">
        Your Published Game Packages:
      </h2>
      <section className="py-16">
        <div className="container mx-auto">
          <div
            className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl: grid-cols-5 gap-[30px]
          max-w-sm mx-auto md:max-w-none md:mx-0"
          >
            {products.map((product) => {
              return <Product product={product} key={product.gamePackId} />;
            })}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default HomePage;
