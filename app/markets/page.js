import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { TradingViewChart } from "@/components/markets/TradingViewChart";
import { SentimentGauge } from "@/components/markets/SentimentGauge";
import { sectorHeat, openInterest } from "@/lib/mock-data";

export const metadata = {
  title: "Markets — HeyFund",
  description: "Live charts, market sentiment, sector heatmap, and option-chain open interest.",
};

function heatStyle(change) {
  // map -2.5..+2.5 to colour intensity
  const intensity = Math.min(Math.abs(change) / 2.5, 1);
  const alpha = 0.12 + intensity * 0.55;
  const color = change >= 0 ? `rgba(26,107,60,${alpha})` : `rgba(201,70,59,${alpha})`;
  return { backgroundColor: color };
}

function SectorHeatmap() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {sectorHeat.map((s) => {
        const up = s.changePercent >= 0;
        return (
          <div
            key={s.sector}
            style={heatStyle(s.changePercent)}
            className="rounded-2xl border border-line p-4"
          >
            <div className="text-sm font-semibold text-ink">{s.sector}</div>
            <div
              className={`mt-1 text-sm font-medium ${
                up ? "text-primary" : "text-accent"
              }`}
            >
              {up ? "+" : ""}
              {s.changePercent.toFixed(2)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OITable() {
  const maxOI = Math.max(
    ...openInterest.flatMap((r) => [r.callOI, r.putOI]),
  );
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-3">
              <th className="px-5 py-3.5 text-left font-medium">Call OI (L)</th>
              <th className="px-5 py-3.5 text-right font-medium">Call Chg%</th>
              <th className="px-5 py-3.5 text-center font-medium">Strike</th>
              <th className="px-5 py-3.5 text-left font-medium">Put Chg%</th>
              <th className="px-5 py-3.5 text-right font-medium">Put OI (L)</th>
            </tr>
          </thead>
          <tbody>
            {openInterest.map((r) => (
              <tr key={r.strike} className="border-b border-line/60 last:border-0">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full max-w-[80px] overflow-hidden rounded-full bg-accent-light">
                      <div
                        className="h-full rounded-full bg-accent/70"
                        style={{ width: `${(r.callOI / maxOI) * 100}%` }}
                      />
                    </div>
                    <span className="text-ink-2">{r.callOI}</span>
                  </div>
                </td>
                <td className={`px-5 py-3 text-right font-medium ${r.callChange >= 0 ? "text-primary" : "text-accent"}`}>
                  {r.callChange >= 0 ? "+" : ""}{r.callChange}%
                </td>
                <td className="px-5 py-3 text-center font-semibold text-ink">{r.strike}</td>
                <td className={`px-5 py-3 font-medium ${r.putChange >= 0 ? "text-primary" : "text-accent"}`}>
                  {r.putChange >= 0 ? "+" : ""}{r.putChange}%
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-ink-2">{r.putOI}</span>
                    <div className="h-2 w-full max-w-[80px] overflow-hidden rounded-full bg-primary-light">
                      <div
                        className="ml-auto h-full rounded-full bg-primary/70"
                        style={{ width: `${(r.putOI / maxOI) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MarketsPage() {
  return (
    <>
      <PageHeader
        label="Markets · NSE & BSE"
        title="The market, at a glance."
        subtitle="Live charts, sentiment, sector rotation, and the option chain — everything you need before placing a trade."
      />

      <section className="bg-background py-12 md:py-16">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-line bg-white p-2 shadow-card">
              <TradingViewChart symbol="NSE:NIFTY" height={500} />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SentimentGauge />
          </Reveal>
        </div>
      </section>

      <section id="heatmap" className="scroll-mt-24 bg-surface-2 py-16 md:py-20">
        <div className="container-wide">
          <Reveal>
            <SectionLabel>Sector heatmap</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
              Where the money is flowing
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-8">
            <SectorHeatmap />
          </Reveal>
        </div>
      </section>

      <section id="option-chain" className="scroll-mt-24 bg-background py-16 md:py-20">
        <div className="container-wide">
          <Reveal>
            <SectionLabel>Open interest · NIFTY weekly</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
              Option chain snapshot
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-8">
            <OITable />
          </Reveal>
        </div>
      </section>
    </>
  );
}
