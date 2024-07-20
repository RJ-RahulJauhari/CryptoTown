"use client"

import React from 'react';
import GlobalMarketCapChart from '@/components/MarketCapChart';
import CryptoList from '@/components/CryptoList';
import CryptoNewsFeed from './CryptoNewsFeed';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 lg:w-2/3 md:w-2/3 p-4 ">
      {/* <h1 className="text-2xl font-bold">Global Market Cap</h1> */}
      <GlobalMarketCapChart title="Trending Cryptocurrencies" />
      <h1 className="text-3xl font-bold mt-8 mb-8">Crypto List</h1>

      <CryptoList />
      <CryptoNewsFeed id="Crypto" /> {/* Display news feed below other components */}
    </div>
  );
}
