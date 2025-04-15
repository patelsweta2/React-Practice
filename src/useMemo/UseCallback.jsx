import React, { useState, useCallback } from "react";

const Button = React.memo(({ handleClick, count }) => {
  console.log("Child button");
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <p>{count}</p>
    </div>
  );
});

const UseCallback = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");
  console.log("parent");
  const handleClick = useCallback(() => {
    console.log("clicked");
    setCount((prev) => prev + 1);
  }, []);

  //   const handleClick = () => {
  //     console.log("clicked");
  //     setCount((prev) => prev + 1);
  //   };

  return (
    <div>
      <Button handleClick={handleClick} count={count} />
      <p>count : {count}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Change Theme
      </button>
    </div>
  );
};

export default UseCallback;
