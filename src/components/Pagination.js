// Pagination.js
import React from 'react';

function Pagination({ planetsPerPage, totalPlanets, currentPage, setCurrentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPlanets / planetsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul className='pagination'>
          <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === Math.ceil(totalPlanets / planetsPerPage)}>Next</button>
          <br/><br/>
        
        {pageNumbers.map(number => (
        
            <button className={currentPage === number ? 'active' : ''} onClick={() => handleClick(number)}>
              {number}
            </button>
          
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
