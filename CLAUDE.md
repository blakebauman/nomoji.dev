# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

nomoji.dev is a Cloudflare Workers API built with TypeScript and Hono that manages emoji usage configuration for AI coding assistants. It generates rules for Claude, Cursor, Copilot, and other AI tools.

## Commands

```bash
# Development
npm run dev              # Local dev server via wrangler
npm run deploy           # Deploy to Cloudflare Workers

# Testing
npm run test             # Single test run
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# Linting & Formatting (Biome)
npm run check            # Lint + format (write)
npm run check:ci         # CI mode (no writes)
npm run lint             # Lint only (write)
npm run format           # Format only (write)
npm run type-check       # tsc --noEmit

# Run a single test file
npx vitest run src/path/to/test.spec.ts
```

## Architecture

**Runtime**: Cloudflare Workers with KV storage and Analytics Engine.

**Entry point**: [src/index.ts](src/index.ts) — Hono app wiring routes and middleware.

**Key directories**:
- [src/routes/](src/routes/) — API endpoint handlers with OpenAPI specs
- [src/rules/](src/rules/) — Rule generators per AI assistant (claude.ts, cursor.ts, generator.ts)
- [src/middleware/](src/middleware/) — CORS, rate limiting, security, observability
- [src/schemas/](src/schemas/) — Zod validation schemas
- [src/views/](src/views/) — JSX/TSX components for HTML pages (landing, setup wizard, integration guides)
- [src/config/](src/config/) — Default configs and presets (strict/moderate/relaxed)
- [src/utils/](src/utils/) — Emoji detection, KV storage, caching, SEO helpers

**Background work**:
- [src/scheduled.ts](src/scheduled.ts) — Cron handlers (runs at `0 2 * * *` and `0 * * * *`)
- [src/tail.ts](src/tail.ts) — Tail worker for logging/monitoring

**Infrastructure** ([wrangler.jsonc](wrangler.jsonc)):
- KV namespace: `PREFERENCES` — stores user configurations
- Analytics Engine: observability/telemetry
- Environments: dev, staging, production
- CPU limit: 50ms; Smart placement enabled

## Key Conventions

- **Validation**: All request/response schemas use Zod + `@hono/zod-openapi`
- **API docs**: Served via Scalar at the API docs route
- **Formatting**: Biome with 2-space indent, 80-char line width — run `npm run check` before committing
- **Git hooks**: Lefthook manages pre-commit checks
- **Tests**: Vitest with `@cloudflare/vitest-pool-workers` — tests run inside the Workers runtime
