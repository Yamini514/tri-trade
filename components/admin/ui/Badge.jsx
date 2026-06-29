import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-admin-surface-2 text-admin-fg-muted",
  primary: "bg-admin-primary-soft text-admin-primary",
  success: "bg-admin-success-soft text-admin-success",
  warning: "bg-admin-warning-soft text-admin-warning",
  danger: "bg-admin-danger-soft text-admin-danger",
  info: "bg-admin-info-soft text-admin-info",
  outline: "border border-admin-border text-admin-fg-muted",
};

/** Small status pill. */
export function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        tones[tone] ?? tones.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Coloured status dot + label, used by system-status widgets. */
export function StatusDot({ tone = "neutral", children }) {
  const dot = {
    success: "bg-admin-success",
    warning: "bg-admin-warning",
    danger: "bg-admin-danger",
    info: "bg-admin-info",
    neutral: "bg-admin-fg-subtle",
  }[tone];
  return (
    <span className="inline-flex items-center gap-2 text-sm text-admin-fg">
      <span className={cn("h-2 w-2 rounded-full", dot)} />
      {children}
    </span>
  );
}
