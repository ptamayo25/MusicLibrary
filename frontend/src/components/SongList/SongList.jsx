//

import "./SongList.css";
import React, { useState } from 'react';
import DeleteSongModal from "../DeleteSongModal/DeleteSongModal"; // Import the modal component

const SongList = ({ songs }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);

    const handleEditClick = (songId) => {
        console.log('Edit clicked for song with ID:', songId);
    };

    const handleDeleteClick = (song) => {
        setSelectedSong(song);  // Set the selected song
        setIsModalOpen(true);   // Open the modal
    };

    const handleTitleClick = (songId) => {
        console.log('Title clicked for song with ID:', songId);
    };

    const headers = ['Title', 'Composer', 'Arranger', 'Keywords', 'Last Performed', ' ', ' '];

    return (
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
                                    <span className="underlined" onClick={() => handleTitleClick(song._id)}>
                                        {song.title || "N/A"}
                                    </span>
                                </td>
                                <td>{song.composer || 'N/A'}</td>
                                <td>{song.arranger || 'N/A'}</td>
                                <td>{song.keywords ? song.keywords.join(', ') : 'N/A'}</td>
                                <td>{song.lastPerformed ? new Date(song.lastPerformed).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleEditClick(song._id)}>edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteClick(song)}>delete</button>
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
                    isOpen={isModalOpen} 
                    setIsOpen={setIsModalOpen} 
                />
            )}
        </div>
    );
};

export default SongList;
