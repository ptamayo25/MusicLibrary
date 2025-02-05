import PropTypes from "prop-types";
import "./SongDetails.css";
// import { useState } from "react";

const SongDetailsNoLyrics = ({ song, isModalOpen, setIsModalOpen }) => {
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const songDetails = [
    { label: "Composer", value: song.composer || "None" },
    { label: "Arranger", value: song.arranger || "None" },
    {
      label: "Date Performed",
      value: song.lastPerformed || "Not performed yet",
    },
    { label: "Copies", value: song.copies },
    { label: "Instrumentation", value: song.instrumentation },
    { label: "Voicing", value: song.voicing },
    {
      label: "Keywords",
      value: song.keywords ? song.keywords.join(", ") : "None",
    },
  ];
  return (
    <>
      {isModalOpen && (
        <div
          className="song-detail-modal modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="song-details-container">
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <header>
              <section className="title-column">
                <p className="title bold"> {song.title}</p>
              </section>
              {/* <section className="details-column"> */}
              <div className="details">
                {songDetails.map((detail, index) => (
                  <p
                    key={index}
                    className={detail.label.toLowerCase().replace(" ", "-")}
                  >
                    <span className="label">{detail.label}:</span>
                    <span className="value">
                      {detail.value ? detail.value : "None"}
                    </span>
                  </p>
                ))}
              </div>
              {/* </section> */}
              <h2> Lyrics</h2>
              {song.lyrics || "None"}
            </header>
          </div>
        </div>
      )}
    </>
  );
};

SongDetailsNoLyrics.propTypes = {
  song: PropTypes.shape({
    title: PropTypes.string.isRequired,
    composer: PropTypes.string.isRequired,
    voicing: PropTypes.string,
    arranger: PropTypes.string,
    lastPerformed: PropTypes.string,
    instrumentation: PropTypes.string,
    copies: PropTypes.number,
    keywords: PropTypes.arrayOf(PropTypes.string),
    lyrics: PropTypes.string,
  }),
};

export default SongDetailsNoLyrics;
