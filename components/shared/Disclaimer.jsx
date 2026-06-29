import { ShieldCheck, ExternalLink } from "lucide-react";
import { SEBI_DISCLAIMER, SEBI_WEBSITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Hover-aware link to the official SEBI website (opens in a new tab). */
function SebiLink({ className }) {
  return (
    <a
      href={SEBI_WEBSITE}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-[#155730] hover:decoration-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm",
        className,
      )}
    >
      Official SEBI Website
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

/**
 * SEBI compliance disclaimer.
 *
 * `variant`:
 *  - "block"  (default) — a bordered card for the footer and content pages.
 *  - "banner" — a slim full-width strip for the top of the hero.
 */
export function Disclaimer({ variant = "block", className }) {
  if (variant === "banner") {
    return (
      <div className={cn("border-b border-line bg-surface-2/70", className)}>
        <div className="container-wide py-2.5">
          <p
            role="note"
            aria-label="SEBI disclaimer"
            className="mx-auto flex max-w-4xl items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-ink-3 sm:text-xs"
          >
            <ShieldCheck
              className="mt-px hidden h-3.5 w-3.5 shrink-0 sm:block"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold text-ink-2">Disclaimer:</strong>{" "}
              {SEBI_DISCLAIMER}{" "}
              <SebiLink />
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      role="note"
      aria-label="SEBI disclaimer"
      className={cn(
        "rounded-2xl border border-line bg-surface-2/60 p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-ink">Disclaimer</h3>
          <p className="text-xs leading-relaxed text-ink-2 sm:text-sm">
            {SEBI_DISCLAIMER}
          </p>
          <p className="pt-1">
            <SebiLink />
          </p>
        </div>
      </div>
    </section>
  );
}
