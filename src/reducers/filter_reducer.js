import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((item) => item.price);
      maxPrice = Math.max(...maxPrice);

      return {
        ...state,
        filteredProducts: [...action.payload],
        allProducts: [...action.payload],
        filter: { ...state.filter, maxPrice, price: maxPrice },
      };

    case SET_GRIDVIEW:
      return { ...state, gridView: true };
    case SET_LISTVIEW:
      return { ...state, gridView: false };

    case UPDATE_SORT:
      return { ...state, sort: action.payload };

    case SORT_PRODUCTS:
      const { filteredProducts, sort } = state;
      let tempProducts = [...filteredProducts];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return { ...state, filteredProducts: tempProducts };

    case FILTER_PRODUCTS:
      const {
        allProducts,
        filter: { text, category, company, color, price, shipping },
      } = state;
      let tempFilteredProducts = [...allProducts];
      if (text) {
        tempFilteredProducts = tempFilteredProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }

      if (category !== "all") {
        tempFilteredProducts = tempFilteredProducts.filter(
          (product) => product.category === category
        );
      }
      if (company !== "all") {
        tempFilteredProducts = tempFilteredProducts.filter(
          (product) => product.company === company
        );
      }

      if (price > 0) {
        tempFilteredProducts = tempFilteredProducts.filter(
          (product) => product.price <= price
        );
      }
      if (color !== "all") {
        tempFilteredProducts = tempFilteredProducts.filter((product) =>
          product.colors.find((c) => c === color)
        );
      }

      if (shipping) {
        tempFilteredProducts = tempFilteredProducts.filter(
          (product) => product.shipping === true
        );
      }

      return { ...state, filteredProducts: tempFilteredProducts };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filter: { ...state.filter, [name]: value } };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);

    case CLEAR_FILTERS:
      return {
        ...state,
        filter: {
          text: "",
          category: "all",
          company: "all",
          color: "all",
          minPrice: 0,
          maxPrice: state.filter.maxPrice,
          price: state.filter.maxPrice,
          shipping: false,
        },
      };
  }
};

export default filter_reducer;
