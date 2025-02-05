import React, { useState } from 'react';
import "./AddForm.css";

const AddForm = ({ isOpen, setIsOpen }) => {
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

  const [keywords, setKeywords] = useState([]); // State for keywords
  const [keywordInput, setKeywordInput] = useState(""); // Input field state for keyword

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add keyword when user presses Enter or clicks Add button
  const addKeyword = (e) => {
    e.preventDefault();
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput(""); // Clear input field after adding
    }
  };

  // Remove keyword from array
  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const handleClose = () => {
    setIsOpen(false);
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
    setKeywords([]); // Reset keywords as well
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission refresh

    try {
      const apiUrl = import.meta.env.VITE_SONG_SERVICE_URL || "http://localhost:5000";

      if (!apiUrl) {
        console.warn("⚠️ API URL missing! Check your environment variables.");
        alert("Server URL is missing. Please check your environment variables.");
        return;
      }

      const updatedData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) =>
          typeof value === "string" ? value.trim() !== "" : value !== null && value !== undefined
        )
      );

      const response = await fetch(`${apiUrl}/api/songs/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedData, keywords }),
      });

      const data = await response.json(); // Parse response JSON

      if (response.ok) {
        alert("Song Entry Created successfully!");
        handleClose(); // Close modal and reset form
      } else {
        alert(`Error creating Song: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the song.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="form-container">
      <div className="modal-overlay">
        <div className="form-container" onClick={(e) => e.stopPropagation()}>
          <h2>Enter Song Information</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-layout">
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

                  <div className="keyword-list">
                    {keywords.map((keyword, index) => (
                      <span key={index} className="keyword">
                        {keyword}
                        <button type="button" onClick={() => removeKeyword(keyword)}>x</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

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

            <div className="submit-container">
              <button type="submit" className="submit-button">Submit Song</button>
              <button type="button" onClick={handleClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
