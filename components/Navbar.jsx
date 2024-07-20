"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import { fetchMarketData } from '../utils/CoinGeckoAPI'; // Adjust the import path as needed

const Navbar = ({ toggleSidebar }) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [theme, setTheme] = useState('light'); // Default to light theme
  const [allCryptos, setAllCryptos] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    // Retrieve theme from local storage if available
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    
    // Fetch cryptocurrencies on component mount
    const fetchCryptos = async () => {
      const marketData = await fetchMarketData();
      setAllCryptos(marketData);
    };

    fetchCryptos();
  }, []);

  // Debounce function to limit how often fetchSuggestions is called
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = useCallback(
    (input) => {
      const filteredSuggestions = allCryptos.filter(
        crypto => crypto.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    },
    [allCryptos]
  );

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), [fetchSuggestions]);

  const handleSearchInputChange = (e) => {
    const userInput = e.target.value;
    setSearchInput(userInput);
    debouncedFetchSuggestions(userInput); // Use debounced function
    setHighlightedIndex(-1); // Reset highlighted index
  };

  const handleInputBlur = () => {
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        const selectedSuggestion = suggestions[highlightedIndex];
        router.push(`/products/${selectedSuggestion.id}`);
        setSearchInput('');
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleSuggestionClick = (id) => {
    router.push(`/products/${id}`);
    setSearchInput('');
    setSuggestions([]);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme to local storage
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <nav className={`bg-${theme === 'dark' ? 'gray-900' : 'white'} border-gray-200 dark:bg-gray-900`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/crypto_town_logo-removebg-preview.png" width={32} height={32} alt="Logo" />
          <span className={`self-center text-2xl font-semibold whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Crypto Town</span>
        </Link>
        <div className="flex-grow flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className={`block rounded-md w-full p-2 ps-10 text-sm ${theme === 'dark' ? 'text-white bg-gray-700 border-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'text-gray-900 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'}`}
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearchInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyPress} // Changed from onKeyPress to onKeyDown
            />
            {suggestions.length > 0 && (
              <ul className={`absolute z-50 bg-${theme === 'dark' ? 'gray-800' : 'gray-200'} w-full rounded-md mt-1 shadow-lg`}>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion.id}
                    className={`cursor-pointer px-4 py-2 ${index === highlightedIndex ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
                    onClick={() => handleSuggestionClick(suggestion.id)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex md:order-2">
          <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className={`ms-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {theme === 'dark' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m8-9h1m-16 0h1m12.36-5.64l.71.71M6.93 17.07l.71.71m10.32 0l-.71.71M6.93 6.93l-.71-.71M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
