// Import React library
import React from "react";
// Import routing components from React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import navigation bar component
import Navbar from "./components/Navbar";
// Import all page components
import Home from "./pages/Home";
import RandomDog from "./pages/RandomDog";
import BreedGallery from "./pages/BreedGallery";
import BreedExplorer from "./pages/BreedExplorer";
import MultiDogGenerator from "./pages/MultiDogGenerator";
import ErrorPage from "./pages/ErrorPage";
// Import CSS styles
import "./App.css";

function App() {
  return (
    // Router wraps the entire app to enable routing
    <Router>
      <div className="App">
        {/* Navigation bar appears on all pages */}
        <Navbar />
        {/* Routes defines which component to show for each URL path */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Homepage */}
          <Route path="/random" element={<RandomDog />} />{" "}
          {/* Single random dog */}
          <Route path="/gallery" element={<BreedGallery />} />{" "}
          {/* Browse breeds */}
          <Route path="/explorer" element={<BreedExplorer />} />{" "}
          {/* Explore sub-breeds */}
          <Route path="/multi" element={<MultiDogGenerator />} />{" "}
          {/* Multiple random dogs */}
          <Route path="*" element={<ErrorPage />} />{" "}
          {/* 404 page for invalid URLs */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
