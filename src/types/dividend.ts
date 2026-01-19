// Portfolio (종목) 타입
export interface Portfolio {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  dividendFrequency: "monthly" | "quarterly" | "semi-annual" | "annual";
}

// Exchange Rate (환율) 타입
export interface ExchangeRate {
  id: string;
  month: string; // YYYY-MM format
  rate: number;
  baseDate: string; // ISO date string
}

// Dividend Log (배당 내역) 타입
export interface DividendLog {
  id: string;
  paymentDate: string; // ISO date string
  amount: number; // USD
  portfolioId: string;
  exchangeRateMonthId: string;
}

// 확장된 배당 내역 (조인된 데이터)
export interface DividendLogWithDetails extends DividendLog {
  portfolio: Portfolio;
  exchangeRate: ExchangeRate | null;
  amountKRW: number;
}

// 월별 배당 데이터 (차트용)
export interface MonthlyDividendData {
  month: string; // YYYY-MM format
  totalUSD: number;
  totalKRW: number;
}

// 피벗 테이블 행 데이터
export interface PivotTableRow {
  portfolioId: string;
  ticker: string;
  name: string;
  [month: string]: number | string; // 월별 금액 (동적 키)
}

// 피벗 테이블 Footer 데이터
export interface PivotTableFooter {
  totalUSD: { [month: string]: number };
  totalKRW: { [month: string]: number };
}

// 대시보드 요약 데이터
export interface DashboardSummary {
  totalUSD: number;
  totalKRW: number;
  stockCount: number;
  dividendCount: number;
}

// 대시보드 전체 데이터
export interface DashboardData {
  summary: DashboardSummary;
  monthlyData: MonthlyDividendData[];
  pivotRows: PivotTableRow[];
  pivotFooter: PivotTableFooter;
  availableYears: number[];
}
