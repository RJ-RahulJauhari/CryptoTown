// utils/CoinGeckoAPI.js
const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const fetchMarketData = async(page = 1, perPage = 10) => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching market data:', error);
        return [];
    }
};


const fetchHistoricalData = async(id, vsCurrency = 'usd', days = '30') => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vsCurrency}&days=${days}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': process.env.NEXT_PUBLIC_API_KEY
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Fetched Historical Data for ${id}:`, data); // Log historical data
        return data;
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return null;
    }
};

const fetchCoinDataById = async(id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/coins/${id}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching coin data:', error);
        return null;
    }
};


const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;


const fetchCryptoNews = async(query, page = 1, pageSize = 10, sortBy = 'publishedAt') => {
    const url = `${NEWS_API_URL}?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching crypto news:', error);
        return { articles: [], totalResults: 0 }; // Ensure `totalResults` is included
    }
};


export { fetchCryptoNews, fetchMarketData, fetchHistoricalData, fetchCoinDataById };