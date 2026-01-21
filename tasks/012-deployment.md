# Task 012: Vercel 배포 및 CI/CD

## 개요

Vercel에 프로젝트를 배포하고 CI/CD 파이프라인을 구성합니다.

## 관련 파일

- `vercel.json` - Vercel 설정 (생성 예정)
- `.github/workflows/` - GitHub Actions (선택)
- `.env.production` - 프로덕션 환경 변수 참조

## 수락 기준

- [ ] Vercel 프로젝트 연결 완료
- [ ] 환경 변수 설정 완료
- [ ] 프로덕션 배포 성공
- [ ] 자동 배포 파이프라인 동작 확인
- [ ] 프리뷰 배포 동작 확인

## 구현 단계

### 1단계: Vercel 프로젝트 설정

- [ ] Vercel 계정 로그인
- [ ] GitHub 레포지토리 연결
- [ ] 프로젝트 이름 설정
- [ ] 프레임워크 자동 감지 확인 (Next.js)

### 2단계: 환경 변수 설정

- [ ] Vercel 대시보드에서 환경 변수 추가
  - `NOTION_API_KEY`
  - `NOTION_PORTFOLIO_DB_ID`
  - `NOTION_EXCHANGE_RATE_DB_ID`
  - `NOTION_DIVIDEND_LOG_DB_ID`
- [ ] Production/Preview/Development 환경 분리
- [ ] 환경 변수 암호화 확인

### 3단계: 빌드 설정

- [ ] 빌드 명령어 확인: `npm run build`
- [ ] 출력 디렉토리 확인: `.next`
- [ ] Node.js 버전 설정 (20.x)
- [ ] 빌드 로그 확인

### 4단계: 도메인 설정 (선택)

- [ ] 커스텀 도메인 연결 (있는 경우)
- [ ] SSL 인증서 자동 발급 확인
- [ ] 리다이렉트 규칙 설정

### 5단계: 자동 배포 확인

- [ ] main 브랜치 push 시 자동 배포
- [ ] PR 생성 시 프리뷰 배포
- [ ] 배포 상태 알림 설정

### 6단계: 프로덕션 테스트

- [ ] 프로덕션 URL 접속 확인
- [ ] 데이터 로딩 확인
- [ ] 전체 기능 동작 확인
- [ ] 성능 측정 (Lighthouse)

## Vercel 설정 파일 (선택)

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["icn1"],
  "env": {
    "NODE_ENV": "production"
  }
}
```

## 배포 체크리스트

### Before Deployment

- [ ] 로컬에서 `npm run build` 성공
- [ ] 모든 환경 변수 준비
- [ ] Notion 데이터베이스 연결 테스트

### After Deployment

- [ ] 프로덕션 URL 접속 가능
- [ ] 환경 변수 정상 동작
- [ ] 에러 로그 확인
- [ ] 성능 모니터링 설정

## 테스트 체크리스트

> 프로덕션 환경 E2E 테스트

- [ ] 프로덕션 URL 페이지 로딩 확인
- [ ] 데이터 표시 확인
- [ ] 연도 필터링 동작 확인
- [ ] 차트 렌더링 확인
- [ ] 테이블 렌더링 확인
- [ ] 모바일 뷰 확인
- [ ] 에러 상황 시 적절한 처리 확인

## 모니터링 설정 (선택)

- [ ] Vercel Analytics 활성화
- [ ] Error tracking (Sentry 등) 연동
- [ ] Performance monitoring 설정

## 변경 사항 요약

> 태스크 완료 후 이 섹션에 변경 사항을 기록합니다.

(태스크 완료 시 작성)
