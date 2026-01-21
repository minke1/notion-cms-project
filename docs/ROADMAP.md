# US Stock Dividend Dashboard 개발 로드맵

Notion에 기록된 미국 주식 배당 내역을 웹 대시보드에서 월별/종목별 통계와 원화 환산 금액으로 자동 시각화하는 개인 투자자용 대시보드

## 개요

US Stock Dividend Dashboard는 미국 주식에 투자하며 배당 수익을 체계적으로 관리하고자 하는 개인 투자자를 위한 대시보드로 다음 기능을 제공합니다:

- **배당 데이터 시각화**: Notion API를 통해 배당 로그, 포트폴리오, 환율 데이터를 조회하고 시각화
- **피벗 테이블**: 종목(행) x 월(열) 형태의 배당금 피벗 테이블로 한눈에 현황 파악
- **환율 자동 계산**: 월별 환율 DB를 참조하여 원화 환산 금액 자동 계산
- **월별 차트**: 배당금 추이를 막대그래프로 시각화

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조
   - 초기 상태의 샘플로 `000-sample.md` 참조

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 완료로 표시

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 - 완료

- **Task 001: 프로젝트 초기 설정 및 구조 생성** - 완료
  - See: `/tasks/001-project-setup.md`
  - [x] Next.js 15 App Router 기반 프로젝트 초기화
  - [x] TypeScript, TailwindCSS v4, shadcn/ui 설정
  - [x] 기본 디렉토리 구조 생성 (`src/app`, `src/components`, `src/lib`, `src/types`)
  - [x] 루트 페이지 및 레이아웃 골격 구현

- **Task 002: 타입 정의 및 데이터 모델 설계** - 완료
  - See: `/tasks/002-type-definitions.md`
  - [x] Portfolio, ExchangeRate, DividendLog 인터페이스 정의
  - [x] 확장 타입 정의 (DividendLogWithDetails, MonthlyDividendData)
  - [x] 피벗 테이블 관련 타입 정의 (PivotTableRow, PivotTableFooter)
  - [x] 대시보드 데이터 타입 정의 (DashboardSummary, DashboardData)

### Phase 2: UI/UX 완성 (더미 데이터 활용) - 완료

- **Task 003: 공통 컴포넌트 라이브러리 구현** - 완료
  - See: `/tasks/003-component-library.md`
  - [x] shadcn/ui 기반 공통 컴포넌트 설치 (Card, Select, Table, Skeleton)
  - [x] 더미 데이터 생성 유틸리티 작성 (`src/lib/mock-data.ts`)
  - [x] 데이터 서비스 레이어 추상화 (`src/lib/data-service.ts`)
  - [x] 숫자 포맷팅 유틸리티 함수 작성 (formatUSD, formatKRW, formatMonthShort)

- **Task 004: 대시보드 페이지 UI 구현** - 완료
  - See: `/tasks/004-dashboard-ui.md`
  - [x] YearSelector 컴포넌트 구현 (F002 - 연도 필터링)
  - [x] SummaryCards 컴포넌트 구현 (연간 총 배당금, 원화 환산 총액 표시)
  - [x] MonthlyChart 컴포넌트 구현 (F005 - Recharts 막대그래프)
  - [x] DividendTable 컴포넌트 구현 (F003, F006 - TanStack Table 피벗 테이블)
  - [x] DashboardSkeleton 컴포넌트 구현 (F008 - 로딩 상태)
  - [x] DashboardContent 컴포넌트로 전체 레이아웃 통합

- **Task 005: 비즈니스 로직 및 데이터 처리** - 완료
  - See: `/tasks/005-business-logic.md`
  - [x] 환율 조회 로직 구현 (F007 - 환율 예외 처리 포함)
  - [x] 배당 내역 상세 정보 조인 함수 구현 (joinDividendDetails)
  - [x] 월별 배당 데이터 집계 함수 구현 (aggregateMonthlyData)
  - [x] 피벗 테이블 데이터 생성 함수 구현 (createPivotTableData)
  - [x] 대시보드 요약 데이터 계산 함수 구현 (calculateSummary)
  - [x] 전체 대시보드 데이터 처리 함수 구현 (processDashboardData)

### Phase 3: Notion API 연동 및 핵심 기능 완성

- **Task 006: Notion API 연동 설정** - 우선순위
  - Notion API 클라이언트 설정 및 환경 변수 구성
  - Notion 데이터베이스 ID 설정 (Portfolio, ExchangeRate, DividendLog)
  - API 키 보안 관리 (.env.local)
  - Vercel 환경 변수 설정 가이드 작성

- **Task 007: Notion 데이터 조회 API 구현**
  - Portfolio (종목 마스터) 데이터 조회 API 구현
  - ExchangeRate (월별 환율) 데이터 조회 API 구현
  - DividendLog (배당 트랜잭션) 데이터 조회 API 구현
  - Notion API 응답을 앱 타입으로 변환하는 매퍼 함수 작성
  - Playwright MCP를 활용한 API 엔드포인트 통합 테스트

- **Task 008: 더미 데이터에서 실제 API로 전환**
  - data-service.ts의 mock 함수를 실제 Notion API 호출로 교체
  - 데이터 캐싱 전략 구현 (React.cache 활용)
  - API 에러 핸들링 및 재시도 로직 구현
  - Playwright MCP로 전체 데이터 플로우 E2E 테스트

- **Task 009: 에러 핸들링 및 사용자 피드백 개선**
  - 에러 바운더리 컴포넌트 구현
  - 재시도 버튼 기능 구현 (F008)
  - 네트워크 에러, API 에러별 사용자 친화적 메시지 표시
  - 빈 데이터 상태 UI 개선
  - Playwright MCP로 에러 상태 시나리오 테스트

### Phase 4: 성능 최적화 및 배포

- **Task 010: 성능 최적화**
  - Next.js 서버 컴포넌트 최적화
  - 차트 컴포넌트 동적 임포트 최적화
  - 이미지 및 폰트 최적화
  - Lighthouse 성능 점수 측정 및 개선

- **Task 011: 반응형 디자인 완성**
  - 모바일 뷰 최적화 (테이블 가로 스크롤, 차트 크기 조정)
  - 태블릿 뷰 레이아웃 조정
  - 터치 인터랙션 개선
  - Playwright MCP로 다양한 뷰포트 크기 테스트

- **Task 012: Vercel 배포 및 CI/CD**
  - Vercel 프로젝트 연결 및 배포 설정
  - 환경 변수 설정 (Notion API 키, 데이터베이스 ID)
  - 자동 배포 파이프라인 구성 (GitHub 연동)
  - 프로덕션 환경 E2E 테스트

---

## 현재 프로젝트 상태 요약

### 완료된 작업

| 기능 ID | 기능명 | 상태 | 구현 파일 |
|---------|--------|------|-----------|
| F001 | 배당 데이터 조회 | 부분 완료 (Mock) | `src/lib/data-service.ts`, `src/lib/mock-data.ts` |
| F002 | 연도 필터링 | 완료 | `src/components/year-selector.tsx` |
| F003 | 피벗 테이블 | 완료 | `src/components/dividend-table.tsx` |
| F004 | 환율 자동 계산 | 완료 | `src/lib/dividend-utils.ts` |
| F005 | 월별 차트 | 완료 | `src/components/monthly-chart.tsx`, `src/components/chart-content.tsx` |
| F006 | 월별 합계 표시 | 완료 | `src/components/dividend-table.tsx` (TableFooter) |
| F007 | 환율 예외 처리 | 완료 | `src/lib/dividend-utils.ts` (findExchangeRate) |
| F008 | 로딩/에러 상태 | 부분 완료 | `src/components/dashboard-skeleton.tsx` |

### 남은 작업

1. **Notion API 연동**: 현재 Mock 데이터 사용 중, 실제 Notion 데이터베이스 연동 필요
2. **에러 핸들링 강화**: 재시도 버튼, 에러 바운더리 구현 필요
3. **성능 최적화**: Lighthouse 점수 개선, 모바일 최적화
4. **배포**: Vercel 배포 및 환경 변수 설정

---

## 기술 스택

| 카테고리 | 기술 | 버전 |
|----------|------|------|
| 프레임워크 | Next.js (App Router) | 15 |
| 언어 | TypeScript | 5.6+ |
| UI 라이브러리 | React | 19 |
| 스타일링 | TailwindCSS | v4 |
| 컴포넌트 | shadcn/ui | latest |
| 아이콘 | Lucide React | latest |
| 데이터 테이블 | TanStack Table | v8 |
| 차트 | Recharts | 2.x |
| API | Notion API (@notionhq/client) | latest |
| 배포 | Vercel | - |

---

## 파일 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 대시보드 페이지
│   └── globals.css         # 전역 스타일
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트
│   │   ├── card.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   └── table.tsx
│   ├── chart-content.tsx   # Recharts 차트 내용
│   ├── dashboard-content.tsx # 대시보드 메인 컨텐츠
│   ├── dashboard-skeleton.tsx # 로딩 스켈레톤
│   ├── dividend-table.tsx  # 피벗 테이블
│   ├── monthly-chart.tsx   # 월별 차트 래퍼
│   ├── summary-cards.tsx   # 요약 카드
│   └── year-selector.tsx   # 연도 선택기
├── lib/
│   ├── data-service.ts     # 데이터 서비스 레이어
│   ├── dividend-utils.ts   # 배당 관련 유틸리티
│   ├── mock-data.ts        # 더미 데이터
│   └── utils.ts            # 공통 유틸리티
└── types/
    └── dividend.ts         # 타입 정의
```
