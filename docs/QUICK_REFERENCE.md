# Quick Reference - Security & Performance Features

## New Middleware

### CORS (Environment-Aware)
```typescript
import { corsMiddleware } from "./middleware/cors";
app.use("*", corsMiddleware());
```
- **Production**: Strict origin restrictions
- **Development**: Permissive

### Input Validation
```typescript
import { validateUserId, validateConfigBody } from "./middleware/validation";
app.post("/api/config/:userId", validateUserId(), validateConfigBody(), handler);
```
- Returns 400 for invalid input
- Validates IDs, UUIDs, presets, configs

**User ID Format:**
- Pattern: `/^[a-zA-Z0-9._-]{3,64}$/`
- Valid: `john-doe`, `my_project`, `team.alpha`
- Invalid: `ab` (too short), `user@email` (invalid char)
- [Full documentation →](API.md#user-id-parameter)

### Rate Limiting
```typescript
import { RateLimitPresets } from "./middleware/ratelimit";
app.use("/api/*", RateLimitPresets.moderate);  // 100/min
app.post("/api/*", RateLimitPresets.writes);   // 20/min
```
- Returns 429 with Retry-After header
- Per-user/IP tracking

### Security Headers
```typescript
import { securityHeaders, requestSizeLimit } from "./middleware/security";
app.use("*", securityHeaders());
app.use("*", requestSizeLimit(100 * 1024));  // 100KB limit
```
- CSP, HSTS, X-Frame-Options, etc.
- Returns 413 for oversized requests

### Caching
```typescript
import { cacheMiddleware, CachePresets } from "./utils/cache";
app.get("/api/presets", cacheMiddleware(CachePresets.long), handler);
```
- **Short**: 1 min
- **Medium**: 5 min
- **Long**: 1 hour
- **Immutable**: 1 day

## Usage Examples

### Secure Endpoint (Full Stack)
```typescript
app.post(
  "/api/config/:userId",
  validateUserId(),           // Validate input
  RateLimitPresets.writes,    // 20 req/min
  validateConfigBody(),       // Validate body
  async (c) => {
    // Your handler
  }
);
```

### Cached GET Endpoint
```typescript
app.get(
  "/api/config/:userId",
  validateUserId(),           // Validate input
  cacheMiddleware(CachePresets.short), // 1 min cache
  async (c) => {
    // Your handler
  }
);
```

## Testing Commands

### Test Rate Limiting
```bash
# Exceed rate limit
for i in {1..101}; do curl https://nomoji.dev/api/presets; done
# 101st request returns 429
```

### Test Validation
```bash
# Invalid user ID
curl https://nomoji.dev/api/config/ab
# Returns 400

# Invalid UUID
curl https://nomoji.dev/api/shared/not-a-uuid
# Returns 400
```

### Test Caching
```bash
# Check cache headers
curl -I https://nomoji.dev/api/presets
# First: X-Cache: MISS
# Second: X-Cache: HIT
```

### Test Security Headers
```bash
curl -I https://nomoji.dev/
# Check for:
# - Content-Security-Policy
# - X-Frame-Options: DENY
# - X-Content-Type-Options: nosniff
# - Strict-Transport-Security (production)
```

## Environment Configuration

### Development
```jsonc
{
  "env": "development",
  "cors": "permissive",
  "rateLimit": "disabled",
  "cache": "disabled"
}
```

### Production
```jsonc
{
  "env": "production",
  "cors": "strict",
  "rateLimit": "enabled",
  "cache": "enabled"
}
```

## HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful request |
| 400 | Bad Request | Invalid input/validation failure |
| 404 | Not Found | Resource doesn't exist |
| 413 | Payload Too Large | Request body > 100KB |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unhandled exception |

## Response Headers

### Security
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (production)

### Rate Limiting
- `X-RateLimit-Limit: 100`
- `X-RateLimit-Remaining: 50`
- `X-RateLimit-Reset: 2025-11-05T10:00:00Z`
- `Retry-After: 60` (on 429)

### Caching
- `X-Cache: HIT` or `MISS`
- `X-Cache-Key: <key>`
- `Cache-Control: public, max-age=300`

### Observability
- `X-Request-Id: req_123456789_abc`
- `X-Response-Time: 45ms`
- `Server-Timing: request_start;dur=45`

## Key Files

| File | Purpose |
|------|---------|
| `src/middleware/cors.ts` | CORS configuration |
| `src/middleware/validation.ts` | Input validation |
| `src/middleware/ratelimit.ts` | Rate limiting |
| `src/middleware/security.ts` | Security headers |
| `src/utils/cache.ts` | Cache API |
| `src/index.ts` | Main application |
| `docs/SECURITY_IMPROVEMENTS.md` | Full documentation |
| `IMPROVEMENTS_SUMMARY.md` | Implementation summary |

## Monitoring

### Cloudflare Dashboard
1. Workers → Your Worker
2. Metrics → View analytics
3. Logs → Real-time logs

### Wrangler CLI
```bash
# View logs
wrangler tail

# View deployments
wrangler deployments list

# Rollback
wrangler rollback
```

### Analytics Queries
```sql
-- Cache hit ratio
SELECT blob1, COUNT(*) FROM analytics WHERE index1 = 'cache' GROUP BY blob1

-- Rate limit violations
SELECT COUNT(*) FROM analytics WHERE double1 = 429

-- Average response time
SELECT AVG(double2) FROM analytics WHERE index1 = 'request'
```

## Common Tasks

### Update Rate Limits
Edit `src/middleware/ratelimit.ts`:
```typescript
export const CustomLimit = rateLimit({
  maxRequests: 200,
  windowSeconds: 60,
});
```

### Update Cache TTLs
Edit `src/utils/cache.ts`:
```typescript
export const CustomCache = {
  ttl: 600, // 10 minutes
};
```

### Add Allowed Origin
Edit `src/middleware/cors.ts`:
```typescript
const allowedOrigins = [
  "https://nomoji.dev",
  "https://your-domain.com", // Add here
];
```

## Troubleshooting

### 429 Too Many Requests
- Increase rate limit preset
- Use different user ID/IP
- Wait for window to reset

### 400 Bad Request
- Check input format (user ID, UUID, etc.)
- Validate request body structure
- Check validation middleware logs

### Cache Not Working
- Verify environment is not "development"
- Check if response is 200 OK
- Verify Cache-Control headers

### CORS Errors
- Add origin to allowedOrigins list
- Check environment configuration
- Verify request origin

## Best Practices

1. **Always validate input** - Use validation middleware
2. **Rate limit writes** - Protect against abuse
3. **Cache reads** - Reduce KV reads and improve performance
4. **Set appropriate TTLs** - Balance freshness and performance
5. **Monitor metrics** - Track cache hits, rate limits, errors
6. **Use proper status codes** - Help clients handle errors
7. **Log structured data** - Enable better debugging

---

**Need Help?**
- [Full Documentation](./SECURITY_IMPROVEMENTS.md)
- [Best Practices Checklist](./BEST_PRACTICES_CHECKLIST.md)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)

