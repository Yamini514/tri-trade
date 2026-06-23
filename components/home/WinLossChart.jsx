"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { winLossData } from "@/lib/mock-data";

// Flatten to a stacked-friendly shape isn't needed; we render wins & losses as
// two series side by side with green/red colours.
export function WinLossChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={winLossData} barGap={4} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.06)" />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#7A7A7A", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#7A7A7A", fontSize: 12 }}
          allowDecimals={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.03)" }}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            fontSize: 12,
          }}
        />
        <Bar dataKey="wins" name="Wins" radius={[6, 6, 0, 0]} maxBarSize={18}>
          {winLossData.map((_, i) => (
            <Cell key={i} fill="#1A6B3C" />
          ))}
        </Bar>
        <Bar dataKey="losses" name="Losses" radius={[6, 6, 0, 0]} maxBarSize={18}>
          {winLossData.map((_, i) => (
            <Cell key={i} fill="#C9463B" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
