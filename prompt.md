# 노션 기반 미국 주식 배당 통계 시스템

# Task

아래의 [프로젝트 개요]와 [기술 요구사항]을 바탕으로 개발자가 즉시 개발에 착수할 수 있는 구체적인 **PRD(제품 요구사항 정의서)**를 작성해주세요.

# 1. 프로젝트 개요

- **제목:** US Stock Dividend Dashboard
- **목적:** Notion에 기록된 미국 주식 배당 내역을 불러와, 웹사이트에서 월별/종목별 통계와 원화 환산 금액을 자동으로 계산하여 시각화함.
- **핵심 가치:** - Notion은 오직 '로그(Log)' 데이터 저장소로만 사용 (Notion 내 복잡한 수식 배제).
  - 복잡한 데이터 가공(그룹화, 환율 계산, 피벗 테이블 생성)은 프론트엔드 코드에서 처리하여 성능과 유연성을 확보.

# 2. 기술 요구사항 (Tech Stack)

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **UI/Components:** shadcn/ui, Lucide Icons
- **Data & Charts:** TanStack Table (데이터 테이블), Recharts (차트)
- **Backend:** Notion API (Notion SDK)

# 3. 데이터베이스 구조 (Notion DB Schema)

다음 3개의 데이터베이스가 유기적으로 연결된 구조를 전제로 한다.

1. **Portfolio DB:** 종목 마스터 (속성: 종목명, 티커, 섹터, 배당주기).
2. **Exchange Rate DB:** 월별 환율 정보 (속성: 기준월(YYYY-MM), 적용환율(Number), 기준일(Date)).
3. **Dividend Log DB:** 입출금 트랜잭션 내역 (속성: 지급일(Date), 입금액($), 종목Relation, 환율월Relation).

# 4. 핵심 기능 요구사항 (Functional Requirements)

1. **데이터 수집 (Fetching):** - Notion API를 통해 전체 배당 로그와 환율 정보를 가져온다.
2. **연도 필터링 (Year Filter):** - 대시보드 상단에 '연도 선택(Select)' 컴포넌트를 배치한다.
   - 선택된 연도(예: 2024)에 해당하는 데이터만 필터링하여 아래의 통계와 차트를 다시 그린다.
3. **피벗 테이블 구현 (Pivot Table):**
   - **행(Row):** 종목명 (Ticker)
   - **열(Column):** 1월 ~ 12월
   - **셀(Cell):** 해당 월의 배당금 합계 ($)
   - **Footer:** 각 월별 총합계($) 및 원화 환산 합계(KRW) 표시.
4. **자동 환율 계산 로직:**
   - 로직: (해당 월의 배당금 총합 $) × (해당 월의 환율 DB 값) = 원화 예상 수령액.
   - 환율 정보가 없는 달은 '최근 환율' 또는 '기본값'을 적용하는 예외 처리를 포함할 것.
5. **시각화 (Visualization):** - 월별 배당금 추이를 막대그래프(Bar Chart)로 표현 (X축: 월, Y축: 금액).

# 5. Output Format (작성 양식)

다음 목차에 따라 마크다운(Markdown) 형식으로 상세히 작성할 것.

1. **문서 개요 (Document History & Intro)**
2. **시스템 아키텍처 다이어그램 (텍스트 설명)**
3. **데이터베이스 모델링 상세 (Notion 속성 및 타입 정의)**
4. **핵심 기능 명세 (User Story & Acceptance Criteria)**
5. **프론트엔드 데이터 처리 흐름 (Data Processing Flow)**
   - API Response 예시부터 Grouping, Pivot 로직까지 단계별 서술
6. **UI/UX 와이어프레임 텍스트 묘사**
   - PC 대시보드 레이아웃 및 모바일 반응형 고려 사항 포함
