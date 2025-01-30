// import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import { Provider } from "react-redux";
// import AdminUserAccessPage from "./components/AdminUserAccessPage";
// import SongDetails from "./components/SongDetails";
// import Lyrics from "./components/Lyrics";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
      {/* Just going to put some files in here to test. 🧪👋 */}
      {/* <Lyrics /> */}
      {/* <AdminUserAccessPage /> */}
    </>
  );
}

export default App;
