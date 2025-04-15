import React, { useState } from "react";

const ApiEffect = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedText, setEditedText] = useState("");

  let itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  const indexOflastItem = itemsPerPage * currentPage;
  const indexOfFirstItem = indexOflastItem - itemsPerPage;
  const paginatedTodos = filteredTodos.slice(indexOfFirstItem, indexOflastItem);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      setTodos(data);
      setFilteredTodos(data);
      setIsFetched(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTodos(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchText("");
    setFilteredTodos(todos);
    setCurrentPage(1);
  };

  const handleEdit = (todo) => {
    setEditTodoId(todo.id);
    setEditedText(todo.title);
  };

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSubmit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editedText } : todo
    );
    setTodos(updatedTodos);

    const updatedFiltered = filteredTodos.map((todo) =>
      todo.id === id ? { ...todo, title: editedText } : todo
    );
    setFilteredTodos(updatedFiltered);

    setEditTodoId(null);
    setEditedText("");
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    const updatedFiltered = filteredTodos.filter((todo) => todo.id !== id);
    setFilteredTodos(updatedFiltered);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <h1>Todos App</h1>
        {!isFetched && (
          <button onClick={fetchTodos} style={{ padding: "2px",cursor:"pointer" }}>
            Load Todos
          </button>
        )}
      </div>
      {loading && <p>Loading todos...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {isFetched && !loading && (
        <div style={{ margin: "1rem 0", position: "relative" }}>
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search todos..."
            style={{ padding: "8px", width: "100%" }}
          />
          {searchText && (
            <button
              onClick={handleClear}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "0 8px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          )}
        </div>
      )}

      {/* todos list  */}
      {filteredTodos.length > 0 && (
        <>
          <div>
            {paginatedTodos.map((todo) => (
              <div
                key={todo.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  {editTodoId === todo.id ? (
                    <input
                      value={editedText}
                      onChange={handleEditChange}
                      style={{ padding: "4px", flexGrow: 1 }}
                    />
                  ) : (
                    <span>{todo.title}</span>
                  )}
                  <span style={{ color: "violet" }}>
                    {todo.completed ? "Todo completed" : "Not Completed"}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {editTodoId === todo.id ? (
                    <button onClick={() => handleSubmit(todo.id)}>
                      Submit
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
      {isFetched && !loading && filteredTodos.length === 0 && (
        <p>No todos match your search</p>
      )}
    </div>
  );
};

export default ApiEffect;
