import React, { Fragment, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import Spinner from '../layout/Spinner';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.authReducer.loading);
  const isAuthenticated = useSelector(
    state => state.authReducer.isAuthenticated
  );

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Redirect if Login Success
  if (isAuthenticated) {
    return loading ? <Spinner /> : <Redirect to='/products' />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Form className='pt-5' onSubmit={e => onSubmit(e)}>
        <h1>
          Login <i className='fas fa-sign-in-alt'></i>
        </h1>
        <FormGroup>
          <Label for='email'>Email</Label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            className='mb-3'
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <Label for='password'>Password</Label>
          <Input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            className='mb-3'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
            required
          />

          <Button color='dark' style={{ marginTop: '2rem' }} block>
            Login
          </Button>
        </FormGroup>
      </Form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
