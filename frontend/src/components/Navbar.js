import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          WatchDogs
        </Link>
        <ul className="navbar-links">
          <li>
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
          </li>
          <li>
            <Link
              to="/form"
              className={location.pathname === "/form" ? "active" : ""}
            >
              Form
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
