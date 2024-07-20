"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { CartesianGrid, Area, AreaChart, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts';
import { fetchHistoricalData } from '../utils/CoinGeckoAPI'; // Adjust path as necessary
import { transformHistoricalData } from '../utils/DataManipulationFunctions'; // Adjust path as necessary

const topCryptos = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'usd-coin']; // Add or adjust IDs as needed

const GlobalMarketCapChart = ({ title }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState('7'); // Default duration

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch historical data for top 5 cryptocurrencies based on selected duration
      const historicalPromises = topCryptos.map(id => fetchHistoricalData(id, 'usd', duration));
      const historicalResponses = await Promise.all(historicalPromises);

      // Combine and transform historical data
      const formattedHistoricalData = historicalResponses.map((response, index) => {
        const transformedData = response ? transformHistoricalData(response) : [];
        return {
          id: topCryptos[index],
          prices: transformedData,
        };
      });

      // Combine all data into a single array for the chart
      const allDates = [...new Set(formattedHistoricalData.flatMap(crypto => crypto.prices.map(d => d.date)))];
      const mergedData = allDates.map(date => {
        const mergedEntry = { date };
        formattedHistoricalData.forEach(crypto => {
          const entry = crypto.prices.find(d => d.date === date);
          if (entry) {
            mergedEntry[crypto.id] = entry.price;
          } else {
            mergedEntry[crypto.id] = null;
          }
        });
        return mergedEntry;
      });

      setHistoricalData(mergedData);
    } catch (error) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [duration]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p className="text-center text-sm md:text-base">Loading...</p>;
  if (error) return <p className="text-center text-sm md:text-base">{error}</p>;

  // Calculate X-axis ticks based on screen size
  const isSmallScreen = window.innerWidth < 768;
  const numberOfTicks = isSmallScreen ? 3 : 5;
  const dates = historicalData.map(d => d.date);
  const tickInterval = Math.max(1, Math.floor(dates.length / (numberOfTicks - 1)));
  const xAxisTicks = dates.filter((_, index) => index % tickInterval === 0);

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  // Helper function to format date with month in words
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Helper function to format date to month and year
  const formatToMonthYear = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString(undefined, options);
  };

  // Custom tooltip renderer
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 border rounded shadow-lg bg-white text-black dark:bg-gray-800 dark:text-white text-sm md:text-base">
          <p className="label font-bold text-center mb-2">{formatDate(label)}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="text-black dark:text-white" style={{ color: getLineColor(index) }}>
              {capitalizeFirstLetter(entry.name)}: {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 mb-5 w-full max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">{title}</h1>
        <ResponsiveContainer width="100%" height={isSmallScreen ? 300 : 500}>
          <AreaChart data={historicalData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis 
              dataKey="date" 
              stroke="#FFF" 
              ticks={xAxisTicks}
              interval={0} // Ensure all tick labels are displayed
              tickFormatter={formatToMonthYear} // Format date labels to month and year
              label={{ value: 'Date', position: 'insideBottom', offset: -15, fontWeight: 'bold', fontSize: isSmallScreen ? 10 : 12 }} // Adjust font size for smaller screens
              padding={{ left: 10, right: 10 }} // Add padding to X-axis labels
            />
            <YAxis 
              stroke="#FFF" 
              label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft', offset: -10, fontWeight: 'bold', fontSize: isSmallScreen ? 10 : 12 }} // Adjust font size for smaller screens
              padding={{ top: 10, bottom: 10 }} // Add padding to Y-axis labels
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="right" height={36} />
            {historicalData.length > 0 && Object.keys(historicalData[0]).filter(key => key !== 'date').map((cryptoId, index) => (
              <Area 
                key={cryptoId} 
                type="monotone" 
                dataKey={cryptoId}
                stroke={getLineColor(index)}
                fill={getLineColor(index)}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
        <select 
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className={`mt-4 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 ${isSmallScreen ? 'w-full max-w-xs mx-auto' : ''} text-center`} // Center align the dropdown and add margin for small screens
        >
          <option value="7">Last 7 Days</option>
          <option value="14">Last 2 Weeks</option>
          <option value="30">Last Month</option>
          <option value="90">Last 3 Months</option>
          <option value="180">Last 6 Months</option>
          <option value="365">Last Year</option>
        </select>
      </div>
    </div>
  );
};

const getLineColor = (index) => {
  const colors = ['#1A56DB', '#FF6F61', '#6B8E23', '#FFD700', '#8A2BE2']; // Add more colors as needed
  return colors[index % colors.length];
};

export default GlobalMarketCapChart;
