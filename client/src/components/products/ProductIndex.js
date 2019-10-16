import React, { Fragment, useEffect } from 'react';
import Products from './Products';
import ProductBar from './ProductBar';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../actions/product';
import Spinner from '../layout/Spinner';

const ProductIndex = () => {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.productReducer.loading);
  const isAuthenticated = useSelector(
    state => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return loading || !isAuthenticated ? (
    <Spinner />
  ) : (
    <Fragment>
      <ProductBar />
      <Products />
    </Fragment>
  );
};

export default ProductIndex;
