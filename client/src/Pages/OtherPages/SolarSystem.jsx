import React from "react";
import "../../Styles/SolarSystem.css";
import Sun from "../../assets/sun.png";

const SolarSystem = () => {
  return (
    <>
    <div className="solarsystem">
    <div className="container">
      <div className="solar">
        <div className="sun">
          <img src={Sun} alt="sun" />
        </div>
        <div className="mercury"></div>
        <div className="venus"></div>
        <div className="earth">
          <div className="moon"></div>
        </div>
        <div className="mars"></div>
        <div className="jupiter"></div>
        <div className="saturn"></div>
        <div className="uranus"></div>
        <div className="neptune"></div>
        <div className="pluto"></div>
      </div>
    </div>
    </div>
    </>
  );
};

export default SolarSystem;
