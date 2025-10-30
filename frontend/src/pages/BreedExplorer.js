import React, { useState, useEffect } from "react";
import axios from "axios";

function BreedExplorer() {
  // State to store breeds that have sub-breeds
  const [breedsWithSubbreeds, setBreedsWithSubbreeds] = useState([]);
  // State to store which breed was selected
  const [selectedBreed, setSelectedBreed] = useState("");
  // State to store list of sub-breeds for selected breed
  const [subbreeds, setSubbreeds] = useState([]);
  // State to store which sub-breed was selected
  const [selectedSubbreed, setSelectedSubbreed] = useState("");
  // State to store the dog image URL
  const [dogImage, setDogImage] = useState("");

  // useEffect runs once when page loads to fetch breeds
  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    const response = await axios.get("http://localhost:3001/dog/breeds/all");
    const breedsData = response.data.message;
    const breedsWithSubs = Object.entries(breedsData)
      .filter(([breed, subs]) => subs.length > 0)
      .map(([breed]) => breed);
    setBreedsWithSubbreeds(breedsWithSubs);
  };

  // Function to fetch sub-breeds for a specific breed
  const fetchSubbreeds = async (breed) => {
    setSelectedBreed(breed);
    setSelectedSubbreed("");
    setDogImage("");
    // Call backend to get sub-breeds list
    const response = await axios.get(
      `http://localhost:3001/dog/breed/${breed}/list`
    );
    setSubbreeds(response.data.message);
  };

  // Function to fetch a random image for selected sub-breed
  const fetchSubbreedImage = async (subbreed) => {
    setSelectedSubbreed(subbreed);
    // Call backend with breed and sub-breed
    const response = await axios.get(
      `http://localhost:3001/dog/breed/${selectedBreed}/${subbreed}`
    );
    // Pick a random image from the array
    const randomIndex = Math.floor(
      Math.random() * response.data.message.length
    );
    setDogImage(response.data.message[randomIndex]);
  };

  return (
    <div className="container">
      <h1 className="page-title">Sub-Breed Explorer</h1>
      <p className="page-subtitle">Explore dog breeds with sub-breeds</p>

      <div className="card">
        <h3>Select a Breed ({breedsWithSubbreeds.length} with sub-breeds)</h3>
        <div className="breed-list">
          {breedsWithSubbreeds.map((breed) => (
            <div
              key={breed}
              className="breed-item"
              onClick={() => fetchSubbreeds(breed)}
            >
              {breed}
            </div>
          ))}
        </div>
      </div>

      {selectedBreed && subbreeds.length > 0 && (
        <div className="card">
          <h3>
            {selectedBreed} Sub-Breeds ({subbreeds.length})
          </h3>
          <div className="breed-list">
            {subbreeds.map((subbreed) => (
              <div
                key={subbreed}
                className="breed-item"
                onClick={() => fetchSubbreedImage(subbreed)}
              >
                {subbreed}
              </div>
            ))}
          </div>
        </div>
      )}

      {dogImage && (
        <div className="card">
          <h3>
            {selectedBreed} - {selectedSubbreed}
          </h3>
          <div className="info-box">
            <p>
              <strong>API Function:</strong> GET /dog/breed/[breed]/[subbreed]
            </p>
          </div>
          <div className="image-container">
            <img src={dogImage} alt={`${selectedBreed} ${selectedSubbreed}`} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BreedExplorer;
