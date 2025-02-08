import Navigation from "../components/Navigation/Navigation";
import SearchInput from "./SearchInput/SearchInput";

const Homepage = () => {
  //TODO: ADD ACCESS CHECK WITH A FETCH SIMILAR TO THE ONE BELOW
  // try {
  //   const api_url = import.meta.env.VITE_AUTH_SERVICE_URL
  //   const response = await fetch(`${api_url}/api/users/access`, {
  //     method: "GET",
  //     credentials: "include", // include cookies with request
  //   });

  // } catch (error) {

  // }

  return (
    <div>
      <Navigation />
      <SearchInput />
    </div>
  );
};

export default Homepage;
