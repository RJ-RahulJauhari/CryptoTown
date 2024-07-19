"use client"

import React from 'react';
import GlobalMarketCapChart from '@/components/MarketCapChart';
import CryptoList from '@/components/CryptoList';

export default function HomePage() {
  return (
    <div className="p-4 space-y-4">
      {/* <h1 className="text-2xl font-bold">Global Market Cap</h1> */}
      <GlobalMarketCapChart title="Trending Cryptocurrencies" />
      <h1 className="text-2xl font-bold mt-8">Cryptocurrency List</h1>
      <CryptoList />
    </div>
  );
}
