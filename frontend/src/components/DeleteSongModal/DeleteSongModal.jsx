import "./deleteSongModal.css";

const DeleteSongModal = ({ song, isOpen, setIsOpen }) => {
  const handleDelete = async () => {
    try {
      const apiUrl = import.meta.env.VITE_SONG_SERVICE_URL;

      if (!apiUrl) {
        console.error("Song service url is not set in .env");
      }

      const response = await fetch(`${apiUrl}/api/songs/${song._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setIsOpen(false);
        alert("Song deleted successfully");
      } else {
        console.error("Failed to delete song");
        alert("Failed to delete song");
      }
    } catch (error) {
      console.error("Error deleting song", error);
    }
  };

  const handleOutsideClick = (event) => {
    if (event.target.className === "modal") {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="delete-song-modal"
          style={{ display: isOpen ? "block" : "none" }}
          onClick={handleOutsideClick}
        >
          <div className="delete-modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete "{song.title}"?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setIsOpen(false)}>No</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteSongModal;
