// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

/**
 * Provides app wide authentication state
 * Stores the user in localStorage so login state persists across refresh
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("authUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  /**
   * Syncs user state to localStorage
   * Writes or clears storage whenever user changes
   */
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("authUser");
      }
    } catch {
      /* storage errors ignored */
    }
  }, [user]);

  /**
   * Simple login function
   * Accepts any non empty username since there is no backend auth
   */
  const login = ({ username }) => {
    setUser({ username });
  };

  /**
   * Clears user data and resets auth state
   */
  const logout = () => {
    setUser(null);
  };

  const value = { user, isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook for accessing auth state in components
 */
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;