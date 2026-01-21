# Task 001: 프로젝트 초기 설정 및 구조 생성

## 개요

Next.js 15 App Router 기반 프로젝트를 초기화하고 기본 디렉토리 구조를 생성합니다.

## 관련 파일

- `package.json` - 프로젝트 의존성
- `tsconfig.json` - TypeScript 설정
- `tailwind.config.ts` - TailwindCSS 설정
- `src/app/layout.tsx` - 루트 레이아웃
- `src/app/page.tsx` - 메인 페이지

## 수락 기준

- [x] Next.js 15 프로젝트가 정상적으로 초기화됨
- [x] TypeScript 5.6+ 설정이 완료됨
- [x] TailwindCSS v4가 설정됨
- [x] shadcn/ui가 설치 및 설정됨
- [x] 기본 디렉토리 구조가 생성됨
- [x] 개발 서버가 정상적으로 실행됨

## 구현 단계

### 1단계: 프로젝트 초기화

- [x] `npx create-next-app@latest` 실행
- [x] TypeScript, ESLint, TailwindCSS 옵션 선택
- [x] App Router 사용 설정

### 2단계: shadcn/ui 설정

- [x] `npx shadcn@latest init` 실행
- [x] new-york 스타일 선택
- [x] CSS variables 사용 설정

### 3단계: 디렉토리 구조 생성

- [x] `src/components/` 디렉토리 생성
- [x] `src/components/ui/` 디렉토리 생성
- [x] `src/lib/` 디렉토리 생성
- [x] `src/types/` 디렉토리 생성
- [x] `src/hooks/` 디렉토리 생성

### 4단계: 기본 파일 생성

- [x] `src/app/layout.tsx` - 루트 레이아웃 작성
- [x] `src/app/page.tsx` - 메인 페이지 골격 작성
- [x] `src/lib/utils.ts` - cn 유틸리티 함수

## 변경 사항 요약

- Next.js 15 App Router 프로젝트 초기화 완료
- TypeScript, TailwindCSS v4, shadcn/ui 설정 완료
- 기본 디렉토리 구조 생성 완료 (`src/app`, `src/components`, `src/lib`, `src/types`)
- 루트 레이아웃 및 메인 페이지 골격 구현 완료
