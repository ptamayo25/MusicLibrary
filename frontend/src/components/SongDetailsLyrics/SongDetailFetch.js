// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

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
