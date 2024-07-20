import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { removeCoin } from '../store/slices/watchListSlice'; // Import the action creator
import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon

export default function WatchList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const coins = useSelector(state => state.watchList);

  const handleRowClick = (id) => {
    router.push(`/products/${id}`);
  };

  const handleRemove = (id) => {
    dispatch(removeCoin(id)); // Dispatch the action to remove the coin
  };

  return (
    <div className="mb-6 relative overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2 border-b border-gray-600 pb-2 text-black dark:text-white">
        Watch List
      </h2>
      <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableCaption>A list of your watchlist coins.</TableCaption>
        <TableHeader className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <TableRow>
            <TableHead className="px-4 py-3 md:px-6 md:py-3">Image</TableHead>
            <TableHead className="px-4 py-3 md:px-6 md:py-3">Name</TableHead>
            <TableHead className="hidden sm:table-cell px-4 py-3 md:px-6 md:py-3">Last Price</TableHead>
            <TableHead className="hidden md:table-cell px-4 py-3 md:px-6 md:py-3">Change (24h)</TableHead>
            <TableHead className="hidden lg:table-cell px-4 py-3 md:px-6 md:py-3">Market Cap</TableHead>
            <TableHead className="px-4 py-3 md:px-6 md:py-3">Remove</TableHead> {/* Adjusted to be visible on all screens */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow
              key={coin.id} // Changed from index to coin.id
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => handleRowClick(coin.id)} // Navigate using coin.id
            >
              <TableCell className="px-4 py-4 md:px-6 md:py-4">
                <img src={coin.image} alt={coin.name} width={30} height={30} />
              </TableCell>
              <TableCell className="px-4 py-4 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {coin.name}
              </TableCell>
              <TableCell className="hidden sm:table-cell px-4 py-4 md:px-6 md:py-4">
                ${coin.current_price}
              </TableCell>
              <TableCell
                className="hidden md:table-cell px-4 py-4 md:px-6 md:py-4"
                style={{ color: coin.price_change_percentage_24h < 0 ? 'red' : 'green' }}
              >
                {coin.price_change_percentage_24h}%
              </TableCell>
              <TableCell className="hidden lg:table-cell px-4 py-4 md:px-6 md:py-4">
                ${coin.market_cap}
              </TableCell>
              <TableCell className="px-4 py-4 md:px-6 md:py-4"> {/* Adjusted to be visible on all screens */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(coin.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
