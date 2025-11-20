// src/components/PostList.jsx
import React from "react";
import PostCard from "./PostCard";

/**
 * Renders a list of posts
 * Wraps each post in a PostCard component
 */
export default function PostList({ posts = [] }) {
  if (!posts.length) return <p>No posts available.</p>;

  return (
    <section id="posts" className="post-list container">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </section>
  );
}