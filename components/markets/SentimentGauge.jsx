import { marketSentiment } from "@/lib/mock-data";

/**
 * Semicircular sentiment gauge (0–100). Server component — pure SVG.
 */
export function SentimentGauge() {
  const { value, label, description } = marketSentiment;
  const clamped = Math.max(0, Math.min(100, value));
  // semicircle from 180deg (left) to 0deg (right)
  const angle = 180 - (clamped / 100) * 180;
  const rad = (angle * Math.PI) / 180;
  const cx = 110;
  const cy = 110;
  const r = 88;
  const nx = cx + r * Math.cos(rad);
  const ny = cy - r * Math.sin(rad);

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
      <h3 className="text-sm font-semibold text-ink">Market sentiment</h3>
      <div className="mt-2 flex justify-center">
        <svg width="220" height="132" viewBox="0 0 220 132">
          {/* track segments */}
          <path d="M 22 110 A 88 88 0 0 1 64 34" fill="none" stroke="#C9463B" strokeWidth="14" strokeLinecap="round" />
          <path d="M 70 30 A 88 88 0 0 1 150 30" fill="none" stroke="#B8962E" strokeWidth="14" />
          <path d="M 156 34 A 88 88 0 0 1 198 110" fill="none" stroke="#1A6B3C" strokeWidth="14" strokeLinecap="round" />
          {/* needle */}
          <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="7" fill="#1A1A1A" />
        </svg>
      </div>
      <div className="-mt-4 text-center">
        <div className="font-serif text-4xl text-ink">{value}</div>
        <div className="text-sm font-semibold text-primary">{label}</div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-2">{description}</p>
      <div className="mt-4 flex justify-between text-[11px] font-medium uppercase tracking-wide text-ink-3">
        <span className="text-accent">Fear</span>
        <span className="text-gold">Neutral</span>
        <span className="text-primary">Greed</span>
      </div>
    </div>
  );
}
