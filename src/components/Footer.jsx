// src/components/Footer.jsx
import React from "react";

/**
 * Simple site footer
 * Updates the year automatically and stays consistent across all pages
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Noah's Awesome Blog. All rights reserved.</p>
      </div>
    </footer>
  );
}
