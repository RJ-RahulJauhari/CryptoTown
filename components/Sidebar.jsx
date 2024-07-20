import React from 'react';
import RecentlyVisited from './RecentlyVisited';
import WatchList from './WatchList';
import CryptoNewsFeed from './CryptoNewsFeed'; // Import the CryptoNewsFeed component

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full w-full p-4 overflow-y-auto">
      <RecentlyVisited />
      <WatchList />
      {/* <CryptoNewsFeed id="Crypto" /> Pass an empty string or any placeholder */}
    </div>
  );
};

export default Sidebar;
