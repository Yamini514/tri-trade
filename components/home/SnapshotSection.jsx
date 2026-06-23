import { liveCalls } from "@/lib/mock-data";
import { Badge, statusTone } from "@/components/ui/Badge";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { WinLossChart } from "./WinLossChart";

function StatusDot({ status }) {
  const map = { HIT: "bg-primary", ACTIVE: "bg-gold", SL: "bg-accent" };
  return <span className={`inline-block h-2 w-2 rounded-full ${map[status]}`} />;
}

export function SnapshotSection() {
  return (
    <section id="snapshot" className="bg-surface-2 py-16 md:py-24">
      <div className="container-wide">
        <Reveal>
          <SectionLabel>Live Desk → Every Setup</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl text-ink md:text-5xl">
            Today&apos;s calls at a glance
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* Left: table */}
          <Reveal className="lg:col-span-3" delay={0.05}>
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-3">
                      <th className="px-5 py-3.5 font-medium">Symbol</th>
                      <th className="px-5 py-3.5 font-medium">Entry</th>
                      <th className="px-5 py-3.5 font-medium">Target</th>
                      <th className="px-5 py-3.5 font-medium">SL</th>
                      <th className="px-5 py-3.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveCalls.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-line/60 last:border-0 transition-colors hover:bg-surface-2"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <Badge tone={c.direction === "LONG" ? "long" : "short"}>
                              {c.direction}
                            </Badge>
                            <span className="font-medium text-ink">{c.symbol}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-ink-2">{c.entry}</td>
                        <td className="px-5 py-3.5 font-medium text-primary">{c.target}</td>
                        <td className="px-5 py-3.5 font-medium text-accent">{c.sl}</td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-2 text-ink-2">
                            <StatusDot status={c.status} />
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* Right: chart + mini stats */}
          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-3xl border border-line bg-white p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-ink">
                    Win / loss this week
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-ink-3">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-primary" /> Wins
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-accent" /> Losses
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <WinLossChart />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-primary p-5 text-white shadow-card">
                  <div className="font-serif text-4xl">70%+</div>
                  <div className="mt-1 text-sm text-white/80">Win Rate</div>
                </div>
                <div className="rounded-3xl bg-ink p-5 text-white shadow-card">
                  <div className="font-serif text-4xl">100%</div>
                  <div className="mt-1 text-sm text-white/80">Transparent</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
