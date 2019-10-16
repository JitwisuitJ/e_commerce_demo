import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
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
    <nav>
      <ul className='pagination mt-4'>
        <li className='page-item'>
          {currentPage !== 1 ? (
            <a
              onClick={() => paginate(currentPage - 1)}
              className='page-link'
              href='#!'
              aria-label='Previous'
            >
              <span aria-hidden='true'>&laquo;</span>
              <span className='sr-only'>Previous</span>
            </a>
          ) : (
            <a className='page-link' href='#!' aria-label='Previous'>
              <span aria-hidden='true'>&laquo;</span>
              <span className='sr-only'>Previous</span>
            </a>
          )}
        </li>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='#!' className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <li className='page-item'>
          {currentPage !== pageNumbers.length ? (
            <a
              onClick={() => paginate(currentPage + 1)}
              className='page-link'
              href='#!'
              aria-label='Next'
            >
              <span aria-hidden='true'>&raquo;</span>
              <span className='sr-only'>Next</span>
            </a>
          ) : (
            <a className='page-link' href='#!' aria-label='Next'>
              <span aria-hidden='true'>&raquo;</span>
              <span className='sr-only'>Next</span>
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
