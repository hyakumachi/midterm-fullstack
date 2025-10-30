import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="container">
      <div className="card error-page">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/">
          <button className="btn">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
