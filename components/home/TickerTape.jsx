import { TrendingUp, TrendingDown } from "lucide-react";
import { tickerItems } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

function Item({ symbol, price, changePercent }) {
  const up = changePercent >= 0;
  return (
    <div className="flex items-center gap-2 px-6">
      <span className="text-sm font-semibold text-white">{symbol}</span>
      <span className="text-sm text-white/70">{formatNumber(price, 2)}</span>
      <span
        className={`flex items-center gap-0.5 text-xs font-medium ${
          up ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {up ? (
          <TrendingUp className="h-3.5 w-3.5" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5" />
        )}
        {up ? "+" : ""}
        {changePercent.toFixed(2)}%
      </span>
    </div>
  );
}

export function TickerTape() {
  // duplicated track for a seamless -50% scroll loop
  const track = [...tickerItems, ...tickerItems];
  return (
    <div className="relative overflow-hidden bg-ink py-2.5">
      <div className="flex w-max animate-ticker whitespace-nowrap">
        {track.map((item, i) => (
          <Item key={`${item.symbol}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}
