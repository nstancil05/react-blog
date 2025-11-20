// src/components/CommentForm.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * Handles creating a new comment
 * Pulls the current users username and builds a comment object
 * Sends the comment to a placeholder API and notifies the parent through onSubmit
 */
export default function CommentForm({ onSubmit }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

   /**
   * Submits the comment
   * Prevents empty messages
   * Builds the comment data using the active user
   * Sends the request and clears input on success
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newComment = {
      name: user?.username || "Anonymous",
      body: trimmed,
      postId: Date.now(),
    };

    setSending(true);
    try {
      await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      if (onSubmit) onSubmit(newComment);
      setText("");
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form" style={{ marginTop: 10 }}>
      <input
        aria-label="Your comment"
        type="text"
        placeholder="Write a comment…"
        value={text}
        onChange={(e) => setText(e.target.value)} // track input state
        disabled={sending}
      />
      <button type="submit" disabled={sending}>
        {sending ? "Posting..." : "Submit"}
      </button>
    </form>
  );
}