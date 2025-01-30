import SongDetails from "./SongDetails";
import "./styles/buttons.css";

const Lyrics = ({ lyrics }) => {
  return (
    <div>
      <div className="song-details-container lyrics-details-container">
        <button className="edit-button hover-button">Edit Details</button>
        {lyrics ? (
          <div className="lyrics-container">
            <SongDetails />
            <h1 className="lyrics"> Lyrics </h1>
            <p>{lyrics}</p>
          </div>
        ) : (
          <div className="lyrics-container">
            <h1>Title</h1>
            <p className="composer">
              <span className="label">Composer:</span>
              <span className="value">Testinggg Testingggggg</span>
            </p>
            <p className="arranger">
              <span className="label">Arranger:</span>
              <span className="value">Testinggg Testingggggg</span>
            </p>
            <p className="voicing">
              <span className="label">Voicing:</span>
              <span className="value">SBAT with Solo</span>
            </p>
            <p className="date-performed">
              <span className="label">Date Performed:</span>
              <span className="value">12/12/1212</span>
            </p>
            <p className="music-length">
              <span className="label">Music Length:</span>
              <span className="value">3:00:00</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lyrics;
