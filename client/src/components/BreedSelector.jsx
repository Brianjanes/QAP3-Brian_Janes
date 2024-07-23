import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const BreedSelector = ({
  breeds,
  onSelect,
  placeholder = "Select a breed",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleBreedClick = (breed) => {
    const titleCasedBreed = titleCase(breed);
    setSelectedBreed(titleCasedBreed);
    setIsOpen(false);
    onSelect(titleCasedBreed);
  };

  const titleCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className={`breed-selector ${isOpen ? "open" : ""}`}>
      <div className="breed-selector-header" onClick={toggleDropdown}>
        <span className="breed-selector-text">
          {selectedBreed || placeholder}
        </span>
        <FaAngleDown
          className={`breed-selector-icon ${isOpen ? "open" : ""}`}
        />
      </div>
      {isOpen && (
        <ul className="breed-selector-options">
          {Object.keys(breeds).map((breed) => {
            const titleCasedBreed = titleCase(breed);
            return (
              <li
                key={breed}
                onClick={() => handleBreedClick(breed)}
                className={selectedBreed === titleCasedBreed ? "selected" : ""}
              >
                {titleCasedBreed}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BreedSelector;
