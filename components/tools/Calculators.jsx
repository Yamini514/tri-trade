"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Calculator, Scissors, Receipt, Layers, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- small shared field ---------- */

function Field({ label, value, onChange, suffix, type = "number", step }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-3">
        {label}
      </span>
      <div className="mt-1.5 flex items-center rounded-xl border border-line bg-white px-3 focus-within:border-primary/50">
        <input
          type={type}
          value={value}
          step={step}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-2.5 text-sm text-ink outline-none"
        />
        {suffix && <span className="text-xs text-ink-3">{suffix}</span>}
      </div>
    </label>
  );
}

function Stat({ label, value, tone = "text-ink" }) {
  return (
    <div className="rounded-xl bg-surface-2 px-4 py-3">
      <div className="text-xs text-ink-3">{label}</div>
      <div className={cn("mt-0.5 text-lg font-semibold", tone)}>{value}</div>
    </div>
  );
}

const inr = (n) =>
  `₹${Number.isFinite(n) ? Math.round(n).toLocaleString("en-IN") : "—"}`;

/* ---------- 1. Position size ---------- */

function PositionSize() {
  const [capital, setCapital] = useState("100000");
  const [risk, setRisk] = useState("1");
  const [entry, setEntry] = useState("2942");
  const [stop, setStop] = useState("2918");

  const r = useMemo(() => {
    const cap = parseFloat(capital) || 0;
    const riskPct = parseFloat(risk) || 0;
    const e = parseFloat(entry) || 0;
    const s = parseFloat(stop) || 0;
    const riskAmount = (cap * riskPct) / 100;
    const perShare = Math.abs(e - s);
    const qty = perShare > 0 ? Math.floor(riskAmount / perShare) : 0;
    return { riskAmount, perShare, qty, value: qty * e };
  }, [capital, risk, entry, stop]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
        <Field label="Account capital" value={capital} onChange={setCapital} suffix="₹" />
        <Field label="Risk per trade" value={risk} onChange={setRisk} suffix="%" step="0.1" />
        <Field label="Entry price" value={entry} onChange={setEntry} suffix="₹" />
        <Field label="Stop-loss price" value={stop} onChange={setStop} suffix="₹" />
      </div>
      <div className="grid content-start gap-3">
        <Stat label="Risk amount" value={inr(r.riskAmount)} tone="text-accent" />
        <Stat label="Risk per share" value={inr(r.perShare)} />
        <Stat label="Position size" value={`${r.qty.toLocaleString("en-IN")} shares`} tone="text-primary" />
        <Stat label="Capital deployed" value={inr(r.value)} />
      </div>
    </div>
  );
}

/* ---------- 2. Stop loss / target ---------- */

function StopLoss() {
  const [entry, setEntry] = useState("2942");
  const [stopPct, setStopPct] = useState("1.5");
  const [rr, setRr] = useState("2");
  const [dir, setDir] = useState("LONG");

  const r = useMemo(() => {
    const e = parseFloat(entry) || 0;
    const sp = parseFloat(stopPct) || 0;
    const ratio = parseFloat(rr) || 0;
    const move = (e * sp) / 100;
    const stop = dir === "LONG" ? e - move : e + move;
    const target = dir === "LONG" ? e + move * ratio : e - move * ratio;
    return { stop, target, move };
  }, [entry, stopPct, rr, dir]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-ink-3">
            Direction
          </span>
          <div className="mt-1.5 flex gap-2">
            {["LONG", "SHORT"].map((d) => (
              <button
                key={d}
                onClick={() => setDir(d)}
                className={cn(
                  "flex-1 rounded-xl border py-2.5 text-sm font-medium transition-colors",
                  dir === d
                    ? d === "LONG"
                      ? "border-primary bg-primary-light text-primary"
                      : "border-accent bg-accent-light text-accent"
                    : "border-line bg-white text-ink-2",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <Field label="Entry price" value={entry} onChange={setEntry} suffix="₹" />
        <Field label="Stop distance" value={stopPct} onChange={setStopPct} suffix="%" step="0.1" />
        <Field label="Risk : reward" value={rr} onChange={setRr} suffix=": 1 risk" step="0.5" />
      </div>
      <div className="grid content-start gap-3">
        <Stat label="Stop-loss price" value={inr(r.stop)} tone="text-accent" />
        <Stat label="Target price" value={inr(r.target)} tone="text-primary" />
        <Stat label="Risk per share" value={inr(r.move)} />
        <Stat label="Reward per share" value={inr(r.move * (parseFloat(rr) || 0))} />
      </div>
    </div>
  );
}

/* ---------- 3. Brokerage (intraday equity, simplified) ---------- */

function Brokerage() {
  const [buy, setBuy] = useState("2942");
  const [sell, setSell] = useState("2985");
  const [qty, setQty] = useState("100");

  const r = useMemo(() => {
    const b = parseFloat(buy) || 0;
    const s = parseFloat(sell) || 0;
    const q = parseFloat(qty) || 0;
    const buyVal = b * q;
    const sellVal = s * q;
    const turnover = buyVal + sellVal;
    const brokerage =
      Math.min(20, buyVal * 0.0003) + Math.min(20, sellVal * 0.0003);
    const stt = sellVal * 0.00025; // intraday equity, sell side
    const exch = turnover * 0.0000345;
    const sebi = turnover * 0.000001;
    const stamp = buyVal * 0.00003;
    const gst = (brokerage + exch + sebi) * 0.18;
    const charges = brokerage + stt + exch + sebi + stamp + gst;
    const gross = sellVal - buyVal;
    const net = gross - charges;
    return { gross, charges, net, brokerage };
  }, [buy, sell, qty]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
        <Field label="Buy price" value={buy} onChange={setBuy} suffix="₹" />
        <Field label="Sell price" value={sell} onChange={setSell} suffix="₹" />
        <Field label="Quantity" value={qty} onChange={setQty} suffix="shares" />
        <p className="text-xs leading-relaxed text-ink-3">
          Estimated intraday equity charges (brokerage capped at ₹20/leg, plus
          STT, exchange, SEBI, stamp duty &amp; GST). Indicative only.
        </p>
      </div>
      <div className="grid content-start gap-3">
        <Stat label="Gross P&L" value={inr(r.gross)} tone={r.gross >= 0 ? "text-primary" : "text-accent"} />
        <Stat label="Total charges" value={inr(r.charges)} tone="text-accent" />
        <Stat label="Net P&L" value={inr(r.net)} tone={r.net >= 0 ? "text-primary" : "text-accent"} />
        <Stat label="Brokerage" value={inr(r.brokerage)} />
      </div>
    </div>
  );
}

/* ---------- 4. Margin ---------- */

function Margin() {
  const [price, setPrice] = useState("52000");
  const [qty, setQty] = useState("15");
  const [leverage, setLeverage] = useState("5");

  const r = useMemo(() => {
    const p = parseFloat(price) || 0;
    const q = parseFloat(qty) || 0;
    const lev = parseFloat(leverage) || 1;
    const value = p * q;
    const margin = value / lev;
    return { value, margin, exposure: lev };
  }, [price, qty, leverage]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
        <Field label="Price" value={price} onChange={setPrice} suffix="₹" />
        <Field label="Quantity / lot size" value={qty} onChange={setQty} />
        <Field label="Leverage" value={leverage} onChange={setLeverage} suffix="×" step="0.5" />
      </div>
      <div className="grid content-start gap-3">
        <Stat label="Contract value" value={inr(r.value)} />
        <Stat label="Margin required" value={inr(r.margin)} tone="text-primary" />
        <Stat label="Leverage" value={`${r.exposure}×`} />
      </div>
    </div>
  );
}

/* ---------- 5. Options payoff ---------- */

function OptionsPayoff() {
  const [type, setType] = useState("CE");
  const [strike, setStrike] = useState("24200");
  const [premium, setPremium] = useState("96");
  const [lots, setLots] = useState("1");
  const lotSize = 75;

  const { data, breakeven, maxLoss } = useMemo(() => {
    const k = parseFloat(strike) || 0;
    const prem = parseFloat(premium) || 0;
    const qty = (parseFloat(lots) || 0) * lotSize;
    const span = k * 0.08;
    const points = [];
    for (let i = 0; i <= 40; i++) {
      const spot = k - span + (2 * span * i) / 40;
      let intrinsic = type === "CE" ? Math.max(spot - k, 0) : Math.max(k - spot, 0);
      const pnl = (intrinsic - prem) * qty;
      points.push({ spot: Math.round(spot), pnl: Math.round(pnl) });
    }
    const be = type === "CE" ? k + prem : k - prem;
    return { data: points, breakeven: be, maxLoss: prem * qty };
  }, [type, strike, premium, lots]);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="grid content-start gap-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-ink-3">
            Option type
          </span>
          <div className="mt-1.5 flex gap-2">
            {[
              { id: "CE", label: "Call (CE)" },
              { id: "PE", label: "Put (PE)" },
            ].map((o) => (
              <button
                key={o.id}
                onClick={() => setType(o.id)}
                className={cn(
                  "flex-1 rounded-xl border py-2.5 text-sm font-medium transition-colors",
                  type === o.id
                    ? "border-primary bg-primary-light text-primary"
                    : "border-line bg-white text-ink-2",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <Field label="Strike price" value={strike} onChange={setStrike} suffix="₹" />
        <Field label="Premium paid" value={premium} onChange={setPremium} suffix="₹" />
        <Field label="Lots" value={lots} onChange={setLots} suffix={`× ${lotSize}`} />
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Breakeven" value={inr(breakeven)} />
          <Stat label="Max loss" value={inr(-maxLoss)} tone="text-accent" />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white p-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="payoffPos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A6B3C" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#1A6B3C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.06)" />
            <XAxis
              dataKey="spot"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#7A7A7A", fontSize: 11 }}
              minTickGap={40}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#7A7A7A", fontSize: 11 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(v) => [inr(v), "P&L"]}
              labelFormatter={(l) => `Spot ${l}`}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.08)",
                fontSize: 12,
              }}
            />
            <ReferenceLine y={0} stroke="#1A1A1A" strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="pnl"
              stroke="#1A6B3C"
              strokeWidth={2.5}
              fill="url(#payoffPos)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------- shell ---------- */

const TOOLS = [
  { id: "position", label: "Position Size", Icon: Calculator, Comp: PositionSize },
  { id: "stoploss", label: "Stop Loss", Icon: Scissors, Comp: StopLoss },
  { id: "brokerage", label: "Brokerage", Icon: Receipt, Comp: Brokerage },
  { id: "margin", label: "Margin", Icon: Layers, Comp: Margin },
  { id: "payoff", label: "Options Payoff", Icon: LineChart, Comp: OptionsPayoff },
];

export function Calculators() {
  const [active, setActive] = useState("position");
  const tool = TOOLS.find((t) => t.id === active);
  const Comp = tool.Comp;

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible">
        {TOOLS.map((t) => {
          const Icon = t.Icon;
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink-2 hover:text-ink",
              )}
            >
              <Icon className="h-5 w-5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* panel */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
        <h3 className="mb-6 font-serif text-2xl text-ink">{tool.label}</h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Comp />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
