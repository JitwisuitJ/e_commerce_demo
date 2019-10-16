import React from 'react';
import Register from '../auth/Register';
import Login from '../auth/Login';
import ProductIndex from '../products/ProductIndex';
import CartIndex from '../cart/CartIndex';
import NotFound from '../layout/NotFound';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import AlertMessage from '../layout/AlertMessage';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <Container className='container-main'>
      <AlertMessage />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/products' component={ProductIndex} />
        <PrivateRoute exact path='/cart' component={CartIndex} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
};

export default Routes;
