"use client";

import { useState, useMemo, useEffect } from "react";
import type { DashboardData, DividendRecord } from "@/types/dividend";
import { processDashboardData } from "@/lib/data-service";
import { SummaryCards } from "./summary-cards";
import { YearSelector } from "./year-selector";
import { MonthlyChart } from "./monthly-chart";
import { DividendTable } from "./dividend-table";
import { DashboardSkeleton } from "./dashboard-skeleton";

interface DashboardContentProps {
  dividends: DividendRecord[];
}

export function DashboardContent({ dividends }: DashboardContentProps) {
  // 사용 가능한 연도 계산
  const availableYears = useMemo(() => {
    const years = new Set(dividends.map((d) => d.year));
    return Array.from(years).sort((a, b) => b - a);
  }, [dividends]);

  // 선택된 연도 상태 (기본값: 가장 최신 연도 또는 null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // 클라이언트에서 초기 연도 설정 (hydration mismatch 방지)
  useEffect(() => {
    if (selectedYear === null) {
      setSelectedYear(availableYears[0] || new Date().getFullYear());
    }
  }, [availableYears, selectedYear]);

  // 대시보드 데이터 계산 (메모이제이션)
  const dashboardData: DashboardData | null = useMemo(() => {
    if (selectedYear === null) return null;
    return processDashboardData(dividends, selectedYear);
  }, [dividends, selectedYear]);

  // 초기 로딩 중일 때 스켈레톤 표시
  if (selectedYear === null || dashboardData === null) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">배당금 대시보드</h1>
          <p className="text-muted-foreground">
            배당 내역 현황 (USD / KRW)
          </p>
        </div>
        <YearSelector
          years={availableYears}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
      </div>

      {/* 요약 카드 */}
      <SummaryCards summary={dashboardData.summary} />

      {/* 월별 차트 */}
      <MonthlyChart data={dashboardData.monthlyData} />

      {/* USD 배당 테이블 */}
      {dashboardData.pivotRowsUSD.length > 0 && (
        <DividendTable
          title="USD 종목별 배당 내역"
          description="종목별 월별 배당금 (USD)"
          rows={dashboardData.pivotRowsUSD}
          footer={dashboardData.pivotFooter}
          currency="USD"
        />
      )}

      {/* KRW 배당 테이블 */}
      {dashboardData.pivotRowsKRW.length > 0 && (
        <DividendTable
          title="KRW 종목별 배당 내역"
          description="종목별 월별 배당금 (원화)"
          rows={dashboardData.pivotRowsKRW}
          footer={dashboardData.pivotFooter}
          currency="KRW"
        />
      )}
    </div>
  );
}
