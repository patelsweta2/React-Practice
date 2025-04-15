import React, { useEffect, useRef, useState } from "react";

const PrevCount = () => {
  const [count, setCount] = useState(0);
  const prevCount = useRef(null);
  useEffect(() => {
    prevCount.current = count;
  }, [count]); // run everytime count change
  return (
    <div style={{ padding: "20px" }}>
      <h2>Previous Value tracker</h2>
      <p>Current count: {count}</p>
      <p>Previous Count: {prevCount.current}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
};

export default PrevCount;
