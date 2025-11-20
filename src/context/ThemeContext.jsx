// src/context/ThemeContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {}
});

/**
 * Provides site wide theme state
 * Persists the selected theme in localStorage and applies it to the document root
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });

 /**
   * Syncs theme to localStorage
   * Applies theme value to the document root for CSS targeting
   */
  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
    // apply to root so CSS can target [data-theme="light"]
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /**
   * Toggles between dark and light mode
   */
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}