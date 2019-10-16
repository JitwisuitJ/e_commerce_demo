import React, { Fragment, useState } from 'react';
import AddProductModal from './AddProductModal';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getProductsSearch } from '../../actions/product';
import { Row, Col, Form, Input, FormGroup, Button } from 'reactstrap';

const ProductBar = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user);
  const products = useSelector(state => state.productReducer.products);

  const handleSearch = e => {
    if (searchText) {
      dispatch(getProductsSearch(searchText));
    } else {
      dispatch(getProducts());
    }
  };

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

          <Col
            xs={user.role === 'admin' ? '5' : '7'}
            sm={user.role === 'admin' ? '5' : '7'}
            md={user.role === 'admin' ? '5' : '7'}
            lg={user.role === 'admin' ? '5' : '7'}
            xl={user.role === 'admin' ? '5' : '7'}
          >
            <Form className='mt-3'>
              <FormGroup>
                <Input
                  type='text'
                  name='searchText'
                  placeholder='Search Product...(Show all, leave blank)'
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col xs='2' sm='2' md='2' lg='2' xl='2' className='text-right'>
            <Button
              onClick={e => handleSearch(e)}
              color='warning'
              className='shadow-sm'
            >
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i className='fas fa-search text-dark'></i>
              &nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </Col>
        </Row>
      </Fragment>
    )
  );
};

export default ProductBar;
