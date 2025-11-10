import React from "react";
<<<<<<< HEAD
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

=======
import { Link } from "react-router-dom";

function Navbar() {
>>>>>>> d0a57e5597157b1a34978cf6e8db4b133156a2b3
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          WatchDogs
        </Link>
        <ul className="navbar-links">
          <li>
<<<<<<< HEAD
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/random"
              className={location.pathname === "/random" ? "active" : ""}
            >
              Random Dog
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className={location.pathname === "/gallery" ? "active" : ""}
            >
              Breed Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/explorer"
              className={location.pathname === "/explorer" ? "active" : ""}
            >
              Sub-Breed Explorer
            </Link>
          </li>
          <li>
            <Link
              to="/multi"
              className={location.pathname === "/multi" ? "active" : ""}
            >
              Multi-Dog
            </Link>
=======
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
>>>>>>> d0a57e5597157b1a34978cf6e8db4b133156a2b3
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
