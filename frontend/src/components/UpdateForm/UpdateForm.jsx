import React, { useState, useEffect } from 'react';
import "./UpdateForm.css";

const UpdateForm = ({ isOpen, setIsOpen, song, songid }) => {
  const [formData, setFormData] = useState({
    title: "",
    composer: "",
    arranger: "",
    copies: "",
    voicing: "",
    instrumentation: "",
    lyrics: "",
    lastPerformed: "",
    comments: "",
  });

  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");

  // Prefill form 
  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title || "",
        composer: song.composer || "",
        arranger: song.arranger || "",
        copies: song.copies || "",
        voicing: song.voicing || "",
        instrumentation: song.instrumentation || "",
        lyrics: song.lyrics || "",
        lastPerformed: song.lastPerformed || "",
        comments: song.comments || "",
      });
      setKeywords(song.keywords || []);
    }
  }, [song]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addKeyword = (e) => {
    e.preventDefault();
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_SONG_SERVICE_URL;
      if (!apiUrl) {
        alert("Server URL is missing.");
        return;
      }

      console.log("📤 Sending PATCH request to:", `${apiUrl}/api/songs/${song._id}`);
      console.log("📤 Payload:", JSON.stringify({ ...formData, keywords }));

      if (!songid) {
        alert("Invalid song ID.");
        return;
      }

      // Filter out unchanged fields
      const updatedData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) =>
          typeof value === "string" ? value.trim() !== "" : value !== null && value !== undefined
        )
      );


      const response = await fetch(`${apiUrl}/api/songs/${songid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedData, keywords }),
      });

      const responseData = await response.json(); // Parse response

      console.log("Server Response:", responseData);

      if (response.ok) {
        alert("Song Entry Updated successfully!");
        setIsOpen(false); // Close modal on success
      } else {
        alert("Error updating song");
      }
    } catch (error) {
      console.error("❌ Network or server error:", error);
      alert("An error occurred while updating the song.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <h2>Update Song</h2>
        <button className="close-button" type="button" onClick={() => setIsOpen(false)}>X</button>
        <form onSubmit={handleSubmit}>
          <div className="form-layout">
            {/* Left Side - Standard Inputs & Keywords */}
            <div className="form-left">
              {[
                { label: "* Title", name: "title", type: "text", required: true },
                { label: "* Composer", name: "composer", type: "text", required: true },
                { label: "Arranger", name: "arranger", type: "text" },
                { label: "Copies", name: "copies", type: "number" },
                { label: "Voicing", name: "voicing", type: "text" },
                { label: "Instrumentation", name: "instrumentation", type: "text" },
                { label: "Last Performed", name: "lastPerformed", type: "date" },
              ].map((field) => (
                <div className="form-group" key={field.name}>
                  <label htmlFor={field.name}>{field.label}:</label>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required || false}
                  />
                </div>
              ))}

              {/* Keywords Input Field */}
              <div className="form-group">
                <label>Keywords:</label>
                <div className="keyword-input">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addKeyword(e)}
                    placeholder="Type a keyword and press Enter"
                  />
                  <button type="button" onClick={addKeyword}>Add</button>
                </div>

                {/* Display Added Keywords */}
                <div className="keyword-list">
                  {keywords.map((keyword, index) => (
                    <span key={index} className="keyword">
                      {keyword}
                      <button type="button" onClick={() => removeKeyword(keyword)}>x</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comments">Comments:</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Right Side - Lyrics Section */}
            <div className="form-right">
              <label htmlFor="lyrics">Lyrics:</label>
              <textarea
                id="lyrics"
                name="lyrics"
                value={formData.lyrics || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button - At the Bottom & Centered */}
          <div className="submit-container">
            <button type="submit" className="submit-button">Submit Song</button>
            <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
