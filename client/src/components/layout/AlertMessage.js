import React from 'react';
import { Alert } from 'reactstrap';
import { useSelector } from 'react-redux';

const AlertMessage = () => {
  const alerts = useSelector(state => state.alertReducer);

  const AlertComponent =
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <Alert className='text-center' key={alert.id} color={alert.alertType}>
        {alert.msg}
      </Alert>
    ));

  return AlertComponent;
};

export default AlertMessage;
