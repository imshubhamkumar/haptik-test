import React, { useEffect, useState } from "react";

const Pagination = ({
  onNextPage,
  onPrevPage,
  currentPage,
  friendLit,
  onPageClick,
}) => {
  const handlePrevious = (e) => {
    e.preventDefault();
    onPrevPage();
  };
  const handleNext = (e) => {
    e.preventDefault();
    onNextPage();
  };
  const [pages, setPages] = useState([]);
  useEffect(() => {
    let page = [];
    for (let i = 0; i < Math.ceil(friendLit.length / 4); i++) {
      page.push(i + 1);
    }
    setPages(page);
    page = [];
  }, [friendLit]);
  const handlePageClick = (e, page) => {
    e.preventDefault();
    onPageClick(page - 1);
  };
  return (
    <nav aria-label="Page navigation" className="p-2">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a
            className="page-link"
            onClick={(e) => handlePrevious(e)}
            href="/"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pages.map((item, idx) => (
          <li
            key={idx}
            className={["page-item", currentPage === idx ? "active" : ""].join(
              " "
            )}
          >
            <a
              className="page-link"
              onClick={(e) => handlePageClick(e, item)}
              href="/?page="
            >
              {item}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link"
            href="/"
            onClick={(e) => handleNext(e)}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
