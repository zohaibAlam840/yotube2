// app/context/ThemeContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // expose the name `isDark` so it matches your NavBar destructuring
  const [isDark, setIsDark] = useState(false);

  // initialize from localStorage or system preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme"); // "dark" | "light" | null
    const systemDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial = saved ? saved === "dark" : systemDark;
    setIsDark(initial);
  }, []);

  // keep <html> class and localStorage in sync whenever `isDark` changes
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {
      // ignore quota errors on some browsers
      console.warn("Could not write theme to localStorage", e);
    }
  }, [isDark]);

  const toggleTheme = () => {
    // functional update avoids stale reads
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
