import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editProduct } from '../../../../actions/product';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row
} from 'reactstrap';

const EditProductModal = ({ productId }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  const { name, price, description } = formData;

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onImageChoosen = e => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(window.URL.createObjectURL(e.target.files[0]));
    } else {
      setImagePreview('');
      setImageFile('');
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const dataWithImage = new FormData();
    if (name) dataWithImage.append('name', name);
    if (price) dataWithImage.append('price', price);
    if (description) dataWithImage.append('description', description);
    if (imageFile) dataWithImage.append('image', imageFile);

    dispatch(editProduct(dataWithImage, productId));

    setModal(!modal);
  };

  return (
    <div>
      <Button
        className='bg-primary mb-2 btn-block border border-light'
        onClick={toggle}
      >
        <i className='fas fa-edit text-white'></i>&nbsp;&nbsp;Edit this Product
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name...'
                className='mb-3'
                value={name}
                onChange={e => onChange(e)}
              />
              <Label for='price'>Price $</Label>
              <Input
                type='number'
                name='price'
                id='price'
                placeholder='Price...'
                className='mb-3'
                value={price}
                onChange={e => onChange(e)}
              />
              <Label for='description'>Description</Label>
              <Input
                type='text'
                name='description'
                id='description'
                placeholder='Description...'
                className='mb-3'
                value={description}
                onChange={e => onChange(e)}
              />
              <Label for='image'>
                Image of product
                <span className='text-muted'>
                  &nbsp;(.jpeg or .jpg or .png only)
                </span>
              </Label>
              <Input
                type='file'
                name='image'
                id='image'
                onChange={e => onImageChoosen(e)}
              />
              {imagePreview && (
                <Row className='mt-4 justify-content-center'>
                  <img
                    style={{ width: '40%', height: 'auto' }}
                    src={imagePreview}
                    alt=''
                  />
                </Row>
              )}
              <Button
                color='primary'
                style={{ marginTop: '2rem' }}
                block
                disabled={!name && !price && !description && !imageFile}
              >
                Edit Product
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

EditProductModal.propTypes = {
  productId: PropTypes.string.isRequired
};

export default EditProductModal;
