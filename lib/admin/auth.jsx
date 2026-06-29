"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authApi, ApiError } from "@/lib/admin/api";
import { STORAGE_KEYS } from "@/lib/admin/config";
import { hasPermission } from "@/lib/admin/permissions";

const AuthContext = createContext(null);

/**
 * Holds the signed-in admin user + token. On mount it rehydrates from
 * localStorage and re-validates the token against /me/info, so a tampered or
 * expired token logs the user out cleanly.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | authed | anon

  const persist = useCallback((nextToken, nextUser) => {
    if (nextToken) {
      window.localStorage.setItem(STORAGE_KEYS.token, nextToken);
      window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser ?? null));
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.token);
      window.localStorage.removeItem(STORAGE_KEYS.user);
    }
  }, []);

  const logout = useCallback(() => {
    persist(null);
    setToken(null);
    setUser(null);
    setStatus("anon");
  }, [persist]);

  // Rehydrate + verify on first mount.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEYS.token);
    if (!stored) {
      setStatus("anon");
      return;
    }
    setToken(stored);
    // Optimistically show cached user, then confirm with the server.
    const cached = window.localStorage.getItem(STORAGE_KEYS.user);
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch {
        /* ignore corrupt cache */
      }
    }
    authApi
      .me()
      .then((me) => {
        setUser(me);
        persist(stored, me);
        setStatus("authed");
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          logout();
        } else {
          // Network/other error: keep cached session so the panel stays usable
          // offline; individual requests will surface their own errors.
          setStatus(cached ? "authed" : "anon");
        }
      });
  }, [persist, logout]);

  const login = useCallback(
    async (email, password) => {
      const res = await authApi.login(email, password);
      const nextToken = res?.token;
      const nextUser = res?.info;
      if (!nextToken) throw new ApiError("Login did not return a token.");
      setToken(nextToken);
      setUser(nextUser);
      persist(nextToken, nextUser);
      setStatus("authed");
      return nextUser;
    },
    [persist],
  );

  const can = useCallback(
    (permission) => hasPermission(user?.permissions, permission),
    [user],
  );

  const value = {
    user,
    token,
    status,
    isAuthenticated: status === "authed",
    isLoading: status === "loading",
    login,
    logout,
    can,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
