import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/ISROLaunches.css";

const ISROLaunches = () => {
 const apiUrl = "https://services.isrostats.in/api/spacecraft";
 const [data, setData] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 9;

 useEffect(() => {
    async function fetchLandingData() {
      try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error("Error: Unable to fetch data from the API.");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    fetchLandingData();
 }, [apiUrl]);

 const totalPages = Math.ceil(data.length / itemsPerPage);

 const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
 };

 const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

 return (
    <div className="isro-launches-body">
      <h1 className="isro-launches-heading">ISRO Launches</h1>  
      <div className="launch-container">
        {currentItems.map((launch, index) => (
          <div className="launch-item" key={index}>
            <p><b>Launch name :</b> {launch.name}</p>
            <p><b>Mission Status :</b> {launch.missionStatus}</p>
            <p><b>Launch Date :</b> {launch.launchDate}</p>
            <p><b>Launch Vehicle :</b> {launch.launchVehicle}</p>
            <p><b>Application :</b> {launch.application}</p>
            <p><b>Orbit-Type:</b> {launch.orbitType}</p>
            <a href={launch.link}>Launch details</a>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
 );
};

export default ISROLaunches;
