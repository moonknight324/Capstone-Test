import React, { useEffect, useState } from "react";
import "../Styles/APOD.css";

const APOD = () => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setdata(data);
      } catch (error) {
        console.error("Error fetchinng data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="apod-body">
        <div className="apod-main-div">
          {data ? (
            <>
              <h1 className="apod-heading">{data.title}</h1>
              <img className="apod-img" src={data.url} alt={data.title} />
              <div className="description">
                <p>{data.explanation}</p>
              </div>
              <div className="details">
                <p>Date : {data.date}</p>
                <p>Copyright : {data.copyright}</p>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default APOD;
