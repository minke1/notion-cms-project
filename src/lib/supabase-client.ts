import { createClient } from "@supabase/supabase-js";

// Supabase 환경 변수
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Supabase 사용 여부
export const USE_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Supabase 클라이언트 생성
export const supabase = USE_SUPABASE
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// 테이블 이름
export const TABLE_NAMES = {
  dividends: "dividends",
} as const;

// Supabase dividends 테이블 타입
export interface SupabaseDividend {
  id: number;
  ticker: string;
  dividend: number;
  raw_msg: string | null;
  created_at: string;
  currency: string;
  d_year: string;
  d_month: string;
}

if (!USE_SUPABASE) {
  console.warn(
    "[Supabase] 환경 변수 미설정. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정하세요."
  );
}
