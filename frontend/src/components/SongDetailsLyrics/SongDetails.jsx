import "./SongDetails.css";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

const SongDetailsNoLyrics = () => {
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

  return (
    <>
      <div className="song-details-container">
        <header>
          <section className="title-column">
            <p className="title">
              Title
              {/* {song.title} */}
            </p>
          </section>

          <section className="details-column">
            <div className="details">
              <p className="composer">
                <span className="bold">Composer:</span>

                <span>
                  Testinggg
                  {/* {song.composer} */}
                </span>
              </p>
              <p className="voicing">
                <span className="bold">Voicing:</span>
                <span>
                  SBAT Solo
                  {/* {song.voicing} */}
                </span>
              </p>
              {/* <p className="music-length">
                <span className="bold">Duration:</span> */}
              {/* <span> 3:00:00 
                </span> */}
              {/* </p> */}
              <p className="arranger">
                <span className="bold">Arranger:</span>
                <span>
                  Testinggggggg
                  {/* {song.arranger} */}
                </span>
              </p>
              <p className="date-performed">
                <span className="bold">Date Performed:</span>
                <span>
                  12/12/1212
                  {/* {song.lastPerformed} */}
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
