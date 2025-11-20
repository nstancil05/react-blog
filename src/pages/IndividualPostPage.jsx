import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import { useAuth } from "../context/AuthContext";

/**
 * Displays a single post along with author info and comments
 * Loads post data, user data, and comment data from the placeholder API
 */
export default function IndividualPostPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   /**
   * Loads post, author, and comments for the given id
   */
  useEffect(() => {
    async function fetchPostData() {
      try {
        const postRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (!postRes.ok) throw new Error("Post not found");
        const postData = await postRes.json();
        setPost(postData);

        const userRes = await fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`
        );
        const userData = await userRes.json();
        setUser(userData);

        const commentsRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPostData();
  }, [id]);

  if (loading)
    return (
      <main className="main">
        <p>Loading post...</p>
      </main>
    );
  if (error)
    return (
      <main className="main">
        <p>Error: {error}</p>
      </main>
    );
  if (!post)
    return (
      <main className="main">
        <p>Post not found.</p>
      </main>
    );

    /**
   * Adds a locally created comment to the comment list
   */
  const handleAddComment = (newComment) => {
    setComments((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...newComment },
    ]);
  };

  return (
    <main className="main container">
      <article className="post-card" style={{ marginTop: 18 }}>
        <header className="post-header">
          <h2 className="post-title">{post.title}</h2>
          <div className="post-meta">
            {user && (
              <>
                <span>By {user.name}</span>
                <span>•</span>
                <span>{user.email}</span>
              </>
            )}
          </div>
        </header>

        <div className="post-content">
          <p>{post.body}</p>
        </div>

        <section style={{ marginTop: 14 }}>
          <h3 style={{ marginBottom: 8 }}>Comments</h3>
          {comments.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <ul className="comment-list">
              {comments.map((c) => (
                <li key={c.id} className="comment-item">
                  <strong>{c.name ? `${c.name} — ` : ""}</strong>
                  {c.body || c.text}
                </li>
              ))}
            </ul>
          )}

          {isAuthenticated ? (
            <CommentForm onSubmit={handleAddComment} />
          ) : (
            <p style={{ marginTop: 10, color: "var(--muted)" }}>
              You must be logged in to leave a comment.{" "}
              <Link to="/login">Log in here.</Link>
            </p>
          )}

          <p style={{ marginTop: 12 }}>
            <Link to="/posts">← Back to all posts</Link>
          </p>
        </section>
      </article>
    </main>
  );
}