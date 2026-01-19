import type {
  Portfolio,
  ExchangeRate,
  DividendLog,
  DividendLogWithDetails,
  MonthlyDividendData,
  PivotTableRow,
  PivotTableFooter,
  DashboardSummary,
  DashboardData,
} from "@/types/dividend";

// 날짜에서 YYYY-MM 형식 추출
export function getMonthFromDate(dateString: string): string {
  return dateString.substring(0, 7);
}

// 환율 조회 (없으면 가장 최근 환율 사용 - F007 규칙)
export function findExchangeRate(
  month: string,
  exchangeRates: ExchangeRate[]
): ExchangeRate | null {
  // 해당 월의 환율 찾기
  const exactMatch = exchangeRates.find((er) => er.month === month);
  if (exactMatch) return exactMatch;

  // 없으면 가장 최근 환율 사용 (해당 월 이전 중 가장 최근)
  const sortedRates = [...exchangeRates]
    .filter((er) => er.month <= month)
    .sort((a, b) => b.month.localeCompare(a.month));

  return sortedRates[0] || exchangeRates[exchangeRates.length - 1] || null;
}

// 배당 내역에 상세 정보 조인
export function joinDividendDetails(
  logs: DividendLog[],
  portfolios: Portfolio[],
  exchangeRates: ExchangeRate[]
): DividendLogWithDetails[] {
  const portfolioMap = new Map(portfolios.map((p) => [p.id, p]));

  return logs.map((log) => {
    const portfolio = portfolioMap.get(log.portfolioId)!;
    const month = getMonthFromDate(log.paymentDate);
    const exchangeRate = findExchangeRate(month, exchangeRates);
    const amountKRW = exchangeRate ? log.amount * exchangeRate.rate : 0;

    return {
      ...log,
      portfolio,
      exchangeRate,
      amountKRW,
    };
  });
}

// 월별 배당 데이터 집계 (차트용)
export function aggregateMonthlyData(
  logsWithDetails: DividendLogWithDetails[]
): MonthlyDividendData[] {
  const monthlyMap = new Map<string, { totalUSD: number; totalKRW: number }>();

  logsWithDetails.forEach((log) => {
    const month = getMonthFromDate(log.paymentDate);
    const existing = monthlyMap.get(month) || { totalUSD: 0, totalKRW: 0 };
    monthlyMap.set(month, {
      totalUSD: existing.totalUSD + log.amount,
      totalKRW: existing.totalKRW + log.amountKRW,
    });
  });

  // 월 순서대로 정렬
  return Array.from(monthlyMap.entries())
    .map(([month, data]) => ({ month, ...data }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

// 피벗 테이블 데이터 생성 (종목 × 월)
export function createPivotTableData(
  logsWithDetails: DividendLogWithDetails[],
  portfolios: Portfolio[]
): { rows: PivotTableRow[]; footer: PivotTableFooter } {
  // 모든 월 목록 추출
  const months = Array.from(
    new Set(logsWithDetails.map((log) => getMonthFromDate(log.paymentDate)))
  ).sort();

  // 포트폴리오별 월별 금액 집계
  const pivotMap = new Map<string, Map<string, number>>();
  const krwPivotMap = new Map<string, Map<string, number>>();

  logsWithDetails.forEach((log) => {
    const month = getMonthFromDate(log.paymentDate);

    // USD
    if (!pivotMap.has(log.portfolioId)) {
      pivotMap.set(log.portfolioId, new Map());
    }
    const portfolioData = pivotMap.get(log.portfolioId)!;
    portfolioData.set(month, (portfolioData.get(month) || 0) + log.amount);

    // KRW (footer용)
    if (!krwPivotMap.has(log.portfolioId)) {
      krwPivotMap.set(log.portfolioId, new Map());
    }
    const krwPortfolioData = krwPivotMap.get(log.portfolioId)!;
    krwPortfolioData.set(month, (krwPortfolioData.get(month) || 0) + log.amountKRW);
  });

  // 행 데이터 생성
  const rows: PivotTableRow[] = portfolios
    .filter((p) => pivotMap.has(p.id))
    .map((portfolio) => {
      const monthlyData = pivotMap.get(portfolio.id)!;
      const row: PivotTableRow = {
        portfolioId: portfolio.id,
        ticker: portfolio.ticker,
        name: portfolio.name,
      };

      months.forEach((month) => {
        row[month] = monthlyData.get(month) || 0;
      });

      // 연간 합계
      row.total = Array.from(monthlyData.values()).reduce((sum, val) => sum + val, 0);

      return row;
    })
    .sort((a, b) => (b.total as number) - (a.total as number)); // 합계 내림차순

  // Footer 데이터 생성 (월별 합계)
  const footer: PivotTableFooter = {
    totalUSD: {},
    totalKRW: {},
  };

  months.forEach((month) => {
    let monthUSD = 0;
    let monthKRW = 0;

    pivotMap.forEach((data) => {
      monthUSD += data.get(month) || 0;
    });

    krwPivotMap.forEach((data) => {
      monthKRW += data.get(month) || 0;
    });

    footer.totalUSD[month] = monthUSD;
    footer.totalKRW[month] = monthKRW;
  });

  return { rows, footer };
}

// 대시보드 요약 데이터 계산
export function calculateSummary(
  logsWithDetails: DividendLogWithDetails[]
): DashboardSummary {
  const totalUSD = logsWithDetails.reduce((sum, log) => sum + log.amount, 0);
  const totalKRW = logsWithDetails.reduce((sum, log) => sum + log.amountKRW, 0);
  const stockIds = new Set(logsWithDetails.map((log) => log.portfolioId));

  return {
    totalUSD,
    totalKRW,
    stockCount: stockIds.size,
    dividendCount: logsWithDetails.length,
  };
}

// 전체 대시보드 데이터 생성
export function processDashboardData(
  logs: DividendLog[],
  portfolios: Portfolio[],
  exchangeRates: ExchangeRate[],
  year?: number
): DashboardData {
  // 연도 필터링
  const filteredLogs = year
    ? logs.filter((log) => new Date(log.paymentDate).getFullYear() === year)
    : logs;

  // 상세 정보 조인
  const logsWithDetails = joinDividendDetails(filteredLogs, portfolios, exchangeRates);

  // 각종 데이터 계산
  const summary = calculateSummary(logsWithDetails);
  const monthlyData = aggregateMonthlyData(logsWithDetails);
  const { rows: pivotRows, footer: pivotFooter } = createPivotTableData(
    logsWithDetails,
    portfolios
  );

  // 사용 가능한 연도 목록
  const availableYears = Array.from(
    new Set(logs.map((log) => new Date(log.paymentDate).getFullYear()))
  ).sort((a, b) => b - a);

  return {
    summary,
    monthlyData,
    pivotRows,
    pivotFooter,
    availableYears,
  };
}

// 숫자 포맷팅 유틸리티
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatKRW(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// 월 이름 포맷팅 (YYYY-MM -> M월)
export function formatMonthShort(month: string): string {
  const monthNum = parseInt(month.split("-")[1], 10);
  return `${monthNum}월`;
}
