import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, selectTotalPosts, initializeTotalPosts, selectTotalPages, setTotalPages } from '../../redux/pageSlice';
import { RootState } from '../../redux/store';

const Pagination = () => {
  const dispatch = useDispatch();
  const totalPosts = useSelector(selectTotalPosts);
  const currentPage = useSelector((state: RootState) => state.page.currentPage);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    const totalPagesValue = Math.max(Math.ceil(totalPosts / 5), 1);
    dispatch(setTotalPages(totalPagesValue));
  }, [totalPosts]);

  useEffect(() => {
    dispatch(initializeTotalPosts());
  }, [dispatch]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handlePreviousPageClick = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  let pages = [];
  if (totalPages >= 1) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button 
          key={i} 
          className={`px-4 py-2 border rounded ${currentPage === i ? 'bg-blue-500 text-white' : ''}`} 
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
  }

  return (
    <div className="flex justify-center my-4 space-x-2">
      <a
        href="#"
        onClick={handlePreviousPageClick}
        className={`items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage > 1 ? 'text-gray-500 hover:bg-gray-50' : 'text-blue-200 cursor-default'}`}
      >
        ◀︎
      </a>
      {pages}
      <a
        href="#"
        onClick={handleNextPageClick}
        className={`items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage < totalPages ? 'text-gray-500 hover:bg-gray-50' : 'text-blue-200 cursor-default'}`}
      >
        ▶︎
      </a>
    </div>
  );
};

export default Pagination;