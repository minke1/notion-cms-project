"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { MonthlyDividendData } from "@/types/dividend";

function ChartSkeleton() {
  return <Skeleton className="h-[350px] w-full" />;
}

// 차트 컴포넌트를 별도로 분리하여 동적 로딩
const ChartContent = dynamic(() => import("./chart-content"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

interface MonthlyChartProps {
  data: MonthlyDividendData[];
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>월별 배당금</CardTitle>
        <CardDescription>월별 배당금 수령 현황</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ChartContent data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
