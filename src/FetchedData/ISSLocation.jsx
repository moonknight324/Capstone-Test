import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ISSMap = () => {
 const [issLocation, setIssLocation] = useState({ lat: 0, lng: 0 });
 const [popupContent, setPopupContent] = useState('Loading...');
 const markerRef = useRef(null);

 useEffect(() => {
    const fetchIssLocation = async () => {
      try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        setIssLocation({ lat: data.latitude, lng: data.longitude });
        setPopupContent(`Latitude: ${data.latitude}, Longitude: ${data.longitude}`);
      } catch (error) {
        console.error("Error fetching ISS location:", error.message);
      }
    };

    fetchIssLocation();
    const intervalId = setInterval(fetchIssLocation, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
 }, []);

 useEffect(() => {
    if (markerRef.current && markerRef.current.leafletElement) {
      markerRef.current.leafletElement.updatePopup(popupContent);
    }
 }, [popupContent]);

 return (
    <MapContainer center={issLocation} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={issLocation} ref={markerRef}>
        <Popup>
          {popupContent}
        </Popup>
      </Marker>
    </MapContainer>
 );
};

export default ISSMap;
