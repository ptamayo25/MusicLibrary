import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import SearchInput from "./SearchInput/SearchInput";
import SongDetail from "../components/SongDetailsLyrics/SongDetails";

const FoundationLayout = () => {
  return (
    <div className="layout">
      <Navigation />

      <SearchInput />

      {/* <SongDetail /> */}
      <Outlet />

      <footer> © 2025 </footer>
    </div>
  );
};

export default FoundationLayout;
