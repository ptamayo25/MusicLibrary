// import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import store from "./app/store";
import { Provider } from "react-redux";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      {/* Just going to put some files in here to test. 🧪👋 */}
    </>
  );
}

export default App;
