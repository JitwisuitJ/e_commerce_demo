import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SEARCH,
  GET_PRODUCTS_SEARCH_FAIL,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_LOADING,
  SET_PRODUCT_PAGE
} from '../actions/types';
import { loadCart } from '../actions/cart';

// Get all products to show in app
export const getProducts = () => async dispatch => {
  dispatch({ type: PRODUCT_LOADING });
  try {
    const res = await axios.get('/api/products');

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get products from searching to show in app
export const getProductsSearch = searchText => async dispatch => {
  dispatch({ type: PRODUCT_LOADING });
  try {
    const res = await axios.get(`/api/products/search/${searchText}`);

    dispatch({
      type: GET_PRODUCTS_SEARCH,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: GET_PRODUCTS_SEARCH_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add a product
export const addProduct = formData => async dispatch => {
  dispatch({ type: PRODUCT_LOADING });
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  try {
    const res = await axios.post('/api/products/create', formData, config);

    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Product Added Success', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('Failed to add Product, Please Redo Again', 'danger'));
  }
};

// Edit a product
export const editProduct = (formData, productId) => async dispatch => {
  dispatch({ type: PRODUCT_LOADING });
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  try {
    const res = await axios.put(
      `/api/products/update/${productId}`,
      formData,
      config
    );

    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: res.data
    });
    dispatch(loadCart());
    dispatch(setAlert('Product Edited Success', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('Failed to edit Product', 'danger'));
  }
};

// Delete a product
export const deleteProduct = productId => async dispatch => {
  dispatch({ type: PRODUCT_LOADING });
  try {
    const res = await axios.delete(`api/products/delete/${productId}`);
    const deletePayload = res.data;
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: deletePayload
    });

    dispatch(loadCart());

    dispatch(setAlert('Product Deleted', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('Product Deleted Failed', 'danger'));
  }
};

// Set Page
export const setCurrentPage = currentPage => async dispatch => {
  dispatch({ type: PRODUCT_LOADING });
  dispatch({ type: SET_PRODUCT_PAGE, payload: currentPage });
};
