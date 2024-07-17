import React from 'react';

export default function WatchList({ coins }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 border-b border-gray-600 pb-2 text-white">Watch List</h2>
      <ul className="space-y-2">
        {coins.map((coin, index) => (
          <li key={index} className="border border-gray-600 p-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition">
            {coin.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
