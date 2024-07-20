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

const RecentlyVisited = () => {
  const router = useRouter();
  
  // Access the correct part of Redux state
  const coins = useSelector(state => {
    console.log('Redux state:', state.recentlyVisited); // Debug log to check state structure
    return state.recentlyVisited?.visitedCoins || []; // Ensure we handle undefined state
  });

  const handleRowClick = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="mb-6 relative overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2 border-b border-gray-600 pb-2 text-black dark:text-white">
        Recently Visited
      </h2>
      <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableCaption>A list of your recently visited coins.</TableCaption>
        <TableHeader className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <TableRow>
            <TableHead className="px-6 py-3">Image</TableHead>
            <TableHead className="px-6 py-3">Name</TableHead>
            <TableHead className="px-6 py-3">Last Price</TableHead>
            <TableHead className="px-6 py-3">Change (24h)</TableHead>
            <TableHead className="px-6 py-3">Market Cap</TableHead>
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
                <TableCell className="px-6 py-4">
                  <img src={coin.image} alt={coin.name} width={30} height={30} />
                </TableCell>
                <TableCell className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {coin.name}
                </TableCell>
                <TableCell className="px-6 py-4">
                  ${coin.current_price || 'N/A'}
                </TableCell>
                <TableCell
                  className="px-6 py-4"
                  style={{ color: coin.price_change_percentage_24h < 0 ? 'red' : 'green' }}
                >
                  {coin.price_change_percentage_24h || 'N/A'}%
                </TableCell>
                <TableCell className="px-6 py-4">
                  ${coin.market_cap || 'N/A'}
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
