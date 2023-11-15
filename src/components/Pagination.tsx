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

  const [start, setStart] = React.useState(0);
  const [stop, setStop] = React.useState(Math.ceil(totalItems / itemsPerPage));

  for (let i = start; i <= stop; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <a
        onClick={() => {
          if (currentPage <= 0) return;
          paginate(currentPage - 1);
          if (start > 0) {
            setStart(start - 1);
            setStop(stop - 1);
          }
        }}
        href="#"
        className={`${
          currentPage <= 0 &&
          "bg-gray-200 hover:bg-gray-200 hover:text-black hover:cursor-not-allowed"
        }
        } mr-1 py-2 px-3 leading-tight bg-white border-gray-300 text-gray-500 hover:bg-blue-500 hover:text-white border rounded-md`}
      >
        {"<"}
      </a>
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
      <a
        onClick={() => {
          paginate(currentPage + 1);
          setStart(start + 1);
          setStop(stop + 1);
        }}
        href="#"
        className={`ml-1 py-2 px-3 leading-tight bg-white border-gray-300 text-gray-500 hover:bg-blue-500 hover:text-white border rounded-md`}
      >
        {">"}
      </a>
    </nav>
  );
};

export default Pagination;
