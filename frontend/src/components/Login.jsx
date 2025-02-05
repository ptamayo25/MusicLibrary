import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  // useEffect to auto trigger login and useNavigate to redirect to musicLibrary
  // const navigate = useNavigate();
  //This is where url will be redirected
  // 1st parameter: Provider
  // 2nd parameter: Redirect to URL
  // http://localhost:5173/musicLibrary
  // 3rd parameter: Failure URL
  // async function handleLogin() {
  //   account.createOAuth2Session(
  //     "google",
  //     "http://localhost:5173/musicLibrary",
  //     "http://localhost:5173/error"
  //   );
  // }

  useEffect(() => {
    // fetch(import.meta.env.VITE_GOOGLE_REDIRECT_URL, {
    //   method: "GET",
    //   credentials: "include",
    // })
    fetch(import.meta.env.VITE_GOOGLE_REDIRECT_URL + "/loggedinuser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User data:", setUser(data));
      })
      .catch((error) => console.error("Error fetching user info:", error));
  });

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
        </div>
      ) : (
        <h2> Hello anonymous user!</h2>
      )}
    </div>
  );
};

export default Login;
