import React, { useEffect, useRef, useState } from "react";

const AutoSaveForm = () => {
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState("");
  const lastSavedValue = useRef("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (input !== lastSavedValue.current) {
        console.log("Auto-saving draft:", input);
        lastSavedValue.current = input;
        setSaved(input);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [input]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Auto Save Draft</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <p style={{ marginTop: "10px", color: "gray" }}>
        Last saved: <strong>{saved}</strong>
      </p>
    </div>
  );
};

export default AutoSaveForm;
