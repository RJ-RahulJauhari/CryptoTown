import React from 'react';
import WatchList from './WatchList';
import RecentlyVisited from './RecentlyVisited';

export default function Sidebar({ watchListCoins, recentlyVisitedCoins }) {
  return (
    <div className="relative flex-none h-full pt-5 bg-white  dark:bg-gray-800 dark:border-gray-700">
      <div className="h-full px-5 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        {/* Render WatchList component */}
        <WatchList coins={watchListCoins} />

        {/* Render RecentlyVisited component */}
        <RecentlyVisited coins={recentlyVisitedCoins} />
      </div>
    </div>
  );
}
