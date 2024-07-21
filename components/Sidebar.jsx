import React from 'react';
import RecentlyVisited from './RecentlyVisited';
import WatchList from './WatchList';

const Sidebar = ({ toggleSidebar }) => {
  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      <WatchList toggleSidebar={toggleSidebar} />
      <RecentlyVisited toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Sidebar;
