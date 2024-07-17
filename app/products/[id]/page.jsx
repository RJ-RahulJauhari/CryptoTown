"use client"

// src/pages/crypto/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    if (id) {
      fetchCryptoData();
    }
  }, [id]);

  useEffect(() => {
    if (cryptoData) {
      // Chart.js rendering logic here
      const ctx = document.getElementById('cryptoChart');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'], // Replace with actual time labels
            datasets: [
              {
                label: 'Price',
                data: [100, 120, 110, 130, 140], // Replace with actual price data
                borderColor: 'blue',
                borderWidth: 1,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Time',
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Price ($)',
                },
              },
            },
          },
        });
      }
    }
  }, [cryptoData]);

  if (!cryptoData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{cryptoData.name} ({cryptoData.symbol.toUpperCase()})</h1>
      <p className="text-lg">Current Price: ${cryptoData.market_data.current_price.usd}</p>
      <div className="mt-4">
        <canvas id="cryptoChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default ProductPage;
