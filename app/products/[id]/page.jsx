"use client";

// Import necessary components and hooks
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchHistoricalData, fetchCoinDataById } from '../../../utils/CoinGeckoAPI'; // Adjust path as necessary
import CryptoInfo from '@/components/CryptoInfo';

const ProductPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const [cryptoData, setCryptoData] = useState(null);
  const [coinDetails, setCoinDetails] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('7'); // Default duration
  const [theme, setTheme] = useState('light');
  const [xAxisTicks, setXAxisTicks] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // Fetch historical data
        const historicalData = await fetchHistoricalData(id, 'usd', selectedDuration);
        if (historicalData && historicalData.prices) {
          const formattedData = historicalData.prices.map(([date, price]) => ({
            date: new Date(date).toLocaleDateString(),
            price
          }));
          setCryptoData(formattedData);

          // Calculate X-axis ticks
          const numberOfTicks = 8;
          const interval = Math.floor(formattedData.length / numberOfTicks);
          const ticks = formattedData.filter((_, index) => index % interval === 0).map(item => item.date);
          setXAxisTicks(ticks);
        }

        // Fetch current coin data
        const coinData = await fetchCoinDataById(id);
        if (coinData) {
          const currentPrice = coinData.market_data.current_price.usd;
          const priceChange24h = coinData.market_data.price_change_percentage_24h;
          setCoinDetails({ currentPrice, priceChange24h });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchCryptoData();
    }

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
  }, [id, selectedDuration]);

  if (!cryptoData || !coinDetails) {
    return <p className="text-center w-2/3 h-full flex justify-center items-center text-white">Loading...</p>;
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    setDropdownOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 border rounded shadow-lg bg-white text-black dark:bg-gray-800 dark:text-white">
          <p className="label font-bold text-center mb-2">{formatDate(label)}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="text-black dark:text-white" style={{ color: getLineColor() }}>
              Price: ${entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getLineColor = () => coinDetails.priceChange24h >= 0 ? 'green' : 'red'; // Set line color based on 24h change

  // Function to format date as Month Year
  const formatXAxisDate = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="rounded-lg shadow p-4 md:p-6 text-black bg-white dark:bg-gray-900 dark:text-white lg:w-2/3 md:w-2/3">
      <div className="flex justify-between mb-4">
        <div>
          <h5 className="text-3xl font-bold text-black dark:text-white">{id.toUpperCase()}</h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Current Price: ${coinDetails.currentPrice.toFixed(2)} USD</p>
        </div>
        <div className={`flex items-center px-2.5 py-0.5 text-base font-semibold ${coinDetails.priceChange24h >= 0 ? 'text-green-500 dark:text-green-500' : 'text-red-500 dark:text-red-500'} text-center`}>
          {coinDetails.priceChange24h.toFixed(2)}%
          <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={coinDetails.priceChange24h >= 0 ? "M5 13V1m0 0L1 5m4-4 4 4" : "M5 1v12m0 0L1 9m4 4 4-4"} />
          </svg>
        </div>
      </div>
      <div id="area-chart" className="mt-4">
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart data={cryptoData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <XAxis 
              dataKey="date" 
              stroke="#808080" 
              tickFormatter={formatXAxisDate} 
              tick={{ fontSize: 12 }}
              label={{ value: 'Date', position: 'insideBottom', offset: -5, fontSize: 14, fontWeight: 'bold' }}
              ticks={xAxisTicks} // Use calculated ticks
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              stroke="#808080" 
              label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft', offset: -10, fontSize: 14, fontWeight: 'bold' }}
              padding={{ top: 10, bottom: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="right" height={36} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={getLineColor()} 
              fillOpacity={0.4} 
              fill={getLineColor()}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between items-center border-gray-700 border-t dark:border-gray-700 justify-between mt-4">
        <div className="flex justify-between items-center pt-5 relative">
          <button
            id="dropdownDefaultButton"
            className="text-sm font-medium text-gray-400 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
            onClick={toggleDropdown}
          >
            {selectedDuration === '7' ? 'Last 7 days' :
             selectedDuration === '14' ? 'Last 14 days' : 
             selectedDuration === '30' ? 'Last 30 days' : 
             selectedDuration === '90' ? 'Last 90 days' : 
             selectedDuration === '180' ? 'Last 180 days' : 
             selectedDuration === '365' ? 'Last 1 year' : 
             'Last 2 years'}
            <svg
              className="w-2.5 m-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="z-10 absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <button onClick={() => handleDurationSelect('7')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Last 7 days
                  </button>
                </li>
                <li>
                  <button onClick={() => handleDurationSelect('14')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Last 14 days
                  </button>
                </li>
                <li>
                  <button onClick={() => handleDurationSelect('30')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Last 30 days
                  </button>
                </li>
                <li>
                  <button onClick={() => handleDurationSelect('90')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Last 90 days
                  </button>
                </li>
                <li>
                  <button onClick={() => handleDurationSelect('180')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Last 180 days
                  </button>
                </li>
                <li>
                  <button onClick={() => handleDurationSelect('365')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Last 1 year
                  </button>
                </li>
                <li>
                  <button onClick={() => handleDurationSelect('730')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Last 2 years
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <CryptoInfo id={id}></CryptoInfo>
      </div>
    </div>
  );
};

export default ProductPage;
