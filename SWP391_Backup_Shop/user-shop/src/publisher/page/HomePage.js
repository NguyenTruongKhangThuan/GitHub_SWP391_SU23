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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HomePage = () => {
  const [publisherId, setPublisherId] = useSessionStorageState("publisherId");
  const [products, setProducts] = useState([]);

  //Timer value
  const [timer, setTimer] = useState(1000);

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const load = () => {
    readPublisherInfoAPI(sessionStorage.getItem("accountToken")).then((res) => {
      sessionStorage.setItem("publisherId", res);
    });
  };

  useEffect(() => {
    loadCreatedGamePack();
  });

  //Need to change the delay setting
  const loadCreatedGamePack = async () => {
    await delay(timer);
    getCreatedGamePackAPI(
      sessionStorage.getItem("accountToken"),
      sessionStorage.getItem("publisherId")
    )
      .then((res) => {
        setProducts(res);
        setTimer(20000);
      })
      .catch((err) => console.log(err));
  };

  const setActionTimer = () => {
    setTimer(1000);
  };

  return (
    <div
      onLoad={() => {
        load();
      }}
      className="bg-gradient-to-tr from-[#C0EEF2] to-[#146C94]"
    >
      <Header />
      <Hero />
      <h2 className="ml-[100px] mt-4 font-bold">
        Your Published Game Packages:
      </h2>
      <div>
        <section className="py-10">
          <div className="container mx-auto">
            <div
              className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl: grid-cols-5 gap-[30px]
            max-w-sm mx-auto md:max-w-none md:mx-0"
            >
              {products.length > 0 &&
                products.map((product) => {
                  return (
                    <Product
                      product={product}
                      key={product.gamePackId}
                      setActionTimer={setActionTimer}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
