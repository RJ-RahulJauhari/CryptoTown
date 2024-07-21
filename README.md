# Crypto Town Documentation

## Introduction
Crypto Town is a dynamic web application designed to provide users with comprehensive insights into various cryptocurrencies such as Bitcoin, Ethereum, and Tether. The platform leverages data visualizations to graphically represent cryptocurrency trends by aggregating data from the CoinGecko API. Users can track coin prices over multiple durations and receive news updates via the NewsIO API.

## Features

- **Home Page**: Displays a line chart of the top 5 trending cryptocurrencies, allowing users to compare them over various durations. Features a paginated table of all cryptocurrencies, ordered by market cap, with options to navigate to individual coin pages and add coins to a watch list. The page also includes a news feed related to cryptocurrencies.
  
- **Explore Page**: Features a tab layout providing access to cryptocurrency lists, recently visited coins, watch list, gainer feed, losers feed, and a news feed. The gainer and loser feeds highlight coins with significant price changes over the last 24 hours.

- **Product Page**: Provides detailed information about a specific cryptocurrency, including an area chart of its price over selectable durations, key figures (current price, market cap, trading volume, supply), and news related to that coin.

## Technology Stack

- **Frontend**: Tailwind CSS, ShadCN Charting Library, Flowbite Chart, MagicUI
- **State Management**: Redux Toolkit (for managing historical data, recently visited coins, and watchlist state)
- **APIs**: CoinGecko API, NewsIO API (replaced with static JSON data due to API restrictions)
- **Frameworks**: Next.js, React.js

## Routing

- **/home**: Home Page
- **/products/{id}**: Product Page for a specific cryptocurrency
- **/explore**: Explore Page

## Responsiveness
The application is fully responsive across all devices:
- **Large Screens**: Sidebar is fixed, containing Recently Visited and Watch List components.
- **Smaller Devices**: Sidebar functions as a drawer, accessible via a hamburger menu in the navigation bar. The main content takes full space when the sidebar is hidden.

## Navigation Bar

- **Logo**: Navigates back to the Home Page.
- **Theme Toggle**: Switches between light and dark themes (default is dark). Utilizes Tailwind's theme variants.
- **Search Bar**: Allows users to search for specific coins with autocomplete suggestions.
- **Explore Tab**: Redirects to the Explore Page.

## User Interaction

- **Add to Watch List**: Users can add coins to their watch list, with a toast notification confirming the addition.
- **Recent Visits**: Coins are automatically added to the recently visited list upon viewing.


## Functions of `utils/CoinGeckoAPI.js` file

### `fetchMarketData`
- **Purpose**: Fetches market data for cryptocurrencies, including their current price, market cap, and volume.
- **Parameters**:
  - `page` (default: 1): Specifies the page number of results to fetch.
  - `perPage` (default: 10): Defines the number of results per page.
- **Functionality**:
  - Constructs a URL for the CoinGecko API endpoint that provides market data for cryptocurrencies, sorted by market cap in descending order.
  - Sets up the HTTP GET request with the necessary headers, including an API key for authentication.
  - Performs the fetch operation and checks for errors. If the response is successful, it parses and returns the JSON data.
  - Logs errors if the fetch fails and returns an empty array.
- **Usage**: Ideal for retrieving a list of cryptocurrencies along with their key metrics, useful for displaying a market overview or a list of top-performing coins.

### `fetchHistoricalData`
- **Purpose**: Retrieves historical price data for a specific cryptocurrency.
- **Parameters**:
  - `id`: The unique identifier of the cryptocurrency (e.g., bitcoin).
  - `vsCurrency` (default: 'usd'): Specifies the currency to compare the cryptocurrency against.
  - `days` (default: '30'): Indicates the number of past days for which to fetch historical data.
- **Functionality**:
  - Constructs a URL for the CoinGecko API endpoint that provides historical market chart data for the specified cryptocurrency.
  - Sets up the HTTP GET request with necessary headers.
  - Fetches and parses the data. The function also logs the data for debugging purposes.
  - Handles and logs errors, returning null if the fetch fails.
- **Usage**: Useful for displaying historical price trends on charts, allowing users to analyze the performance of a cryptocurrency over a specified period.

### `fetchCoinDataById`
- **Purpose**: Retrieves detailed information about a specific cryptocurrency.
- **Parameters**:
  - `id`: The unique identifier of the cryptocurrency.
- **Functionality**:
  - Constructs a URL for the CoinGecko API endpoint that provides comprehensive data about the cryptocurrency, including localization, tickers, market data, community data, developer data, and sparkline.
  - Performs the HTTP GET request and checks for errors.
  - Returns the parsed JSON data or logs an error if the fetch fails.
- **Usage**: Ideal for displaying detailed information about a cryptocurrency, such as its full market data, community engagement, and development activity.

### `fetchCryptoNews`
- **Purpose**: Fetches news articles related to cryptocurrencies.
- **Parameters**:
  - `query`: The search query to filter news articles (e.g., bitcoin).
  - `page` (default: 1): The page number of news articles to fetch.
  - `pageSize` (default: 10): The number of articles to return per page.
  - `sortBy` (default: 'publishedAt'): Specifies how to sort the articles (e.g., by publication date).
- **Functionality**:
  - Constructs a URL for the NewsAPI endpoint to fetch news articles based on the query and other parameters.
  - Sets up the HTTP GET request with necessary headers, including the API key.
  - Performs the fetch operation, parses the response, and returns the data.
  - Handles and logs errors, ensuring the returned object includes articles and totalResults.
- **Usage**: Useful for integrating a news feed into your application, providing users with the latest updates and articles related to their cryptocurrency interests.

## URLs and Creator Links

- **GitHub URL**: [https://github.com/RJ-RahulJauhari/CryptoTown](https://github.com/RJ-RahulJauhari/CryptoTown)
- **Deployment URL**: [https://crypto-town.vercel.app/](https://crypto-town.vercel.app/)
- **LinkedIn URL**: [https://www.linkedin.com/in/rahul-jauhari-596520214/](https://www.linkedin.com/in/rahul-jauhari-596520214/)
- **Portfolio URL**: [https://rahuljauhari.onrender.com/](https://rahuljauhari.onrender.com/)
