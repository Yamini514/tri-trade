import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { Badge } from "@/components/ui/Badge";
import { PnlChart } from "@/components/dashboard/PnlChart";
import { dashboardStats, recentActivity } from "@/lib/mock-data";

export const metadata = {
  title: "Dashboard — HeyFund",
  description: "Your P&L, win rate, and recent trade activity at a glance.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        label="Your Dashboard"
        title="Track every call, win or loss."
        subtitle="A transparent view of your performance — cumulative P&L, win rate, and the full activity ledger."
      />

      <section className="bg-background py-12 md:py-16">
        <div className="container-wide">
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {dashboardStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ink-3">{s.label}</span>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        s.positive
                          ? "bg-primary-light text-primary"
                          : "bg-accent-light text-accent"
                      }`}
                    >
                      {s.positive ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                  <div
                    className={`mt-3 font-serif text-3xl ${
                      s.positive ? "text-ink" : "text-accent"
                    }`}
                  >
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-ink-3">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            {/* P&L chart */}
            <Reveal className="lg:col-span-3" delay={0.05}>
              <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">
                    Cumulative P&amp;L
                  </h3>
                  <Badge tone="long">+₹28,900 this month</Badge>
                </div>
                <div className="mt-4">
                  <PnlChart />
                </div>
              </div>
            </Reveal>

            {/* Recent activity */}
            <Reveal className="lg:col-span-2" delay={0.1}>
              <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-card">
                <h3 className="text-lg font-semibold text-ink">Recent activity</h3>
                <ul className="mt-4 divide-y divide-line">
                  {recentActivity.map((a) => {
                    const win = a.result === "win";
                    return (
                      <li
                        key={a.id}
                        className="flex items-center justify-between gap-3 py-3.5"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-full ${
                              win
                                ? "bg-primary-light text-primary"
                                : "bg-accent-light text-accent"
                            }`}
                          >
                            {win ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                          </span>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium text-ink">
                              {a.symbol}
                            </div>
                            <div className="text-xs text-ink-3">
                              {a.direction} · {a.time}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            win ? "text-primary" : "text-accent"
                          }`}
                        >
                          {win ? "+" : ""}
                          ₹{Math.abs(a.pnl).toLocaleString("en-IN")}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
