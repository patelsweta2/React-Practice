import React, { useState, useEffect } from "react";

const TrafficLights = () => {
  const sequence = ["red", "yellow", "green", "yellow"];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % sequence.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const current = sequence[step];

  const lightStyle = (color) => ({
    width: 80,
    height: 80,
    borderRadius: "50%",
    backgroundColor: current === color ? color : "#333",
    margin: "10px auto",
    transition: "background-color 0.5s",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          border: "4px solid #222",
          borderRadius: 10,
          backgroundColor: "#111",
        }}
      >
        <div style={lightStyle("red")} />
        <div style={lightStyle("yellow")} />
        <div style={lightStyle("green")} />
      </div>
    </div>
  );
};

export default TrafficLights;
