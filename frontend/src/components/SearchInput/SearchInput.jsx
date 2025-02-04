//write function for search input
import { useState } from "react";
import "../styles/buttons.css";
import "./searchInput.css";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearch = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      const apiUrl = import.meta.env.VITE_SONG_SERVICE_URL;

      if (!apiUrl) {
        console.error("Song service url is not set in .env");
      }

      const response = await fetch(`${apiUrl}/api/songs/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ words: searchTerm, sortType }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSort = (event) => {
    setSortType(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleAddSong = () => {
    //TODO: add functionality to have modal pop up to add song once add song modal component is created
    console.log("Add Song button clicked");
  };

  return (
    <>
      <div className="search-input">
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by title, composer, lyrics or artist"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={handleSearch}>
              🔎
            </button>
          </div>
          <div className="sort-dropdown">
            <label htmlFor="sort">Sort by:</label>
            <select value={sortType} id="sortBy" onChange={handleSort}>
              <option value="default">Select Sorting</option>
              <option value="composerA-Z">Composer A to Z</option>
              <option value="composerZ-A">Composer Z to A</option>
              <option value="titleA-Z">Title A to Z</option>
              <option value="titleZ-A">Title Z to A</option>
              <option value="mostRecent">
                Most to Least Recent Performance
              </option>
              <option value="leastRecent">
                Least to Most Recent Performance
              </option>
            </select>
          </div>
          <div className="add-song">
            <button className="add-song-button" onClick={handleAddSong}>
              Add Song
            </button>
          </div>
        </div>
        <div classname="theme-tags">
          {/* checkboxes for themes */}
          <label id="theme-header" htmlFor="themes">
            Themes:
          </label>
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
      {/* display results temporarily as list until search results component done */}
      <br />
      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((song, index) => (
              <li key={index}>
                <strong>{song.title}</strong> by {song.composer}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </>
  );
}

export default SearchInput;
