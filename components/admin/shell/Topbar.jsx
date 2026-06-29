"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, Sun, Moon, Search, LogOut, ChevronDown, Command } from "lucide-react";
import { useAuth } from "@/lib/admin/auth";
import { useTheme } from "@/components/admin/providers/ThemeProvider";
import { ROLE_LABELS } from "@/lib/admin/permissions";
import { cn } from "@/lib/utils";

function initials(name = "") {
  return (
    name
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

export function Topbar({ onMenuClick, onSearchClick }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-admin-border bg-admin-surface/80 px-4 backdrop-blur lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-2 text-admin-fg-muted hover:bg-admin-surface-2 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Global search trigger (⌘K) */}
      <button
        type="button"
        onClick={onSearchClick}
        className="flex flex-1 items-center gap-2 rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-fg-subtle transition-colors hover:border-admin-fg-subtle/40 sm:max-w-xs"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-admin-border px-1.5 py-0.5 text-[10px] font-medium sm:inline-flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      <div className="flex flex-1 items-center justify-end gap-1.5">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2 text-admin-fg-muted transition-colors hover:bg-admin-surface-2 hover:text-admin-fg"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </button>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg p-1.5 pr-2 transition-colors hover:bg-admin-surface-2"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-primary text-xs font-semibold text-admin-primary-fg">
              {initials(user?.full_name)}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight text-admin-fg">
                {user?.full_name || "Account"}
              </span>
              <span className="block text-xs leading-tight text-admin-fg-subtle">
                {ROLE_LABELS[user?.role_key] || user?.role_name || ""}
              </span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-admin-fg-subtle sm:block" />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-admin-border bg-admin-elevated py-1 admin-shadow"
            >
              <div className="border-b border-admin-border px-4 py-3">
                <p className="truncate text-sm font-medium text-admin-fg">
                  {user?.full_name}
                </p>
                <p className="truncate text-xs text-admin-fg-subtle">{user?.email}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2.5 text-sm text-admin-fg-muted",
                  "hover:bg-admin-surface-2 hover:text-admin-danger",
                )}
                role="menuitem"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
