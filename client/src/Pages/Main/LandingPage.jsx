import React from "react";
import "../../Styles/LandingPage.css";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const handlelogin = () => {
    navigate("/login");
  }
  const handlesignup = () => {
    navigate("/signup");
  }
  return (
    <div className="LandingPage">
      <nav className="nav-landingPage">
        <div className="left-nav">
          <div>
            <p>Home</p>
          </div>
          <div>
            <p>Resources</p>
          </div>
          <div>
            <p>FAQ</p>
          </div>
          <div>
            <p>Contact</p>
          </div>
        </div>
        <div className="right-nav">
            <div onClick={handlelogin}>
            <button className="btns-landingpage">
              LogIn
            </button>
            </div>
            <div onClick={handlesignup}>
              <button className="btns-landingpage">
              Sign Up
              </button >
            </div>
          <div>
            <FaPinterest className="icons" />
          </div>
          <div>
            <FaTwitter className="icons"/>
          </div>
          <div>
            <FaInstagram className="icons"/>
          </div>
        </div>
      </nav>
      <div className="content-landingPage">
        <div>
          <h1 className="heading-landingPage">Aurore</h1>
          <p className="title">Your Space Exploration Hub.</p>
        </div>
        <div className="slogan">
        </div>
        <div className="description">
          <p className="discription-landingpage">
            Engage with a community of space enthusiasts and share your own
            discoveries. 
          </p>
        </div>
      </div>
      <Link to="/login">
        <button className="start-btn">Get Started</button>
      </Link>
    </div>
  );
}

export default LandingPage;
