//write function for search input
import react from "react";
import { useState } from "react";
import "./styles/buttons.css";
import "./styles/searchInput.css";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title, composer, lyrics or artist"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="search-button">🔎</button>
      </div>
    </div>
  );
}

export default SearchInput;
