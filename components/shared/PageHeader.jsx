import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/** Standard page header used across interior pages. */
export function PageHeader({ label, title, subtitle, dark = false, children }) {
  return (
    <section
      className={cn(
        "py-16 md:py-20",
        dark ? "bg-ink text-white" : "bg-background-alt",
      )}
    >
      <div className="container-wide">
        <Reveal>
          {label &&
            (dark ? (
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                <span className="h-px w-6 bg-emerald-400/40" />
                {label}
              </span>
            ) : (
              <SectionLabel>{label}</SectionLabel>
            ))}
          <h1
            className={cn(
              "mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-6xl",
              dark ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-5 max-w-2xl text-lg leading-relaxed",
                dark ? "text-white/70" : "text-ink-2",
              )}
            >
              {subtitle}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
