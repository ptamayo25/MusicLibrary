import { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import SearchInput from "./SearchInput/SearchInput";
import { data } from "react-router-dom";

const Homepage = () => {
  const [access, setAccess] = useState(null);
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const api_url = import.meta.env.VITE_AUTH_SERVICE_URL;
        const response = await fetch(`${api_url}/api/users/checkAccess`, {
          method: "POST",
          credentials: "include", // include cookies with request
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to check access");
        }

        setAccess(data.access);
      } catch (error) {
        console.error("Error checking access:", error);
      }
    };

    checkAccess();
  }, []);

  return (
    <div className="homepage">
      {access === null ? <p>Loading...</p> : <Navigation access={access} />}
      {access === null ? <p>Loading...</p> : <SearchInput access={access} />}
    </div>
  );
};

export default Homepage;
