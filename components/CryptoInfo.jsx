import React, { useEffect, useState } from 'react';
import { fetchCoinDataById } from '../utils/CoinGeckoAPI'; // Adjust path as necessary
import CryptoNewsFeed from '@/components/CryptoNewsFeed'; // Adjust path as necessary

const CryptoInfo = ({ id }) => {
  const [coinDetails, setCoinDetails] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current coin data
        const coinData = await fetchCoinDataById(id);
        if (coinData) {
          const currentPrice = coinData.market_data.current_price.usd;
          const marketCap = coinData.market_data.market_cap.usd;
          const volume24h = coinData.market_data.total_volume.usd;
          const description = coinData.description.en;
          const totalSupply = coinData.market_data.total_supply;
          const circulatingSupply = coinData.market_data.circulating_supply;
          const maxSupply = coinData.market_data.max_supply;

          setCoinDetails({
            currentPrice,
            marketCap,
            volume24h,
            description,
            totalSupply,
            circulatingSupply,
            maxSupply
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(currentTheme);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const updatedTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
          setTheme(updatedTheme);
        }
      });
    });

    observer.observe(htmlElement, { attributes: true });

    return () => observer.disconnect();
  }, [id]);

  if (!coinDetails) {
    return <p className="text-center text-white">Loading...</p>;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className={`p-4 md:p-6 ${theme === 'dark' ? 'text-white bg-gray-900' : 'text-black bg-white'}`}>
      <div className="mb-4">
        <h5 className="text-3xl font-bold">{`Key Figures for ${id.toUpperCase()}`}</h5>
      </div>
      <div className="space-y-4 mb-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h6 className="text-lg font-bold">Current Price</h6>
          <p className="text-xl">{formatCurrency(coinDetails.currentPrice)}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h6 className="text-lg font-bold">Market Cap</h6>
          <p className="text-xl">{formatCurrency(coinDetails.marketCap)}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h6 className="text-lg font-bold">24h Trading Volume</h6>
          <p className="text-xl">{formatCurrency(coinDetails.volume24h)}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h6 className="text-lg font-bold">Circulating Supply</h6>
          <p className="text-xl">{coinDetails.circulatingSupply}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h6 className="text-lg font-bold">Total Supply</h6>
          <p className="text-xl">{coinDetails.totalSupply}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h6 className="text-lg font-bold">Max Supply</h6>
          <p className="text-xl">{coinDetails.maxSupply}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h6 className="text-lg font-bold">Description</h6>
          <p
            className="text-lg description"
            dangerouslySetInnerHTML={{ __html: coinDetails.description }}
          ></p>
        </div>
      </div>
      <CryptoNewsFeed id={id} />
    </div>
  );
};

export default CryptoInfo;
