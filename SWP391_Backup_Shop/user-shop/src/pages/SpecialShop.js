import React, { useContext, useState } from "react";

import { ProductContext } from "../contexts/ProductContext";

import Product from "../components/Product";

import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { searchGamePackAPI } from "../api/productAPI";

const SpecialShops = () => {
  const { products } = useContext(ProductContext);
  const [boardGames, setBoardGames] = useState([]);

  const [searchedProduct, setSearchedProduct] = useState(null);

  const searchFunction = (searchValue, category) => {
    searchGamePackAPI(searchValue, category)
      .then((res) => setSearchedProduct(res))
      .catch((err) => console.log(err));
  };

  const getBoardGame = (data) => {
    setBoardGames(data);
  };

  const getCategoryHeader = (boardGame) => {
    for (var i = 0; i < products.length; i++) {
      if (products[i].boardGameId === boardGame.boardGameId)
        if (products[i].price >= 1000000)
          return (
            <div className="font-semibold text-[24px] mb-4 w-full">
              <h2 className="bg-gray-200 rounded-md bg-opacity-20 pl-2 italic">
                {boardGame.name} Section
              </h2>
            </div>
          );
    }
  };

  return (
    <div>
      <Header searchFunction={searchFunction} getBoardGame={getBoardGame} />
      <section className="py-16 bg-gradient-to-tr from-[#C0EEF2] to-[#146C94]">
        <div className="container mx-auto mt-16">
          <h2 className="font-semibold text-[24px] mb-4">Special Shop</h2>

          {boardGames.length > 0 &&
            boardGames.map((boardGame) => (
              <>
                <>{getCategoryHeader(boardGame)}</>
                <div
                  className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl: grid-cols-5 gap-[30px]
            max-w-sm mx-auto md:max-w-none md:mx-0 "
                >
                  {searchedProduct === null
                    ? products.map((product) => {
                        if (product.boardGameId === boardGame.boardGameId) {
                          if (product.price >= 1000000)
                            return (
                              <Product
                                product={product}
                                key={product.gamePackId}
                              />
                            );
                        }
                      })
                    : searchedProduct.map((product) => {
                        if (product.boardGameId === boardGame.boardGameId) {
                          if (product.price >= 1000000)
                            return (
                              <Product
                                product={product}
                                key={product.gamePackId}
                              />
                            );
                        }
                      })}
                </div>
              </>
            ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SpecialShops;
