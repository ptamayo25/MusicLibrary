import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import SearchInput from "./SearchInput";

const FoundationLayout = () => {
  return (
    <div className="layout">
      <Navigation />

      <SearchInput />

      <Outlet />

      <footer> © 2025 </footer>
    </div>
  );
};

export default FoundationLayout;
