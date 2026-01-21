# Task 005: 비즈니스 로직 및 데이터 처리

## 개요

배당금 계산, 환율 조회, 피벗 테이블 데이터 생성 등 핵심 비즈니스 로직을 구현합니다. (F004, F007)

## 관련 파일

- `src/lib/dividend-utils.ts` - 배당 관련 유틸리티 함수

## 수락 기준

- [x] 환율 조회 로직이 구현됨 (F007 포함)
- [x] 배당 내역 상세 정보 조인 함수가 구현됨
- [x] 월별 배당 데이터 집계 함수가 구현됨
- [x] 피벗 테이블 데이터 생성 함수가 구현됨
- [x] 대시보드 요약 데이터 계산 함수가 구현됨
- [x] 전체 대시보드 데이터 처리 함수가 구현됨

## 구현 단계

### 1단계: 환율 조회 로직 구현 (F007)

- [x] getMonthFromDate() - 날짜에서 YYYY-MM 형식 추출
- [x] findExchangeRate() - 환율 조회 함수
  - 해당 월의 환율 찾기
  - 없으면 가장 최근 환율 사용 (해당 월 이전 중 가장 최근)
  - 최근 환율도 없으면 마지막 환율 사용

### 2단계: 배당 내역 조인 함수 구현

- [x] joinDividendDetails() 함수 구현
  - DividendLog에 Portfolio, ExchangeRate 정보 조인
  - 원화 환산 금액 계산 (amountKRW)
  - DividendLogWithDetails 배열 반환

### 3단계: 월별 데이터 집계 함수 구현

- [x] aggregateMonthlyData() 함수 구현
  - 월별 totalUSD, totalKRW 집계
  - 월 순서대로 정렬
  - MonthlyDividendData 배열 반환

### 4단계: 피벗 테이블 데이터 생성 함수 구현

- [x] createPivotTableData() 함수 구현
  - 모든 월 목록 추출 및 정렬
  - 포트폴리오별 월별 금액 집계 (USD, KRW)
  - PivotTableRow 배열 생성 (합계 내림차순 정렬)
  - PivotTableFooter 생성 (월별 합계)

### 5단계: 대시보드 요약 데이터 계산

- [x] calculateSummary() 함수 구현
  - 총 배당금 (USD, KRW) 계산
  - 배당 종목 수 계산
  - 배당 횟수 계산
  - DashboardSummary 반환

### 6단계: 전체 대시보드 데이터 처리

- [x] processDashboardData() 함수 구현
  - 연도 필터링 (선택적)
  - 상세 정보 조인
  - 모든 데이터 계산 및 통합
  - DashboardData 반환

## 변경 사항 요약

- `src/lib/dividend-utils.ts` 완성
  - getMonthFromDate() - 날짜 파싱
  - findExchangeRate() - 환율 조회 (F007 예외 처리 포함)
  - joinDividendDetails() - 데이터 조인
  - aggregateMonthlyData() - 월별 집계
  - createPivotTableData() - 피벗 테이블 데이터 생성
  - calculateSummary() - 요약 데이터 계산
  - processDashboardData() - 전체 데이터 처리
