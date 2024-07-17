"use client"

import React, { useState } from 'react';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    const userInput = e.target.value;
    setSearchInput(userInput);
    // Call function to fetch suggestions based on userInput (e.g., from API)
    fetchSuggestions(userInput);
  };

  // Dummy function to simulate fetching suggestions
  const fetchSuggestions = (input) => {
    // Replace with actual API call to fetch suggestions based on input
    // Example:
    // fetch(`https://api.example.com/suggestions?q=${input}`)
    //   .then(response => response.json())
    //   .then(data => setSuggestions(data.suggestions))
    //   .catch(error => console.error('Error fetching suggestions:', error));
    
    // For demonstration, simulate fetching suggestions from a static list
    const dummySuggestions = [
      { id: 1, name: 'Bitcoin' },
      { id: 2, name: 'Ethereum' },
      { id: 3, name: 'Cardano' },
      { id: 4, name: 'Dogecoin' },
      { id: 5, name: 'Solana' },
    ];

    // Filter suggestions based on input (for demonstration, simulate with includes() method)
    const filteredSuggestions = dummySuggestions.filter(
      suggestion => suggestion.name.toLowerCase().includes(input.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">Crypto Tracker</div>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search cryptocurrencies..."
            className="bg-gray-700 px-3 py-1 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-gray-800 w-64 rounded-md mt-1 shadow-lg">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id} className="px-3 py-2 cursor-pointer hover:bg-gray-700">
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
