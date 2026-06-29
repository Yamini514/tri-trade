"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";
import { NAV_SECTIONS } from "@/lib/admin/nav";
import { useAuth } from "@/lib/admin/auth";
import { cn } from "@/lib/utils";

/**
 * Global command palette. Open with ⌘K / Ctrl+K (wired in AppShell) or the
 * topbar search box. Currently navigates between sections; feature search
 * (users, tasks…) plugs in here as those modules ship.
 */
export function CommandPalette({ open, onClose }) {
  const router = useRouter();
  const { can } = useAuth();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => {
    const items = [];
    NAV_SECTIONS.forEach((section) => {
      section.items.forEach((item) => {
        if (!item.soon && can(item.permission)) {
          items.push({ label: item.label, href: item.href, group: section.title || "General" });
        }
      });
    });
    return items;
  }, [can]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // focus after paint
      const t = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const go = (cmd) => {
    if (!cmd) return;
    onClose();
    router.push(cmd.href);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(filtered[active]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-black/40 p-4 pt-[12vh]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-admin-border bg-admin-elevated admin-shadow"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="flex items-center gap-3 border-b border-admin-border px-4">
          <Search className="h-4 w-4 text-admin-fg-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search pages and actions…"
            className="w-full bg-transparent py-3.5 text-sm text-admin-fg outline-none placeholder:text-admin-fg-subtle"
          />
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-admin-fg-subtle">
              No results for “{query}”.
            </p>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.href}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(cmd)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm",
                  i === active
                    ? "bg-admin-primary-soft text-admin-primary"
                    : "text-admin-fg hover:bg-admin-surface-2",
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="font-medium">{cmd.label}</span>
                  <span className="text-xs text-admin-fg-subtle">{cmd.group}</span>
                </span>
                {i === active && <CornerDownLeft className="h-3.5 w-3.5 opacity-60" />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
