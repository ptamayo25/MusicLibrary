// import { useState } from "react";
import "./App.css";
// import AdminUserAccessPage from "./components/AdminUserAccessPage";
import SongDetails from "./components/SongDetails";
import Lyrics from "./components/Lyrics";
import Navigation from "./components/Navigation/Navigation";

import { ErrorBoundary } from "react-error-boundary";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* Just going to put some files in here to test. 🧪👋 */}
      {/* <Lyrics /> */}
      {/* <AdminUserAccessPage /> */}
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Navigation />
      </ErrorBoundary>
    </>
  );
}

export default App;
