import React, { useState } from "react";

const ChipsInput = () => {
  const [value, setValue] = useState("");
  const [allVal, setAllVal] = useState([]);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim()) {
      setAllVal([...allVal, value.trim()]);
      setValue("");
    }
  };

  const handleCrossClick = (idxToRemove) => {
    const updated = allVal.filter((_, idx) => idx !== idxToRemove);
    setAllVal(updated);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <input
        type="text"
        placeholder="type & hit enter"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          width: "250px",
        }}
      />
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {allVal.map((item, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#f2f2f2",
              borderRadius: "20px",
              padding: "6px 12px",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span>{item}</span>
            <button
              onClick={() => handleCrossClick(i)}
              style={{
                border: "none",
                background: "transparent",
                color: "red",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChipsInput;
