import React, { useState } from "react";
import axios from "axios";

function RandomDog() {
  // State to store the dog image URL
  const [dogImage, setDogImage] = useState("");

  // fetch image from the backend
  const fetchRandomDog = async () => {
    const response = await axios.get("http://localhost:3001/dog/random");
    // Store the image URL from response
    setDogImage(response.data.message);
  };

  return (
    <div className="container">
      <h1 className="page-title">Random Dog Generator</h1>
      <p className="page-subtitle">Click the button to see a random dog</p>

      <div className="card">
        <button className="btn" onClick={fetchRandomDog}>
          Get Random Dog
        </button>

        {/* Only show image if dogImage has a value */}
        {dogImage && (
          <div className="image-container">
            {/* Display the dog image */}
            <img src={dogImage} alt="Random Dog" />
            <div className="info-box">
              <p>
                <strong>API Function:</strong> GET /dog/random
              </p>
              <p>Fetches a single random dog image from all breeds</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomDog;
