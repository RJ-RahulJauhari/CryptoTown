"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { fetchMarketData } from '../utils/CoinGeckoAPI'; // Adjust path as necessary
import { addCoin } from '../store/slices/watchListSlice'; // Import addCoin action creator
import { addCoinToRecentlyVisited } from '../store/slices/recentlyVisitedSlice'; // Adjust path as necessary
import { HiPlus } from 'react-icons/hi'; // Importing Plus icon from react-icons

const GainersList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all market data
        const allMarketData = [];
        let currentPage = 1;
        let marketData;

        do {
          marketData = await fetchMarketData(currentPage, 250); // Fetch 250 items per page
          if (Array.isArray(marketData)) {
            allMarketData.push(...marketData);
            currentPage++;
          } else {
            console.error('Unexpected data structure:', marketData);
            break;
          }
        } while (marketData.length === 250); // Continue fetching until less than 250 items are returned

        // Filter gainers (positive change in the last 24 hours)
        const gainers = allMarketData.filter(crypto => crypto.price_change_percentage_24h > 0);
        setData(gainers);
      } catch (error) {
        console.error('Failed to fetch market data', error);
        setData([]); // Fallback to empty array on error
      }
    };

    loadData();
  }, []);

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

  const handlePageChange = (direction) => {
    if (direction === 'next') {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'prev') {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* <h1 className="text-3xl font-bold mt-8 mb-8">Top Gainers</h1> */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Image</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Symbol</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Market Cap</th>
            <th scope="col" className="px-6 py-3">Volume</th>
            <th scope="col" className="px-6 py-3">High (24h)</th>
            <th scope="col" className="px-6 py-3">Low (24h)</th>
            <th scope="col" className="px-6 py-3">Change (24h)</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((crypto) => (
              <tr
                key={crypto.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleRowClick(crypto)}
              >
                <td className="px-6 py-4">
                  <img src={crypto.image} alt={crypto.name} width={30} height={30} />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {crypto.name}
                </td>
                <td className="px-6 py-4">{crypto.symbol.toUpperCase()}</td>
                <td className="px-6 py-4">${crypto.current_price.toLocaleString()}</td>
                <td className="px-6 py-4">${crypto.market_cap.toLocaleString()}</td>
                <td className="px-6 py-4">${crypto.total_volume.toLocaleString()}</td>
                <td className="px-6 py-4">${crypto.high_24h.toLocaleString()}</td>
                <td className="px-6 py-4">${crypto.low_24h.toLocaleString()}</td>
                <td
                  className="px-6 py-4"
                  style={{
                    color: crypto.price_change_percentage_24h < 0 ? 'red' : 'green',
                  }}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="px-6 py-4">
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
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange('prev')}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange('next')}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded"
          disabled={paginatedData.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GainersList;
