# Task 004: 대시보드 페이지 UI 구현

## 개요

대시보드 페이지의 모든 UI 컴포넌트를 구현합니다. (F002, F003, F005, F006, F008)

## 관련 파일

- `src/app/page.tsx` - 메인 페이지
- `src/components/year-selector.tsx` - 연도 선택기
- `src/components/summary-cards.tsx` - 요약 카드
- `src/components/monthly-chart.tsx` - 월별 차트 래퍼
- `src/components/chart-content.tsx` - Recharts 차트 내용
- `src/components/dividend-table.tsx` - 피벗 테이블
- `src/components/dashboard-skeleton.tsx` - 로딩 스켈레톤
- `src/components/dashboard-content.tsx` - 대시보드 메인 컨텐츠

## 수락 기준

- [x] YearSelector 컴포넌트가 구현됨 (F002)
- [x] SummaryCards 컴포넌트가 구현됨
- [x] MonthlyChart 컴포넌트가 구현됨 (F005)
- [x] DividendTable 컴포넌트가 구현됨 (F003, F006)
- [x] DashboardSkeleton 컴포넌트가 구현됨 (F008)
- [x] DashboardContent로 전체 레이아웃이 통합됨
- [x] 반응형 디자인이 적용됨

## 구현 단계

### 1단계: YearSelector 컴포넌트 구현

- [x] shadcn/ui Select 기반 연도 선택기 구현
- [x] 사용 가능한 연도 목록 표시
- [x] 연도 변경 콜백 함수 연결

### 2단계: SummaryCards 컴포넌트 구현

- [x] 4개의 요약 카드 구현
  - 총 배당금 (USD)
  - 총 배당금 (KRW)
  - 배당 종목 수
  - 배당 횟수
- [x] 아이콘 및 스타일링 적용

### 3단계: MonthlyChart 컴포넌트 구현

- [x] Recharts 설치 (`npm install recharts`)
- [x] BarChart로 월별 배당금 막대그래프 구현
- [x] 동적 임포트로 SSR 에러 방지
- [x] 툴팁에 USD/KRW 모두 표시

### 4단계: DividendTable 컴포넌트 구현

- [x] TanStack Table 설치 (`npm install @tanstack/react-table`)
- [x] 피벗 테이블 구현 (종목 x 월)
- [x] 동적 월 컬럼 생성
- [x] Footer에 USD/KRW 합계 표시
- [x] 컴포넌트 메모이제이션 적용

### 5단계: DashboardSkeleton 컴포넌트 구현

- [x] 로딩 상태용 스켈레톤 UI 구현
- [x] 요약 카드, 차트, 테이블 영역 스켈레톤

### 6단계: DashboardContent 컴포넌트 구현

- [x] 모든 컴포넌트 통합
- [x] 연도 상태 관리 (useState)
- [x] 데이터 처리 로직 연결 (useMemo)
- [x] Hydration mismatch 방지 처리

### 7단계: 메인 페이지 완성

- [x] Suspense 경계 설정
- [x] 서버 컴포넌트에서 데이터 페칭
- [x] DashboardContent에 데이터 전달

## 변경 사항 요약

- `src/components/year-selector.tsx` 생성 - 연도 필터링 (F002)
- `src/components/summary-cards.tsx` 생성 - 4개 요약 카드
- `src/components/monthly-chart.tsx` 생성 - Recharts 래퍼 (F005)
- `src/components/chart-content.tsx` 생성 - 막대그래프 구현
- `src/components/dividend-table.tsx` 생성 - TanStack Table 피벗 테이블 (F003, F006)
- `src/components/dashboard-skeleton.tsx` 생성 - 로딩 스켈레톤 (F008)
- `src/components/dashboard-content.tsx` 생성 - 대시보드 메인 컨텐츠
- `src/app/page.tsx` 업데이트 - Suspense 경계 및 데이터 페칭
