import React from 'react';
import RecentlyVisited from './RecentlyVisited';
import WatchList from './WatchList';
import CryptoNewsFeed from './CryptoNewsFeed'; // Import the CryptoNewsFeed component

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      
      <WatchList />
      <RecentlyVisited />
    </div>
  );
};

export default Sidebar;
