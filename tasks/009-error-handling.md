# Task 009: 에러 핸들링 및 사용자 피드백 개선

## 개요

에러 바운더리 컴포넌트를 구현하고 사용자 친화적인 에러 처리 및 재시도 기능을 추가합니다. (F008 완성)

## 관련 파일

- `src/components/error-boundary.tsx` - 에러 바운더리 (생성 예정)
- `src/components/error-message.tsx` - 에러 메시지 컴포넌트 (생성 예정)
- `src/components/empty-state.tsx` - 빈 데이터 상태 컴포넌트 (생성 예정)
- `src/app/error.tsx` - Next.js 에러 페이지 (생성 예정)

## 수락 기준

- [ ] 에러 바운더리 컴포넌트가 구현됨
- [ ] 재시도 버튼 기능이 구현됨 (F008)
- [ ] 네트워크 에러, API 에러별 다른 메시지가 표시됨
- [ ] 빈 데이터 상태 UI가 구현됨
- [ ] Next.js error.tsx가 구현됨

## 구현 단계

### 1단계: 에러 바운더리 컴포넌트 구현

- [ ] `src/components/error-boundary.tsx` 파일 생성
- [ ] React Error Boundary 패턴 구현
  ```typescript
  'use client';

  import { Component, ReactNode } from 'react';

  interface Props {
    children: ReactNode;
    fallback?: ReactNode;
  }

  interface State {
    hasError: boolean;
    error?: Error;
  }

  export class ErrorBoundary extends Component<Props, State> {
    // ...
  }
  ```

### 2단계: 에러 메시지 컴포넌트 구현

- [ ] `src/components/error-message.tsx` 파일 생성
- [ ] 에러 타입별 메시지 분기
  - 네트워크 에러: "인터넷 연결을 확인해주세요"
  - API 에러 (401): "Notion API 인증에 실패했습니다"
  - API 에러 (403): "데이터베이스 접근 권한이 없습니다"
  - API 에러 (429): "요청이 너무 많습니다. 잠시 후 다시 시도해주세요"
  - 일반 에러: "데이터를 불러오는 중 오류가 발생했습니다"
- [ ] 재시도 버튼 구현
- [ ] 에러 상세 정보 토글 (개발 환경)

### 3단계: 빈 데이터 상태 컴포넌트

- [ ] `src/components/empty-state.tsx` 파일 생성
- [ ] 빈 배당 내역 상태 UI
  - 아이콘, 메시지, 가이드 텍스트
- [ ] 필터 결과 없음 상태 UI
  - "선택한 연도의 배당 내역이 없습니다"

### 4단계: Next.js error.tsx 구현

- [ ] `src/app/error.tsx` 파일 생성
- [ ] 전역 에러 처리
- [ ] reset 함수를 통한 재시도 기능

### 5단계: 기존 컴포넌트에 에러 처리 적용

- [ ] DashboardContent에 에러 상태 추가
- [ ] 빈 데이터 상태 처리
- [ ] 로딩/에러/데이터 상태 분기

## 에러 타입 정의

```typescript
// src/lib/errors.ts
export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTH = 'AUTH',
  PERMISSION = 'PERMISSION',
  RATE_LIMIT = 'RATE_LIMIT',
  NOT_FOUND = 'NOT_FOUND',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: Error;
}
```

## 테스트 체크리스트

> Playwright MCP를 활용한 에러 상태 테스트

- [ ] 네트워크 오프라인 시 에러 메시지 표시 확인
- [ ] 잘못된 API 키 시 인증 에러 메시지 확인
- [ ] 권한 없는 DB 접근 시 에러 메시지 확인
- [ ] 재시도 버튼 클릭 시 데이터 재로딩 확인
- [ ] 빈 데이터베이스 시 빈 상태 UI 표시 확인
- [ ] 특정 연도 데이터 없을 시 적절한 메시지 표시 확인

## 변경 사항 요약

> 태스크 완료 후 이 섹션에 변경 사항을 기록합니다.

(태스크 완료 시 작성)
