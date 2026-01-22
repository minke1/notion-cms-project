# Development Guidelines for AI Agents

> **Purpose**: AI-optimized rules for the US Stock Dividend Dashboard project. This document provides imperative instructions for code modification and feature implementation.

---

## Project Overview

| Attribute | Value |
|-----------|-------|
| **Project** | US Stock Dividend Dashboard (미국 주식 배당금 대시보드) |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5+ |
| **UI Library** | React 19, shadcn/ui (new-york style) |
| **Styling** | Tailwind CSS with CSS Variables |
| **Data Tables** | TanStack Table v8 |
| **Charts** | Recharts 3.x |
| **Data Source** | Notion API (@notionhq/client) - currently mocked |
| **UI Language** | Korean (한국어) |

---

## Architecture & Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout (Server Component)
│   ├── page.tsx           # Main dashboard (Server Component)
│   ├── globals.css        # Global styles & CSS variables
│   └── api/               # API routes (if needed)
├── components/
│   ├── ui/                # shadcn/ui components (DO NOT MODIFY)
│   └── *.tsx              # Feature components
├── lib/
│   ├── utils.ts           # Generic utilities (cn() helper)
│   ├── data-service.ts    # Data fetching with React.cache()
│   ├── mock-data.ts       # Mock data (replace with Notion API)
│   └── dividend-utils.ts  # Domain-specific utilities
├── types/
│   └── dividend.ts        # TypeScript interfaces
└── hooks/                 # Custom React hooks (if needed)
```

### Module Responsibilities

| Directory | Purpose | Modification Rules |
|-----------|---------|-------------------|
| `src/app/` | Page routing, layouts | Add pages as `<route>/page.tsx` |
| `src/components/ui/` | shadcn/ui base | **NEVER modify directly** |
| `src/components/` | Feature components | Add as `kebab-case.tsx` |
| `src/lib/` | Utilities & services | Domain utils in `*-utils.ts` |
| `src/types/` | TypeScript interfaces | All domain types here |

---

## Component Implementation Standards

### Server vs Client Component Decision

```
IF component needs ANY of these → ADD "use client" directive:
  ├── useState, useEffect, useReducer, useContext
  ├── Event handlers (onClick, onChange, onSubmit)
  ├── Browser APIs (window, document, localStorage)
  ├── Third-party libs needing browser (Recharts)
  └── Interactive form controls

ELSE → Keep as Server Component (default):
  ├── Data fetching with async/await
  ├── Direct database/API access
  ├── Static rendering
  └── Passing data to Client Components as props
```

### File Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Component file | `kebab-case.tsx` | `summary-cards.tsx` |
| Component export | `PascalCase` | `export function SummaryCards()` |
| Utility file | `kebab-case.ts` | `dividend-utils.ts` |
| Type file | `kebab-case.ts` | `dividend.ts` |
| Page file | `page.tsx` | `src/app/settings/page.tsx` |

### Component Structure Pattern

```typescript
// DO: Correct component structure
"use client"; // Only if needed

import { useState } from "react";
import { Card } from "@/components/ui/card";
import type { SomeType } from "@/types/dividend";

interface ComponentNameProps {
  data: SomeType;
  onAction?: () => void;
}

export function ComponentName({ data, onAction }: ComponentNameProps) {
  // Implementation
}

// DON'T: Arrow function export
export const ComponentName = ({ data }: Props) => { ... }
```

---

## Data Layer Standards

### Type Definitions (`src/types/dividend.ts`)

```typescript
// DO: Interface with Korean comments
// 배당 내역 타입
export interface DividendLog {
  id: string;
  paymentDate: string; // ISO date string
  amount: number;      // USD
  portfolioId: string;
}

// DON'T: type keyword for object shapes
type DividendLog = { ... }
```

### Data Service Pattern (`src/lib/data-service.ts`)

```typescript
// DO: React.cache() wrapper for request deduplication
import { cache } from "react";

export const getPortfolios = cache(async (): Promise<Portfolio[]> => {
  // Fetch from Notion API or return mock data
  return mockPortfolios;
});

// DO: Parallel fetching with Promise.all()
export const getAllDashboardData = cache(async () => {
  const [portfolios, rates, logs] = await Promise.all([
    getPortfolios(),
    getExchangeRates(),
    getDividendLogs(),
  ]);
  return { portfolios, rates, logs };
});

// DON'T: Fetch without cache wrapper
export async function getPortfolios() { ... }
```

### Adding New Data Type

1. Define interface in `src/types/dividend.ts`
2. Add mock data in `src/lib/mock-data.ts`
3. Create `cache()`-wrapped fetch function in `src/lib/data-service.ts`
4. Add transformation utilities in `src/lib/dividend-utils.ts`

---

## UI & Styling Standards

### shadcn/ui Component Usage

```bash
# DO: Install new shadcn component via CLI
npx shadcn@latest add button
npx shadcn@latest add dialog

# DON'T: Manually create files in src/components/ui/
# DON'T: Copy-paste shadcn code from website
```

**Available components in project**: `card`, `select`, `skeleton`, `table`

### Tailwind CSS Rules

```tsx
// DO: Use semantic color tokens
<div className="bg-background text-foreground" />
<p className="text-muted-foreground" />
<button className="bg-primary text-primary-foreground" />

// DO: Use cn() for conditional classes
import { cn } from "@/lib/utils";
<div className={cn("base-class", isActive && "active-class")} />

// DO: Use hsl() for dynamic color values (charts)
fill="hsl(var(--primary))"

// DON'T: Arbitrary color values
<div className="bg-[#1a1a1a]" />
<div style={{ color: '#fff' }} />
```

### Available Color Tokens

| Token | Usage |
|-------|-------|
| `background` / `foreground` | Page background & text |
| `card` / `card-foreground` | Card surfaces |
| `primary` / `primary-foreground` | Primary actions |
| `secondary` / `secondary-foreground` | Secondary elements |
| `muted` / `muted-foreground` | Subdued text/backgrounds |
| `destructive` | Error/delete actions |
| `border`, `input`, `ring` | Form elements |
| `chart-1` to `chart-5` | Chart colors |

---

## Chart Implementation Standards

### Recharts Pattern

```typescript
// File: src/components/monthly-chart.tsx (Wrapper)
"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// DO: Dynamic import with ssr: false for Recharts
const ChartContent = dynamic(() => import("./chart-content"), {
  ssr: false,
  loading: () => <Skeleton className="h-[350px] w-full" />,
});

export function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>월별 배당금</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContent data={data} />
      </CardContent>
    </Card>
  );
}

// File: src/components/chart-content.tsx (Actual chart)
"use client";

// DO: Default export for dynamic() compatibility
export default function ChartContent({ data }: ChartContentProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        {/* Use hsl(var(--token)) for theming */}
        <Bar fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

---

## Table Implementation Standards

### TanStack Table Pattern

```typescript
"use client";

import { useMemo, memo } from "react";
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

// DO: Wrap with memo() for performance
export const DataTable = memo(function DataTable({ rows }: DataTableProps) {
  // DO: Memoize columns definition
  const columns = useMemo<ColumnDef<RowType>[]>(() => [
    { accessorKey: "name", header: "이름" },
    { accessorKey: "value", header: "값" },
  ], []);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <Table>
        {/* Render table structure */}
      </Table>
    </Card>
  );
});
```

---

## Multi-File Coordination Rules

### When Adding a New Feature Component

| File to Modify | Action |
|----------------|--------|
| `src/types/dividend.ts` | Add new interface if needed |
| `src/lib/mock-data.ts` | Add mock data if needed |
| `src/lib/data-service.ts` | Add fetch function with cache() |
| `src/lib/dividend-utils.ts` | Add transformation utilities |
| `src/components/<name>.tsx` | Create the component |
| Parent component | Import and render new component |

### When Adding shadcn/ui Component

```bash
# Step 1: Install via CLI
npx shadcn@latest add dialog

# Step 2: Import in your component
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

# NO manual file creation needed
```

### When Modifying Data Types

| If You Change | Also Update |
|---------------|-------------|
| Interface in `dividend.ts` | Mock data, data-service functions, consuming components |
| Mock data structure | Type definitions, utilities |
| Utility function signature | All call sites |

---

## Hydration Safety Rules

### Preventing React Hydration Mismatch

```typescript
// DO: Initialize with null, set in useEffect
"use client";

export function YearSelector({ years }: Props) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    if (selectedYear === null) {
      setSelectedYear(years[0] || new Date().getFullYear());
    }
  }, [years, selectedYear]);

  // Show skeleton while null
  if (selectedYear === null) {
    return <Skeleton />;
  }

  return <Select value={selectedYear} />;
}

// DON'T: Initialize with Date.now() or Math.random()
const [value] = useState(Date.now()); // Hydration mismatch!
```

---

## Performance Optimization Checklist

When implementing features, verify:

- [ ] Server Component used where possible (no "use client" unless needed)
- [ ] `React.cache()` wraps all data fetching functions
- [ ] `Promise.all()` used for parallel data fetches
- [ ] `useMemo()` used for expensive calculations
- [ ] `memo()` wraps frequently re-rendered components
- [ ] `dynamic()` with `ssr: false` for browser-only libraries
- [ ] Suspense boundaries with skeleton fallbacks

---

## Notion API Integration (Future)

When replacing mock data with Notion API:

```typescript
// src/lib/data-service.ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const getPortfolios = cache(async (): Promise<Portfolio[]> => {
  const response = await notion.databases.query({
    database_id: process.env.PORTFOLIO_DATABASE_ID!,
  });

  return response.results.map(mapNotionToPortfolio);
});
```

**Environment Variables** (`.env.local`):
```
NOTION_API_KEY=secret_xxx
PORTFOLIO_DATABASE_ID=xxx
EXCHANGE_RATE_DATABASE_ID=xxx
DIVIDEND_LOG_DATABASE_ID=xxx
```

---

## Prohibited Actions

### Code Style

- **NEVER** use `getServerSideProps` or `getStaticProps` (Pages Router patterns)
- **NEVER** use inline styles except for truly dynamic values
- **NEVER** use arbitrary Tailwind values like `bg-[#fff]`
- **NEVER** import with relative paths (`../components/`), use `@/` alias
- **NEVER** export arrow function components

### File Operations

- **NEVER** manually create or modify files in `src/components/ui/`
- **NEVER** create unnecessary API routes for server-side fetchable data
- **NEVER** commit `.env` or `.env.local` files

### Dependencies

- **NEVER** install additional CSS frameworks (Tailwind only)
- **NEVER** install state management libraries unless explicitly needed
- **NEVER** use deprecated React patterns (class components, legacy context)

### Security

- **NEVER** expose API keys in client-side code
- **NEVER** use `dangerouslySetInnerHTML` without sanitization
- **NEVER** log sensitive data to console in production

---

## Code Pattern Examples

### DO: Server Component with Data Fetching

```typescript
// src/app/page.tsx
import { Suspense } from "react";
import { getAllDashboardData } from "@/lib/data-service";
import { DashboardContent } from "@/components/dashboard-content";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";

async function DashboardLoader() {
  const data = await getAllDashboardData();
  return <DashboardContent {...data} />;
}

export default function Home() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardLoader />
    </Suspense>
  );
}
```

### DON'T: Client-side fetching when server-side is possible

```typescript
// DON'T: Unnecessary client-side fetch
"use client";

export function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard').then(r => r.json()).then(setData);
  }, []);

  return <Content data={data} />;
}
```

### DO: Proper Import Paths

```typescript
// DO: Use @/ alias
import { Card } from "@/components/ui/card";
import { formatUSD } from "@/lib/dividend-utils";
import type { Portfolio } from "@/types/dividend";

// DON'T: Relative imports
import { Card } from "../../components/ui/card";
```

---

## Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check

# Add shadcn/ui component
npx shadcn@latest add <component-name>

# Common components to add
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add form
```

---

## AI Decision Tree Summary

```
TASK: Add new feature
├── Needs new data type?
│   └── YES → Add interface to src/types/dividend.ts
├── Needs data fetching?
│   └── YES → Add cache() function to src/lib/data-service.ts
├── Needs data transformation?
│   └── YES → Add utility to src/lib/dividend-utils.ts
├── Needs UI component?
│   ├── Is it a shadcn/ui primitive?
│   │   └── YES → Run: npx shadcn@latest add <name>
│   └── NO → Create src/components/<kebab-case>.tsx
├── Needs interactivity?
│   └── YES → Add "use client" directive
├── Uses browser-only library?
│   └── YES → Use dynamic() with ssr: false
└── Render in page?
    └── Add to appropriate page.tsx with Suspense if async
```
