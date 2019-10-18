import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../actions/product';
import { Row } from 'reactstrap';
import ProductItem from './ProductItem';
import PaginationProduct from './PaginationProduct';

const ProductShowcase = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productReducer.products);
  const currentPage = useSelector(state => state.productReducer.currentPage);

  const [productsPerPage] = useState(8);

  // Set pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProductsPage = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (
    currentPage * productsPerPage - productsPerPage === products.length &&
    currentPage !== 1
  ) {
    dispatch(setCurrentPage(currentPage - 1));
  }

  const paginate = pageNumber => {
    dispatch(setCurrentPage(pageNumber));
  };

  return products.length > 0 ? (
    <Fragment>
      <Row>
        {currentProductsPage.map(
          ({ _id, name, price, description, imageUrl }) => (
            <ProductItem
              key={_id}
              productId={_id}
              name={name}
              price={price}
              description={description}
              imageUrl={imageUrl}
            />
          )
        )}
      </Row>

      <Row className='mt-2 justify-content-center'>
        <PaginationProduct
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Row>
    </Fragment>
  ) : (
    <Row className='mt-5 justify-content-center'>
      <h3 className='text-muted'>No Products avialable right now.</h3>
    </Row>
  );
};

export default ProductShowcase;
