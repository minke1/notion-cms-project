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
  // USD와 KRW 데이터가 모두 있는지 확인
  const hasUSD = data.some((item) => item.totalUSD > 0);
  const hasKRW = data.some((item) => item.totalKRW > 0);

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
        {hasUSD && (
          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
        )}
        {hasKRW && (
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
          />
        )}
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border bg-background p-2 shadow-xs">
                <p className="font-medium">{label}</p>
                {payload.map((entry, index) => {
                  if ((entry.value as number) === 0) return null;
                  return (
                    <p key={index} style={{ color: entry.color }}>
                      {entry.name === "USD"
                        ? formatUSD(entry.value as number)
                        : formatKRW(entry.value as number)}
                    </p>
                  );
                })}
              </div>
            );
          }}
        />
        <Legend />
        {hasUSD && (
          <Bar
            yAxisId="left"
            dataKey="USD"
            fill="var(--color-chart-1)"
            radius={[4, 4, 0, 0]}
            name="USD"
          />
        )}
        {hasKRW && (
          <Bar
            yAxisId={hasUSD ? "right" : "left"}
            dataKey="KRW"
            fill="var(--color-chart-2)"
            radius={[4, 4, 0, 0]}
            name="KRW"
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
