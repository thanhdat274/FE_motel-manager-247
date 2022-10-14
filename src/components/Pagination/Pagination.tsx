import React from 'react';
import _ from 'lodash';
const Pagination = ({ items, pageSize, currentPage, onPageChange, onClick }: any) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <div>
      <nav>
        <ul className="inline-flex -space-x-px items-center">
          {pages.map((page, index) => (
            <li
         
              key={index}
              onClick={() => {
                onPageChange(page);
              }}
              className={
                page === currentPage
                  ? 'active bg-blue-200 py-2 px-3 cursor-pointer'
                  : 'bg-white py-2 px-3 leading-tight text-gray-500  border border-gray-300 cursor-pointer'
              }
            >
              <a>{page}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
