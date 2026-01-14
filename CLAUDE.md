# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>   # e.g., button, card, dialog
```

## Architecture

This is a Next.js 15 App Router project with TypeScript and React 19.

**Directory Structure:**
- `src/app/` - App Router pages and layouts (file-based routing)
- `src/components/` - React components (shadcn/ui components go in `src/components/ui/`)
- `src/lib/` - Utility functions and shared logic
- `src/hooks/` - Custom React hooks

**Import Alias:** Use `@/*` to import from `src/*` (e.g., `import { cn } from "@/lib/utils"`)

## Styling

- Tailwind CSS with CSS variables for theming (defined in `src/app/globals.css`)
- shadcn/ui uses "new-york" style with React Server Components enabled
- Use the `cn()` utility from `@/lib/utils` for conditional class merging
- Dark mode is configured via class strategy (`darkMode: ["class"]`)
- Semantic color tokens: `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`
- Icon library: Lucide React (`lucide-react`)
