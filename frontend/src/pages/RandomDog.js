import React, { useState } from "react";
import axios from "axios";

function RandomDog() {
<<<<<<< HEAD
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomDog = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:3001/dog/random");

      if (response.data.status === "success") {
        setDogImage(response.data.message);
      } else {
        setError("Failed to fetch dog image");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to server");
    }
    setLoading(false);
=======
  // State to store the dog image URL
  const [dogImage, setDogImage] = useState("");

  // fetch image from the backend
  const fetchRandomDog = async () => {
    const response = await axios.get("http://localhost:3001/dog/random");
    // Store the image URL from response
    setDogImage(response.data.message);
>>>>>>> d0a57e5597157b1a34978cf6e8db4b133156a2b3
  };

  return (
    <div className="container">
      <h1 className="page-title">Random Dog Generator</h1>
      <p className="page-subtitle">Click the button to see a random dog</p>

      <div className="card">
<<<<<<< HEAD
        <button className="btn" onClick={fetchRandomDog} disabled={loading}>
          {loading ? "Loading..." : "Get Random Dog"}
        </button>

        {loading && <div className="loading">Loading dog image...</div>}
        {error && <div className="error-message">{error}</div>}

        {dogImage && !loading && (
          <div className="image-container">
=======
        <button className="btn" onClick={fetchRandomDog}>
          Get Random Dog
        </button>

        {/* Only show image if dogImage has a value */}
        {dogImage && (
          <div className="image-container">
            {/* Display the dog image */}
>>>>>>> d0a57e5597157b1a34978cf6e8db4b133156a2b3
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
