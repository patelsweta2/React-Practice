import React, { useState } from "react";

const StringtransForm = () => {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState("");
  const handleLowerCase = () => {
    const res = sentence.toLowerCase();
    setResult(res);
  };

  const handleUpperCase = () => {
    const res = sentence.toUpperCase();
    setResult(res);
  };

  const handleCamelCase = () => {
    const res = sentence
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .map((item, index) =>
        index === 0 ? item : item.charAt(0).toUpperCase() + item.slice(1)
      )
      .join("");
    setResult(res);
  };
  const handlePascalCase = () => {
    const res = sentence
      .toLowerCase()
      .split(" ")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join("");
    setResult(res);
  };
  const handleSnakeCase = () => {
    const res = sentence.trim().split(/\s+/).join("_");
    setResult(res);
  };
  const handleKebabCase = () => {
    const res = sentence.trim().split(/\s+/).join("-");
    setResult(res);
  };
  const handleTrimCase = () => {
    const res = sentence.trim();
    setResult(res);
  };
  return (
    <div className="container">
      <div>
        <textarea
          rows="4"
          cols="40"
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginTop: "5px",
        }}
      >
        <div className="buttonContainer">
          <button onClick={handleLowerCase}>Lower Case</button>
          <button onClick={handleUpperCase}>Upper Case</button>
          <button onClick={handleCamelCase}>Camel Case</button>
        </div>
        <div className="buttonContainer">
          <button onClick={handlePascalCase}>Pascal Case</button>
          <button onClick={handleSnakeCase}>Snake Case</button>
          <button onClick={handleKebabCase}>Kebab Case</button>
        </div>
        <div className="buttonContainer">
          <button onClick={handleTrimCase}>Trim</button>
        </div>
      </div>
      <div>
        <p>Result</p>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default StringtransForm;
