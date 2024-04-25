import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";

const NavBar = () => {
  return (
    <div>
      <nav className="nav-HomePage">
        <h1 className="nav-left">AURORE LOGO</h1>
        <div className="nav-right">
          <Link to={"/articles"}>
            <a className="nav-link-home">Articles</a>
          </Link>
          <div className="nav-blogs">
            <Link to={"/blogs"}>
              <a className="nav-link-home">Blogs</a>
            </Link>
          </div>
          <div className="nav-blogs">
            <Link to={"/isro-launches"}>
              <a className="nav-link-home">ISRO Launches</a>
            </Link>
          </div>
          <div className="nav-blogs">
            <Link to={"/register"}>
              <a className="nav-link-home">Create a Post</a>
            </Link>
          </div>
          <div className="nav-blogs">
            <Link to={"/my-posts"}>
              <a className="nav-link-home">My Posts</a>
            </Link>
          </div>
        </div>
      </nav>
      <div className="content"></div>
    </div>
  );
};

export default NavBar;
