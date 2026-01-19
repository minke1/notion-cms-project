"use client";

import { useState, useMemo } from "react";
import type { DashboardData, Portfolio, ExchangeRate, DividendLog } from "@/types/dividend";
import { processDashboardData } from "@/lib/dividend-utils";
import { SummaryCards } from "./summary-cards";
import { YearSelector } from "./year-selector";
import { MonthlyChart } from "./monthly-chart";
import { DividendTable } from "./dividend-table";

interface DashboardContentProps {
  portfolios: Portfolio[];
  exchangeRates: ExchangeRate[];
  dividendLogs: DividendLog[];
}

export function DashboardContent({
  portfolios,
  exchangeRates,
  dividendLogs,
}: DashboardContentProps) {
  // 사용 가능한 연도 계산
  const availableYears = useMemo(() => {
    const years = new Set(dividendLogs.map((log) => new Date(log.paymentDate).getFullYear()));
    return Array.from(years).sort((a, b) => b - a);
  }, [dividendLogs]);

  // 선택된 연도 상태 (기본값: 가장 최신 연도)
  const [selectedYear, setSelectedYear] = useState(availableYears[0] || new Date().getFullYear());

  // 대시보드 데이터 계산 (메모이제이션)
  const dashboardData: DashboardData = useMemo(() => {
    return processDashboardData(dividendLogs, portfolios, exchangeRates, selectedYear);
  }, [dividendLogs, portfolios, exchangeRates, selectedYear]);

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">배당금 대시보드</h1>
          <p className="text-muted-foreground">
            미국 주식 배당 내역 및 원화 환산 현황
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

      {/* 배당 테이블 */}
      <DividendTable rows={dashboardData.pivotRows} footer={dashboardData.pivotFooter} />
    </div>
  );
}
