import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product, stock } = action.payload;
      console.log(stock);
      let tempItem = state.cart.find((item) => item.id === id + color);

      if (tempItem) {
        let tempCart = state.cart.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount;
            if (newAmount > item.maxAmount) {
              newAmount = item.maxAmount;
            }
            return { ...item, amount: newAmount };
          } else {
            return item;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        let newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          maxAmount: stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
