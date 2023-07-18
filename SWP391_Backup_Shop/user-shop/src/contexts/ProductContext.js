import React, { createContext, useState, useEffect } from "react";
import { getAvailableGamePackAPI } from "../api/productAPI";

export const ProductContext = createContext();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAvailableGamePackAPI();
      // const data = await res.json();
      if (products.length > 0) await delay(10000);
      setProducts(res);
    };
    fetchProducts();
  });
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
