import React, { useRef, useState, useEffect } from "react";

const RefState = () => {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const handleClick = () => {
    const value = inputRef.current.value;
    setText(value);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Enter text" />
      <button onClick={handleClick}>submit</button>
      {text && (
        <p>
          you entered: <strong>{text}</strong>
        </p>
      )}
    </div>
  );
};

export default RefState;
