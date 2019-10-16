import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { loadCart } from '../../actions/cart';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

import { Row, Container, ListGroup } from 'reactstrap';

const CartIndex = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.cartReducer.products);
  const loading = useSelector(state => state.cartReducer.loading);

  let totalPrice = 0;

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  if (products.length > 0 && products !== null) {
    products.forEach(product => {
      const { quantity } = product;
      const { price } = product.product;
      totalPrice = totalPrice + quantity * price;
    });
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container style={{ width: '60%' }}>
        <Row className='py-2 justify-content-center align-items-center'>
          <h1>
            Cart&nbsp;&nbsp;<i className='fas fa-shopping-cart text-black'></i>
          </h1>
        </Row>
        <Row className='justify-content-center align-items-center'>
          <ListGroup>
            {products.map(product => {
              const { _id: productCartId, quantity } = product;
              const { name, price, imageUrl, _id } = product.product;

              return (
                <CartItem
                  key={productCartId}
                  productId={_id}
                  name={name}
                  price={price}
                  quantity={quantity}
                  imageUrl={imageUrl}
                />
              );
            })}
            {products.length > 0 && products !== null ? (
              <CartTotal totalPrice={totalPrice} />
            ) : (
              <p>
                No products in cart, Please visit{' '}
                <Link to='/products'>Products Page</Link> to buy some.
              </p>
            )}
          </ListGroup>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CartIndex;
