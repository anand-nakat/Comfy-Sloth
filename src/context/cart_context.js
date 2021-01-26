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
  totalAmount: 1000,
  totalItems: 0,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (id, color, amount, product, stock, price) => {
    console.log(product);
    dispatch({
      type: ADD_TO_CART,
      payload: { id, color, amount, product, stock, price },
    });
  };
  const toggleCartAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        removeCartItem,
        toggleCartAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
