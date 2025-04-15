import React, { useRef, useEffect } from "react";

const OtpInput = () => {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    if (e.target.value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div>
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          maxLength={1}
          onChange={(e) => handleChange(e, i)}
          style={{ width: "40px", margin: "5px", textAlign: "center" }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
