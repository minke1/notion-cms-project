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

// 숫자 포맷팅 (컴팩트)
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("ko-KR").format(Math.round(amount));
}
