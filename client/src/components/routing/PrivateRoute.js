import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, path }) => {
  const isAuthenticated = useSelector(
    state => state.authReducer.isAuthenticated
  );
  const loading = useSelector(state => state.authReducer.loading);

  return (
    <Route
      path={path}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired
};

export default PrivateRoute;
