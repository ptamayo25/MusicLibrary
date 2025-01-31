// import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import store from "./app/store";
import { Provider } from "react-redux";

// import AdminUserAccessPage from "./components/AdminUserAccessPage/AdminUserAccessPage";
// import SongDetails from "./components/SongDetailsLyrics/SongDetails";
// import Lyrics from "./components/SongDetailsLyrics/Lyrics";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      {/* Just going to put some files in here to test. 🧪👋 */}
      {/* <Lyrics />
      <SongDetails />
      <AdminUserAccessPage /> */}
    </>
  );
}

export default App;
