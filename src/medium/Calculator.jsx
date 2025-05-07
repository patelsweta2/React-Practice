import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const buttons = [
    "Clear",
    "Del",
    "+-",
    "X²",
    "1",
    "2",
    "3",
    "+",
    "4",
    "5",
    "6",
    "/",
    "7",
    "8",
    "9",
    "-",
    "0",
    "xʸ",
    "root",
    "*",
    ".",
    "=",
  ];

  const clickHandler = (val) => {
    switch (val) {
      case "Clear":
        setInput("");
        break;
      case "Del":
        setInput((prev) => prev.slice(0, -1));
        break;
      case "+-":
        setInput((prev) => {
          if (!prev) return "";
          return prev.startsWith("-") ? prev.slice(1) : "-" + prev;
        });
        break;
      case "X²":
        setInput((prev) => prev + "**2");
        break;
      case "xʸ":
        setInput((prev) => prev + "**");
        break;
      case "root":
        setInput((prev) => prev + "**(1/2)");
        break;
      case "=":
        try {
          const result = eval(input || "0");
          setInput(String(result));
        } catch {
          setInput("Error");
        }
        break;
      default:
        setInput((prev) => prev + val);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          value={input}
          style={{ padding: "10px", textAlign: "right", fontSize: "24px" }}
          readOnly
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "5px",
            padding: "10px",
            width: "430px",
            height: "400px",
            border: "1px solid #ccc",
          }}
        >
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => clickHandler(btn)}
              style={{ padding: "15px", fontSize: "18px" }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
