import { AppShell } from "@/components/admin/shell/AppShell";

/**
 * Authenticated area. The AppShell enforces the auth guard and renders the
 * sidebar/topbar around every page in this group. Login lives outside this
 * group so it has no shell.
 */
export default function PanelLayout({ children }) {
  return <AppShell>{children}</AppShell>;
}
