import React, { useCallback,useState } from "react";

const TransferList = () => {
  const initialItems = ["HTML", "CSS", "JavaScript", "React", "TypeScript"];
  const [items, setItems] = useState(
    initialItems.map((name, idx) => ({
      name,
      position: "A",
      initialIndex: idx,
    }))
  );
  const [selected, setSelected] = useState([]);

  const handleSelect = useCallback((name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  });
  const moveSelected = (from, to) => {
    setItems((prev) =>
      prev.map((item) =>
        selected.includes(item.name) && item.position === from
          ? { ...item, position: to }
          : item
      )
    );
    setSelected([]);
  };
  const moveAll = (from, to) => {
    setItems((prev) =>
      prev.map((item) =>
        item.position === from ? { ...item, position: to } : item
      )
    );
    setSelected([]);
  };
  const listA = items
    .filter((item) => item.position === "A")
    .sort((a, b) => a.initialIndex - b.initialIndex);
  const listB = items
    .filter((item) => item.position === "B")
    .sort((a, b) => a.initialIndex - b.initialIndex);
  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>

      <div>
        <h3>Block A</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {listA.map((item) => (
            <li key={item.name}>
              <label>
                <input
                  type="checkbox"
                  checked={selected.includes(item.name)}
                  onChange={() => handleSelect(item.name)}
                />{" "}
                {item.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button onClick={() => moveAll("A", "B")} disabled={listA.length === 0}>
          &gt;&gt;
        </button>
        <button
          onClick={() => moveSelected("A", "B")}
          disabled={!listA.some((i) => selected.includes(i.name))}
        >
          &gt;
        </button>
        <button
          onClick={() => moveSelected("B", "A")}
          disabled={!listB.some((i) => selected.includes(i.name))}
        >
          &lt;
        </button>
        <button onClick={() => moveAll("B", "A")} disabled={listB.length === 0}>
          &lt;&lt;
        </button>
      </div>

      <div>
        <h3>Block B</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {listB.map((item) => (
            <li key={item.name}>
              <label>
                <input
                  type="checkbox"
                  checked={selected.includes(item.name)}
                  onChange={() => handleSelect(item.name)}
                />{" "}
                {item.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransferList;
