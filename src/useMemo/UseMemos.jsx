import React, { useMemo,useState } from "react";

const UseMemo = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  console.log("otherState..")
  const expensiveCalculation = (num) => {
    console.log("calculating..");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += num;
    }
    return result;
  };

  const memoizedValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);
  return (
    <div>
      <h2>Expensive Value: {memoizedValue}</h2>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <button onClick={() => setOtherState(otherState + 1)}>
        Change other state
      </button>
    </div>
  );
};

export default UseMemo;
