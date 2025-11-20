// src/components/PostCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Displays a single post preview card
 * Includes a simple like system stored in local component state
 */
export default function PostCard({ post }) {
  const { id, title, body, userId } = post;
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

   /**
   * Toggles like state
   * Increments or decrements the like count based on the next state
   */
  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    setLikeCount((count) => (next ? count + 1 : Math.max(0, count - 1)));
  };

  return (
    <article className="post-card">
      <header className="post-header">
        <h2 className="post-title">
          <Link
            to={`/posts/${id}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {title}
          </Link>
        </h2>

        <div className="post-meta">
          <span>Author ID: {userId}</span>
        </div>
      </header>

      <p className="post-content">{body?.slice(0, 120)}...</p>

      <div className="post-actions">
        <button
          className={`like-btn ${liked ? "liked" : ""}`}
          onClick={toggleLike}
          aria-pressed={liked}
        >
          <span className="like-icon">{liked ? "❤️" : "🤍"}</span>
          Like <span className="like-count">({likeCount})</span>
        </button>
      </div>
    </article>
  );
}