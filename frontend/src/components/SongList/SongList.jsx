import "./SongList.css";
import React, { useState, useEffect } from 'react';


const SongList = ({ songs }) => {

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
                        songs.map((song, index) => (
                            <tr key={index}>
                                <td>{song.title || 'N/A'}</td>
                                <td>{song.composer || 'N/A'}</td>
                                <td>{song.arranger || 'N/A'}</td>
                                <td>{song.keywords ? song.keywords.join(', ') : 'N/A'}</td>
                                <td>{song.lastPerformed ? new Date(song.lastPerformed).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                    {/* Button inside the table cell */}
                                    <button onClick={() => handleButtonClick(song.id)}>edit</button>
                                </td>
                                <td>
                                    {/* Button inside the table cell */}
                                    <button onClick={() => handleButtonClick(song.id)}>delete</button>
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
        </div>
    );
};

export default SongList;
