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
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setIsOpen(false);
      } else {
        console.error("Failed to delete song");
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
          className="modal"
          style={{ display: isOpen ? "block" : "none" }}
          onClick={handleOutsideClick}
        >
          <div className="modal-content">
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
