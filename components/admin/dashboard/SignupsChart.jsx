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

/** New accounts per day over the last 14 days (real data from the backend). */
export function SignupsChart({ data = [] }) {
  const series = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={series} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="signupFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--admin-primary)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--admin-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--admin-border)" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--admin-fg-subtle)", fontSize: 11 }}
          minTickGap={16}
        />
        <YAxis
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--admin-fg-subtle)", fontSize: 11 }}
          width={36}
        />
        <Tooltip
          cursor={{ stroke: "var(--admin-border)" }}
          contentStyle={{
            borderRadius: 10,
            border: "1px solid var(--admin-border)",
            background: "var(--admin-elevated)",
            color: "var(--admin-fg)",
            fontSize: 12,
          }}
          labelStyle={{ color: "var(--admin-fg-muted)" }}
          formatter={(v) => [v, "Sign-ups"]}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="var(--admin-primary)"
          strokeWidth={2.5}
          fill="url(#signupFill)"
          dot={false}
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
