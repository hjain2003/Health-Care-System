import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from '../NewsItem/NewsItem';
import './NewsList.css';

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://newsapi.org/v2/everything?q=medicine&from=2023-10-13&sortBy=publishedAt&language=en&apiKey=b8f21b7a03c24f928daf52140b6e1233');
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news articles:', error);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading-message">Loading news...</div>
      ) : (
        articles.map((article, index) => (
          <div className='NewsSection' key={index}>
            <NewsItem
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default NewsList;
