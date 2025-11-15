import React, { useState, useEffect } from "react";
import axios from "axios";

function BreedExplorer() {
  const [breedsWithSubbreeds, setBreedsWithSubbreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [subbreeds, setSubbreeds] = useState([]);
  const [selectedSubbreed, setSelectedSubbreed] = useState("");
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get("http://localhost:3001/dog/breeds/all");
      if (response.data.status === "success") {
        const breedsData = response.data.message;
        const breedsWithSubs = Object.entries(breedsData)
          .filter(([breed, subs]) => subs.length > 0)
          .map(([breed]) => breed);
        setBreedsWithSubbreeds(breedsWithSubs);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubbreeds = async (breed) => {
    setSelectedBreed(breed);
    setSelectedSubbreed("");
    setDogImage("");
    try {
      const response = await axios.get(
        `http://localhost:3001/dog/breed/${breed}/list`
      );
      if (response.data.status === "success") {
        setSubbreeds(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubbreedImage = async (subbreed) => {
    setSelectedSubbreed(subbreed);
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/dog/breed/${selectedBreed}/${subbreed}`
      );
      if (
        response.data.status === "success" &&
        response.data.message.length > 0
      ) {
        const randomIndex = Math.floor(
          Math.random() * response.data.message.length
        );
        setDogImage(response.data.message[randomIndex]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
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

      {loading && <div className="loading">Loading image...</div>}

      {dogImage && !loading && (
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
