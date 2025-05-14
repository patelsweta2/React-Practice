import React, { useState, useRef } from "react";

const TodoTask = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editedTaskId, setEditedTaskId] = useState(null);

  const dragItemIndex = useRef(null);
  const dragOverItemIndex = useRef(null);

  const handleAddUpdateTask = () => {
    if (!input.trim()) return;
    if (!editedTaskId) {
      setTasks(prev => [...prev, { id: Date.now(), value: input }]);
    } else {``
      setTasks(prev =>
        prev.map(task =>
          task.id === editedTaskId ? { ...task, value: input } : task
        )
      );
      setEditedTaskId(null);
    }
    setInput("");
  };

  const handleEdit = id => {
    const t = tasks.find(task => task.id === id);
    setInput(t.value);
    setEditedTaskId(id);
  };

  const handleDelete = id => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleDragStart = (e, index) => {
    dragItemIndex.current = index;
  };

  const handleDragEnter = (e, index) => {
    dragOverItemIndex.current = index;
  };

  const handleDragEnd = () => {
    const listCopy = [...tasks];
    const fromIndex = dragItemIndex.current;
    const toIndex = dragOverItemIndex.current;
    const [movedItem] = listCopy.splice(fromIndex, 1);
    listCopy.splice(toIndex, 0, movedItem);
    setTasks(listCopy);

    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
  };

  return (
    <div style={{ margin: "20px", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your task"
          style={{ width: "300px", height: "30px", padding: "5px" }}
        />
        <button onClick={handleAddUpdateTask}>
          {editedTaskId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, width: "320px" }}>
        {tasks.map((task, idx) => (
          <li
            key={task.id}
            draggable
            onDragStart={e => handleDragStart(e, idx)}
            onDragEnter={e => handleDragEnter(e, idx)}
            onDragEnd={handleDragEnd}
            onDragOver={e => e.preventDefault()}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
              marginBottom: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
              cursor: "grab",
            }}
          >
            <span>{task.value}</span>
            <div>
              <button onClick={() => handleEdit(task.id)}>Edit</button>{" "}
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoTask;
