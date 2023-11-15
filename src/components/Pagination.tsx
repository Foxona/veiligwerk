import React from "react";

type PaginationType = {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationType> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="mt-5 inline-flex -space-x-px gap-1 mb-16">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={() => paginate(number)}
              href="#"
              className={`py-2 px-3 leading-tight ${
                currentPage === number
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-blue-500 hover:text-white"
              } border rounded-md`}
            >
              {number}
            </a>
          </li>
          
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
