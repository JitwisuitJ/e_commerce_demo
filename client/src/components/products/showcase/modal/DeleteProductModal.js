import React, { useState } from 'react';
import { deleteProduct } from '../../../../actions/product';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const DeleteProductModal = ({ productId }) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  };
  return (
    <div>
      <Button
        className='bg-danger mb-2  btn-block border border-light'
        onClick={toggle}
      >
        <i className='fas fa-trash text-white'></i>&nbsp;&nbsp;Delete this
        Product
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Are you sure? This can NOT be undone!
        </ModalHeader>
        <ModalBody>
          <Button
            color='danger'
            onClick={e => {
              dispatch(deleteProduct(productId));
              toggle();
            }}
          >
            Yes, I'm sure.
          </Button>
          <Button color='dark' className='ml-2' onClick={toggle}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

DeleteProductModal.propTypes = {
  productId: PropTypes.string.isRequired
};

export default DeleteProductModal;
