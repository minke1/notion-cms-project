import { isFullPage } from "@notionhq/client";
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Portfolio, ExchangeRate, DividendLog } from "@/types/dividend";

// ===========================================
// Notion Property 타입 정의
// ===========================================

type NotionProperties = PageObjectResponse["properties"];
type NotionProperty = NotionProperties[string];

// ===========================================
// Property 추출 헬퍼 함수들
// ===========================================

/**
 * Title 속성에서 텍스트 추출
 */
function extractTitle(prop: NotionProperty | undefined): string {
  if (prop?.type !== "title") return "";
  const titleArray = prop.title as RichTextItemResponse[];
  return titleArray?.[0]?.plain_text ?? "";
}

/**
 * Rich Text 속성에서 텍스트 추출
 */
function extractRichText(prop: NotionProperty | undefined): string {
  if (prop?.type !== "rich_text") return "";
  const richTextArray = prop.rich_text as RichTextItemResponse[];
  return richTextArray?.[0]?.plain_text ?? "";
}

/**
 * Number 속성에서 숫자 추출
 */
function extractNumber(prop: NotionProperty | undefined): number {
  if (prop?.type !== "number") return 0;
  return prop.number ?? 0;
}

/**
 * Date 속성에서 날짜 문자열 추출 (ISO format)
 */
function extractDate(prop: NotionProperty | undefined): string {
  if (prop?.type !== "date") return "";
  return prop.date?.start ?? "";
}

/**
 * Select 속성에서 선택값 추출
 */
function extractSelect(prop: NotionProperty | undefined): string {
  if (prop?.type !== "select") return "";
  return prop.select?.name ?? "";
}

/**
 * Relation 속성에서 첫 번째 관계 ID 추출
 */
function extractRelation(prop: NotionProperty | undefined): string {
  if (prop?.type !== "relation") return "";
  const relations = prop.relation;
  return relations?.[0]?.id ?? "";
}

// ===========================================
// DividendFrequency 타입 변환
// ===========================================

const VALID_FREQUENCIES = ["monthly", "quarterly", "semi-annual", "annual"] as const;
type DividendFrequency = (typeof VALID_FREQUENCIES)[number];

/**
 * 배당 주기 문자열을 타입 안전한 값으로 변환
 * Notion에서 가져온 값이 유효하지 않으면 기본값 'quarterly' 반환
 */
function parseDividendFrequency(value: string): DividendFrequency {
  const normalized = value.toLowerCase().trim();
  if (VALID_FREQUENCIES.includes(normalized as DividendFrequency)) {
    return normalized as DividendFrequency;
  }
  // 기본값: quarterly (가장 일반적인 배당 주기)
  console.warn(`[Notion Mapper] Invalid dividendFrequency: "${value}", using "quarterly"`);
  return "quarterly";
}

// ===========================================
// 메인 매퍼 함수들
// ===========================================

/**
 * Notion Page를 Portfolio 타입으로 변환
 *
 * 예상 Notion DB 속성:
 * - Name (title): 종목명
 * - Ticker (rich_text): 티커 심볼
 * - Sector (rich_text): 섹터
 * - DividendFrequency (select): 배당 주기
 */
export function mapNotionToPortfolio(
  page: PageObjectResponse
): Portfolio | null {
  if (!isFullPage(page)) {
    return null;
  }

  const props = page.properties;

  const name = extractTitle(props.Name);
  const ticker = extractRichText(props.Ticker);

  // 필수 필드 검증
  if (!name || !ticker) {
    console.warn(`[Notion Mapper] Portfolio missing required fields: ${page.id}`);
    return null;
  }

  return {
    id: page.id,
    name,
    ticker,
    sector: extractRichText(props.Sector),
    dividendFrequency: parseDividendFrequency(extractSelect(props.DividendFrequency)),
  };
}

/**
 * Notion Page를 ExchangeRate 타입으로 변환
 *
 * 예상 Notion DB 속성:
 * - Month (title): 기준월 (YYYY-MM 형식)
 * - Rate (number): 환율
 * - BaseDate (date): 기준일
 */
export function mapNotionToExchangeRate(
  page: PageObjectResponse
): ExchangeRate | null {
  if (!isFullPage(page)) {
    return null;
  }

  const props = page.properties;

  const month = extractTitle(props.Month);
  const rate = extractNumber(props.Rate);

  // 필수 필드 검증
  if (!month || rate === 0) {
    console.warn(`[Notion Mapper] ExchangeRate missing required fields: ${page.id}`);
    return null;
  }

  return {
    id: page.id,
    month,
    rate,
    baseDate: extractDate(props.BaseDate),
  };
}

/**
 * Notion Page를 DividendLog 타입으로 변환
 *
 * 예상 Notion DB 속성:
 * - PaymentDate (date): 지급일
 * - Amount (number): 배당금 (USD)
 * - Portfolio (relation): 종목 참조
 * - ExchangeRate (relation): 환율 참조 (optional)
 */
export function mapNotionToDividendLog(
  page: PageObjectResponse
): DividendLog | null {
  if (!isFullPage(page)) {
    return null;
  }

  const props = page.properties;

  const paymentDate = extractDate(props.PaymentDate);
  const amount = extractNumber(props.Amount);
  const portfolioId = extractRelation(props.Portfolio);

  // 필수 필드 검증
  if (!paymentDate || amount === 0 || !portfolioId) {
    console.warn(`[Notion Mapper] DividendLog missing required fields: ${page.id}`);
    return null;
  }

  return {
    id: page.id,
    paymentDate,
    amount,
    portfolioId,
    exchangeRateMonthId: extractRelation(props.ExchangeRate),
  };
}
