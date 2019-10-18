import React, { Fragment, useEffect } from 'react';
import ProductShowcase from './showcase/ProductShowcase';
import ProductBar from './bar/ProductBar';
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
      <ProductShowcase />
    </Fragment>
  );
};

export default ProductIndex;
