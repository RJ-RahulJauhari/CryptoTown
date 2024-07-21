import React, { useState, useEffect } from 'react';
import {newsData} from '../utils/newAPI'; // Adjust path as necessary
import NewsCard from './NewsCard'; // Adjust path as necessary

const CryptoNewsFeed = ({ id }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [totalResults, setTotalResults] = useState(0); // Total number of results

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Directly use newsData from the JSON file
        const filteredNews = newsData.articles.filter(article => article.title.toLowerCase().includes(id.toLowerCase()));
        setNewsArticles(filteredNews);
        setTotalResults(filteredNews.length); // Set total results from the filtered news data
      } catch (error) {
        setError('Error fetching news data.');
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, page]); // Refetch news when id or page changes

  if (loading) {
    return <p className="text-center text-white">Loading news...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalResults / 10);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Paginate news articles
  const paginatedNewsArticles = newsArticles.slice((page - 1) * 10, page * 10);

  return (
    <div>
      <h5 className="text-2xl font-bold mb-4">Latest News for {id}</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedNewsArticles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button 
          className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-white">{`Page ${page} of ${totalPages}`}</span>
        <button 
          className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoNewsFeed;
