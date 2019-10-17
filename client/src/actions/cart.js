import axios from 'axios';

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
import { setAlert } from '../actions/alert';

// Load Cart's User
export const loadCart = () => async dispatch => {
  dispatch({ type: CART_LOADING });
  try {
    const res = await axios.get('/api/cart/');

    dispatch({
      type: CART_LOADED_SUCCESS,
      payload: res.data.products
    });
  } catch (err) {
    dispatch({
      type: CART_LOADED_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Product to User's Cart
export const addProductToCart = (productId, quantity) => async dispatch => {
  dispatch({ type: CART_LOADING });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ productId, quantity });

  try {
    const res = await axios.put('/api/cart/addproduct', body, config);
    dispatch({
      type: CART_ADD_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch(setAlert('Added product to cart Failed', 'danger'));

    dispatch({
      type: CART_ADD_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Product in Cart's user
export const deleteProductInCart = productId => async dispatch => {
  dispatch({ type: CART_LOADING });
  try {
    const res = await axios.delete(`/api/cart/deleteproduct/${productId}`);

    dispatch({
      type: DELETE_PRODUCT_CART_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Removed Product from Cart', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch(setAlert('Remove product from cart Failed', 'danger'));

    dispatch({
      type: DELETE_PRODUCT_CART_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Checkout
export const checkOut = paymentData => async dispatch => {
  dispatch({ type: CART_LOADING });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify(paymentData);
  try {
    const res = await axios.post('/api/cart/checkout', body, config);

    dispatch({
      type: CHECKOUT_SUCCESS,
      payload: res.data
    });
    dispatch(
      setAlert('Purchased Succeed, Thanks for shopping with us', 'success')
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch(setAlert('Purchase Failed', 'danger'));

    dispatch({
      type: CHECKOUT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
