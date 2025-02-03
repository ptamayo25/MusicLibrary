import "./SongDetails.css";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

const SongDetailsNoLyrics = ({ song }) => {
  // const { songId } = useParams();
  // const [song, setSong] = useState("");

  // useEffect(() => {
  //   const fetchSong = async () => {
  //     try {
  //       if (!songId) {
  //         console.log("Song ID not found.");
  //         return;
  //       }
  //       console.log("Fetching song with ID:", songId);
  //       const response = fetch(
  //         `${import.meta.env.VITE_SONG_SERVICE_URL}/api/songs/${songId}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch song");
  //       }
  //       const data = await response.json();
  //       setSong(data.song);
  //     } catch (error) {
  //       console.error(error);
  //       alert("Failed to fetch song. Please try again.");
  //     }
  //   };

  //   fetchSong();
  // }, [songId]);

  // if (!song) {
  //   return;
  // }
  console.log(song);
  // console.log(song.song.title);
  return (
    <>
      <div className="song-details-container">
        <header>
          <section className="title-column">
            <p className="title">
              {/* Title */}
              {song.title}
            </p>
          </section>

          <section className="details-column">
            <div className="details">
              <p className="composer">
                <span className="bold">Composer:</span>

                <span>
                  {/* Testinggg */}
                  {song.composer}
                </span>
              </p>
              <p className="voicing">
                <span className="bold">Voicing:</span>
                <span>
                  {/* SBAT Solo */}
                  {song.voicing}
                </span>
              </p>

              <p className="arranger">
                <span className="bold">Arranger:</span>
                <span>
                  {/* Testinggggggg */}
                  {song.arranger}
                </span>
              </p>
              <p className="date-performed">
                <span className="bold">Date Performed:</span>
                <span>
                  {/* 12/12/1212 */}
                  {song.lastPerformed
                    ? song.lastPerformed
                    : "Not performed yet"}
                </span>
              </p>
            </div>
          </section>
        </header>
      </div>
    </>
  );
};

export default SongDetailsNoLyrics;
