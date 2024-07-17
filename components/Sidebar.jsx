import React from 'react';
import WatchList from './WatchList';
import RecentlyVisited from './RecentlyVisited';

export default function Sidebar({ watchListCoins, recentlyVisitedCoins }) {
  return (
    <aside className="h-full p-4 bg-gray-900 border-l border-gray-800 overflow-y-auto text-white">
      <WatchList coins={watchListCoins} />
      <RecentlyVisited coins={recentlyVisitedCoins} />
    </aside>
  );
}
