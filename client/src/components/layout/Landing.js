import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const Landing = () => {
  const isAuthenticated = useSelector(
    state => state.authReducer.isAuthenticated
  );
  const loading = useSelector(state => state.authReducer.loading);

  if (isAuthenticated) {
    return loading ? <Spinner /> : <Redirect to='/products' />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='landing'>
        <div className='landing-inner'>
          <h1>E-Commerce</h1>
          <p>For demonstration purposes only</p>
          <div>
            <Link to='/register' className='btn btn-success mr-1'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-secondary ml-1'>
              Login
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
