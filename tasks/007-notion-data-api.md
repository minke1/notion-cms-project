# Task 007: Notion 데이터 조회 API 구현

## 개요

Notion 데이터베이스에서 Portfolio, ExchangeRate, DividendLog 데이터를 조회하는 API를 구현합니다.

## 관련 파일

- `src/lib/notion.ts` - Notion API 클라이언트 (Task 006에서 생성)
- `src/lib/notion-mappers.ts` - Notion 응답 -> 앱 타입 매퍼 (생성 예정)
- `src/lib/notion-queries.ts` - Notion 쿼리 함수 (생성 예정)

## 수락 기준

- [ ] Portfolio 데이터 조회 API가 구현됨
- [ ] ExchangeRate 데이터 조회 API가 구현됨
- [ ] DividendLog 데이터 조회 API가 구현됨
- [ ] Notion API 응답을 앱 타입으로 변환하는 매퍼 함수가 구현됨
- [ ] 페이지네이션 처리가 구현됨 (100개 이상 데이터)
- [ ] 에러 핸들링이 적절히 처리됨

## 구현 단계

### 1단계: Notion 응답 타입 정의

- [ ] Notion 데이터베이스 속성 타입 정의
- [ ] Portfolio DB 스키마 매핑
  - name: title
  - ticker: rich_text
  - sector: select
  - dividendFrequency: select
- [ ] ExchangeRate DB 스키마 매핑
  - month: title (YYYY-MM)
  - rate: number
  - baseDate: date
- [ ] DividendLog DB 스키마 매핑
  - paymentDate: date
  - amount: number
  - portfolio: relation (Portfolio)
  - exchangeRateMonth: relation (ExchangeRate)

### 2단계: 매퍼 함수 구현

- [ ] `src/lib/notion-mappers.ts` 파일 생성
- [ ] mapNotionToPortfolio() 함수 구현
- [ ] mapNotionToExchangeRate() 함수 구현
- [ ] mapNotionToDividendLog() 함수 구현
- [ ] 속성 추출 헬퍼 함수 작성
  - getTitle() - title 속성 값 추출
  - getRichText() - rich_text 속성 값 추출
  - getNumber() - number 속성 값 추출
  - getDate() - date 속성 값 추출
  - getSelect() - select 속성 값 추출
  - getRelation() - relation 속성 ID 추출

### 3단계: 쿼리 함수 구현

- [ ] `src/lib/notion-queries.ts` 파일 생성
- [ ] queryPortfolios() 함수 구현
  ```typescript
  export async function queryPortfolios(): Promise<Portfolio[]> {
    const response = await notion.databases.query({
      database_id: PORTFOLIO_DB_ID,
    });
    return response.results.map(mapNotionToPortfolio);
  }
  ```
- [ ] queryExchangeRates() 함수 구현
- [ ] queryDividendLogs() 함수 구현
- [ ] 페이지네이션 처리 (start_cursor, has_more)

### 4단계: 에러 핸들링

- [ ] Notion API 에러 타입 정의
- [ ] 에러 발생 시 적절한 메시지 반환
- [ ] 네트워크 에러 처리
- [ ] 권한 에러 처리 (401, 403)
- [ ] Rate limit 에러 처리 (429)

### 5단계: 캐싱 전략 적용

- [ ] React.cache()로 요청 중복 제거
- [ ] 적절한 revalidate 시간 설정

## Notion 데이터베이스 스키마 가이드

### Portfolio DB

| 속성명 | Notion 타입 | 설명 |
|--------|-------------|------|
| Name | Title | 종목명 |
| Ticker | Rich Text | 티커 심볼 |
| Sector | Select | 섹터 분류 |
| Dividend Frequency | Select | 배당주기 |

### ExchangeRate DB

| 속성명 | Notion 타입 | 설명 |
|--------|-------------|------|
| Month | Title | 기준월 (YYYY-MM) |
| Rate | Number | 환율 |
| Base Date | Date | 기준일 |

### DividendLog DB

| 속성명 | Notion 타입 | 설명 |
|--------|-------------|------|
| Payment Date | Date | 지급일 |
| Amount | Number | 입금액 (USD) |
| Portfolio | Relation | Portfolio DB 연결 |
| Exchange Rate Month | Relation | ExchangeRate DB 연결 |

## 테스트 체크리스트

> Playwright MCP를 활용한 API 통합 테스트

- [ ] Portfolio 데이터 조회 성공 확인
- [ ] ExchangeRate 데이터 조회 성공 확인
- [ ] DividendLog 데이터 조회 성공 확인
- [ ] 100개 이상 데이터 페이지네이션 테스트
- [ ] 빈 데이터베이스 조회 시 빈 배열 반환 확인
- [ ] Notion API 에러 시 적절한 에러 처리 확인
- [ ] Rate limit 시 재시도 로직 확인

## 변경 사항 요약

> 태스크 완료 후 이 섹션에 변경 사항을 기록합니다.

(태스크 완료 시 작성)
