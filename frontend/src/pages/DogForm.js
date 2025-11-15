import React, { useState, useEffect } from "react"; // added useEffect for loading existing data
import axios from "axios";

function DogForm() {
  const [dogname, setDogname] = useState("");
  const [breed, setBreed] = useState("");
  const [subreed, setSubreed] = useState("");
  const [message, setMessage] = useState("");
  const [dogs, setDogs] = useState([]); // holds rows from database
  const [error, setError] = useState("");

  // function to load all dogs (used on first render and after saving a new dog)
  async function loadDogs() {
    setError("");
    try {
      const resp = await axios.get("http://localhost:3001/dog/all");
      if (resp.data.success) {
        setDogs(resp.data.data);
      } else {
        setError("Failed to load data");
      }
    } catch (e) {
      setError("Error loading data");
    }
  }

  // load once when the component appears
  useEffect(() => {
    loadDogs();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (!dogname || !breed) {
      setMessage("dogname and breed are required");
      return;
    }
    try {
      const resp = await axios.post("http://localhost:3001/dog/save", {
        dogname,
        breed,
        subreed: subreed || null,
      });
      if (resp.data.success) {
        setDogname("");
        setBreed("");
        setSubreed("");
        // refresh the list below after successful save
        loadDogs();
      } else {
        setMessage("Save failed");
      }
    } catch (err) {
      setMessage("Error saving");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Add Dog</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Dog Name *</label>
            <input
              type="text"
              value={dogname}
              onChange={(e) => setDogname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Breed *</label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Subbreed (optional)</label>
            <input
              type="text"
              value={subreed}
              onChange={(e) => setSubreed(e.target.value)}
              placeholder="Leave blank if none"
            />
          </div>
          <button className="btn" type="submit">
            Save
          </button>
        </form>
        {message && <p className="status-message">{message}</p>}
      </div>

      <div className="card">
        <h2>Existing Dogs</h2>
        {error && <p>{error}</p>}
        {!error && dogs.length === 0 && <p>No records yet.</p>}
        {!error && dogs.length > 0 && (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Dog Name</th>
                <th>Breed</th>
                <th>Subbreed</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {dogs.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.dogname}</td>
                  <td>{d.breed}</td>
                  <td>{d.subreed || ""}</td>
                  <td>
                    {d.created_at
                      ? new Date(d.created_at).toLocaleString()
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DogForm;
