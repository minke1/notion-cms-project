# Task 008: 더미 데이터에서 실제 API로 전환

## 개요

data-service.ts의 mock 함수를 실제 Notion API 호출로 교체합니다.

## 관련 파일

- `src/lib/data-service.ts` - 데이터 서비스 레이어
- `src/lib/notion-queries.ts` - Notion 쿼리 함수 (Task 007에서 생성)
- `src/lib/mock-data.ts` - 더미 데이터 (백업용 유지)

## 수락 기준

- [ ] data-service.ts가 실제 Notion API를 호출함
- [ ] 개발 환경에서 mock 데이터 폴백 옵션이 유지됨
- [ ] 데이터 캐싱이 적절히 적용됨
- [ ] API 에러 발생 시 적절한 에러가 throw됨
- [ ] 전체 대시보드가 실제 Notion 데이터로 동작함

## 구현 단계

### 1단계: 환경 변수 기반 분기 처리

- [ ] USE_MOCK_DATA 환경 변수 추가 (선택적)
- [ ] 환경 변수에 따라 mock/real API 분기
  ```typescript
  const useMockData = process.env.USE_MOCK_DATA === 'true';
  ```

### 2단계: data-service.ts 수정

- [ ] getPortfolios() 수정
  ```typescript
  export const getPortfolios = cache(async (): Promise<Portfolio[]> => {
    if (useMockData) return mockPortfolios;
    return queryPortfolios();
  });
  ```
- [ ] getExchangeRates() 수정
- [ ] getDividendLogs() 수정
- [ ] getAllDashboardData() 수정

### 3단계: 캐싱 전략 구현

- [ ] React.cache() 유지
- [ ] Next.js revalidate 설정
  ```typescript
  export const revalidate = 3600; // 1시간
  ```
- [ ] 온디맨드 재검증 옵션 고려

### 4단계: 에러 핸들링

- [ ] NotionAPIError 클래스 정의
- [ ] 에러 발생 시 사용자 친화적 메시지 변환
- [ ] 로깅 추가 (개발 환경)

### 5단계: 통합 테스트

- [ ] 실제 Notion 데이터로 대시보드 렌더링 확인
- [ ] 연도 필터링 동작 확인
- [ ] 환율 계산 정확성 확인
- [ ] 피벗 테이블 데이터 정확성 확인

## 마이그레이션 체크리스트

### Before Migration

- [ ] Notion 데이터베이스에 테스트 데이터 준비
- [ ] 환경 변수 설정 완료
- [ ] Task 006, 007 완료 확인

### After Migration

- [ ] 로컬 환경에서 실제 데이터 표시 확인
- [ ] mock 데이터 폴백 동작 확인
- [ ] 에러 상황 시뮬레이션 및 처리 확인

## 테스트 체크리스트

> Playwright MCP를 활용한 E2E 테스트

- [ ] 페이지 로딩 및 데이터 표시 확인
- [ ] 연도 선택 시 데이터 필터링 확인
- [ ] 요약 카드 수치 정확성 확인
- [ ] 차트 데이터 정확성 확인
- [ ] 피벗 테이블 데이터 정확성 확인
- [ ] 환율 환산 정확성 확인
- [ ] Notion API 에러 시 에러 UI 표시 확인
- [ ] 빈 데이터 시 적절한 UI 표시 확인

## 변경 사항 요약

> 태스크 완료 후 이 섹션에 변경 사항을 기록합니다.

(태스크 완료 시 작성)
