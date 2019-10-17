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
        {currentPage !== 1 ? (
          <li className='page-item'>
            <a
              onClick={() => paginate(currentPage - 1)}
              className='page-link'
              href='#!'
              aria-label='Previous'
            >
              <span aria-hidden='true'>&laquo;</span>
              <span className='sr-only'>Previous</span>
            </a>
          </li>
        ) : (
          <li className='page-item disabled'>
            <a
              className='page-link'
              href='#!'
              tabindex='-1'
              aria-label='Previous'
            >
              <span aria-hidden='true'>&laquo;</span>
              <span className='sr-only'>Previous</span>
            </a>
          </li>
        )}

        {pageNumbers.map(number => (
          <li
            key={number}
            className={
              number === currentPage ? 'page-item active' : 'page-item'
            }
          >
            <a onClick={() => paginate(number)} href='#!' className='page-link'>
              {number}
            </a>
          </li>
        ))}

        {currentPage !== pageNumbers.length ? (
          <li className='page-item'>
            <a
              onClick={() => paginate(currentPage + 1)}
              className='page-link'
              href='#!'
              aria-label='Next'
            >
              <span aria-hidden='true'>&raquo;</span>
              <span className='sr-only'>Next</span>
            </a>
          </li>
        ) : (
          <li className='page-item disabled'>
            <a className='page-link' href='#!' tabindex='-1' aria-label='Next'>
              <span aria-hidden='true'>&raquo;</span>
              <span className='sr-only'>Next</span>
            </a>
          </li>
        )}
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
