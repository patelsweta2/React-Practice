import React, { useState } from "react";

const Taskone = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const columns = [
    { key: "todo", title: "ToDo", moves: ["inProgress"] },
    { key: "inProgress", title: "InProgress", moves: ["todo", "complete"] },
    { key: "complete", title: "Complete", moves: ["inProgress", "todo"] },
  ];
  const handleAddTask = () => {
    if (!input.trim()) return;
    const status = "todo";
    const position = tasks.filter((t) => t.status === status).length;
    const task = {
      id: Date.now(),
      text: input.trim(),
      status,
      createdAt: Date.now(),
      position,
    };
    setTasks((prev) => [...prev, task]);
    setInput("");
  };

  const handleMove = (id, toStatus) => {
    setTasks((prev) => {
      return prev.map((t) => (t.id === id ? { ...t, status: toStatus } : t));
    });
  };

  const handleSwapPositions = (id, swap, status) => {
    setTasks((prev) => {
      const colTasks = prev
        .filter((t) => t.status === status)
        .sort((a, b) => a.position - b.position);

      const currentIdx = colTasks.findIndex((t) => t.id === id);
      const swapIdx = swap === "up" ? currentIdx - 1 : currentIdx + 1;

      if (currentIdx < 0 || swapIdx < 0 || swapIdx >= colTasks.length) {
        return prev;
      }

      const taskA = colTasks[currentIdx];
      const taskB = colTasks[swapIdx];

      return prev.map((t) => {
        if (t.id === taskA.id) {
          return { ...t, position: taskB.position };
        } else if (t.id === taskB.id) {
          return { ...t, position: taskA.position };
        } else {
          return t;
        }
      });
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Tasks</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        {columns.map((col) => {
          const colTasks = tasks
            .filter((t) => t.status === col.key)
            .sort((a, b) => a.position - b.position);
          return (
            <div
              key={col.key}
              style={{
                height: "600px",
                width: "500px",
                border: "1px solid black",
              }}
            >
              <h2 style={{ textAlign: "center" }}>{col.title}</h2>
              {colTasks.map((task, idx) => (
                <div
                  key={task.id}
                  style={{
                    margin: "8px 0",
                    padding: "8px",
                    border: "1px solid #666",
                    borderRadius: "4px",
                  }}
                >
                  <div style={{ marginBottom: "6px" }}>{task.text}</div>
                  <div
                    style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}
                  >
                    {task.position > 0 && (
                      <button
                        onClick={() =>
                          handleSwapPositions(task.id, "up", task.status)
                        }
                      >
                        ↑ Up
                      </button>
                    )}
                    {task.position < colTasks.length - 1 && (
                      <button
                        onClick={() =>
                          handleSwapPositions(task.id, "down", task.status)
                        }
                      >
                        ↓ Down
                      </button>
                    )}
                    {col.moves.map((moveTo) => (
                      <button
                        key={moveTo}
                        onClick={() => handleMove(task.id, moveTo)}
                        style={{ fontSize: 12 }}
                      >
                        {moveTo === "todo"
                          ? "To Do"
                          : moveTo === "inProgress"
                          ? "In Progress"
                          : "Complete"}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Taskone;
