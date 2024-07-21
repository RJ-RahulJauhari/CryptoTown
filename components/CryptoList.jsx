"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketData } from '../utils/CoinGeckoAPI'; // Adjust path as necessary
import { addCoin } from '../store/slices/watchListSlice'; // Import addCoin action creator
import { addCoinToRecentlyVisited } from '../store/slices/recentlyVisitedSlice'; // Adjust path as necessary
import { HiPlus } from 'react-icons/hi'; // Importing Plus icon from react-icons
import { formatNumber } from '../utils/DataManipulationFunctions'; // Import the formatting utility
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import Shadcn table components

const CryptoList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const recentlyVisited = useSelector(state => state.recentlyVisited); // Get recently visited state
  const [data, setData] = useState([]);
  const [itemsPerPage] = useState(20); // Show 20 items per page
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white dark:bg-gray-800">
      <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableCaption>Current Market Data</TableCaption>
        <TableHeader className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <TableRow>
            <TableHead className="px-2 py-1 sm:px-3 sm:py-2">Image</TableHead>
            <TableHead className="px-2 py-1 sm:px-3 sm:py-2">Name</TableHead>
            <TableHead className="hidden md:table-cell px-2 py-1 sm:px-3 sm:py-2">Symbol</TableHead>
            <TableHead className="hidden md:table-cell px-2 py-1 sm:px-3 sm:py-2">Price</TableHead>
            <TableHead className="hidden lg:table-cell px-2 py-1 sm:px-3 sm:py-2">Market Cap</TableHead>
            <TableHead className="hidden lg:table-cell px-2 py-1 sm:px-3 sm:py-2">Volume</TableHead>
            <TableHead className="hidden xl:table-cell px-2 py-1 sm:px-3 sm:py-2">High (24h)</TableHead>
            <TableHead className="hidden xl:table-cell px-2 py-1 sm:px-3 sm:py-2">Low (24h)</TableHead>
            <TableHead className="hidden xl:table-cell px-2 py-1 sm:px-3 sm:py-2">Change (24h)</TableHead>
            <TableHead className="px-2 py-1 sm:px-3 sm:py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((crypto) => (
              <TableRow
                key={crypto.id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleRowClick(crypto)}
              >
                <TableCell className="px-2 py-2 sm:px-3 sm:py-3">
                  <img src={crypto.image} alt={crypto.name} width={30} height={30} />
                </TableCell>
                <TableCell className="px-2 py-2 sm:px-3 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {crypto.name}
                </TableCell>
                <TableCell className="hidden md:table-cell px-2 py-2 sm:px-3 sm:py-3">{crypto.symbol.toUpperCase()}</TableCell>
                <TableCell className="hidden md:table-cell px-2 py-2 sm:px-3 sm:py-3">${formatNumber(crypto.current_price)}</TableCell>
                <TableCell className="hidden lg:table-cell px-2 py-2 sm:px-3 sm:py-3">${formatNumber(crypto.market_cap)}</TableCell>
                <TableCell className="hidden lg:table-cell px-2 py-2 sm:px-3 sm:py-3">${formatNumber(crypto.total_volume)}</TableCell>
                <TableCell className="hidden xl:table-cell px-2 py-2 sm:px-3 sm:py-3">${formatNumber(crypto.high_24h)}</TableCell>
                <TableCell className="hidden xl:table-cell px-2 py-2 sm:px-3 sm:py-3">${formatNumber(crypto.low_24h)}</TableCell>
                <TableCell
                  className="hidden xl:table-cell px-2 py-2 sm:px-3 sm:py-3"
                  style={{ color: crypto.price_change_percentage_24h < 0 ? 'red' : 'green' }}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
                <TableCell className="px-2 py-2 sm:px-3 sm:py-3">
                  <button
                    onClick={(e) => handleAddToWatchList(e, crypto)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <HiPlus size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="10" className="text-center py-4">No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
