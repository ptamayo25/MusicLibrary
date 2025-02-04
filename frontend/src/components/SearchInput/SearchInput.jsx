//write function for search input
// import react from "react";
import { useState, useEffect } from "react";
import "../styles/buttons.css";
import "./searchInput.css";
import SongList from "../SongList/SongList";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");
  const [themeSelected, setThemeSelected] = useState([]);
  const [themesDisplayed, setThemesDisplayed] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);

  useEffect(() => {
    const handleOnLoad = async () => {
      try {
        //Grab themes from backend
        const apiUrl = import.meta.env.VITE_SONG_SERVICE_URL;
        const response = await fetch(`${apiUrl}/api/songs/themes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        console.log("response", response);
        if (!response.ok) {
          console.error("Failed to fetch themes");
        }
        const data = await response.json();

        const themes = data.uniqueThemes.filter((theme) => theme !== null);

        setThemesDisplayed(themes);
      } catch (error) {
        console.error("Error fetching themes", error);
      }
    };
    handleOnLoad();
  }, []);

  // handleOnLoad();

  // faking themes for now
  // const themesDisplayed = [
  //   "Christmas",
  //   "Easter",
  //   "Pentecost",
  //   "Advent",
  //   "Lent",
  //   "Thanksgiving",
  //   "Patriotic",
  //   "Wedding",
  //   "Funeral",
  //   "Baptism",
  //   "Communion",
  //   "General",
  //   "Children",
  //   "Youth",
  //   "Adult",
  //   "Community",
  //   "Peace",
  // ];

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
        body: JSON.stringify({
          words: searchTerm,
          sortType,
          themes: themeSelected,
        }),
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

  const handleThemeChange = (event) => {
    const { value, checked } = event.target;
    setThemeSelected((prevThemes) => {
      if (checked) {
        return [...prevThemes, value];
      } else {
        return prevThemes.filter((theme) => theme !== value);
      }
    });
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
        <div className="theme-container">
          {/* checkboxes for themes */}
          <label id="theme-header" htmlFor="themes">
            Themes:
          </label>
          <br />
          {themesDisplayed.map((theme) => {
            const lowerCaseTheme = theme.toLowerCase();
            const themeProperCased =
              theme.charAt(0).toUpperCase() + theme.slice(1);
            return (
              <div className="theme-tags">
                <input
                  key={theme}
                  className="theme-checkbox"
                  type="checkbox"
                  id={theme}
                  name={theme}
                  value={theme}
                  onChange={handleThemeChange}
                />
                <label htmlFor={lowerCaseTheme}>{themeProperCased}</label>
              </div>
            );
          })}
        </div>
      </div>
      {/* display results temporarily as list until search results component done */}
      <br />
      {/* <div className="search-results">
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
      </div> */}
      <SongList songs={searchResults} />
    </>
  );
}

export default SearchInput;
