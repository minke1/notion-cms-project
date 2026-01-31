import { cache } from "react";
import type {
  DividendRecord,
  MonthlyDividendData,
  PivotTableRow,
  PivotTableFooter,
  DashboardSummary,
  DashboardData,
} from "@/types/dividend";
import {
  supabase,
  USE_SUPABASE,
  TABLE_NAMES,
  type SupabaseDividend,
} from "./supabase-client";

// ===========================================
// Supabase 데이터 조회 함수
// ===========================================

/**
 * Supabase에서 배당 데이터 조회
 */
async function fetchDividendsFromSupabase(): Promise<DividendRecord[]> {
  if (!supabase) {
    console.error("[Supabase] Client not initialized");
    return [];
  }

  const { data, error } = await supabase
    .from(TABLE_NAMES.dividends)
    .select("*")
    .order("d_year", { ascending: false })
    .order("d_month", { ascending: false });

  if (error) {
    console.error("[Supabase] Error fetching dividends:", error);
    return [];
  }

  // Supabase 형식을 내부 형식으로 변환
  return (data as SupabaseDividend[]).map((row) => ({
    id: row.id,
    ticker: row.ticker,
    dividend: row.dividend,
    currency: row.currency || "USD",
    year: parseInt(row.d_year, 10),
    month: parseInt(row.d_month, 10),
    createdAt: row.created_at,
  }));
}

/**
 * 배당 데이터 조회 (캐시 적용)
 */
export const getDividends = cache(async (): Promise<DividendRecord[]> => {
  if (!USE_SUPABASE) {
    console.warn("[Supabase] Not configured, returning empty data");
    return [];
  }

  return fetchDividendsFromSupabase();
});

/**
 * 사용 가능한 연도 목록 조회 (최신 연도 먼저)
 */
export const getAvailableYears = cache(async (): Promise<number[]> => {
  const dividends = await getDividends();
  const years = new Set(dividends.map((d) => d.year));
  return Array.from(years).sort((a, b) => b - a);
});

/**
 * 특정 연도의 배당 데이터 조회
 */
export const getDividendsByYear = cache(
  async (year: number): Promise<DividendRecord[]> => {
    const dividends = await getDividends();
    return dividends.filter((d) => d.year === year);
  }
);

// ===========================================
// 대시보드 데이터 처리 함수
// ===========================================

/**
 * 월별 배당 데이터 집계 (차트용) - 통화별 분리
 */
function aggregateMonthlyData(dividends: DividendRecord[]): MonthlyDividendData[] {
  const monthlyMap = new Map<string, { usd: number; krw: number }>();

  dividends.forEach((d) => {
    const monthKey = `${d.year}-${String(d.month).padStart(2, "0")}`;
    const existing = monthlyMap.get(monthKey) || { usd: 0, krw: 0 };

    if (d.currency === "KRW") {
      existing.krw += d.dividend;
    } else {
      existing.usd += d.dividend;
    }

    monthlyMap.set(monthKey, existing);
  });

  return Array.from(monthlyMap.entries())
    .map(([month, totals]) => ({
      month,
      totalUSD: totals.usd,
      totalKRW: totals.krw,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * 피벗 테이블 데이터 생성 (종목 × 월) - 특정 통화만
 */
function createPivotTableDataByCurrency(
  dividends: DividendRecord[],
  currency: string
): PivotTableRow[] {
  // 해당 통화의 배당만 필터링
  const filtered = dividends.filter((d) => d.currency === currency);

  if (filtered.length === 0) return [];

  // 모든 월 목록 추출
  const months = Array.from(
    new Set(
      filtered.map((d) => `${d.year}-${String(d.month).padStart(2, "0")}`)
    )
  ).sort();

  // 티커별 월별 금액 집계
  const pivotMap = new Map<string, Map<string, number>>();

  filtered.forEach((d) => {
    const monthKey = `${d.year}-${String(d.month).padStart(2, "0")}`;

    if (!pivotMap.has(d.ticker)) {
      pivotMap.set(d.ticker, new Map());
    }
    const tickerData = pivotMap.get(d.ticker)!;
    tickerData.set(monthKey, (tickerData.get(monthKey) || 0) + d.dividend);
  });

  // 행 데이터 생성
  const rows: PivotTableRow[] = Array.from(pivotMap.entries()).map(
    ([ticker, monthlyData]) => {
      const row: PivotTableRow = {
        portfolioId: ticker,
        ticker: ticker,
        name: ticker,
        currency: currency,
      };

      months.forEach((month) => {
        row[month] = monthlyData.get(month) || 0;
      });

      // 연간 합계
      row.total = Array.from(monthlyData.values()).reduce(
        (sum, val) => sum + val,
        0
      );

      return row;
    }
  );

  // 합계 내림차순 정렬
  rows.sort((a, b) => (b.total as number) - (a.total as number));

  return rows;
}

/**
 * Footer 데이터 생성 (월별 합계) - 통화별 분리
 */
function createPivotFooter(dividends: DividendRecord[]): PivotTableFooter {
  const footer: PivotTableFooter = {
    totalUSD: {},
    totalKRW: {},
  };

  dividends.forEach((d) => {
    const monthKey = `${d.year}-${String(d.month).padStart(2, "0")}`;

    if (d.currency === "KRW") {
      footer.totalKRW[monthKey] = (footer.totalKRW[monthKey] || 0) + d.dividend;
    } else {
      footer.totalUSD[monthKey] = (footer.totalUSD[monthKey] || 0) + d.dividend;
    }
  });

  return footer;
}

/**
 * 대시보드 요약 데이터 계산 - 통화별 분리
 */
function calculateSummary(dividends: DividendRecord[]): DashboardSummary {
  const usdDividends = dividends.filter((d) => d.currency === "USD");
  const krwDividends = dividends.filter((d) => d.currency === "KRW");

  const totalUSD = usdDividends.reduce((sum, d) => sum + d.dividend, 0);
  const totalKRW = krwDividends.reduce((sum, d) => sum + d.dividend, 0);

  const tickersUSD = new Set(usdDividends.map((d) => d.ticker));
  const tickersKRW = new Set(krwDividends.map((d) => d.ticker));

  return {
    totalUSD,
    totalKRW,
    stockCountUSD: tickersUSD.size,
    stockCountKRW: tickersKRW.size,
    dividendCountUSD: usdDividends.length,
    dividendCountKRW: krwDividends.length,
  };
}

/**
 * 전체 대시보드 데이터 생성
 */
export function processDashboardData(
  dividends: DividendRecord[],
  year?: number
): DashboardData {
  // 연도 필터링
  const filteredDividends = year
    ? dividends.filter((d) => d.year === year)
    : dividends;

  // 각종 데이터 계산
  const summary = calculateSummary(filteredDividends);
  const monthlyData = aggregateMonthlyData(filteredDividends);
  const pivotRowsUSD = createPivotTableDataByCurrency(filteredDividends, "USD");
  const pivotRowsKRW = createPivotTableDataByCurrency(filteredDividends, "KRW");
  const pivotFooter = createPivotFooter(filteredDividends);

  // 사용 가능한 연도 목록 (전체 데이터 기준)
  const availableYears = Array.from(new Set(dividends.map((d) => d.year))).sort(
    (a, b) => b - a
  );

  return {
    summary,
    monthlyData,
    pivotRowsUSD,
    pivotRowsKRW,
    pivotFooter,
    availableYears,
  };
}

/**
 * 대시보드에 필요한 모든 데이터 조회
 */
export const getAllDashboardData = cache(async () => {
  const dividends = await getDividends();
  return { dividends };
});
