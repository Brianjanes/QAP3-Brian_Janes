import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BreedSelector from "./components/BreedSelector";
import ImageGallery from "./components/ImageGallery";

const App = () => {
  const [breeds, setBreeds] = useState({});
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [fetchedImages, setFetchedImages] = useState([]);

  const getBreeds = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    // console.log(data.message);
    setBreeds(data.message);
  };

  const handleSelect = (breed) => {
    setSelectedBreed(breed);
    // console.log(breed);
  };

  const handleNumberOfImagesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 100) {
      setNumberOfImages(value);
    }
  };

  const fetchImages = async () => {
    if (!selectedBreed) {
      // console.log("Please select a breed");
      return;
    }

    const lowerCaseBreed = selectedBreed.toLowerCase();

    const response = await fetch(
      `https://dog.ceo/api/breed/${lowerCaseBreed}/images/random/${numberOfImages}`
    );
    const data = await response.json();
    // console.log(data.message);
    setFetchedImages(data.message);
  };

  useEffect(() => {
    getBreeds();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <div className="options-bar">
          <div className="option">
            <h2>Select a dog breed:</h2>
            <BreedSelector
              breeds={breeds}
              onSelect={handleSelect}
              placeholder="Choose a breed"
            />
          </div>
          <div className="option">
            <h2># of images:</h2>
            <input
              type="number"
              min="1"
              max="100"
              value={numberOfImages}
              onChange={handleNumberOfImagesChange}
            />
          </div>
          <div className="option">
            <button onClick={fetchImages}>Fetch images</button>
          </div>
        </div>
        <ImageGallery images={fetchedImages} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
