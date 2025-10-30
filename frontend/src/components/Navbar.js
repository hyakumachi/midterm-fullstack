import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          WatchDogs
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/random">Random Dog</Link>
          </li>
          <li>
            <Link to="/gallery">Breed Gallery</Link>
          </li>
          <li>
            <Link to="/explorer">Sub-Breed Explorer</Link>
          </li>
          <li>
            <Link to="/multi">Multi-Dog</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
