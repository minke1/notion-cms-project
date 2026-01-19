import type { Portfolio, ExchangeRate, DividendLog } from "@/types/dividend";

// 샘플 포트폴리오 데이터 (미국 배당주 10개)
export const mockPortfolios: Portfolio[] = [
  {
    id: "pf-001",
    name: "Apple Inc.",
    ticker: "AAPL",
    sector: "Technology",
    dividendFrequency: "quarterly",
  },
  {
    id: "pf-002",
    name: "Microsoft Corporation",
    ticker: "MSFT",
    sector: "Technology",
    dividendFrequency: "quarterly",
  },
  {
    id: "pf-003",
    name: "The Coca-Cola Company",
    ticker: "KO",
    sector: "Consumer Staples",
    dividendFrequency: "quarterly",
  },
  {
    id: "pf-004",
    name: "Johnson & Johnson",
    ticker: "JNJ",
    sector: "Healthcare",
    dividendFrequency: "quarterly",
  },
  {
    id: "pf-005",
    name: "Procter & Gamble Co.",
    ticker: "PG",
    sector: "Consumer Staples",
    dividendFrequency: "quarterly",
  },
  {
    id: "pf-006",
    name: "Verizon Communications",
    ticker: "VZ",
    sector: "Communication Services",
    dividendFrequency: "quarterly",
  },
  {
    id: "pf-007",
    name: "Realty Income Corporation",
    ticker: "O",
    sector: "Real Estate",
    dividendFrequency: "monthly",
  },
  {
    id: "pf-008",
    name: "AT&T Inc.",
    ticker: "T",
    sector: "Communication Services",
    dividendFrequency: "quarterly",
  },
  {
    id: "pf-009",
    name: "PepsiCo Inc.",
    ticker: "PEP",
    sector: "Consumer Staples",
    dividendFrequency: "quarterly",
  },
  {
    id: "pf-010",
    name: "3M Company",
    ticker: "MMM",
    sector: "Industrials",
    dividendFrequency: "quarterly",
  },
];

// 샘플 환율 데이터 (2024년 1~12월)
export const mockExchangeRates: ExchangeRate[] = [
  { id: "er-2024-01", month: "2024-01", rate: 1320.5, baseDate: "2024-01-31" },
  { id: "er-2024-02", month: "2024-02", rate: 1335.2, baseDate: "2024-02-29" },
  { id: "er-2024-03", month: "2024-03", rate: 1345.8, baseDate: "2024-03-31" },
  { id: "er-2024-04", month: "2024-04", rate: 1372.4, baseDate: "2024-04-30" },
  { id: "er-2024-05", month: "2024-05", rate: 1365.1, baseDate: "2024-05-31" },
  { id: "er-2024-06", month: "2024-06", rate: 1380.7, baseDate: "2024-06-30" },
  { id: "er-2024-07", month: "2024-07", rate: 1375.3, baseDate: "2024-07-31" },
  { id: "er-2024-08", month: "2024-08", rate: 1340.9, baseDate: "2024-08-31" },
  { id: "er-2024-09", month: "2024-09", rate: 1335.5, baseDate: "2024-09-30" },
  { id: "er-2024-10", month: "2024-10", rate: 1355.2, baseDate: "2024-10-31" },
  { id: "er-2024-11", month: "2024-11", rate: 1390.8, baseDate: "2024-11-30" },
  { id: "er-2024-12", month: "2024-12", rate: 1450.3, baseDate: "2024-12-31" },
  // 2025년 데이터
  { id: "er-2025-01", month: "2025-01", rate: 1455.2, baseDate: "2025-01-15" },
];

// 샘플 배당 내역 데이터 (2024년)
export const mockDividendLogs: DividendLog[] = [
  // AAPL - 분기배당 (2, 5, 8, 11월)
  { id: "dl-001", paymentDate: "2024-02-15", amount: 24.0, portfolioId: "pf-001", exchangeRateMonthId: "er-2024-02" },
  { id: "dl-002", paymentDate: "2024-05-16", amount: 24.0, portfolioId: "pf-001", exchangeRateMonthId: "er-2024-05" },
  { id: "dl-003", paymentDate: "2024-08-15", amount: 25.0, portfolioId: "pf-001", exchangeRateMonthId: "er-2024-08" },
  { id: "dl-004", paymentDate: "2024-11-14", amount: 25.0, portfolioId: "pf-001", exchangeRateMonthId: "er-2024-11" },

  // MSFT - 분기배당 (3, 6, 9, 12월)
  { id: "dl-005", paymentDate: "2024-03-14", amount: 75.0, portfolioId: "pf-002", exchangeRateMonthId: "er-2024-03" },
  { id: "dl-006", paymentDate: "2024-06-13", amount: 75.0, portfolioId: "pf-002", exchangeRateMonthId: "er-2024-06" },
  { id: "dl-007", paymentDate: "2024-09-12", amount: 75.0, portfolioId: "pf-002", exchangeRateMonthId: "er-2024-09" },
  { id: "dl-008", paymentDate: "2024-12-12", amount: 83.0, portfolioId: "pf-002", exchangeRateMonthId: "er-2024-12" },

  // KO - 분기배당 (4, 7, 10, 1월)
  { id: "dl-009", paymentDate: "2024-01-16", amount: 46.0, portfolioId: "pf-003", exchangeRateMonthId: "er-2024-01" },
  { id: "dl-010", paymentDate: "2024-04-01", amount: 48.5, portfolioId: "pf-003", exchangeRateMonthId: "er-2024-04" },
  { id: "dl-011", paymentDate: "2024-07-01", amount: 48.5, portfolioId: "pf-003", exchangeRateMonthId: "er-2024-07" },
  { id: "dl-012", paymentDate: "2024-10-01", amount: 48.5, portfolioId: "pf-003", exchangeRateMonthId: "er-2024-10" },

  // JNJ - 분기배당 (3, 6, 9, 12월)
  { id: "dl-013", paymentDate: "2024-03-05", amount: 119.0, portfolioId: "pf-004", exchangeRateMonthId: "er-2024-03" },
  { id: "dl-014", paymentDate: "2024-06-04", amount: 124.0, portfolioId: "pf-004", exchangeRateMonthId: "er-2024-06" },
  { id: "dl-015", paymentDate: "2024-09-03", amount: 124.0, portfolioId: "pf-004", exchangeRateMonthId: "er-2024-09" },
  { id: "dl-016", paymentDate: "2024-12-03", amount: 124.0, portfolioId: "pf-004", exchangeRateMonthId: "er-2024-12" },

  // PG - 분기배당 (2, 5, 8, 11월)
  { id: "dl-017", paymentDate: "2024-02-15", amount: 94.15, portfolioId: "pf-005", exchangeRateMonthId: "er-2024-02" },
  { id: "dl-018", paymentDate: "2024-05-15", amount: 100.67, portfolioId: "pf-005", exchangeRateMonthId: "er-2024-05" },
  { id: "dl-019", paymentDate: "2024-08-15", amount: 100.67, portfolioId: "pf-005", exchangeRateMonthId: "er-2024-08" },
  { id: "dl-020", paymentDate: "2024-11-15", amount: 100.67, portfolioId: "pf-005", exchangeRateMonthId: "er-2024-11" },

  // VZ - 분기배당 (2, 5, 8, 11월)
  { id: "dl-021", paymentDate: "2024-02-01", amount: 66.5, portfolioId: "pf-006", exchangeRateMonthId: "er-2024-02" },
  { id: "dl-022", paymentDate: "2024-05-01", amount: 66.5, portfolioId: "pf-006", exchangeRateMonthId: "er-2024-05" },
  { id: "dl-023", paymentDate: "2024-08-01", amount: 66.5, portfolioId: "pf-006", exchangeRateMonthId: "er-2024-08" },
  { id: "dl-024", paymentDate: "2024-11-01", amount: 66.88, portfolioId: "pf-006", exchangeRateMonthId: "er-2024-11" },

  // O (Realty Income) - 월배당
  { id: "dl-025", paymentDate: "2024-01-15", amount: 25.7, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-01" },
  { id: "dl-026", paymentDate: "2024-02-15", amount: 25.7, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-02" },
  { id: "dl-027", paymentDate: "2024-03-15", amount: 25.75, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-03" },
  { id: "dl-028", paymentDate: "2024-04-15", amount: 25.75, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-04" },
  { id: "dl-029", paymentDate: "2024-05-15", amount: 25.75, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-05" },
  { id: "dl-030", paymentDate: "2024-06-14", amount: 26.25, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-06" },
  { id: "dl-031", paymentDate: "2024-07-15", amount: 26.25, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-07" },
  { id: "dl-032", paymentDate: "2024-08-15", amount: 26.25, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-08" },
  { id: "dl-033", paymentDate: "2024-09-13", amount: 26.35, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-09" },
  { id: "dl-034", paymentDate: "2024-10-15", amount: 26.35, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-10" },
  { id: "dl-035", paymentDate: "2024-11-15", amount: 26.35, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-11" },
  { id: "dl-036", paymentDate: "2024-12-13", amount: 26.45, portfolioId: "pf-007", exchangeRateMonthId: "er-2024-12" },

  // T (AT&T) - 분기배당 (2, 5, 8, 11월)
  { id: "dl-037", paymentDate: "2024-02-01", amount: 55.5, portfolioId: "pf-008", exchangeRateMonthId: "er-2024-02" },
  { id: "dl-038", paymentDate: "2024-05-01", amount: 55.5, portfolioId: "pf-008", exchangeRateMonthId: "er-2024-05" },
  { id: "dl-039", paymentDate: "2024-08-01", amount: 55.5, portfolioId: "pf-008", exchangeRateMonthId: "er-2024-08" },
  { id: "dl-040", paymentDate: "2024-11-01", amount: 55.5, portfolioId: "pf-008", exchangeRateMonthId: "er-2024-11" },

  // PEP - 분기배당 (1, 4, 6, 9월)
  { id: "dl-041", paymentDate: "2024-01-05", amount: 127.0, portfolioId: "pf-009", exchangeRateMonthId: "er-2024-01" },
  { id: "dl-042", paymentDate: "2024-04-01", amount: 127.0, portfolioId: "pf-009", exchangeRateMonthId: "er-2024-04" },
  { id: "dl-043", paymentDate: "2024-06-28", amount: 134.5, portfolioId: "pf-009", exchangeRateMonthId: "er-2024-06" },
  { id: "dl-044", paymentDate: "2024-09-30", amount: 134.5, portfolioId: "pf-009", exchangeRateMonthId: "er-2024-09" },

  // MMM - 분기배당 (3, 6, 9, 12월)
  { id: "dl-045", paymentDate: "2024-03-12", amount: 150.0, portfolioId: "pf-010", exchangeRateMonthId: "er-2024-03" },
  { id: "dl-046", paymentDate: "2024-06-12", amount: 70.0, portfolioId: "pf-010", exchangeRateMonthId: "er-2024-06" },
  { id: "dl-047", paymentDate: "2024-09-12", amount: 70.0, portfolioId: "pf-010", exchangeRateMonthId: "er-2024-09" },
  { id: "dl-048", paymentDate: "2024-12-12", amount: 70.0, portfolioId: "pf-010", exchangeRateMonthId: "er-2024-12" },

  // 2025년 1월 배당 (일부)
  { id: "dl-049", paymentDate: "2025-01-15", amount: 26.5, portfolioId: "pf-007", exchangeRateMonthId: "er-2025-01" },
  { id: "dl-050", paymentDate: "2025-01-16", amount: 48.5, portfolioId: "pf-003", exchangeRateMonthId: "er-2025-01" },
];
