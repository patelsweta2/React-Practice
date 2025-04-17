import React, { useState } from "react";

const GuessNum = () => {
  const [guessNum, setGuessNum] = useState("");
  const [guessNumArr, setGuessNumArr] = useState([]);
  const [randomNum] = useState(Math.floor(Math.random() * 101));
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const val = e.target.value;
    setGuessNum(val);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const val = parseInt(guessNum);
    if (isNaN(val)) {
      setMessage("Please Enter a valid number");
      return;
    }
    const numArr = [...guessNumArr, val];
    setGuessNumArr(numArr);
    if (val < randomNum) {
      setMessage("too low, try again");
    } else if (val === randomNum) {
      setMessage("yayy, that's correct, you passed");
    } else {
      setMessage("too high, please try again");
    }
    setGuessNum([]);
  };

  const resetGame = () => {
    setGuessNum("");
    setGuessNumArr([]);
    setMessage("");
    window.location.reload();
  };

  return (
    <div className="gameContainer">
      <div>
        <p>Enter a guess between 0 to 100</p>
        <input type="text" value={guessNum} onChange={handleChange} />
      </div>
      <p>{message}</p>
      <div>
        <button onClick={submitHandler}>Submit</button>
        <button onClick={resetGame}>Start Game</button>
      </div>
      <p>Previous Guess: {guessNumArr.join(", ")}</p>
    </div>
  );
};

export default GuessNum;
