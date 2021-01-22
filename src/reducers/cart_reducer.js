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
      const { id, color, amount, product, stock, price } = action.payload;
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
          price,
          amount,
          image: product.images[0].url,
          maxAmount: stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case TOGGLE_CART_ITEM_AMOUNT:
      let newTempCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          console.log(item.maxAmount);
          if (action.payload.value === "inc") {
            let newAmount = item.amount + 1;
            if (newAmount > item.maxAmount) {
              newAmount = item.maxAmount;
            }
            return { ...item, amount: newAmount };
          } else {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        } else {
          return item;
        }
      });
      return { ...state, cart: newTempCart };

    case COUNT_CART_TOTALS:
      let { totalAmount, totalItems } = state.cart.reduce(
        (total, item) => {
          total.totalItems += item.amount;
          total.totalAmount += item.amount * item.price;
          return total;
        },
        {
          totalAmount: 0,
          totalItems: 0,
        }
      );

      return { ...state, totalAmount, totalItems };

    case REMOVE_CART_ITEM:
      let tempCart = state.cart.filter((item) => item.id !== action.payload);
      return { ...state, cart: tempCart };

    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
