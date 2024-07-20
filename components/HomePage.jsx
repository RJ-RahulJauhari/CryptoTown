"use client"

import React from 'react';
import GlobalMarketCapChart from '@/components/MarketCapChart';
import CryptoList from '@/components/CryptoList';
import CryptoNewsFeed from './CryptoNewsFeed';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full align-middle p-4">
      {/* <h1 className="text-2xl font-bold">Global Market Cap</h1> */}
      <GlobalMarketCapChart title="Trending Cryptocurrencies" />
      <CryptoList />
      <CryptoNewsFeed id="Crypto" /> {/* Display news feed below other components */}
    </div>
  );
}
