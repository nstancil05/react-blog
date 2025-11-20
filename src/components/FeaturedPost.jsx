import React from "react";
import { Link } from "react-router-dom";

export default function FeaturedPost({ post }) {
  if (!post) return null;
  return (
    <section className="featured-post">
      <article className="post-card featured-card">
        <header className="post-header">
          <h1 className="post-title featured-title">
            <Link to={`/posts/${post.id}`} className="featured-link">
              {post.title}
            </Link>
          </h1>
          <div className="post-meta">
            <span>By {post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>{post.date}</time>
          </div>
        </header>

        <div className="post-content featured-content">
          <p>{post.content}</p>
          <p>
            This expanded preview gives a little more context and invites readers to click through for the full post.
          </p>
        </div>

        <div style={{ marginTop: 12 }}>
          <Link to={`/posts/${post.id}`} className="featured-cta">Read full post →</Link>
        </div>
      </article>
    </section>
  );
}