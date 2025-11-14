// src/components/CommentBox.jsx
import React, { useState } from "react";

export default function CommentBox({ initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setComments((prev) => [
      ...prev,
      { id: (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()), text: trimmed }
    ]);
    setText("");
  };

  return (
    <div className="comment-box">
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          aria-label="Add a comment"
          type="text"
          placeholder="Write a comment…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c.id} className="comment-item">• {c.text}</li>
        ))}
      </ul>
    </div>
  );
}
