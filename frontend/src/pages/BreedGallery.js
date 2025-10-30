import React, { useState, useEffect } from "react";
import axios from "axios";

function BreedGallery() {
  // State to store the list of all dog breeds
  const [breeds, setBreeds] = useState([]);
  // State to store which breed the user selected
  const [selectedBreed, setSelectedBreed] = useState("");
  // State to store array of dog images for selected breed
  const [dogImages, setDogImages] = useState([]);

  // useEffect runs once when page loads to fetch all breeds
  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
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
  };

  return (
    <div className="container">
      <h1 className="page-title">Breed Gallery</h1>
      <p className="page-subtitle">
        Browse all dog breeds and view their images
      </p>

      <div className="card">
        <h3>Select a Breed ({breeds.length} available)</h3>
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
