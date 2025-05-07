import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const initialComments = [
  { id: uuid(), text: "This is first comment", replies: [] },
];

const CommentList = ({ comments, onReply }) => {
  return (
    <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
      {comments.map((comment) => (
        <li key={comment.id} style={{ marginBottom: "10px" }}>
          <Comment comment={comment} onReply={onReply} />
        </li>
      ))}
    </ul>
  );
};

const Comment = ({ comment, onReply }) => {
  return <div></div>;
};

const InfiniteComment = () => {
  return <div>InfiniteComment</div>;
};

export default InfiniteComment;
