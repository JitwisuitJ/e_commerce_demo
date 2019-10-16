import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_FAIL,
  GET_PRODUCTS_SEARCH,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCTS_SEARCH_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_LOADING,
  SET_PRODUCT_PAGE
} from '../actions/types';

const initialState = {
  products: [],
  loading: true,
  currentPage: 1,
  error: {}
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
    case GET_PRODUCTS_SEARCH:
      return {
        ...state,
        loading: false,
        products: payload,
        currentPage: 1
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [payload, ...state.products],
        currentPage: 1
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map(product =>
          product._id === payload._id ? payload : product
        )
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(product => product._id !== payload._id)
      };
    case SET_PRODUCT_PAGE:
      return {
        ...state,
        currentPage: payload,
        loading: false
      };
    case GET_PRODUCTS_FAIL:
    case ADD_PRODUCT_FAIL:
    case EDIT_PRODUCT_FAIL:
    case GET_PRODUCTS_SEARCH_FAIL:
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default productReducer;
