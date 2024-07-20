"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketData } from '../utils/CoinGeckoAPI'; // Adjust path as necessary
import { addCoin } from '../store/slices/watchListSlice'; // Import addCoin action creator
import { addCoinToRecentlyVisited } from '../store/slices/recentlyVisitedSlice'; // Adjust path as necessary
import { HiPlus } from 'react-icons/hi'; // Importing Plus icon from react-icons

const CryptoList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const recentlyVisited = useSelector(state => state.recentlyVisited); // Get recently visited state
  const [data, setData] = useState([]);
  const [itemsPerPage] = useState(10); // Show 10 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const marketData = await fetchMarketData(currentPage, itemsPerPage);
        if (Array.isArray(marketData)) {
          setData(marketData);
          // Fetch the total count of items to calculate the number of pages
          const totalItems = 250; // Example value, adjust accordingly
          setPageCount(Math.ceil(totalItems / itemsPerPage));
        } else {
          console.error('Unexpected data structure:', marketData);
          setData([]);
        }
      } catch (error) {
        console.error('Failed to fetch market data', error);
        setData([]); // Fallback to empty array on error
      }
    };

    loadData();
  }, [currentPage]);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  const handleRowClick = (crypto) => {
    // Add the cryptocurrency to recently visited state
    dispatch(addCoinToRecentlyVisited({
      id: crypto.id,
      name: crypto.name,
      image: crypto.image,
      current_price: crypto.current_price,
      price_change_percentage_24h: crypto.price_change_percentage_24h,
      market_cap: crypto.market_cap
    }));

    // Navigate to the product page after state update
    setTimeout(() => {
      router.push(`/products/${crypto.id}`);
    }, 0);
  };

  const handleAddToWatchList = (e, crypto) => {
    e.stopPropagation(); // Prevent row click event
    dispatch(addCoin({
      id: crypto.id,
      name: crypto.name,
      image: crypto.image,
      current_price: crypto.current_price,
      market_cap: crypto.market_cap,
      total_volume: crypto.total_volume,
      high_24h: crypto.high_24h,
      low_24h: crypto.low_24h,
      price_change_percentage_24h: crypto.price_change_percentage_24h
    }));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl font-bold mt-8 mb-8">Cryptocurrency List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3">Image</th>
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3">Name</th>
              <th scope="col" className="hidden md:table-cell px-3 py-2 sm:px-6 sm:py-3">Symbol</th>
              <th scope="col" className="hidden md:table-cell px-3 py-2 sm:px-6 sm:py-3">Price</th>
              <th scope="col" className="hidden lg:table-cell px-3 py-2 sm:px-6 sm:py-3">Market Cap</th>
              <th scope="col" className="hidden lg:table-cell px-3 py-2 sm:px-6 sm:py-3">Volume</th>
              <th scope="col" className="hidden xl:table-cell px-3 py-2 sm:px-6 sm:py-3">High (24h)</th>
              <th scope="col" className="hidden xl:table-cell px-3 py-2 sm:px-6 sm:py-3">Low (24h)</th>
              <th scope="col" className="hidden xl:table-cell px-3 py-2 sm:px-6 sm:py-3">Change (24h)</th>
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((crypto) => (
                <tr
                  key={crypto.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleRowClick(crypto)}
                >
                  <td className="px-3 py-4 sm:px-6 sm:py-4">
                    <img src={crypto.image} alt={crypto.name} width={30} height={30} />
                  </td>
                  <td className="px-3 py-4 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {crypto.name}
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 sm:px-6 sm:py-4">{crypto.symbol.toUpperCase()}</td>
                  <td className="hidden md:table-cell px-3 py-4 sm:px-6 sm:py-4">${crypto.current_price.toLocaleString()}</td>
                  <td className="hidden lg:table-cell px-3 py-4 sm:px-6 sm:py-4">${crypto.market_cap.toLocaleString()}</td>
                  <td className="hidden lg:table-cell px-3 py-4 sm:px-6 sm:py-4">${crypto.total_volume.toLocaleString()}</td>
                  <td className="hidden xl:table-cell px-3 py-4 sm:px-6 sm:py-4">${crypto.high_24h.toLocaleString()}</td>
                  <td className="hidden xl:table-cell px-3 py-4 sm:px-6 sm:py-4">${crypto.low_24h.toLocaleString()}</td>
                  <td
                    className="hidden xl:table-cell px-3 py-4 sm:px-6 sm:py-4"
                    style={{
                      color: crypto.price_change_percentage_24h < 0 ? 'red' : 'green',
                    }}
                  >
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="px-3 py-4 sm:px-6 sm:py-4">
                    <button
                      onClick={(e) => handleAddToWatchList(e, crypto)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <HiPlus size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className="text-blue-600 dark:text-blue-500 hover:underline"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-blue-600 dark:text-blue-500">
          Page {currentPage} of {pageCount}
        </span>
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          className="text-blue-600 dark:text-blue-500 hover:underline"
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoList;
