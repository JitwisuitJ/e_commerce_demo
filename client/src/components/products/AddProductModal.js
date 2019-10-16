import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../actions/product';

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

const AddProductModal = () => {
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
    dataWithImage.append('name', name);
    dataWithImage.append('price', price);
    dataWithImage.append('description', description);
    dataWithImage.append('image', imageFile);

    dispatch(addProduct(dataWithImage));
    setImagePreview('');

    setModal(!modal);
  };

  return (
    <div>
      <Button color='info' className='shadow-sm' onClick={toggle}>
        <i className='fas fa-plus-circle'></i>&nbsp;&nbsp;Product
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Product</ModalHeader>
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
                required
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
                required
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
                required
              />
              <Label for='image'>
                Image of product{' '}
                <span className='text-muted'>
                  &nbsp;(.jpeg or .jpg or .png only)
                </span>
              </Label>
              <Input
                type='file'
                name='image'
                id='image'
                onChange={e => onImageChoosen(e)}
                required
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
                color='info'
                style={{ marginTop: '2rem' }}
                block
                disabled={!name || !price || !description || !imageFile}
              >
                Add Product
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddProductModal;
