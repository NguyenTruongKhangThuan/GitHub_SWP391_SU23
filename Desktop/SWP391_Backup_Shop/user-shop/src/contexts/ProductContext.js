import React, {createContext, useState, useEffect} from 'react';

export const ProductContext = createContext();

const ProductProvider = ({children}) => {
  const [products,setProducts] = useState([])
  //This is FAKE API
  //Replace this with the real API
  useEffect(()=> {
    const fetchProducts = async() => {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data)
    }
    fetchProducts();
  })
  return <ProductContext.Provider value={{products}}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
