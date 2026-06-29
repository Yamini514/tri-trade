/**
 * Admin panel runtime config. All values are public (client-side) by design —
 * the only secret is the JWT the user obtains at login, which lives in the
 * browser and is sent as a Bearer token to the Ruby/Roda backend.
 */

/** Base URL of the Roda API. Override per environment via env var. */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9292"
).replace(/\/$/, "");

/** localStorage keys (namespaced to avoid clashes with the marketing app). */
export const STORAGE_KEYS = {
  token: "tt_admin_token",
  user: "tt_admin_user",
  theme: "tt_admin_theme",
  deviceId: "tt_admin_did",
};

/**
 * Optional demo mode. When the backend isn't reachable and this flag is on, the
 * dashboard falls back to clearly-labelled sample data so the UI stays
 * reviewable. OFF by default — production shows real data or an error state.
 */
export const DEMO_MODE = process.env.NEXT_PUBLIC_ADMIN_DEMO === "true";
