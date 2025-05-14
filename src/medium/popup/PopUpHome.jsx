import React, { useState } from "react";

const PopUpHome = () => {
  const [formData, setFormData] = useState({
    horizontal: "left",
    vertical: "top",
    type: "success",
    message: "This is a toast message!",
    duration: 5,
  });

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleShowToast = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, formData.duration * 1000);
  };

  const handleCloseToast = () => {
    setShow(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Toast Popup</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Horizontal Position: </label>
        <select name="horizontal" value={formData.horizontal} onChange={handleChange}>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Vertical Position: </label>
        <select name="vertical" value={formData.vertical} onChange={handleChange}>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Message Type: </label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="success">Success</option>
          <option value="error">Error</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Message: </label>
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Duration (2s - 20s): </label>
        <input
          type="range"
          min="2"
          max="20"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <span> {formData.duration}s</span>
      </div>

      <button onClick={handleShowToast}>Show Toast</button>

      {show && (
        <div
          style={{
            position: "fixed",
            [formData.vertical]: "20px",
            [formData.horizontal]: "20px",
            backgroundColor: getColor(formData.type),
            padding: "12px 20px",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 9999,
            minWidth: "200px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>{formData.message}</span>
          <button
            onClick={handleCloseToast}
            style={{
              background: "transparent",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

const getColor = (type) => {
  switch (type) {
    case "success":
      return "green";
    case "error":
      return "red";
    case "info":
      return "blue";
    case "warning":
      return "orange";
    default:
      return "gray";
  }
};

export default PopUpHome;
