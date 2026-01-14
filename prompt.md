# 노션 기반 미국 주식 배당 통계 시스템


## 프로젝트 개요
- 제목 : US Stock Dividend Dashboard
- 목적 : Notion에 기록된 미국 주식 배당 내역을 불러와, 웹사이트에서 월별/종목별 통계와 원화 환산 금액을 자동으로 계산하여 시각화함.
- 핵심가치 : Notion은 오직 '로그(Log)' 데이터 저장소로만 사용 (복잡한 수식 배제)
- 복잡한 데이터 가공(그룹화, 환율 계산, 피벗 테이블)은 프론트엔드 코드에서 처리.

## 기술 요구사항
- Frontend :Next.js (App Router), TanStack Table (데이터 테이블), Recharts (차트), Tailwind CSS, shadcn/ui, 타입스크립트, ESLint, lucide icons
- Backend : Notion Database, Notion API

## 핵심 로직
- Notion에는 배당금 수령 시마다 '개별 건(Transaction)' 단위로 저장한다. (예: 월 4회 배당이면 4개 행 생성)
- 웹사이트는 이 Raw Data를 가져와서 '종목별', '월별'로 그룹화(Grouping)하여 합계를 보여준다.
- 환율은 '매월 1일 기준 환율'을 적용하며, Notion의 환율 DB를 참조하여 원화(KRW)로 실시간 변환한다.

## Notion 데이터베이스 구조

### 다음 3개의 데이터베이스가 유기적으로 연결된 구조를 명시할 것.
- Portfolio DB : 종목 마스터 (속성: 종목명, 티커, 섹터, 현재 보유수량).
- Exchange Rate DB : 월별 환율 정보 (속성: 기준월(YYYY-MM), 적용환율, 기준일).
- Dividend Log DB : 입출금 내역 (속성: 지급일, 입금액($), 종목Relation, 환율월Relation).

### Functional Requirements (기능 요구사항)
1. **데이터 수집:** Notion API를 통해 기간별 배당 로그와 환율 정보를 Fetching.
2. **피벗 테이블 구현:**
   - 행(Row): 종목명 (Ticker)
   - 열(Column): 1월 ~ 12월
   - 셀(Cell): 해당 월의 배당금 합계 ($)
3. **자동 환율 계산:**
   - (해당 월의 배당금 총합 $) × (해당 월의 기준 환율) = 원화 예상 수령액 표기.
   - 테이블 최하단에 '월별 원화 합계' Row 추가.
4. (추가) 연도 필터링: 상단에 연도 선택(Year Selector) UI를 배치하여, 선택된 연도(예: 2024)의 데이터만 필터링하여 통계 및 차트에 반영한다.   
5. **시각화:** 월별 배당금 추이를 막대그래프로 표현.

### Output Format (작성 양식)
다음 목차에 따라 마크다운(Markdown) 형식으로 작성할 것.
1. **문서 개요 (Document History & Intro)**
2. **시스템 아키텍처 다이어그램 (텍스트 설명)**
3. **데이터베이스 모델링 (Notion DB 상세 속성)**
4. **핵심 기능 명세 (User Story & Acceptance Criteria)**
5. **프론트엔드 로직 명세 (Data Processing Flow)**
   - API 데이터 수신부터 렌더링까지의 단계별 로직 서술
6. **UI/UX 와이어프레임 텍스트 묘사**


