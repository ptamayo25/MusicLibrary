import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

const FoundationLayout = () => {
  return (
    <div className="layout">
      <Navigation />

      <Outlet />

      <footer> © 2025 </footer>
    </div>
  );
};

export default FoundationLayout;
