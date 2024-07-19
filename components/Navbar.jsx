"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className={`self-center text-2xl font-semibold whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>CryptoNite</span>
        </Link>
        <div className="flex md:order-2">
          <button
            type="button"
            onClick={toggleSidebar}
            className={`md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1`}
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
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
                    className={`px-3 py-2 cursor-pointer ${index === highlightedIndex ? `bg-${theme === 'dark' ? 'gray-700' : 'gray-300'}` : ''}`}
                    onClick={() => handleSuggestionClick(suggestion.id)} // Handle suggestion click
                    onMouseEnter={() => setHighlightedIndex(index)} // Highlight on mouse enter
                  >
                    <a>{suggestion.name}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-3 p-2 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
