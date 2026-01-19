"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyDividendData } from "@/types/dividend";
import { formatMonthShort, formatUSD, formatKRW } from "@/lib/dividend-utils";

interface ChartContentProps {
  data: MonthlyDividendData[];
}

export default function ChartContent({ data }: ChartContentProps) {
  const chartData = data.map((item) => ({
    month: formatMonthShort(item.month),
    USD: item.totalUSD,
    KRW: item.totalKRW,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <p className="font-medium">{label}</p>
                {payload.map((entry, index) => (
                  <p key={index} style={{ color: entry.color }}>
                    {entry.name === "USD"
                      ? formatUSD(entry.value as number)
                      : formatKRW(entry.value as number)}
                  </p>
                ))}
              </div>
            );
          }}
        />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="USD"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
          name="USD"
        />
        <Bar
          yAxisId="right"
          dataKey="KRW"
          fill="hsl(var(--secondary))"
          radius={[4, 4, 0, 0]}
          name="KRW"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
