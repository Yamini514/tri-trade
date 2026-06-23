import { TrendingUp, TrendingDown } from "lucide-react";
import { indices, liveCalls } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import { Badge, statusTone } from "@/components/ui/Badge";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";

function IndexCard({ symbol, price, change, changePercent }) {
  const up = changePercent >= 0;
  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">{symbol}</span>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            up ? "bg-primary-light text-primary" : "bg-accent-light text-accent"
          }`}
        >
          {up ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </span>
      </div>
      <div className="mt-3 text-2xl font-semibold text-ink">
        {formatNumber(price, 2)}
      </div>
      <div
        className={`mt-1 text-sm font-medium ${
          up ? "text-primary" : "text-accent"
        }`}
      >
        {up ? "+" : ""}
        {formatNumber(change, 2)} ({up ? "+" : ""}
        {changePercent.toFixed(2)}%)
      </div>
    </div>
  );
}

function MiniTile({ label, value, tone }) {
  return (
    <div className="rounded-xl bg-surface-2 px-2.5 py-2">
      <div className="text-[10px] font-medium uppercase tracking-wide text-ink-3">
        {label}
      </div>
      <div className={`text-sm font-semibold ${tone}`}>{value}</div>
    </div>
  );
}

function CallCard({ call }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <Badge tone={call.direction === "LONG" ? "long" : "short"}>
          {call.direction}
        </Badge>
        <Badge tone={statusTone(call.status)}>{call.status}</Badge>
      </div>
      <div className="mt-3 text-sm font-semibold text-ink">{call.symbol}</div>
      <div className="text-xs text-ink-3">{call.segment}</div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <MiniTile label="Entry" value={call.entry} tone="text-ink" />
        <MiniTile label="Target" value={call.target} tone="text-primary" />
        <MiniTile label="SL" value={call.sl} tone="text-accent" />
      </div>
    </div>
  );
}

export function MarketSnapshot() {
  const activeCount = liveCalls.filter((c) => c.status === "ACTIVE").length;

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container-wide">
        <Reveal>
          <SectionLabel>Market Snapshot · NSE &amp; BSE</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {indices.map((idx) => (
              <IndexCard key={idx.symbol} {...idx} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-[2rem] border border-line bg-white p-6 shadow-medium md:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <h3 className="text-lg font-semibold text-ink">
                  Today&apos;s Active Calls
                </h3>
              </div>
              <Badge tone="long">{liveCalls.length} calls · {activeCount} active</Badge>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {liveCalls.slice(0, 4).map((call) => (
                <CallCard key={call.id} call={call} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
