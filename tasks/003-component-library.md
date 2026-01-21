# Task 003: 공통 컴포넌트 라이브러리 구현

## 개요

shadcn/ui 기반 공통 컴포넌트를 설치하고 더미 데이터 및 데이터 서비스 레이어를 구현합니다.

## 관련 파일

- `src/components/ui/card.tsx` - Card 컴포넌트
- `src/components/ui/select.tsx` - Select 컴포넌트
- `src/components/ui/table.tsx` - Table 컴포넌트
- `src/components/ui/skeleton.tsx` - Skeleton 컴포넌트
- `src/lib/mock-data.ts` - 더미 데이터
- `src/lib/data-service.ts` - 데이터 서비스 레이어
- `src/lib/dividend-utils.ts` - 유틸리티 함수

## 수락 기준

- [x] shadcn/ui 컴포넌트가 설치됨 (Card, Select, Table, Skeleton)
- [x] 더미 데이터가 생성됨 (10개 종목, 12개월 환율, 50개 배당 내역)
- [x] 데이터 서비스 레이어가 구현됨
- [x] 숫자 포맷팅 유틸리티 함수가 구현됨

## 구현 단계

### 1단계: shadcn/ui 컴포넌트 설치

- [x] `npx shadcn@latest add card` 실행
- [x] `npx shadcn@latest add select` 실행
- [x] `npx shadcn@latest add table` 실행
- [x] `npx shadcn@latest add skeleton` 실행

### 2단계: 더미 데이터 생성

- [x] mockPortfolios 배열 생성 (10개 미국 배당주)
- [x] mockExchangeRates 배열 생성 (2024년 1~12월 + 2025년 1월)
- [x] mockDividendLogs 배열 생성 (50개 배당 내역)

### 3단계: 데이터 서비스 레이어 구현

- [x] getPortfolios() 함수 구현
- [x] getExchangeRates() 함수 구현
- [x] getDividendLogs() 함수 구현
- [x] getAllDashboardData() 함수 구현
- [x] getDividendLogsByYear() 함수 구현
- [x] getAvailableYears() 함수 구현
- [x] React.cache()로 요청 중복 제거

### 4단계: 유틸리티 함수 구현

- [x] formatUSD() - 달러 포맷팅
- [x] formatKRW() - 원화 포맷팅
- [x] formatMonthShort() - 월 이름 포맷팅 (YYYY-MM -> M월)

## 변경 사항 요약

- shadcn/ui 컴포넌트 설치 완료 (Card, Select, Table, Skeleton)
- `src/lib/mock-data.ts` 생성 - 10개 종목, 13개월 환율, 50개 배당 내역
- `src/lib/data-service.ts` 생성 - React.cache() 기반 데이터 서비스 레이어
- `src/lib/dividend-utils.ts`에 포맷팅 유틸리티 함수 추가
