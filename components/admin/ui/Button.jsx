import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-admin-bg disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants = {
  primary: "bg-admin-primary text-admin-primary-fg hover:bg-admin-primary-hover",
  secondary:
    "bg-admin-surface-2 text-admin-fg border border-admin-border hover:bg-admin-border/60",
  outline:
    "bg-transparent text-admin-fg border border-admin-border hover:bg-admin-surface-2",
  ghost: "bg-transparent text-admin-fg-muted hover:bg-admin-surface-2 hover:text-admin-fg",
  danger: "bg-admin-danger text-white hover:opacity-90",
};

const sizes = {
  sm: "text-xs px-2.5 py-1.5",
  md: "text-sm px-3.5 py-2",
  lg: "text-sm px-5 py-2.5",
  icon: "h-9 w-9",
};

/** Admin button. Renders a <Link> for in-app `href`, else a native <button>. */
export function Button({
  variant = "primary",
  size = "md",
  href,
  loading = false,
  className,
  children,
  disabled,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
