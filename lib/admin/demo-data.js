/**
 * Sample dashboard payload used ONLY when DEMO_MODE is on and the live API is
 * unreachable. It mirrors the shape returned by GET /api/dashboard/overview so
 * the UI is reviewable without a running backend. Never used in production
 * (DEMO_MODE defaults to false).
 */
export const DEMO_OVERVIEW = {
  stats: {
    total_users: 1284,
    active_users: 612,
    live_sessions: 47,
    total_trades: 0,
    orders_today: 0,
    revenue: 0,
  },
  breakdowns: {
    signups: Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      return { date: d.toISOString().slice(0, 10), count: [4, 6, 3, 8, 5, 9, 7, 11, 6, 10, 8, 12, 9, 14][i] };
    }),
    users_by_role: [
      { role: "super_admin", label: "Super Admin", count: 2 },
      { role: "admin", label: "Admin", count: 8 },
      { role: "support", label: "Support", count: 14 },
      { role: "finance", label: "Finance", count: 5 },
      { role: "viewer", label: "Viewer", count: 1255 },
    ],
  },
  system: {
    api: { status: "operational", label: "Operational" },
    database: { status: "connected", label: "Connected", latency_ms: 12.4 },
    server: { status: "online", label: "Online", env: "demo", ruby: "3.4.1" },
  },
  recent_activity: [
    { id: 1, type: "user", title: "Aarav Sharma", subtitle: "New account", at: new Date().toISOString() },
    { id: 2, type: "user", title: "Diya Patel", subtitle: "New account", at: new Date(Date.now() - 36e5).toISOString() },
    { id: 3, type: "user", title: "Kabir Nair", subtitle: "New account", at: new Date(Date.now() - 72e5).toISOString() },
  ],
  notifications: [],
  meta: { pending: ["total_trades", "orders_today", "revenue"], generated_at: new Date().toISOString() },
};
