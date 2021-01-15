import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };

    //PRODUCTS
    case GET_PRODUCTS_BEGIN:
      return { ...state, productsLoading: true };
    case GET_PRODUCTS_SUCCESS:
      const featuredProducts = action.payload.filter(
        (item) => item.featured === true
      );
      return {
        ...state,
        productsLoading: false,
        products: action.payload,
        featuredProducts,
      };
    case GET_PRODUCTS_ERROR:
      return { ...state, productsLoading: false, productsError: true };

    //SINGLE PRODUCTS
    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        singleProductsLoading: true,
        singleProductsError: false,
      };

    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProductsLoading: false,
        singleProducts: action.payload,
      };

    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        singleProductsLoading: false,
        singleProductsError: true,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default products_reducer;
