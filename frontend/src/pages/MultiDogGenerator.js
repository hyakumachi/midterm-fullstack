import React, { useState } from "react";
import axios from "axios";

function MultiDogGenerator() {
  const [count, setCount] = useState(6);
  const [dogImages, setDogImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMultipleDogs = async () => {
    if (count < 1 || count > 50) {
      setError("Please enter a number between 1 and 50");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call backend to get multiple random dog images
      const response = await axios.get(
        `http://localhost:3001/dog/random/${count}`
      );

      if (response.data.status === "success") {
        setDogImages(response.data.message);
      } else {
        setError("Failed to fetch dog images");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to server");
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchMultipleDogs();
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Multi-Dog Generator</h1>
      <p className="page-subtitle">
        Generate multiple random dog images at once
      </p>

      <div className="card">
        <div className="input-group">
          <input
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter number of dogs (1-50)"
          />
          <button
            className="btn"
            onClick={fetchMultipleDogs}
            disabled={loading}
          >
            {loading ? "Loading..." : `Generate ${count} Dogs`}
          </button>
        </div>

        <div className="info-box">
          <p>
            <strong>API Function:</strong> GET /dog/random/[count]
          </p>
          <p>
            Fetches multiple random dog images in a single request (max: 50)
          </p>
        </div>

        {loading && <div className="loading">Fetching {count} dogs...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>

      {dogImages.length > 0 && !loading && (
        <div className="card">
          <h3>Your {dogImages.length} Random Dogs</h3>
          <div className="dog-grid">
            {dogImages.map((image, index) => (
              <div key={index} className="dog-card">
                <img src={image} alt={`Dog ${index + 1}`} />
                <div className="dog-card-content">
                  <p className="dog-card-title">Dog #{index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiDogGenerator;
