"use client";

import { API_BASE_URL, STORAGE_KEYS } from "@/lib/admin/config";

/**
 * Thin client over the Roda backend. Centralizes auth headers, the
 * `{ status, data }` envelope, and error handling so feature code just calls
 * `api.get("/dashboard/overview")` and gets parsed data or a thrown ApiError.
 */

export class ApiError extends Error {
  constructor(message, { status, body } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEYS.token);
}

/** Stable per-browser device id — backend reads it from the X-DID header. */
function getDeviceId() {
  if (typeof window === "undefined") return null;
  let did = window.localStorage.getItem(STORAGE_KEYS.deviceId);
  if (!did) {
    did =
      window.crypto?.randomUUID?.() ??
      `did-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(STORAGE_KEYS.deviceId, did);
  }
  return did;
}

function buildQuery(params) {
  if (!params) return "";
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") usp.append(k, v);
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

async function request(path, { method = "GET", body, params, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const did = getDeviceId();
    if (did) headers["X-DID"] = did;
  }

  let res;
  try {
    res = await fetch(`${API_BASE_URL}/api${path}${buildQuery(params)}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch (networkErr) {
    throw new ApiError("Can't reach the server. Is the API running?", {
      status: 0,
      body: { cause: String(networkErr) },
    });
  }

  let payload = null;
  const text = await res.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }
  }

  if (res.status === 401) {
    // Token invalid/expired — surface a typed error the auth layer reacts to.
    throw new ApiError("Your session has expired. Please sign in again.", {
      status: 401,
      body: payload,
    });
  }

  if (!res.ok || payload?.status === "error") {
    const message =
      payload?.message ||
      (typeof payload?.data === "string" ? payload.data : null) ||
      `Request failed (${res.status})`;
    throw new ApiError(message, { status: res.status, body: payload });
  }

  // Most endpoints wrap the result in { status: 'success', data, ...extras }.
  // Return data plus any sibling fields (e.g. total_pages) merged in.
  if (payload && typeof payload === "object" && "data" in payload) {
    const { status, data, ...extras } = payload;
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return { ...data, ...extras };
    }
    return Object.keys(extras).length ? { data, ...extras } : data;
  }
  return payload;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  del: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

// ----- typed endpoint helpers (one place per backend route) -----------------

export const authApi = {
  login: (email, password) =>
    request("/login", {
      method: "POST",
      auth: false,
      body: { data: { email, password } },
    }),
  me: () => api.get("/me/info"),
};

export const dashboardApi = {
  overview: () => api.get("/dashboard/overview"),
};
