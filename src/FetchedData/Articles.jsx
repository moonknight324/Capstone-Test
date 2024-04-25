import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Articles.css';

function SpaceFlightNews() {
 const [articles, setArticles] = useState([]);

 useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles');
        setArticles(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
 }, []);

 return (
    <div className="articles-container">
      <h1>Space Flight News Articles:</h1>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div className="article" key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <img src={article.image_url} alt={article.title} />
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
            <hr />
          </div>
        ))
      ) : (
        <p className="loading">Loading articles...</p>
      )}
    </div>
 );
}

export default SpaceFlightNews;
