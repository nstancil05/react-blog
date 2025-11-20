// src/pages/BlogPostsPage.jsx
import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";

/**
 * Fetches blog posts from the placeholder API
 * Shows a trimmed list for readability and handles loading and error states
 */
export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Loads posts once on mount
   * Limits to the first 12 posts for cleaner display
   */
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();

        const limited = data.slice(0, 12);
        setPosts(limited);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <main className="main"><p>Loading posts...</p></main>;
  if (error) return <main className="main"><p>Error: {error}</p></main>;

  return (
    <main className="main">
      <h2 className="posts-heading">All Posts</h2>
      <PostList posts={posts} />
    </main>
  );
}