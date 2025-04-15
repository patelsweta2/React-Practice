import React, { useEffect, useState } from "react";

const Assignment = () => {
  const [num, setNum] = useState("");
  const [arrayVal, setArrayVal] = useState([]);
  const handleChange = (event) => {
    setArrayVal([]);
    let value = event.target.value;
    setNum(value);
    if (!value.trim()) return;
    if (value < 1) {
      setNum(1);
    } else if (value > 30) {
      setNum(30);
    }
  };

  const handleSubmit = (val) => {
    let arr = [];
    for (let i = 0; i < Number(val); i++) {
      arr.push(i + 1);
    }
    setArrayVal(arr);
  };

  const clickHandler = (num) => {
    
    let newArray = [...arrayVal]
    if(Number(num) % 2 === 0){
        newArray[Number(num)-1] = "Even"
        console.log(newArray[Number(num)-1])
    }else {
        newArray[Number(num)-1] = "Odd"
    }
    setArrayVal(newArray);
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px", flexDirection:"column" }}>
      <div>
        <input
          type="number"
          value={num}
          onChange={handleChange}
          placeholder="type some number"
        />
        <button onClick={() => handleSubmit(num)}>Submit</button>
      </div>
      <div style={{paddingTop:"10px",textAlign:"center"}}>
        {arrayVal.map((val) => (
          <button key={val} onClick={() => clickHandler(val)} style={{cursor:"pointer", display:"block"}}>{val}</button>
        ))}
      </div>
    </div>
  );
};

export default Assignment;
