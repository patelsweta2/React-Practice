import React, { useState, useEffect } from "react";

const InfiniteScroll = () => {
  const [dummyData] = useState(
    Array.from(
      { length: 1000 },
      (_, i) =>
        `Item ${i} -> This code is written in javascript. Here Html and css are also usingF`
    )
  );
  const [visibleData, setVisibleData] = useState([]);
  const [limitCount, setLimitCount] = useState(20);
  useEffect(() => {
    setVisibleData(dummyData.slice(0, limitCount));
  }, [limitCount, dummyData]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;
      if (scrollTop + windowHeight >= fullHeight - 50) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [limitCount]);
  const loadMore = () => {
    setLimitCount((prev) => prev + 20);
  };
  return (
    <div style={{ padding: "20px" }}>
      {visibleData.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "12px",
            marginBottom: "8px",
            backgroundColor: "#f3f3f3",
            borderRadius: "6px",
            boxShadow: "0 0 4px rgba(0,0,0,0.1)",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default InfiniteScroll;
