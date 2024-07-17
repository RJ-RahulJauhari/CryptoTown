import React from 'react';
import GlobalMarketCapChart from "@/components/MarketCapChart"
import CryptoList from '@/components/CryptoList';

// Sample data for the chart, replace with actual data fetching logic
const marketCapData = [
  { date: '2023-07-01', marketCap: 1000 },
  { date: '2023-07-02', marketCap: 1200 },
  { date: '2023-07-03', marketCap: 1100 },
  { date: '2023-07-04', marketCap: 1300 },
  { date: '2023-07-05', marketCap: 1400 },
];

// Sample data for the cryptocurrency list, replace with actual data fetching logic
const cryptoData = [
  { name: 'Bitcoin', price: 50000 },
  { name: 'Ethereum', price: 3000 },
  // ... add more items to reach the pagination threshold
];

export default function HomePage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Global Market Cap</h1>
      <GlobalMarketCapChart data={marketCapData} />
      <h1 className="text-2xl font-bold mt-8">Cryptocurrency List</h1>
      <CryptoList data={cryptoData} />
    </div>
  );
}
