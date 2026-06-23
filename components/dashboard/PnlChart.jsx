"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { pnlSeries } from "@/lib/mock-data";

export function PnlChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={pnlSeries} margin={{ top: 10, right: 10, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A6B3C" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#1A6B3C" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.06)" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#7A7A7A", fontSize: 11 }}
          interval="preserveStartEnd"
          minTickGap={20}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#7A7A7A", fontSize: 11 }}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(v) => [`₹${Number(v).toLocaleString("en-IN")}`, "Cumulative P&L"]}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="pnl"
          stroke="#1A6B3C"
          strokeWidth={2.5}
          fill="url(#pnlFill)"
          dot={false}
          activeDot={{ r: 5, fill: "#1A6B3C" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
