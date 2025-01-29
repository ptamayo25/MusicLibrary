import "./styles/songdetail.css";
const SongDetailsNoLyrics = () => {
  return (
    <>
      <div className="song-details-container">
        <header>
          <section className="title-column">
            <p className="title">Title</p>
          </section>

          <section className="details-column">
            <div className="details">
              <p className="composer">
                <span className="bold">Composer:</span>
                <span>Testinggg Testingggggg </span>
              </p>
              <p className="voicing">
                <span className="bold">Voicing:</span>
                <span> SBAT Solo </span>
              </p>
              <p className="music-length">
                <span className="bold">Duration:</span>
                <span> 3:00:00 </span>
              </p>
              <p className="arranger">
                <span className="bold">Arranger:</span>
                <span>Testinggggggg Testinggggggg </span>
              </p>
              <p className="date-performed">
                <span className="bold">Date Performed:</span>
                <span> 12/12/1212 </span>
              </p>
            </div>
          </section>
        </header>
      </div>
    </>
  );
};

export default SongDetailsNoLyrics;
