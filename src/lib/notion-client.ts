import { Client } from "@notionhq/client";

// 필수 환경 변수 목록
const REQUIRED_ENV_VARS = [
  "NOTION_API_KEY",
  "NOTION_PORTFOLIO_DATABASE_ID",
  "NOTION_EXCHANGE_RATE_DATABASE_ID",
  "NOTION_DIVIDEND_LOG_DATABASE_ID",
] as const;

/**
 * 환경 변수 검증 함수
 * 모든 필수 환경 변수가 설정되어 있는지 확인
 */
function validateNotionEnv(): boolean {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(
      `[Notion API] Missing environment variables: ${missing.join(", ")}. Using mock data.`
    );
    return false;
  }

  return true;
}

/**
 * Notion API 사용 가능 여부
 * 환경 변수가 모두 설정된 경우에만 true
 */
export const USE_NOTION_API = validateNotionEnv();

/**
 * Notion API 클라이언트 (싱글톤)
 * 환경 변수가 없으면 null
 */
export const notion: Client | null = USE_NOTION_API
  ? new Client({ auth: process.env.NOTION_API_KEY })
  : null;

/**
 * Notion 데이터베이스 ID 객체
 * 각 데이터베이스에 대한 ID를 환경 변수에서 가져옴
 */
export const DATABASE_IDS = {
  portfolio: process.env.NOTION_PORTFOLIO_DATABASE_ID,
  exchangeRate: process.env.NOTION_EXCHANGE_RATE_DATABASE_ID,
  dividendLog: process.env.NOTION_DIVIDEND_LOG_DATABASE_ID,
} as const;

// 타입 export (다른 모듈에서 사용 가능)
export type DatabaseIds = typeof DATABASE_IDS;
