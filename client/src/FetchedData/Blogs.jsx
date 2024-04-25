import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Blogs.css';

function Blogs() {
 const [blogs, setblogs] = useState([]);

 useEffect(() => {
    const fetchblogs = async () => {
      try {
        const response = await axios.get('https://api.spaceflightnewsapi.net/v4/blogs');
        setblogs(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchblogs();
 }, []);

 return (
    <div className="blogs-container">
      <h1>Space Flight Blogs:</h1>
      {blogs.length > 0 ? (
        blogs.map((article) => (
          <div className="blog" key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <img src={article.image_url} alt={article.title} />
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
            <hr />
          </div>
        ))
      ) : (
        <p className="loading">Loading blogs...</p>
      )}
    </div>
 );
}

export default Blogs;
