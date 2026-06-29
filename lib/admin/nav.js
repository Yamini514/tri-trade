import {
  LayoutDashboard,
  CheckSquare,
  Users,
  CandlestickChart,
  HelpCircle,
  Image,
  Bell,
  Settings,
  ShieldCheck,
} from "lucide-react";

/**
 * Sidebar navigation. Each item declares the permission needed to see it; the
 * shell filters this list against the signed-in user's permissions. Items whose
 * feature isn't built yet are marked `soon` so they render disabled — this keeps
 * the full product map visible while we ship feature-by-feature.
 */
export const NAV_SECTIONS = [
  {
    title: null,
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
        permission: "dashboard.read",
      },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Tasks", href: "/admin/tasks", icon: CheckSquare, permission: "tasks.read", soon: true },
      { label: "Users", href: "/admin/users", icon: Users, permission: "users.read", soon: true },
      { label: "Trading", href: "/admin/trading", icon: CandlestickChart, permission: "trading.read", soon: true },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "FAQ", href: "/admin/faq", icon: HelpCircle, permission: "faq.read", soon: true },
      { label: "Banners", href: "/admin/banners", icon: Image, permission: "banners.read", soon: true },
      { label: "Notifications", href: "/admin/notifications", icon: Bell, permission: "notifications.read", soon: true },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "Roles & Permissions", href: "/admin/roles", icon: ShieldCheck, permission: "roles.read", soon: true },
      { label: "Settings", href: "/admin/settings", icon: Settings, permission: "settings.read", soon: true },
    ],
  },
];
