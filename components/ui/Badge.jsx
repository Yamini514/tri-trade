import { cn } from "@/lib/utils";

const tones = {
  long: "bg-primary-light text-primary",
  short: "bg-accent-light text-accent",
  hit: "bg-primary text-white",
  active: "bg-gold/15 text-gold",
  sl: "bg-accent text-white",
  neutral: "bg-black/5 text-ink-2",
  gold: "bg-gold/15 text-gold",
  bullish: "bg-primary-light text-primary",
  bearish: "bg-accent-light text-accent",
  outline: "border border-line text-ink-2 bg-transparent",
};

/** Rounded pill badge. */
export function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
        tones[tone] ?? tones.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Map a call status to a badge tone. */
export function statusTone(status) {
  if (status === "HIT") return "hit";
  if (status === "SL") return "sl";
  return "active";
}
