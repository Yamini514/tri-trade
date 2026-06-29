# Trio Trade — Admin Dashboard

Enterprise admin panel built into the existing Next.js app under `/admin`. The
public marketing site is untouched and lives in the `app/(marketing)/` route
group; the admin panel ships its own shell so the two never share chrome.

## Running

```bash
# Frontend
cd trio-trade
NEXT_PUBLIC_API_BASE_URL=http://localhost:9292 npm run dev   # http://localhost:3000/admin

# Backend (separate terminal)
cd "tri-trade backend"
bundle install
bundle exec rake db:migrate                 # creates clients + users tables
EMAIL=admin@triotrade.dev PASSWORD=admin1234 bundle exec rake db:seed_admin
bundle exec puma                            # serves the API on :9292
```

Then sign in at `/admin/login` with the seeded Super Admin.

### Env vars (frontend, all `NEXT_PUBLIC_`)

| Var | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:9292` | Roda API base |
| `NEXT_PUBLIC_ADMIN_DEMO` | `false` | If `true`, dashboard falls back to labelled demo data when the API is unreachable |

## Architecture & conventions

```
app/
  layout.js                      root: <html>/<body> + fonts only
  (marketing)/                   public site (Navbar/Footer)
  admin/
    layout.js                    Theme + Auth + Toast providers (no chrome)
    page.js                      redirects to dashboard/login
    login/page.js                /admin/login
    (panel)/
      layout.js                  AppShell: auth guard + sidebar + topbar
      dashboard/page.js          /admin/dashboard

components/admin/
  providers/   ThemeProvider, ToastProvider
  ui/          Card, Button, Badge, Skeleton   (theme-aware primitives)
  shell/       Sidebar, Topbar, CommandPalette (⌘K), AppShell
  dashboard/   StatCard, SignupsChart, RolesChart, SystemStatus

lib/admin/
  config.js        API base, storage keys, demo flag
  api.js           fetch client (Bearer + X-DID), unwraps {status,data} envelope
  auth.jsx         AuthProvider + useAuth() (rehydrate + verify token)
  permissions.js   wildcard permission matching for UI gating
  nav.js           sidebar nav + per-item permission
```

**Theming** — admin uses `--admin-*` CSS variables (in `app/globals.css`) that
flip on `[data-theme]`. Use utilities like `bg-admin-surface`, `text-admin-fg`,
`border-admin-border`; they auto-adapt to dark/light. The marketing `--color-*`
tokens are separate and unchanged.

**Auth** — JWT from the existing backend, stored in `localStorage` and sent as
`Authorization: Bearer`. The token is validated on mount via `/api/me/info`.

**Permissions** — the backend (`models/concerns/roles.rb`) is the source of
truth and returns each user's `permissions` array. The UI only *matches* it
(`useAuth().can("users.write")`, `hasPermission`). Roles: Super Admin, Admin,
Support, Finance, Viewer.

## Adding a feature (the pattern)

1. Backend: migration → model → `App::Services::X < Base` → wire in `routes.rb`
   with `do_crud(X, r, 'CRUDL')` inside the admin block.
2. Frontend: add an endpoint helper in `lib/admin/api.js`, a page under
   `app/admin/(panel)/<feature>/`, and flip the nav item's `soon: true` off in
   `lib/admin/nav.js`.
3. Reuse `Card`/`Button`/`Badge`/`Skeleton`/toast — don't re-roll primitives.

## Status

- ✅ **Feature 1 — Admin shell + Dashboard** (auth, theme, shell, ⌘K, KPI cards,
  real sign-up & role charts, system status, recent activity, notifications).
- ⏳ Remaining (nav items marked "Soon"): Tasks, Users, Trading, FAQ, Banners,
  Notifications, Roles & Permissions, Settings.
