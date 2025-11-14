import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <span className="logo">🌱</span>
          <h1>Noah's Awesome Blog</h1>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/posts">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
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
              cursor: "pointer"
            }}
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
}