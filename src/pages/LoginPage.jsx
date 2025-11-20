// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const from =
    (location.state && location.state.from) ||
    "/posts"; // default after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!username.trim() || !password.trim()) return;

    setSubmitting(true);
    try {
      // short "sleep" to sim authentication
      await new Promise((res) => setTimeout(res, 500));
      login({ username: username.trim() });
      navigate(from, { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  const showError = touched && (!username.trim() || !password.trim());

  return (
    <main className="main container">
      <section className="auth-card" style={{ maxWidth: 420, margin: "2rem auto" }}>
        <h2 style={{ marginBottom: 12 }}>Welcome back 👋</h2>
        <p style={{ marginBottom: 20, color: "var(--muted)" }}>
          Log in to access the blog posts and join the conversation in the
          comments.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="form-label" style={{ display: "block", marginBottom: 10 }}>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Create a username"
              disabled={submitting}
            />
          </label>

          <label className="form-label" style={{ display: "block", marginBottom: 10 }}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Enter a password"
              disabled={submitting}
            />
          </label>

          {showError && (
            <p style={{ color: "tomato", marginBottom: 10 }}>
              Please enter both a username and password.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "0.6rem 1rem",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p style={{ marginTop: 16, fontSize: 14, color: "var(--muted)" }}>
          Just browsing? You can still{" "}
          <Link to="/">explore the homepage</Link>.
        </p>
      </section>
    </main>
  );
}