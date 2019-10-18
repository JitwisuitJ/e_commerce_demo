import React, { Fragment } from 'react';
import AddProductModal from './AddProductModal';
import { useSelector } from 'react-redux';
import SearchProduct from './SearchProduct';

import { Row, Col } from 'reactstrap';

const ProductBar = () => {
  const user = useSelector(state => state.authReducer.user);
  const products = useSelector(state => state.productReducer.products);

  return (
    user && (
      <Fragment>
        <Row className='align-items-center'>
          <Col xs='3' sm='3' md='3' lg='3' xl='3'>
            <h1>Products&nbsp;({products.length})</h1>
          </Col>
          {user.role === 'admin' && (
            <Col xs='2' sm='2' md='2' lg='2' xl='2' className='text-center'>
              <AddProductModal />
            </Col>
          )}
          <SearchProduct />
        </Row>
      </Fragment>
    )
  );
};

export default ProductBar;
