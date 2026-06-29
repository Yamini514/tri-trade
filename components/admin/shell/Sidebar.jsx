"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NAV_SECTIONS } from "@/lib/admin/nav";
import { useAuth } from "@/lib/admin/auth";
import { Badge } from "@/components/admin/ui/Badge";
import { cn } from "@/lib/utils";

function NavItem({ item, active }) {
  const Icon = item.icon;
  const content = (
    <>
      <Icon className="h-[18px] w-[18px] shrink-0" />
      <span className="flex-1 truncate">{item.label}</span>
      {item.soon && (
        <Badge tone="outline" className="text-[10px]">
          Soon
        </Badge>
      )}
    </>
  );

  const cls = cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    active
      ? "bg-admin-primary-soft text-admin-primary"
      : "text-admin-fg-muted hover:bg-admin-surface-2 hover:text-admin-fg",
    item.soon && "cursor-not-allowed opacity-60 hover:bg-transparent hover:text-admin-fg-muted",
  );

  if (item.soon) {
    return (
      <span className={cls} aria-disabled="true" title="Coming soon">
        {content}
      </span>
    );
  }
  return (
    <Link href={item.href} className={cls} aria-current={active ? "page" : undefined}>
      {content}
    </Link>
  );
}

export function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const { can } = useAuth();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-admin-border bg-admin-surface transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-admin-border px-5">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-admin-primary text-sm font-bold text-admin-primary-fg">
              T
            </span>
            <span className="font-semibold text-admin-fg">Trio Admin</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-admin-fg-subtle hover:bg-admin-surface-2 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="no-scrollbar flex-1 overflow-y-auto px-3 py-4">
          {NAV_SECTIONS.map((section, i) => {
            const visible = section.items.filter((item) => can(item.permission));
            if (visible.length === 0) return null;
            return (
              <div key={i} className={cn(i > 0 && "mt-6")}>
                {section.title && (
                  <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-admin-fg-subtle">
                    {section.title}
                  </p>
                )}
                <div className="space-y-1">
                  {visible.map((item) => (
                    <NavItem
                      key={item.label}
                      item={item}
                      active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-admin-border px-5 py-3">
          <p className="text-[11px] text-admin-fg-subtle">Trio Trade · Admin v1.0</p>
        </div>
      </aside>
    </>
  );
}
