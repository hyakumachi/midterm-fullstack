import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RandomDog from './pages/RandomDog';
import BreedGallery from './pages/BreedGallery';
import BreedExplorer from './pages/BreedExplorer';
import MultiDogGenerator from './pages/MultiDogGenerator';
import ErrorPage from './pages/ErrorPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/random" element={<RandomDog />} />
          <Route path="/gallery" element={<BreedGallery />} />
          <Route path="/explorer" element={<BreedExplorer />} />
          <Route path="/multi" element={<MultiDogGenerator />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
