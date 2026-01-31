// Portfolio (종목) 타입 - Supabase에서는 ticker만 사용
export interface Portfolio {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  dividendFrequency: "monthly" | "quarterly" | "semi-annual" | "annual";
}

// Exchange Rate (환율) 타입 - 현재 미사용 (추후 확장용)
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

// Supabase용 배당 데이터 타입
export interface DividendRecord {
  id: number;
  ticker: string;
  dividend: number;
  currency: string; // "USD" | "KRW"
  year: number;
  month: number;
  createdAt: string;
}

// 확장된 배당 내역 (조인된 데이터) - KRW 옵셔널
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
  currency: string; // "USD" | "KRW"
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
  stockCountUSD: number;
  stockCountKRW: number;
  dividendCountUSD: number;
  dividendCountKRW: number;
}

// 대시보드 전체 데이터
export interface DashboardData {
  summary: DashboardSummary;
  monthlyData: MonthlyDividendData[];
  pivotRowsUSD: PivotTableRow[];
  pivotRowsKRW: PivotTableRow[];
  pivotFooter: PivotTableFooter;
  availableYears: number[];
}
