import Navigation from "../components/Navigation/Navigation";
import SearchInput from "./SearchInput/SearchInput";
import AddForm from "../components/AddForm/AddForm";

const Homepage = () => {
  return (
    <div>
      <AddForm />
      <Navigation />

      <SearchInput />
    </div>
  );
};

export default Homepage;
