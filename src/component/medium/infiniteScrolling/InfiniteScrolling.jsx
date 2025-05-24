import React, { useEffect, useRef, useState } from "react";

const InfiniteScrolling = () => {
  const scrollRef = useRef();
  const [data, setData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12;
  const [page, setPage] = useState(1);

  // Generate fake data once
  useEffect(() => {
    const users = [];
    for (let i = 1; i <= 200; i++) {
      users.push({
        id: i,
        name: `User ${i}`,
        email: `users${i}@example.com`,
        age: Math.floor(Math.random() * 30) + 18,
      });
    }
    setData(users);
    setVisibleData(users.slice(0, itemsPerPage));
  }, []);

  // Handle scroll event
  const handleScroll = () => {
    const element = scrollRef.current;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 10) {
      loadMore();
    }
  };

  // Load next batch
  const loadMore = () => {
    if (!hasMore) return;

    const nextPage = page + 1;
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    const moreItems = data.slice(start, end);

    if (moreItems.length === 0) {
      setHasMore(false);
    } else {
      setVisibleData((prev) => [...prev, ...moreItems]);
      setPage(nextPage);
    }
  };

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          width: "250px",
          margin: "15px auto",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        {visibleData.map((user) => (
          <div
            key={user.id}
            style={{
              padding: "8px",
              borderBottom: "1px solid #eee",
            }}
          >
            <strong>{user.name}</strong>
            <div>{user.email}</div>
            <div>Age: {user.age}</div>
          </div>
        ))}
        {!hasMore && <p style={{ textAlign: "center" }}>No more users</p>}
      </div>
    </div>
  );
};

export default InfiniteScrolling;
