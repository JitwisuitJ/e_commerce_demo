import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getProductsSearch } from '../../../actions/product';
import { Col, Form, Input, FormGroup, Button } from 'reactstrap';

const SearchProduct = () => {
  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.authReducer.user);
  const dispatch = useDispatch();

  const handleSearch = e => {
    if (searchText) {
      dispatch(getProductsSearch(searchText));
    } else {
      dispatch(getProducts());
    }
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default SearchProduct;
