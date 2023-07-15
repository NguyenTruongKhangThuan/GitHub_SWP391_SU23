import React, { createContext, useState, useEffect } from "react";
import { getAvailableGamePackAPI } from "../api/productAPI";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAvailableGamePackAPI();
      // const data = await res.json();
      setProducts(res);
    };
    fetchProducts();
  }, []);
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
