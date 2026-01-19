import { cache } from "react";
import type { Portfolio, ExchangeRate, DividendLog } from "@/types/dividend";
import { mockPortfolios, mockExchangeRates, mockDividendLogs } from "./mock-data";

// React.cache()로 요청 중복 제거 (server-cache-react)
// 추후 Notion API로 전환 시 이 함수들만 수정하면 됨

export const getPortfolios = cache(async (): Promise<Portfolio[]> => {
  // 시뮬레이션된 네트워크 지연
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockPortfolios;
});

export const getExchangeRates = cache(async (): Promise<ExchangeRate[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockExchangeRates;
});

export const getDividendLogs = cache(async (): Promise<DividendLog[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockDividendLogs;
});

// Promise.all()로 모든 데이터 병렬 조회 (async-parallel)
export const getAllDashboardData = cache(async () => {
  const [portfolios, exchangeRates, dividendLogs] = await Promise.all([
    getPortfolios(),
    getExchangeRates(),
    getDividendLogs(),
  ]);

  return { portfolios, exchangeRates, dividendLogs };
});

// 연도별 필터링된 배당 내역 조회
export const getDividendLogsByYear = cache(async (year: number): Promise<DividendLog[]> => {
  const logs = await getDividendLogs();
  return logs.filter((log) => {
    const logYear = new Date(log.paymentDate).getFullYear();
    return logYear === year;
  });
});

// 사용 가능한 연도 목록 조회
export const getAvailableYears = cache(async (): Promise<number[]> => {
  const logs = await getDividendLogs();
  const years = new Set(logs.map((log) => new Date(log.paymentDate).getFullYear()));
  return Array.from(years).sort((a, b) => b - a); // 최신 연도 먼저
});
