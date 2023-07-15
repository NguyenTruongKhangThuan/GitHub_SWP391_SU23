import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [itemAmount, setItemAmount] = useState(0);

  //update Item Quantity
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  //total price state
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  });

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };

    const cartItem = cart.find((item) => {
      return item.gamePackId === id;
    });

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.gamePackId === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  //Toggle increaments in amount
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.gamePackId === id);
    addToCart(cartItem, id);
  };

  //Toggle decreaments of the quantity
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.gamePackId === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.gamePackId === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }

    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.gamePackId !== id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemAmount,
        total,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
