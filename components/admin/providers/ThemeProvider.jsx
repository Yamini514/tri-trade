"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { STORAGE_KEYS } from "@/lib/admin/config";

const ThemeContext = createContext(null);

/**
 * Dark/light theme for the admin panel. The actual switch is the
 * `data-theme` attribute on the panel root, which our CSS variables and the
 * `dark:` Tailwind variant key off of. Defaults to the OS preference, then
 * persists the user's explicit choice.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEYS.theme);
    const initial =
      stored ||
      (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setThemeState(initial);
    setMounted(true);
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEYS.theme, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEYS.theme, next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, mounted }}>
      <div
        data-theme={theme}
        className="admin-root min-h-screen bg-admin-bg text-admin-fg"
        style={{ colorScheme: theme }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
