"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = [
  "var(--admin-primary)",
  "var(--admin-info)",
  "var(--admin-warning)",
  "var(--admin-success)",
  "var(--admin-fg-subtle)",
];

/** Account distribution across the five admin roles (real data). */
export function RolesChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
        <XAxis type="number" allowDecimals={false} hide />
        <YAxis
          type="category"
          dataKey="label"
          tickLine={false}
          axisLine={false}
          width={84}
          tick={{ fill: "var(--admin-fg-muted)", fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: "var(--admin-surface-2)" }}
          contentStyle={{
            borderRadius: 10,
            border: "1px solid var(--admin-border)",
            background: "var(--admin-elevated)",
            color: "var(--admin-fg)",
            fontSize: 12,
          }}
          formatter={(v) => [v, "Accounts"]}
        />
        <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
