import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../components/Homepage";
import AdminUserAccessPage from "../components/AdminUserAccessPage";
import MusicProgram from "../components/MusicProgram";
import Login from "../components/Login";
import AddSongForm from "../components/AddNewSong";
// import Navigation from "../components/Navigation/Navigation";
import ErrorPage from "../components/Errorpage";
import FoundationLayout from "../components/FoundationLayout";

//TODO We will need to make a protected route for admin access page and music program page

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FoundationLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "musicLibrary",
        element: <Homepage />,
      },
      {
        path: "userAccess",
        element: (
          // <ProtectedRoute>
          <AdminUserAccessPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: "musicPrograms",
        element: (
          // <ProtectedRoute>
          <MusicProgram />
          // </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout", //Redirects to login page
        element: <Login />,
      },
      {
        path: "addForm",
        // <ProtectedRoute>
        element: <AddSongForm />,
        // </ProtectedRoute>
      },
    ],
  },
]);
