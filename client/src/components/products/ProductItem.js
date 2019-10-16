import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';
import { addProductToCart } from '../../actions/cart';

import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

const ProductItem = ({ productId, name, price, description, imageUrl }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user);
  const cartLoading = useSelector(state => state.cartReducer.loading);
  const priceComma = Number(price).toLocaleString();
  return (
    user && (
      <Col xs='6' sm='6' md='4' lg='3' xl='3' className='mt-4'>
        <Card className='h-100  rounded shadow p-3'>
          <CardImg top src={imageUrl} alt='Image not found' />
          <CardBody>
            <CardTitle className='font-weight-bold'>{name}</CardTitle>
            <CardSubtitle>
              {'$'}
              {priceComma}
            </CardSubtitle>
            <CardText className=' text-muted crop-text-3'>
              {description}
            </CardText>
          </CardBody>
          <Button
            className='bg-success mb-2 btn-block  border border-light'
            onClick={e => dispatch(addProductToCart(productId, 1))}
            disabled={cartLoading}
          >
            <i className='fas fa-shopping-cart text-white'></i>&nbsp;&nbsp;Add
            To Cart
          </Button>
          {user.role === 'admin' && (
            <Fragment>
              <EditProductModal productId={productId} />
              <DeleteProductModal productId={productId} />
            </Fragment>
          )}
        </Card>
      </Col>
    )
  );
};

ProductItem.propTypes = {
  productId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

export default ProductItem;
