import { Outlet } from "react-router-dom";
// import Navigation from "../components/Navigation/Navigation";
// import SearchInput from "./SearchInput/SearchInput";
import SongDetailsNoLyrics from "../components/SongDetailsLyrics/SongDetails";
// import DeleteSongModal from "./DeleteSongModal/DeleteSongModal";
// import { useState } from "react";

const FoundationLayout = () => {
  // const [isOpen, setIsOpen] = useState(true);//used only to test the DeleteSongModal

  const result = {
    _id: "679b77c21c06997bb5a807e7",
    title: "Sound of Silence",
    composer: "Paul Simon",
    copies: 8,
    voicing: "SAA",
    instrumentation: "piano",
    keywords: ["speaking out", "communication"],
    lyrics:
      "Hello darkness, my old friend. I've come to talk with you again, Because a vision softly creeping Left its seeds while I was sleeping",
  };
  return (
    <div className="layout">
      {/* <Navigation />

      <SearchInput /> */}

      {/* <DeleteSongModal
        song={results}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}

      <SongDetailsNoLyrics song={result} />
      <Outlet />

      {/* <footer>
        <div className="bottom">2025 ©</div>
      </footer> */}
    </div>
  );
};

export default FoundationLayout;
