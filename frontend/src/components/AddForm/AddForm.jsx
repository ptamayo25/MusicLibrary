import React, { useState } from 'react';
import "./AddForm.css";

const AddForm = () => {
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



  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission refresh

    try {
      const apiUrl = import.meta.env.VITE_SONG_SERVICE_URL;

      if (!apiUrl) {
        console.error("Song service URL is not set in .env");
        alert("Server URL is missing. Please check your environment variables.");
        return;
      }

      const response = await fetch(`${apiUrl}/api/songs/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, keywords }),
      });

      const data = await response.json(); // Parse response JSON

      if (response.ok) {
        alert("Song Entry Created successfully!");
        // Optionally reset form after success
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
        setKeywords([]); // Clear keywords
      } else {
        alert(`Error creating Song: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the song.");
    }
  };
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

export default AddForm;

