import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import Spinner from '../layout/Spinner';

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    state => state.authReducer.isAuthenticated
  );
  const loading = useSelector(state => state.authReducer.loading);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'user'
  });

  const { name, email, password, passwordConfirm, role } = formData;

  const onChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      dispatch(register({ name, email, password, role }));
    }
  };

  // Redirect if Register Success
  if (isAuthenticated) {
    return loading ? <Spinner /> : <Redirect to='/products' />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Form className='pt-5' onSubmit={e => onSubmit(e)}>
        <h1>
          Sign Up <i className='fas fa-user'></i>
        </h1>
        <FormGroup>
          <Label for='name'>Name</Label>
          <Input
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            className='mb-3'
            value={name}
            onChange={e => onChange(e)}
            required
          />
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
          <Label for='passwordConfirm'>Confirm Password</Label>
          <Input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            placeholder='Confirm Password'
            className='mb-3'
            value={passwordConfirm}
            onChange={e => onChange(e)}
            minLength='6'
            required
          />

          <FormGroup>
            <Label>
              Role{' '}
              <span className='text-muted'>
                (This should not be here, but for demonstration purposes only)
              </span>
            </Label>
            <FormGroup check>
              <Label check>
                <Input
                  type='radio'
                  name='role'
                  value='user'
                  defaultChecked
                  onClick={e => onChange(e)}
                />{' '}
                User
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type='radio'
                  name='role'
                  value='admin'
                  onClick={e => onChange(e)}
                />{' '}
                Admin
              </Label>
            </FormGroup>
          </FormGroup>

          <Button color='dark' style={{ marginTop: '2rem' }} block>
            Sign up
          </Button>
        </FormGroup>
      </Form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
