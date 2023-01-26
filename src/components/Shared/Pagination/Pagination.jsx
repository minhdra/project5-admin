import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const itemsPage = [5, 10, 25, 50, 100];

function Pagination({ data, setCurrentItems }) {
  // We start with an empty list of items.
  // const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    if (data) {
      const endOffset = itemOffset + itemsPerPage;
      // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemOffset, itemsPerPage, setCurrentItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <div className='flex justify-center items-center gap-4'>
      {data?.length > itemsPerPage && (
        <ReactPaginate
          nextLabel='>'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel='<'
          pageClassName='flex items-center justify-center w-10 h-10 text-red-500 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-red-100'
          pageLinkClassName='page-link'
          previousClassName='flex items-center justify-center w-10 h-10 text-red-500 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-red-100'
          previousLinkClassName='page-link'
          nextClassName='flex items-center justify-center w-10 h-10 text-red-500 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-red-100'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='flex items-center justify-center w-10 h-10 text-red-500 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-red-100'
          breakLinkClassName='page-link'
          containerClassName='inline-flex space-x-2'
          activeClassName='w-10 h-10 !text-white transition-colors duration-150 bg-red-500 rounded-full focus:shadow-outline hover:bg-red-500'
          renderOnZeroPageCount={null}
        />
      )}
      <select
        type='text'
        name=''
        className='py-2 px-3 bg-white border border-gray-200 rounded shadow-sm appearance-none focus:outline-red-500'
        id=''
        defaultValue={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number.parseInt(e.target.value))}
      >
        {itemsPage.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Pagination;
