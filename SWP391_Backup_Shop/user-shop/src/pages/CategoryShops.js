import React, { useContext, useEffect, useState } from "react";
import AnimatedBg from "react-animated-bg";

import { ProductContext } from "../contexts/ProductContext";

import Product from "../components/Product";

import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { searchGamePackAPI } from "../api/productAPI";

const CategoryShops = () => {
  const { products } = useContext(ProductContext);
  const [categoryNote, setCategoryNote] = useState("All");
  const [searchedProduct, setSearchedProduct] = useState(null);
  const [boardGames, setBoardGames] = useState([]);

  const searchFunction = (searchValue, category) => {
    if (category !== null) {
      setCategoryNote(category);
    }

    searchGamePackAPI(searchValue, category)
      .then((res) => {
        if (category !== "All") {
          setSearchedProduct(res);
        } else {
          setSearchedProduct(null);
        }
      })
      .catch((err) => console.log(err));
  };

  const getBoardGame = (data) => {
    setBoardGames(data);
  };

  const getCategoryHeader = (boardGame) => {
    for (var i = 0; i < products.length; i++) {
      if (products[i].boardGameId === boardGame.boardGameId)
        return (
          <h2 className="font-semibold text-[24px] mb-4 bg-white w-[400px]">
            {boardGame.name}
          </h2>
        );
    }
  };

  return (
    <div className="w-full h-full">
      <Header searchFunction={searchFunction} getBoardGame={getBoardGame} />
      <section
        className={`py-[100px] bg-gradient-to-tr from-[#C0EEF2] via-[#89C4E1] to-[#146C94] `}
      >
        <div className="container mx-auto mt-8">
          <h2 className="font-semibold text-[24px] mb-4 bg-white">
            Categorial Shop -- {categoryNote}
          </h2>
          {searchedProduct === null ? (
            boardGames.map((boardGame) => (
              <>
                <>{getCategoryHeader(boardGame)}</>
                <div
                  className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl: grid-cols-5 gap-[30px]
              max-w-sm mx-auto md:max-w-none md:mx-0"
                >
                  {products.map((product) => {
                    if (product.boardGameId === boardGame.boardGameId)
                      return (
                        <Product product={product} key={product.gamePackId} />
                      );
                  })}
                </div>
              </>
            ))
          ) : (
            <div
              className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl: grid-cols-5 gap-[30px]
              max-w-sm mx-auto md:max-w-none md:mx-0"
            >
              {searchedProduct.map((product) => {
                return <Product product={product} key={product.gamePackId} />;
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CategoryShops;
