import {
  CART_LOADED_SUCCESS,
  CART_LOADED_FAIL,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  DELETE_PRODUCT_CART_SUCCESS,
  DELETE_PRODUCT_CART_FAIL,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  CART_LOADING
} from '../actions/types';

const initialState = {
  products: [],
  loading: true,
  error: {}
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_LOADED_SUCCESS:
    case CART_ADD_SUCCESS:
    case DELETE_PRODUCT_CART_SUCCESS:
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        products: payload,
        loading: false
      };
    case CART_LOADED_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CART_ADD_FAIL:
    case DELETE_PRODUCT_CART_FAIL:
    case CHECKOUT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CART_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default cartReducer;
