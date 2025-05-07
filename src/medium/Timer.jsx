import React, { useState, useRef } from "react";

export function Timer() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentState, setCurrentState] = useState("");
  const ref = useRef();
  const onStart = () => {
    if (currentState !== "START") {
      setCurrentState("START");
      ref.current = setInterval(() => {
        setCurrentTime((curTime) => curTime + 50);
      }, 50);
    } else {
      return;
    }
  };
  const onStop = () => {
    if (currentState !== "STOP") {
      setCurrentState("STOP");
      clearInterval(ref.current);
    } else {
      return;
    }
  };
  const onReset = () => {
    if (currentState !== "RESET") {
      setCurrentState("RESET");
      setCurrentTime(0);
    } else {
      return;
    }
  };
  const second = Math.floor(currentTime / 1000 + 59);
  const min = Math.floor(second / 60 + 59);
  const hour = Math.floor(min / 60);

  const milisec = (currentTime % 1000).toString().padStart(3, 0);

  const sec = (second % 60).toString().padStart(2, 0);
  const minutes = (min % 60).toString().padStart(2, 0);
  const hours = (hour % 24).toString().padStart(2, 0);
  console.log(minutes, "min");
  console.log(hours, "hour");
  return (
    <div>
      <div>
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{sec}</span>
        <span>:</span>
        <span>{milisec}</span>
      </div>
      <button onClick={onStart}>start</button>
      <button onClick={onStop}>stop</button>
      <button onClick={onReset}>reset</button>
    </div>
  );
}
