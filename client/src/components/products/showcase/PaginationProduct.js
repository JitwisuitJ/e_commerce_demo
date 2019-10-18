import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationProduct = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className='mt-4'>
      {currentPage !== 1 ? (
        <PaginationItem>
          <PaginationLink
            previous
            onClick={() => paginate(currentPage - 1)}
            href='#!'
          />
        </PaginationItem>
      ) : (
        <PaginationItem disabled>
          <PaginationLink previous href='#!' />
        </PaginationItem>
      )}

      {pageNumbers.map(number =>
        number === currentPage ? (
          <PaginationItem key={number} active>
            <PaginationLink onClick={() => paginate(number)} href='#!'>
              {number}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={number}>
            <PaginationLink onClick={() => paginate(number)} href='#!'>
              {number}
            </PaginationLink>
          </PaginationItem>
        )
      )}

      {currentPage !== pageNumbers.length ? (
        <PaginationItem>
          <PaginationLink
            next
            onClick={() => paginate(currentPage + 1)}
            href='#!'
          />
        </PaginationItem>
      ) : (
        <PaginationItem disabled>
          <PaginationLink next href='#!' />
        </PaginationItem>
      )}
    </Pagination>
  );
};

PaginationProduct.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default PaginationProduct;
