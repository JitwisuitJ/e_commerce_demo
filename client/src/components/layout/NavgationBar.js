import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  Badge
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const NavgationBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    state => state.authReducer.isAuthenticated
  );
  const user = useSelector(state => state.authReducer.user);
  const productsInCart = useSelector(state => state.cartReducer.products);
  const loading = useSelector(state => state.authReducer.loading);
  const [isOpen, setIsOpen] = useState(false);
  let totalProducts = 0;

  if (productsInCart.length > 0 && productsInCart !== null) {
    productsInCart.forEach(productInCart => {
      totalProducts += productInCart.quantity;
    });
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link className='btn btn-outline-dark text-white mr-4' to='/register'>
          Sign Up
        </Link>
      </NavItem>
      <NavItem>
        <Link className='btn btn-outline-dark text-white' to='/login'>
          Login
        </Link>
      </NavItem>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <NavItem>
        <Link
          className='btn btn-outline-dark text-white shadow-lg mr-4 '
          to='/cart'
        >
          <Badge color='success'>{totalProducts}</Badge>{' '}
          <i className='fas fa-shopping-cart text-white'></i>&nbsp; Cart
        </Link>
      </NavItem>
      <NavItem>
        <Link
          className='btn btn-outline-dark text-white shadow-lg mr-4'
          to='/products'
        >
          Products
        </Link>
      </NavItem>
      <NavItem>
        <Link
          className='btn btn-outline-dark text-white shadow-lg '
          to='#'
          onClick={() => dispatch(logout())}
        >
          Logout
        </Link>
      </NavItem>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar
        className='py-3 fixed-top'
        style={{ background: '#E7122A' }}
        light
        expand='md'
      >
        <Nav className='mr-auto' navbar>
          <NavItem>
            {!loading && (
              <Fragment>
                {isAuthenticated && user ? (
                  <h3 className='text-white'>
                    <Link to='/products'>
                      <i className='fas fa-store text-success'></i>
                    </Link>
                    &nbsp;&nbsp;Welcome, {user.name}{' '}
                    {user.role === 'admin' && '(Admin)'}
                  </h3>
                ) : (
                  <h3 className='text-white'>
                    <Link to='/'>
                      <i className='fas fa-store text-success'></i>
                    </Link>
                    &nbsp;&nbsp;Welcome, Guest
                  </h3>
                )}
              </Fragment>
            )}
          </NavItem>
        </Nav>
        <NavbarToggler onClick={toggle} className='ml-auto' />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </Fragment>
  );
};

export default NavgationBar;
