import React, { Fragment } from 'react';
import spinner from './spinner.svg';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '135px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);

export default Spinner;
