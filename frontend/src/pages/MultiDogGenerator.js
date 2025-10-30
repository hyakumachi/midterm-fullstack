import React, { useState } from "react";
import axios from "axios";

function MultiDogGenerator() {
  // State to store the number of dogs to generate (default 6)
  const [count, setCount] = useState(6);
  // State to store array of dog image URLs
  const [dogImages, setDogImages] = useState([]);

  // Function to fetch multiple random dog images
  const fetchMultipleDogs = async () => {
    const response = await axios.get(
      `http://localhost:3001/dog/random/${count}`
    );
    setDogImages(response.data.message);
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
            placeholder="Enter number of dogs (1-50)"
          />
          <button className="btn" onClick={fetchMultipleDogs}>
            Generate {count} Dogs
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
      </div>

      {dogImages.length > 0 && (
        <div className="card">
          <h3>Your {dogImages.length} Random Dogs</h3>
          {/* Display images in a grid */}
          <div className="dog-grid">
            {/* img array */}
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
