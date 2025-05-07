import React, { useState } from "react";
import CommentTree from "./CommentTree";

const initialComments = [
  {
    id: 1,
    text: "Comment 1",
    replies: [{ id: 2, text: "nested Comment 1", replies: [] }],
  },
];

const NestedComments = () => {
  const [commentText, setCommentText] = useState("");
  const [commentsList, setCommentsList] = useState(initialComments);

  const addComment = (id, text) => {
    if (!text.trim()) return;

    setCommentsList((state) => {
      const newComments = structuredClone(state);
      if (id === -1) {
        newComments.unshift({ id: Date.now(), text, replies: [] });
      } else {
        addCommentsToTree(newComments, id, text);
      }
      return newComments;
    });
  };

  const deleteComment = (id) => {
    setCommentsList((state) => {
      const newComments = structuredClone(state);
      deleteCommentFromTree(newComments, id);
      return newComments;
    });
  };

  const addCommentsToTree = (tree, id, text) => {
    for (const node of tree) {
      if (node.id === id) {
        node.replies.unshift({ id: Date.now(), text, replies: [] });
        return true;
      }
      if (addCommentsToTree(node.replies, id, text)) return true;
    }
    return false;
  };

  const deleteCommentFromTree = (tree, id) => {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
        tree.splice(i, 1);
        return true;
      }
      if (deleteCommentFromTree(tree[i].replies, id)) return true;
    }
    return false;
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Comments</h1>
      <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={() => {
            addComment(-1, commentText);
            setCommentText("");
          }}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      <CommentTree
        comments={commentsList}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    </div>
  );
};

export default NestedComments;
