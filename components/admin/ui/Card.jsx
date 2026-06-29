import { cn } from "@/lib/utils";

/** Surface container used across the admin panel. */
export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-admin-border bg-admin-surface admin-shadow",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, action }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-b border-admin-border px-5 py-4",
        className,
      )}
    >
      <div className="min-w-0">{children}</div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function CardTitle({ className, children }) {
  return (
    <h3 className={cn("text-sm font-semibold text-admin-fg", className)}>{children}</h3>
  );
}

export function CardDescription({ className, children }) {
  return (
    <p className={cn("mt-0.5 text-xs text-admin-fg-muted", className)}>{children}</p>
  );
}

export function CardBody({ className, children }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}
