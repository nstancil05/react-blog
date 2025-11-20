import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div
          className="brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <span className="logo">🌱</span>
          <h1>Noah's Awesome Blog</h1>
        </div>

        <nav className="nav">
          <Link to="/">Home</Link>

          {/* Blog hidden unless logged in */}
          {isAuthenticated && <Link to="/posts">Blog</Link>}

          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {/* Auth controls */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="nav-login-link"
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                fontWeight: 600,
                marginLeft: "16px",
                position: "relative",
              }}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="nav-login-link"
              style={{
                marginLeft: 16,
                background: "transparent",
                border: "none",
                color: "var(--muted)",
                fontWeight: 600,
                cursor: "pointer",
                position: "relative",
              }}
            >
              Logout
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              marginLeft: 8,
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              padding: "6px 10px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
}
