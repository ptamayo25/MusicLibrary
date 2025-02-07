import "./SongList.css";
import React, { useState } from "react";
import DeleteSongModal from "../DeleteSongModal/DeleteSongModal"; // Import the modal component
import UpdateForm from "../UpdateForm/UpdateForm";
import SongDetailsNoLyrics from "../SongDetailsLyrics/SongDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SongList = ({ songs }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSong, setSelectedSongForDelete] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSongForDetail, setSelectedSongForDetail] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSongForUpdate, setSelectedSongForUpdate] = useState(null);

  const handleEditClick = (song) => {
    setSelectedSongForUpdate(song); // Set song to update
    setIsUpdateModalOpen(true); // Open the update modal
  };

  const handleDeleteClick = (song) => {
    setSelectedSongForDelete(song); // Set song to delete
    setIsDeleteModalOpen(true); // Open the delete modal
  };

  const handleTitleClick = (song) => {
    console.log("🔍 Title clicked for song:", song);
    setSelectedSongForDetail(song);
    setIsDetailModalOpen(true);
  };

  const headers = [
    "Title",
    "Composer",
    "Arranger",
    "Keywords",
    "Last Performed",
    " ",
    " ",
  ];

  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="table-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {songs.length > 0 ? (
              songs.map((song) => (
                <tr key={song._id}>
                  <td>
                    <span
                      className="underlined"
                      onClick={() => handleTitleClick(song)}
                    >
                      {song.title || "N/A"}
                    </span>
                  </td>
                  <td>{song.composer || "N/A"}</td>
                  <td>{song.arranger || "N/A"}</td>
                  <td>{song.keywords ? song.keywords.join(", ") : "N/A"}</td>
                  <td>
                    {song.lastPerformed
                      ? new Date(song.lastPerformed).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      className="hover-button"
                      onClick={() => handleEditClick(song)}
                    >
                      {/* edit */}
                      <EditIcon />
                    </button>
                  </td>
                  <td>
                    <button
                      className="hover-button"
                      onClick={() => handleDeleteClick(song)}
                    >
                      {/* delete */}
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length}>No songs available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Render DeleteSongModal */}
        {selectedSong && (
          <DeleteSongModal
            song={selectedSong}
            isOpen={isDeleteModalOpen}
            setIsOpen={setIsDeleteModalOpen}
          />
        )}

        {isUpdateModalOpen && selectedSongForUpdate && (
          <UpdateForm
            isOpen={isUpdateModalOpen}
            setIsOpen={setIsUpdateModalOpen}
            song={selectedSongForUpdate}
            songid={selectedSongForUpdate?._id} // Correctly passing song ID
          />
        )}
      </div>

      {isDetailModalOpen && setSelectedSongForDetail && (
        <SongDetailsNoLyrics
          song={selectedSongForDetail}
          isModalOpen={isDetailModalOpen}
          setIsModalOpen={setIsDetailModalOpen}
        />
      )}
    </>
  );
};

export default SongList;
