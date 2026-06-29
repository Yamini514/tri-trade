"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/admin/auth";
import { Sidebar } from "@/components/admin/shell/Sidebar";
import { Topbar } from "@/components/admin/shell/Topbar";
import { CommandPalette } from "@/components/admin/shell/CommandPalette";

/**
 * Authenticated shell: route guard + sidebar + topbar + command palette and
 * global keyboard shortcuts. Anything rendered as `children` is a panel page.
 */
export function AppShell({ children }) {
  const { status } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Redirect unauthenticated users to login.
  useEffect(() => {
    if (status === "anon") router.replace("/admin/login");
  }, [status, router]);

  // Global shortcuts: ⌘K / Ctrl+K opens search.
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (status !== "authed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-admin-bg">
        <Loader2 className="h-6 w-6 animate-spin text-admin-fg-subtle" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-admin-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          onSearchClick={() => setPaletteOpen(true)}
        />
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
