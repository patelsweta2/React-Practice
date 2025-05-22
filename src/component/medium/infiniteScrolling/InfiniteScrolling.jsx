import React from "react";

const InfiniteScrolling = () => {
  const data = [];
  for (let i = 0; i <= 100; i++) {
    data.push({
      id: i,
      name: `User ${i}`,
      email: `users${i}@example.com`,
      age: Math.floor(Math.random() * 30) + 18,
    });
  }
  console.log("data", data);
  return <div>InfiniteScrolling</div>;
};

export default InfiniteScrolling;
