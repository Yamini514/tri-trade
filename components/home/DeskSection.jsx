import { Check, ArrowRight } from "lucide-react";
import { tradeSetups } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";

const differentiators = [
  "Every call ships with an entry, target & stop-loss",
  "Both wins and losses logged — full transparency",
  "Pre-market briefs before the bell, every day",
  "Risk-first sizing guidance on each setup",
];

function confidenceTone(c) {
  if (c === "High") return "long";
  if (c === "Medium") return "gold";
  return "neutral";
}

function SetupCard({ setup }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-card transition-transform duration-200 hover:-translate-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="outline">{setup.type}</Badge>
        <Badge tone={setup.direction === "LONG" ? "long" : "short"}>
          {setup.direction}
        </Badge>
        <Badge tone={confidenceTone(setup.confidence)}>
          {setup.confidence}
        </Badge>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{setup.symbol}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-2">{setup.note}</p>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[
          { label: "Entry", value: setup.entry, tone: "text-ink" },
          { label: "Target", value: setup.target, tone: "text-primary" },
          { label: "SL", value: setup.sl, tone: "text-accent" },
          { label: "R:R", value: setup.rr.replace(" ", ""), tone: "text-ink" },
        ].map((t) => (
          <div key={t.label} className="rounded-xl bg-surface-2 px-2 py-2 text-center">
            <div className="text-[10px] font-medium uppercase tracking-wide text-ink-3">
              {t.label}
            </div>
            <div className={`text-sm font-semibold ${t.tone}`}>{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DeskSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-wide">
        <Reveal>
          <SectionLabel>Every Setup</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl text-ink md:text-5xl">
            Every session. One disciplined desk.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Left: setup cards */}
          <div className="flex flex-col gap-4">
            {tradeSetups.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <SetupCard setup={s} />
              </Reveal>
            ))}
          </div>

          {/* Right: sticky panel */}
          <Reveal delay={0.05}>
            <div className="lg:sticky lg:top-24 flex flex-col gap-4">
              <div className="rounded-3xl border border-line bg-white p-7 shadow-card">
                <h3 className="font-serif text-2xl text-ink">
                  What makes us different
                </h3>
                <ul className="mt-5 space-y-4">
                  {differentiators.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm leading-relaxed text-ink-2">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-ink p-7 text-white shadow-medium">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Latest Live Call
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">RELIANCE · LONG</div>
                    <div className="text-sm text-white/60">
                      Entry 2942 · Target 2985 · SL 2918
                    </div>
                  </div>
                </div>
                <Button
                  href="/pricing"
                  variant="primary"
                  size="md"
                  className="mt-5 w-full"
                >
                  Get this call live <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
