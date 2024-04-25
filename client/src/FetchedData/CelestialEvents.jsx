import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SpaceFlightNews() {
 const [articles, setArticles] = useState([]);

 useEffect(() => {
    const fetchArticles = async () => {
      try {
        const authString = btoa('4de30842-c552-4213-b951-852ccec1d06f:d49cd85e6c859000575e2b3657356e1c4f221b4a76e682906fc51ac8');
        const response = await axios.get('https://api.astronomyapi.com/api/v2/bodies', {
          headers: {
            'Authorization': `Basic ${authString}`
          }
        });
        setArticles(response.data); // Assuming the API returns an array of articles
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
 }, []);

 return (
    <div>
      <h1>Space Flight News Articles:</h1>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <img src={article.image_url} alt="" />
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
            <hr />
          </div>
        ))
      ) : (
        <p>Loading articles...</p>
      )}
    </div>
 );
}

export default SpaceFlightNews;
