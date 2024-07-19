"use client";

import { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Provider } from 'react-redux';
import { store } from '../store/index.js'; // Adjust the path as necessary

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
      <body className={`${inter.className} flex flex-col h-screen overflow-x-hidden`}>
        <Provider store={store}>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="flex flex-1 overflow-y-auto">
            <main className="flex-1 p-4">{children}</main>
            {/* Sidebar Dropdown Menu */}
            <div
              className={`fixed z-50 bg-black opacity-0 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
              onClick={toggleSidebar}
            ></div>
            <div
              className={`fixed z-40 w-1/3 h-full bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 transform ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} transition-all duration-300 md:relative md:translate-x-0`}
            >
              <Sidebar />
            </div>
            {/* End Sidebar Dropdown Menu */}
          </div>
        </Provider>
      </body>
    </html>
  );
}
