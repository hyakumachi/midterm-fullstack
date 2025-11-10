import React, { useState, useEffect } from "react";
import axios from "axios";

function BreedGallery() {
<<<<<<< HEAD
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogImages, setDogImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all breeds on component mount
=======
  // State to store the list of all dog breeds
  const [breeds, setBreeds] = useState([]);
  // State to store which breed the user selected
  const [selectedBreed, setSelectedBreed] = useState("");
  // State to store array of dog images for selected breed
  const [dogImages, setDogImages] = useState([]);

  // useEffect runs once when page loads to fetch all breeds
>>>>>>> d0a57e5597157b1a34978cf6e8db4b133156a2b3
  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
<<<<<<< HEAD
    try {
      // Call backend to get all breeds
      const response = await axios.get("http://localhost:3001/dog/breeds/all");

      if (response.data.status === "success") {
        // Convert breeds object to array
        const breedsList = Object.keys(response.data.message);
        setBreeds(breedsList);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch breeds list");
    }
  };

  const fetchBreedImages = async (breed) => {
    setLoading(true);
    setError("");
    setSelectedBreed(breed);

    try {
      // Call backend to get images for specific breed
      const response = await axios.get(
        `http://localhost:3001/dog/breed/${breed}`
      );

      if (response.data.status === "success") {
        // Limit to first 12 images for better performance
        setDogImages(response.data.message.slice(0, 12));
      } else {
        setError("Failed to fetch breed images");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching images");
    }
    setLoading(false);
=======
    const response = await axios.get("http://localhost:3001/dog/breeds/all");
    // Convert breeds object to array of breed names
    const breedsList = Object.keys(response.data.message);
    setBreeds(breedsList);
  };

  // Function to fetch images for a specific breed
  const fetchBreedImages = async (breed) => {
    // Store which breed was selected
    setSelectedBreed(breed);
    // Call backend with breed name
    const response = await axios.get(
      `http://localhost:3001/dog/breed/${breed}`
    );
    // Get first 12 img only
    setDogImages(response.data.message.slice(0, 12));
>>>>>>> d0a57e5597157b1a34978cf6e8db4b133156a2b3
  };

  return (
    <div className="container">
      <h1 className="page-title">Breed Gallery</h1>
      <p className="page-subtitle">
        Browse all dog breeds and view their images
      </p>

      <div className="card">
        <h3>Select a Breed ({breeds.length} available)</h3>
<<<<<<< HEAD

        {breeds.length === 0 ? (
          <div className="loading">Loading breeds...</div>
        ) : (
          <div className="breed-list">
            {breeds.map((breed) => (
              <div
                key={breed}
                className="breed-item"
                onClick={() => fetchBreedImages(breed)}
              >
                {breed}
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <div className="loading">Loading {selectedBreed} images...</div>
      )}
      {error && <div className="error-message">{error}</div>}

      {dogImages.length > 0 && !loading && (
=======
        {/* Map through breeds array to create clickable buttons */}
        <div className="breed-list">
          {breeds.map((breed) => (
            <div
              key={breed}
              className="breed-item"
              onClick={() => fetchBreedImages(breed)}
            >
              {breed}
            </div>
          ))}
        </div>
      </div>

      {dogImages.length > 0 && (
>>>>>>> d0a57e5597157b1a34978cf6e8db4b133156a2b3
        <div className="card">
          <h3>
            {selectedBreed} Gallery ({dogImages.length} images)
          </h3>
          <div className="info-box">
            <p>
              <strong>API Function:</strong> GET /dog/breed/[breed]/images
            </p>
          </div>
          <div className="dog-grid">
            {dogImages.map((image, index) => (
              <div key={index} className="dog-card">
                <img src={image} alt={`${selectedBreed} ${index + 1}`} />
                <div className="dog-card-content">
                  <p className="dog-card-title">
                    {selectedBreed} #{index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BreedGallery;
