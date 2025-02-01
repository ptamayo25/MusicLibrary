//write function for search input
import react from "react";
import { useState } from "react";
import "../styles/buttons.css";
import "./searchInput.css";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");

  //faking themes for now
  const themes = [
    "Christmas",
    "Easter",
    "Pentecost",
    "Advent",
    "Lent",
    "Thanksgiving",
    "Patriotic",
    "Wedding",
    "Funeral",
    "Baptism",
    "Communion",
    "General",
    "Children",
    "Youth",
    "Adult",
    "Community",
    "Peace",
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  const handleSort = (event) => {
    setSortType(event.target.value);
    console.log(sortType);
  };

  return (
    <div className="search-input">
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, composer, lyrics or artist"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search-button">🔎</button>
        </div>
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by:</label>
          <select value={sortType} id="sortBy" onChange={handleSort}>
            <option value="default">Select Sorting</option>
            <option value="composerA-Z">Composer A to Z</option>
            <option value="composerZ-A">Composer Z to A</option>
            <option value="titleA-Z">Title A to Z</option>
            <option value="titleZ-A">Title Z to A</option>
            <option value="mostRecent">Most to Least Recent Performance</option>
            <option value="leastRecent">
              Least to Most Recent Performance
            </option>
          </select>
        </div>
        <div className="add-song">
          <button className="add-song-button">Add Song</button>
        </div>
      </div>
      <div classname="theme-tags">
        {/* checkboxes for themes */}
        <label id="theme-header" htmlFor="themes">Themes:</label>
        <br />
        {themes.map((theme) => {
          const lowerCaseTheme = theme.toLowerCase();
          return (
            <div className="theme-tags">
              <input
                className="theme-checkbox"
                type="checkbox"
                id={theme}
                name={theme}
                value={theme}
              />
              <label htmlFor={lowerCaseTheme}>{theme}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchInput;
