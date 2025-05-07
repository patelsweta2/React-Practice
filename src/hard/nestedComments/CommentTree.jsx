import React, { useState } from "react";

const CommentTree = ({ comments, addComment, deleteComment }) => {
  const [showInput, setShowInput] = useState(-1);
  const [commentText, setCommentText] = useState("");

  const handleAdd = (id) => {
    if (commentText) {
      addComment(id, commentText);
      setShowInput(-1);
    }
    setCommentText("");
  };

  const cancelReply = () => {
    setShowInput(-1);
    setCommentText("");
  };

  return (
    <>
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s"
              alt={comment.text}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: "500" }}>{comment.text}</p>
              {showInput === comment.id && (
                <input
                  type="text"
                  value={commentText}
                  placeholder="Reply something..."
                  onChange={(e) => setCommentText(e.target.value)}
                  style={{
                    marginTop: "6px",
                    padding: "6px",
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              )}
              <div style={{ marginTop: "6px" }}>
                {showInput === comment.id ? (
                  <>
                    <button
                      onClick={cancelReply}
                      style={{
                        marginRight: "6px",
                        background: "#ccc",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAdd(comment.id)}
                      style={{
                        background: "#4caf50",
                        color: "#fff",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      Add
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowInput(comment.id)}
                      style={{
                        marginRight: "6px",
                        background: "#2196f3",
                        color: "#fff",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      style={{
                        background: "#f44336",
                        color: "#fff",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {comment.replies?.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <CommentTree
                comments={comment.replies}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default CommentTree;
