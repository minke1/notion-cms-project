# Task 006: Notion API 연동 설정

## 개요

Notion API 클라이언트를 설정하고 환경 변수를 구성합니다. 이 태스크는 F001 (배당 데이터 조회)의 핵심 기반입니다.

## 관련 파일

- `.env.local` - 환경 변수 (로컬)
- `.env.example` - 환경 변수 예시
- `src/lib/notion.ts` - Notion API 클라이언트 (생성 예정)

## 수락 기준

- [ ] @notionhq/client 패키지가 설치됨
- [ ] Notion API 클라이언트가 설정됨
- [ ] 환경 변수가 구성됨 (NOTION_API_KEY, DATABASE_IDs)
- [ ] .env.example 파일이 생성됨
- [ ] Vercel 환경 변수 설정 가이드가 작성됨

## 구현 단계

### 1단계: 패키지 설치

- [ ] `npm install @notionhq/client` 실행

### 2단계: 환경 변수 설정

- [ ] `.env.local` 파일 생성
  ```env
  NOTION_API_KEY=secret_xxx
  NOTION_PORTFOLIO_DB_ID=xxx
  NOTION_EXCHANGE_RATE_DB_ID=xxx
  NOTION_DIVIDEND_LOG_DB_ID=xxx
  ```
- [ ] `.env.example` 파일 생성 (키 이름만)
- [ ] `.gitignore`에 `.env.local` 추가 확인

### 3단계: Notion API 클라이언트 설정

- [ ] `src/lib/notion.ts` 파일 생성
- [ ] Notion Client 초기화
  ```typescript
  import { Client } from "@notionhq/client";

  export const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });
  ```
- [ ] 데이터베이스 ID 상수 정의

### 4단계: 타입 정의 확장

- [ ] Notion API 응답 타입 정의
- [ ] 앱 타입으로 변환하는 매퍼 함수 시그니처 정의

### 5단계: 연결 테스트

- [ ] 간단한 API 호출로 연결 확인
- [ ] 에러 발생 시 적절한 에러 메시지 출력

## Notion 설정 가이드

### 1. Notion Integration 생성

1. https://www.notion.so/my-integrations 접속
2. "New integration" 클릭
3. 이름 입력 (예: "Dividend Dashboard")
4. Capabilities: Read content 선택
5. "Submit" 클릭
6. Internal Integration Secret 복사 -> `NOTION_API_KEY`

### 2. 데이터베이스 연결

1. Notion에서 각 데이터베이스 페이지 열기
2. 우상단 "..." 클릭 -> "Add connections" -> Integration 선택
3. 데이터베이스 URL에서 ID 추출
   - URL 형식: `https://www.notion.so/{workspace}/{database_id}?v={view_id}`
   - database_id 부분 복사

### 3. Vercel 환경 변수 설정

1. Vercel 프로젝트 설정 -> Environment Variables
2. 다음 변수 추가:
   - `NOTION_API_KEY`
   - `NOTION_PORTFOLIO_DB_ID`
   - `NOTION_EXCHANGE_RATE_DB_ID`
   - `NOTION_DIVIDEND_LOG_DB_ID`

## 테스트 체크리스트

> Playwright MCP를 활용한 연결 테스트

- [ ] Notion API 연결 성공 확인
- [ ] 각 데이터베이스 접근 권한 확인
- [ ] 환경 변수 누락 시 적절한 에러 처리 확인
- [ ] 잘못된 API 키 시 에러 처리 확인

## 변경 사항 요약

> 태스크 완료 후 이 섹션에 변경 사항을 기록합니다.

(태스크 완료 시 작성)
