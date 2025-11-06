# Testing with Vitest and Cloudflare Workers

This directory contains comprehensive tests for the nomoji.dev Cloudflare Worker using [Vitest](https://vitest.dev/) and the [@cloudflare/vitest-pool-workers](https://developers.cloudflare.com/workers/testing/vitest-integration/) integration.

## Current Status

**Note**: There is currently a known compatibility issue between Vitest 2.x and `@cloudflare/vitest-pool-workers` related to snapshot functionality. The test infrastructure is fully set up and tests are ready to run once this is resolved. Monitor the [@cloudflare/vitest-pool-workers](https://www.npmjs.com/package/@cloudflare/vitest-pool-workers) package for updates.

## Overview

The Cloudflare Workers Vitest integration allows tests to run directly inside the Workers runtime, providing:

- **Direct access to Workers APIs and bindings** (KV, Analytics Engine, etc.)
- **Isolated per-test storage** - each test gets fresh bindings
- **Fast execution** with hot-module reloading
- **Full local testing** using Miniflare

## Test Structure

### Test Files

- **`utils.test.ts`** - Unit tests for utility functions (emoji analysis)
- **`api.test.ts`** - Integration tests for API endpoints
- **`storage.test.ts`** - Tests for KV storage functions
- **`middleware.test.ts`** - Tests for middleware (security, CORS, validation, rate limiting)
- **`rules.test.ts`** - Tests for rule generation functions

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Run specific test file

```bash
npm test utils.test.ts
```

### Run tests matching a pattern

```bash
npm test -- --grep "API Endpoints"
```

## Key Features

### 1. Workers Runtime Testing

Tests run inside the actual Workers runtime using `SELF.fetch()`:

```typescript
import { SELF } from "cloudflare:test";

it("should return health status", async () => {
  const response = await SELF.fetch("https://nomoji.dev/health");
  expect(response.status).toBe(200);
});
```

### 2. Direct Binding Access

Access KV, Analytics Engine, and other bindings directly:

```typescript
import { env } from "cloudflare:test";

it("should save to KV", async () => {
  await env.PREFERENCES.put("key", "value");
  const value = await env.PREFERENCES.get("key");
  expect(value).toBe("value");
});
```

### 3. Isolated Test Storage

Each test gets its own isolated storage:

```typescript
beforeEach(async () => {
  // Clean up - but each test already has isolated storage
  await env.PREFERENCES.delete(`user:${testUserId}`);
});
```

### 4. Full API Integration Testing

Test the entire request/response cycle:

```typescript
it("should update user configuration", async () => {
  const response = await SELF.fetch(
    "https://nomoji.dev/api/config/test-user",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: true, level: "strict" }),
    }
  );

  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.success).toBe(true);
});
```

## Configuration

The test configuration is in `vitest.config.ts`:

```typescript
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: {
          configPath: "./wrangler.jsonc",
        },
      },
    },
  },
});
```

This configuration:
- Uses your `wrangler.jsonc` for Worker configuration
- Provides isolated test environments
- Enables hot-module reloading for fast test iterations

## Writing Tests

### Unit Tests

For testing individual functions:

```typescript
import { analyzeEmojis } from "../src/utils/emoji";

it("should detect emojis in text", () => {
  const result = analyzeEmojis("Hello 👋 World 🌍");
  expect(result.hasEmojis).toBe(true);
  expect(result.count).toBe(2);
});
```

### Integration Tests

For testing API endpoints with full middleware:

```typescript
import { SELF } from "cloudflare:test";

it("should apply preset configuration", async () => {
  const response = await SELF.fetch(
    "https://nomoji.dev/api/config/user/preset/strict",
    { method: "POST" }
  );
  
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.data.level).toBe("strict");
});
```

### Storage Tests

For testing KV operations:

```typescript
import { env } from "cloudflare:test";

it("should save and retrieve config", async () => {
  const config = { enabled: true, level: "strict" };
  await saveSharedConfig(env, "test-id", config);
  
  const retrieved = await getSharedConfig(env, "test-id");
  expect(retrieved).toEqual(config);
});
```

## Best Practices

1. **Use descriptive test names** - Clearly describe what is being tested
2. **Test both success and failure cases** - Include validation errors, rate limits, etc.
3. **Clean up test data** - Use `beforeEach`/`afterEach` for cleanup (though storage is isolated)
4. **Test edge cases** - Empty inputs, large payloads, concurrent operations
5. **Keep tests independent** - Each test should work in isolation
6. **Use factories for test data** - Create reusable test data generators
7. **Test middleware independently** - Verify security, CORS, rate limiting separately

## Debugging Tests

### Enable verbose logging

```bash
npm test -- --reporter=verbose
```

### Run a single test

```bash
npm test -- --grep "should detect emojis"
```

### Use console.log in tests

```typescript
it("debug test", async () => {
  console.log("Debug info:", someValue);
  // ...assertions
});
```

## Coverage

Generate coverage reports:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory and include:
- `coverage/index.html` - Interactive HTML report
- `coverage/coverage-final.json` - JSON report
- Console summary

## Continuous Integration

Tests can run in CI/CD pipelines:

```yaml
# .github/workflows/test.yml
- name: Run tests
  run: npm test

- name: Upload coverage
  run: npm run test:coverage
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Cloudflare Workers Testing Guide](https://developers.cloudflare.com/workers/testing/vitest-integration/)
- [Workers Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)
- [Miniflare Documentation](https://miniflare.dev/)

## Setup

### Dependencies

The following packages are installed for testing:

```json
{
  "devDependencies": {
    "@cloudflare/vitest-pool-workers": "0.10.4",
    "@cloudflare/workers-types": "^4.20241022.0",
    "vitest": "2.1.9"
  }
}
```

### Configuration

Test configuration is in `vitest.config.ts` at the project root. It uses the Workers pool and references `wrangler.jsonc` for Worker configuration.

## Troubleshooting

### Vitest 2.x Compatibility Issue

If you encounter:
```
TypeError: this.snapshotClient.startCurrentRun is not a function
```

This is a known issue between Vitest 2.x and the Workers pool. Workarounds:
1. Wait for official package updates
2. Use `unstable_dev` API from Wrangler
3. Run unit tests without the Workers pool
4. Use manual testing with `wrangler dev`

### Tests timing out

Increase the timeout in `vitest.config.ts`:

```typescript
export default defineWorkersConfig({
  test: {
    testTimeout: 30000, // 30 seconds
  },
});
```

### KV storage issues

Ensure you're using the `env` from `cloudflare:test`:

```typescript
import { env } from "cloudflare:test";
```

### Module resolution errors

Check that your `tsconfig.json` includes the test directory:

```json
{
  "include": ["src/**/*", "test/**/*"]
}
```

