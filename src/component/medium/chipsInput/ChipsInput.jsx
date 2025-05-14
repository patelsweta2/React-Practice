import React, { useState } from "react";

const ChipsInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault(); 
      setChips((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeChip = (indexToRemove) => {
    setChips((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <label style={{ display: "block", marginBottom: "8px" }}>
        Enter items:
      </label>
      <input
        type="text"
        placeholder="Type and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          padding: "8px",
          boxSizing: "border-box",
          marginBottom: "12px",
          fontSize: "16px",
        }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {chips.map((chip, idx) => (
          <div
            key={idx}
            style={{
              background: "#e0e0e0",
              padding: "6px 10px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
            }}
          >
            <span>{chip}</span>
            <button
              onClick={() => removeChip(idx)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                lineHeight: "1",
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChipsInput;
