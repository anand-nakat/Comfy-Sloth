import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

let localStorageCart = [];
if (localStorage.getItem("cart")) {
  localStorageCart = JSON.parse(localStorage.getItem("cart"));
}
const initialState = {
  cart: localStorageCart,
  shippingFee: 534,
  totalAmount: 100,
  totalItems: 0,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.cart.length > 1) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  const addToCart = (id, color, amount, product, stock, price) => {
    console.log(product);
    dispatch({
      type: ADD_TO_CART,
      payload: { id, color, amount, product, stock, price },
    });
  };
  const clearCart = () => {};
  const removeCartItem = (id) => {};

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, removeCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
