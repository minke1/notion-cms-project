# Task 002: 타입 정의 및 데이터 모델 설계

## 개요

PRD에 정의된 데이터 모델을 TypeScript 인터페이스로 정의합니다.

## 관련 파일

- `src/types/dividend.ts` - 배당 관련 타입 정의

## 수락 기준

- [x] Portfolio 인터페이스가 정의됨
- [x] ExchangeRate 인터페이스가 정의됨
- [x] DividendLog 인터페이스가 정의됨
- [x] 확장 타입들이 정의됨
- [x] 대시보드 관련 타입들이 정의됨

## 구현 단계

### 1단계: 기본 엔티티 타입 정의

- [x] Portfolio (종목 마스터) 인터페이스 정의
  - id, name, ticker, sector, dividendFrequency
- [x] ExchangeRate (월별 환율) 인터페이스 정의
  - id, month, rate, baseDate
- [x] DividendLog (배당 트랜잭션) 인터페이스 정의
  - id, paymentDate, amount, portfolioId, exchangeRateMonthId

### 2단계: 확장 타입 정의

- [x] DividendLogWithDetails 인터페이스 정의
  - DividendLog + portfolio, exchangeRate, amountKRW
- [x] MonthlyDividendData 인터페이스 정의 (차트용)
  - month, totalUSD, totalKRW

### 3단계: 피벗 테이블 타입 정의

- [x] PivotTableRow 인터페이스 정의
  - portfolioId, ticker, name, [month]: number
- [x] PivotTableFooter 인터페이스 정의
  - totalUSD, totalKRW (월별)

### 4단계: 대시보드 타입 정의

- [x] DashboardSummary 인터페이스 정의
  - totalUSD, totalKRW, stockCount, dividendCount
- [x] DashboardData 인터페이스 정의
  - summary, monthlyData, pivotRows, pivotFooter, availableYears

## 변경 사항 요약

- `src/types/dividend.ts` 파일 생성
- Portfolio, ExchangeRate, DividendLog 기본 인터페이스 정의 완료
- DividendLogWithDetails, MonthlyDividendData 확장 타입 정의 완료
- PivotTableRow, PivotTableFooter 피벗 테이블 타입 정의 완료
- DashboardSummary, DashboardData 대시보드 타입 정의 완료
