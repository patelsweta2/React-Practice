import React, { useState } from "react";

const Form = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleDelete = (id) => {
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
  };

  const handleEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
    setInput(currentText);
  };

  const handleUpdate = () => {
    if (!editText.trim()) return;

    const updatedTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, text: editText } : todo
    );

    setTodos(updatedTodos);
    setEditId(null);
    setEditText("");
    setInput("");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
      <input
        type="text"
        value={editId ? editText : input}
        onChange={(e) =>
          editId ? setEditText(e.target.value) : handleChange(e)
        }
        style={{ padding: "8px", width: "80%" }}
      />
      <button
        onClick={editId ? handleUpdate : handleSubmit}
        style={{ padding: "8px" }}
      >
        {editId ? "Update" : "Add"}
      </button>

      <div style={{ marginTop: "1rem" }}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              border: "1px solid #ddd",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            <span>{todo.text}</span>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={() => handleEdit(todo.id, todo.text)}>
                Edit
              </button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
