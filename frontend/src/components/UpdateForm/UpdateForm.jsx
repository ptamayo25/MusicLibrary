import React, { useState } from 'react';
import "./UpdateForm.css";

const UpdateForm = ({ song, isOpen, onClose }) => {
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
      const response = await fetch(`${apiUrl}/api/songs/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, keywords }),
      });
      if (response.ok) {
        alert("Song Entry Updated successfully!");
        setFormData({
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
        setKeywords([]);
        onClose(); // Close modal on success
      } else {
        alert("Error updating Song");
      }
    } catch (error) {
      alert("An error occurred while updating the song.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="form-container">
      <h2>Enter Song Information</h2>

      <form onSubmit={handleSubmit} >
        <div className="form-layout">
          {/* Left Side - Standard Inputs & Keywords */}
          <div className="form-left">
            {[
              { label: "* Title", name: "title", type: "text" },
              { label: "* Composer", name: "composer", type: "text" },
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
                  required
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
                  onKeyPress={(e) => e.key === "Enter" && addKeyword(e)}
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
              value={formData.lyrics}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Submit Button - At the Bottom & Centered */}
        <div className="submit-container">
          <button type="submit" className="submit-button">Submit Song</button>
        </div>

      </form>
    </div>



  );
};

export default UpdateForm

