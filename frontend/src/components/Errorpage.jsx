import SamoyedError from "../assets/samoyederror.jpg";
import "./styles/bgcolors.css";

const Errorpage = () => {
  return (
    <>
      <div className="errorpage">
        <h1> Page not found. </h1>
        <img
          className="Samoyed"
          src={SamoyedError}
          alt="Derpy samoyed dog with error message"
        />
        <h2> Please try again!!! 🐶</h2>
        <button>
          <a href="/">Back to Homepage</a>
        </button>
      </div>
    </>
  );
};

export default Errorpage;
