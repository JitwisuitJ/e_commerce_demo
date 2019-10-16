import React, { Fragment } from 'react';
import { Row } from 'reactstrap';

const NotFound = () => {
  return (
    <Fragment>
      <Row className='pt-5 justify-content-center'>
        <h1 className='x-large'>
          <i className='fas fa-exclamation-triangle'></i> Page Not Found
        </h1>
      </Row>
      <Row className='mt-3 justify-content-center'>
        <p className='large'>Sorry, this page does not exist</p>
      </Row>
    </Fragment>
  );
};

export default NotFound;
