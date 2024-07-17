"use client"

import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';

const CryptoList = ({ data }) => {
  const itemsPerPage = 20;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentItems.map((crypto, index) => (
          <Link key={index} href={`/products/${crypto.name.toLowerCase()}`}>
            <div className="block p-4 border rounded-lg shadow-md bg-gray-800 text-white hover:bg-gray-700 hover:text-gray-200 transition-colors duration-300 cursor-pointer">
              <h2 className="text-lg font-semibold">{crypto.name}</h2>
              <p className="text-gray-400">Price: ${crypto.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName="flex justify-center mt-4"
        pageClassName="mx-1"
        pageLinkClassName="px-3 py-1 border rounded text-white bg-gray-700"
        previousClassName="mx-1"
        previousLinkClassName="px-3 py-1 border rounded text-white bg-gray-700"
        nextClassName="mx-1"
        nextLinkClassName="px-3 py-1 border rounded text-white bg-gray-700"
        breakClassName="mx-1"
        breakLinkClassName="px-3 py-1 border rounded text-white bg-gray-700"
        activeClassName="bg-blue-500 text-white"
      />
    </div>
  );
};

export default CryptoList;
