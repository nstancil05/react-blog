import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [, setPosts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Failed to load posts");
        const data = await res.json();

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

  return (
    <main className="main container">
      {/* glowing landing section */}
      <section
        className="featured-card"
        style={{
          padding: "2rem 1.2rem",
          marginBottom: "28px",
        }}
      >
        <h2 style={{ marginBottom: 8 }}>Welcome to Noah's Awesome Blog</h2>
        <p style={{ marginBottom: 16, maxWidth: 640 }}>
          A simple demo blog built with React, routing, themes, and now
          authentication. Log in to explore posts, read details, and leave your
          own comments on each article.
        </p>

        {!isAuthenticated && (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/login" className="glow-btn">
              Login to get started
            </Link>

            <Link to="/posts" className="glow-btn">
              Explore blog posts →
            </Link>
          </div>
        )}


      </section>

      {loading && (
        <section>
          <p>Loading highlights…</p>
        </section>
      )}

      {error && !loading && (
        <section>
          <p>Error loading posts: {error}</p>
        </section>
      )}

      {!loading && !error && (
        <>
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
              <h2 className="posts-heading">Highlights</h2>

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
        </>
      )}
    </main>
  );
}