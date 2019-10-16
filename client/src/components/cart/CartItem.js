import React from 'react';
import { Col, Button, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { deleteProductInCart } from '../../actions/cart';
import { useDispatch } from 'react-redux';

const CartItem = ({ productId, name, price, quantity, imageUrl }) => {
  const dispatch = useDispatch();
  const priceComma = Number(price).toLocaleString();
  const totalPrice = price * quantity;
  const totalPriceComma = Number(totalPrice).toLocaleString();

  return (
    <ListGroupItem
      className=' mt-2 rounded shadow'
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Col xs='3' sm='3' md='3' lg='3' xl='3' className='text-center'>
        <img src={imageUrl} alt='' width='100%' height='100vh' />
      </Col>
      <Col xs='3' sm='3' md='3' lg='3' xl='3' className='text-center'>
        <span className='font-weight-bold'>{name}</span> <br /> ${priceComma}{' '}
        {' x '} {quantity}
      </Col>
      <Col xs='3' sm='3' md='3' lg='3' xl='3' className='text-center'>
        Total: ${totalPriceComma}
      </Col>
      <Col
        xs='1'
        sm='1'
        md='1'
        lg='1'
        xl='1'
        className='offset-xs-1 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1 text-center'
      >
        <Button
          onClick={e => {
            dispatch(deleteProductInCart(productId));
          }}
          color='danger'
        >
          X
        </Button>
      </Col>
    </ListGroupItem>
  );
};

CartItem.propTypes = {
  productId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired
};

export default CartItem;
