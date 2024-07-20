"use client"

import { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import RecentlyVisited from '@/components/RecentlyVisited';
import WatchList from '@/components/WatchList';
import { Provider } from 'react-redux';
import { store } from '../store/index.js'; // Adjust the path as necessary
import CryptoNewsFeed from '@/components/CryptoNewsFeed';

const inter = Inter({ subsets: ['latin'] });

const metadata = {
  title: 'Crypto Currency',
  description: 'Crypto Currency App: Track Currency and make Money!!!',
};

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen w-screen overflow-x-hidden`}>
        <Provider store={store}>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="flex flex-1">
            <main className="flex-1 p-4 w-full y- sm:w-screen">{children}</main>
            {/* Sidebar for mobile */}
            <div
              className={`fixed z-50 bg-black opacity-50 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
              onClick={toggleSidebar}
            ></div>
            <div
              className={`fixed z-40 w-full h-full bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 transform ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} transition-all duration-300 md:hidden`}
            >
              <Sidebar />
            </div>
            {/* Components for larger screens */}
            <div className="hidden md:flex flex-col w-1/3 p-4 space-y-4">
              <WatchList />
              <RecentlyVisited />
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
