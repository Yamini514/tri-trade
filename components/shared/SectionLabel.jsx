import { cn } from "@/lib/utils";

/** Small uppercase tracking label that sits above a section title. */
export function SectionLabel({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary",
        className,
      )}
    >
      <span className="h-px w-6 bg-primary/40" />
      {children}
    </span>
  );
}
