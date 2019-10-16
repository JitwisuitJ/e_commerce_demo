import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import { checkOut } from '../../actions/cart';
import PropTypes from 'prop-types';
import { Col, Row, ListGroupItem } from 'reactstrap';

const CartTotal = ({ totalPrice }) => {
  const dispatch = useDispatch();

  const totalPriceComma = Number(totalPrice).toLocaleString();

  const handleCheckOut = paymentData => {
    dispatch(checkOut(paymentData));
  };

  return (
    <ListGroupItem className=' mt-2 rounded shadow'>
      <Row
        style={{
          alignItems: 'center'
        }}
      >
        <Col xs='6' sm='6' md='6' lg='6' xl='6' className='text-center'>
          <span className='font-weight-bold'>
            Total Price: ${totalPriceComma}
          </span>
        </Col>
        <Col xs='6' sm='6' md='6' lg='6' xl='6' className='text-center'>
          <StripeCheckout
            name='E-Commerce'
            amount={totalPrice * 100}
            currency='USD'
            description='Note: Enter Stripe Email'
            allowRememberMe={false}
            token={handleCheckOut}
            stripeKey='pk_test_CiJEZVtXxdqYn2jJKdORHmWb00H6XCfuUQ'
          ></StripeCheckout>
        </Col>
      </Row>
    </ListGroupItem>
  );
};

CartTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired
};

export default CartTotal;
