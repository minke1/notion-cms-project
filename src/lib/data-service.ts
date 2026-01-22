import { cache } from "react";
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Portfolio, ExchangeRate, DividendLog } from "@/types/dividend";
import { notion, USE_NOTION_API, DATABASE_IDS } from "./notion-client";
import {
  mapNotionToPortfolio,
  mapNotionToExchangeRate,
  mapNotionToDividendLog,
} from "./notion-mappers";
import { mockPortfolios, mockExchangeRates, mockDividendLogs } from "./mock-data";

// ===========================================
// 데이터 조회 함수 (React.cache()로 요청 중복 제거)
// ===========================================
// Notion API 연동: USE_NOTION_API가 true이면 Notion에서 조회
// 환경 변수 미설정 또는 API 에러 시 Mock 데이터로 폴백

/**
 * Notion API v5+ 에서는 dataSources.query를 사용
 * @param dataSourceId 데이터베이스 ID
 */
async function queryNotionDataSource(dataSourceId: string) {
  if (!notion) throw new Error("Notion client not initialized");

  return notion.dataSources.query({
    data_source_id: dataSourceId,
  });
}

/**
 * 페이지 응답이 전체 페이지인지 확인하는 타입 가드
 */
function isFullPage(
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse {
  return "properties" in page;
}

/**
 * Portfolio (종목) 목록 조회
 */
export const getPortfolios = cache(async (): Promise<Portfolio[]> => {
  // Notion API 미사용 시 Mock 데이터 반환
  if (!USE_NOTION_API || !notion || !DATABASE_IDS.portfolio) {
    return mockPortfolios;
  }

  try {
    const response = await queryNotionDataSource(DATABASE_IDS.portfolio);

    const portfolios = response.results
      .filter((page): page is PageObjectResponse => isFullPage(page as PageObjectResponse | PartialPageObjectResponse))
      .map((page) => mapNotionToPortfolio(page))
      .filter((p): p is Portfolio => p !== null);

    // 결과가 없으면 Mock 데이터 반환
    if (portfolios.length === 0) {
      console.warn("[Notion API] No portfolios found, using mock data");
      return mockPortfolios;
    }

    return portfolios;
  } catch (error) {
    console.error("[Notion API] getPortfolios error:", error);
    return mockPortfolios;
  }
});

/**
 * ExchangeRate (환율) 목록 조회
 */
export const getExchangeRates = cache(async (): Promise<ExchangeRate[]> => {
  // Notion API 미사용 시 Mock 데이터 반환
  if (!USE_NOTION_API || !notion || !DATABASE_IDS.exchangeRate) {
    return mockExchangeRates;
  }

  try {
    const response = await queryNotionDataSource(DATABASE_IDS.exchangeRate);

    const exchangeRates = response.results
      .filter((page): page is PageObjectResponse => isFullPage(page as PageObjectResponse | PartialPageObjectResponse))
      .map((page) => mapNotionToExchangeRate(page))
      .filter((er): er is ExchangeRate => er !== null);

    // 결과가 없으면 Mock 데이터 반환
    if (exchangeRates.length === 0) {
      console.warn("[Notion API] No exchange rates found, using mock data");
      return mockExchangeRates;
    }

    return exchangeRates;
  } catch (error) {
    console.error("[Notion API] getExchangeRates error:", error);
    return mockExchangeRates;
  }
});

/**
 * DividendLog (배당 내역) 목록 조회
 */
export const getDividendLogs = cache(async (): Promise<DividendLog[]> => {
  // Notion API 미사용 시 Mock 데이터 반환
  if (!USE_NOTION_API || !notion || !DATABASE_IDS.dividendLog) {
    return mockDividendLogs;
  }

  try {
    const response = await queryNotionDataSource(DATABASE_IDS.dividendLog);

    const dividendLogs = response.results
      .filter((page): page is PageObjectResponse => isFullPage(page as PageObjectResponse | PartialPageObjectResponse))
      .map((page) => mapNotionToDividendLog(page))
      .filter((dl): dl is DividendLog => dl !== null);

    // 결과가 없으면 Mock 데이터 반환
    if (dividendLogs.length === 0) {
      console.warn("[Notion API] No dividend logs found, using mock data");
      return mockDividendLogs;
    }

    return dividendLogs;
  } catch (error) {
    console.error("[Notion API] getDividendLogs error:", error);
    return mockDividendLogs;
  }
});

// ===========================================
// 복합 데이터 조회 함수 (기존 로직 유지)
// ===========================================

/**
 * 대시보드에 필요한 모든 데이터 병렬 조회
 * Promise.all()로 병렬 처리 (async-parallel)
 */
export const getAllDashboardData = cache(async () => {
  const [portfolios, exchangeRates, dividendLogs] = await Promise.all([
    getPortfolios(),
    getExchangeRates(),
    getDividendLogs(),
  ]);

  return { portfolios, exchangeRates, dividendLogs };
});

/**
 * 특정 연도의 배당 내역 조회
 */
export const getDividendLogsByYear = cache(
  async (year: number): Promise<DividendLog[]> => {
    const logs = await getDividendLogs();
    return logs.filter((log) => {
      const logYear = new Date(log.paymentDate).getFullYear();
      return logYear === year;
    });
  }
);

/**
 * 사용 가능한 연도 목록 조회 (최신 연도 먼저)
 */
export const getAvailableYears = cache(async (): Promise<number[]> => {
  const logs = await getDividendLogs();
  const years = new Set(
    logs.map((log) => new Date(log.paymentDate).getFullYear())
  );
  return Array.from(years).sort((a, b) => b - a);
});
