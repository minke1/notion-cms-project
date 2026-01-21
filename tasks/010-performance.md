# Task 010: 성능 최적화

## 개요

Next.js 서버 컴포넌트 최적화, 번들 사이즈 최적화, Lighthouse 점수 개선을 수행합니다.

## 관련 파일

- `src/app/page.tsx` - 메인 페이지
- `src/components/monthly-chart.tsx` - 차트 컴포넌트
- `next.config.ts` - Next.js 설정
- `package.json` - 의존성 관리

## 수락 기준

- [ ] Lighthouse Performance 점수 90점 이상
- [ ] First Contentful Paint (FCP) 1.8초 이하
- [ ] Largest Contentful Paint (LCP) 2.5초 이하
- [ ] Total Blocking Time (TBT) 200ms 이하
- [ ] 번들 사이즈 최적화 완료

## 구현 단계

### 1단계: 번들 분석

- [ ] `npm install @next/bundle-analyzer` 설치
- [ ] 번들 사이즈 분석 실행
- [ ] 큰 의존성 식별 (recharts, tanstack-table)

### 2단계: 코드 스플리팅 최적화

- [ ] 차트 컴포넌트 동적 임포트 확인
- [ ] 테이블 컴포넌트 동적 임포트 고려
- [ ] 사용하지 않는 코드 제거

### 3단계: 이미지 및 폰트 최적화

- [ ] next/font 사용 확인
- [ ] 이미지 최적화 (있는 경우)
- [ ] 폰트 프리로드 설정

### 4단계: 서버 컴포넌트 최적화

- [ ] 클라이언트 컴포넌트 최소화
- [ ] 'use client' 범위 최적화
- [ ] 서버 사이드 데이터 페칭 최적화

### 5단계: 캐싱 최적화

- [ ] 정적 생성 가능한 부분 식별
- [ ] ISR (Incremental Static Regeneration) 적용 고려
- [ ] 클라이언트 사이드 캐싱 전략

### 6단계: Lighthouse 측정 및 개선

- [ ] Lighthouse 초기 점수 측정
- [ ] 개선 항목 식별
- [ ] 개선 후 재측정
- [ ] 목표 점수 달성 확인

## 성능 최적화 체크리스트

### Server Components

- [ ] 데이터 페칭이 서버에서 수행됨
- [ ] 불필요한 'use client' 제거
- [ ] Suspense 경계 최적화

### Bundle Size

- [ ] recharts tree shaking 적용
- [ ] @tanstack/react-table 필요한 모듈만 임포트
- [ ] 사용하지 않는 의존성 제거

### Network

- [ ] API 응답 캐싱
- [ ] 중복 요청 제거 (React.cache)
- [ ] 압축 전송 확인

## 테스트 체크리스트

- [ ] 프로덕션 빌드 후 Lighthouse 측정
- [ ] 모바일/데스크톱 성능 비교
- [ ] 느린 네트워크 환경 시뮬레이션
- [ ] 데이터 로딩 시간 측정

## 변경 사항 요약

> 태스크 완료 후 이 섹션에 변경 사항을 기록합니다.

(태스크 완료 시 작성)
