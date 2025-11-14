import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Failed to load posts");
        const data = await res.json();

        // pick first post as featured, next 3 as highlights
        setFeatured(data[0]);
        setHighlights(data.slice(1, 4));
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading)
    return (
      <main className="main container">
        <p>Loading posts...</p>
      </main>
    );

  if (error)
    return (
      <main className="main container">
        <p>Error: {error}</p>
      </main>
    );

  return (
    <main className="main container">
      {/* featured post */}
      {featured && (
        <article className="featured-card" style={{ marginBottom: 28 }}>
          <h2 className="featured-title">{featured.title}</h2>
          <p className="featured-content">{featured.body}</p>
          <Link
            to={`/posts/${featured.id}`}
            className="featured-cta"
            style={{
              display: "inline-block",
              marginTop: 10,
              textDecoration: "none",
            }}
          >
            Read More →
          </Link>
        </article>
      )}

      {/* highlights */}
      <section style={{ marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 12,
          }}
        >
          <div>
            <h2 className="posts-heading">Highlights</h2>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Link
              to="/posts"
              style={{ color: "var(--accent)", fontWeight: 700 }}
            >
              View all posts →
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <PostList posts={highlights} />
        </div>
      </section>
    </main>
  );
}