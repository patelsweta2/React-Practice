import React, { useState } from "react";

const Task = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const columns = [
    { key: "todo", title: "ToDo", moves: ["inProgress"] },
    { key: "inProgress", title: "In Progress", moves: ["todo", "complete"] },
    { key: "complete", title: "Complete", moves: ["inProgress", "todo"] },
  ];

  // Add a new task at the end of the ToDo column
  const handleAddTask = () => {
    if (!input.trim()) return;
    const status = "todo";
    const position = tasks.filter(t => t.status === status).length;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      status,
      createdAt: Date.now(),
      position,
    };
    setTasks(prev => [...prev, newTask]);
    setInput("");
  };

  // Move a task between columns, append to end
  const handleMove = (taskId, toStatus) => {
    setTasks(prev => {
      const next = prev.map(t => {
        if (t.id === taskId) {
          const newPos = prev.filter(x => x.status === toStatus).length;
          return { ...t, status: toStatus, position: newPos };
        }
        return t;
      });
      return next;
    });
  };

  // Reorder within the same column: dir = 'up' | 'down'
  const handleReorder = (taskId, dir) => {
    setTasks(prev => {
      // extract tasks in same status, sorted by position
      const task = prev.find(t => t.id === taskId);
      if (!task) return prev;
      const statusTasks = prev
        .filter(t => t.status === task.status)
        .sort((a, b) => a.position - b.position);
      const idx = statusTasks.findIndex(t => t.id === taskId);
      const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= statusTasks.length) return prev;
      const other = statusTasks[swapIdx];
      // swap positions
      const updated = prev.map(t => {
        if (t.id === taskId) return { ...t, position: other.position };
        if (t.id === other.id) return { ...t, position: task.position };
        return t;
      });
      return updated;
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter new task"
          onKeyDown={e => e.key === 'Enter' && handleAddTask()}
        />
        <button onClick={handleAddTask} style={{ padding: "8px 16px" }}>
          Add Task
        </button>
      </div>
      <div style={{ padding: "30px", display: "flex", gap: "10px" }}>
        {columns.map(col => {
          const colTasks = tasks
            .filter(t => t.status === col.key)
            .sort((a, b) => a.position - b.position);
          return (
            <div
              key={col.key}
              style={{ flex: 1, minHeight: "500px", border: "2px solid #333", borderRadius: "8px", padding: "10px" }}
            >
              <h2 style={{ textAlign: "center" }}>{col.title}</h2>
              {colTasks.map((task, index) => (
                <div
                  key={task.id}
                  style={{ margin: "8px 0", padding: "8px", border: "1px solid #666", borderRadius: "4px" }}
                >
                  <div style={{ marginBottom: "6px" }}>{task.text}</div>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {/* Up/Down Buttons */}
                    {index > 0 && (
                      <button
                        onClick={() => handleReorder(task.id, 'up')}
                        style={{ padding: "4px 8px", fontSize: "12px" }}
                      >
                        Up
                      </button>
                    )}
                    {index < colTasks.length - 1 && (
                      <button
                        onClick={() => handleReorder(task.id, 'down')}
                        style={{ padding: "4px 8px", fontSize: "12px" }}
                      >
                        Down
                      </button>
                    )}
                    {/* Move Between Columns */}
                    {col.moves.map(moveTo => (
                      <button
                        key={moveTo}
                        onClick={() => handleMove(task.id, moveTo)}
                        style={{ padding: "4px 8px", fontSize: "12px" }}
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

export default Task;
