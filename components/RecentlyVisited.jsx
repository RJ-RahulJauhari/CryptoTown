import React from 'react';
import { useSelector } from 'react-redux';
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
import { formatNumber } from '../utils/DataManipulationFunctions'; // Import the formatting function

const RecentlyVisited = () => {
  const router = useRouter();
  const coins = useSelector(state => state.recentlyVisited?.visitedCoins || []);

  const handleRowClick = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white dark:bg-gray-800">
      <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableCaption>A list of your recently visited coins.</TableCaption>
        <TableHeader className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <TableRow>
            <TableHead className="px-2 py-1 sm:px-3 sm:py-2">Image</TableHead>
            <TableHead className="px-2 py-1 sm:px-3 sm:py-2">Name</TableHead>
            <TableHead className="hidden sm:table-cell px-2 py-1 sm:px-3 sm:py-2">Last Price</TableHead>
            <TableHead className="hidden md:table-cell px-2 py-1 sm:px-3 sm:py-2">Change (24h)</TableHead>
            <TableHead className="hidden lg:table-cell px-2 py-1 sm:px-3 sm:py-2">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.length > 0 ? (
            coins.map((coin) => (
              <TableRow
                key={coin.id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleRowClick(coin.id)}
              >
                <TableCell className="px-2 py-2">
                  <img src={coin.image} alt={coin.name} width={30} height={30} />
                </TableCell>
                <TableCell className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {coin.name}
                </TableCell>
                <TableCell className="hidden sm:table-cell px-2 py-2">
                  {formatNumber(coin.current_price)}
                </TableCell>
                <TableCell
                  className="hidden md:table-cell px-2 py-2"
                  style={{ color: coin.price_change_percentage_24h < 0 ? 'red' : 'green' }}
                >
                  {formatNumber(coin.price_change_percentage_24h)}%
                </TableCell>
                <TableCell className="hidden lg:table-cell px-2 py-2">
                  {formatNumber(coin.market_cap)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center py-4">No recently visited coins</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentlyVisited;
