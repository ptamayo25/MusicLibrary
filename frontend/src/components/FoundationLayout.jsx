import { Outlet } from "react-router-dom";
// import Navigation from "../components/Navigation/Navigation";
// import SearchInput from "./SearchInput/SearchInput";
import SongDetail from "../components/SongDetailsLyrics/SongDetails";
// import DeleteSongModal from "./DeleteSongModal/DeleteSongModal";
import { useState } from "react";

const FoundationLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="layout">
      {/* <Navigation />

      <SearchInput /> */}

      {/* <DeleteSongModal
        song={{ title: "songtitle", _id: "679bb0826750867b7a1d992b" }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}

      <SongDetail />
      <Outlet />

      {/* <footer>
        <div className="bottom">2025 ©</div>
      </footer> */}
    </div>
  );
};

export default FoundationLayout;
