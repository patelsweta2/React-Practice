import React, { useState, useEffect } from "react";

const GridLight = () => {
  const [isClicked, setIsClicked] = useState(Array(9).fill(false));
  const [indexOrder, setIndexOrder] = useState([]);
  const handleClick = (index) => {
    if (!isClicked[index] && indexOrder.length < 9) {
      const newClicked = [...isClicked];
      newClicked[index] = true;
      setIsClicked(newClicked);
      setIndexOrder((prev) => {
        const updated = [...prev, index];

        if (updated.length === 9) {
          startAnimation([...updated].reverse());
        }

        return updated;
      });
    }
  };

  const startAnimation = (reversedArray) => {
    reversedArray.forEach((index, i) => {
      setTimeout(() => {
        setIsClicked((prev) => {
          const newClicked = [...prev];
          newClicked[index] = false;
          return newClicked;
        });
      }, i * 500);
    });

    setTimeout(() => {
      setIndexOrder([]);
    }, reversedArray.length * 500);
  };

  return (
    <div className="outerContainer">
      <div className="gridContainer">
        {isClicked.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="box"
            style={{
              backgroundColor: item ? "blue" : "",
              pointersEvent: item ? "none" : "auto",
              cursor: item ? "default" : "pointer",
              transition: "background-color 0.3s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GridLight;
