import { useEffect, useState } from "react";
import axios from "axios";

function MarsRover() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl =
    // "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=" +
    apiKey;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          setPhotos(response.data.photos);
          console.log(response.data);
        } else {
          console.error("Error: Unable to fetch data from the API.");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    fetchData();
  }, [apiUrl]);

  return (
    <>
      <div>
      {photos && photos[0] && photos[0].rover && (
   <div>
     <p>Landing Date: {photos[0].rover.landing_date}</p>
     <p>Launch Date: {photos[0].rover.launch_date}</p>
     <p>Rover Name: {photos[0].rover.name}</p>
     <p>Status: {photos[0].rover.status}</p>
   </div>
 )}
        <ul>
          {photos && photos.map((photo, index) => (
            <li key={index}>
              <p>Camera Name: {photo.camera.full_name}</p>
              <p>Earth Date: {photo.earth_date}</p>
              <img src={photo.img_src}></img>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MarsRover;











// import React, { useState, useEffect } from 'react';

// const MyComponent = () => {
//   const [data, setData] = useState(null);
//   const [apiKeyIndex, setApiKeyIndex] = useState(0);
//   const apiKeys = ['first_api_key', 'second_api_key', 'third_api_key', 'fourth_api_key', 'fifth_api_key', 'sixth_api_key', 'seventh_api_key', 'eighth_api_key', 'ninth_api_key', 'tenth_api_key'];

//   useEffect(() => {
//     fetchData();
//   }, [apiKeyIndex]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://api.example.com/data', {
//         headers: {
//           'Authorization': Bearer ${apiKeys[apiKeyIndex]}
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       // Check if response is a Promise
//       const isPromise = typeof response.json === 'function';

//       if (isPromise) {
//         const jsonData = await response.json();
//         setData(jsonData);
//       } else {
//         // Move to the next API key
//         const nextIndex = (apiKeyIndex + 1) % apiKeys.length;
//         setApiKeyIndex(nextIndex);
//         // Retry fetching with the new API key
//         fetchData();
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div>
//       {/* Your JSX to render fetched data */}
//     </div>
//   );
// };

// export default MyComponent;