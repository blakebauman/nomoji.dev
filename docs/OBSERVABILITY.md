# Observability Guide

Comprehensive guide to monitoring, logging, and debugging nomoji.dev using Cloudflare Workers Observability.

## Overview

nomoji.dev implements production-grade observability with:

- **Structured Logging**: JSON-formatted logs with request IDs and context
- **Analytics Engine**: Real-time metrics and usage tracking
- **Performance Tracking**: Timing marks for critical operations
- **Error Tracking**: Comprehensive error logging and reporting
- **Health Checks**: System health monitoring endpoints
- **Source Maps**: Uploaded for better debugging

## Configuration

### Wrangler Configuration

The `wrangler.jsonc` includes observability settings:

```jsonc
{
  "observability": {
    "enabled": true,
    "head_sampling_rate": 1.0  // Sample 100% in dev, 10% in production
  },
  "upload_source_maps": true,
  "analytics_engine_datasets": [
    {
      "binding": "ANALYTICS"
    }
  ]
}
```

[See full configuration reference →](https://developers.cloudflare.com/workers/wrangler/configuration/#observability)

## Structured Logging

### Log Levels

- **DEBUG**: Detailed information for debugging
- **INFO**: General informational messages
- **WARN**: Warning messages for potential issues
- **ERROR**: Error messages for failures

### Log Format

All logs are JSON-formatted for easy parsing:

```json
{
  "timestamp": "2025-11-05T10:30:45.123Z",
  "level": "info",
  "requestId": "req_1234567890_abc123",
  "message": "Request completed",
  "environment": "production",
  "data": {
    "method": "GET",
    "path": "/api/config/user123",
    "statusCode": 200,
    "duration": 45
  }
}
```

### Setting Log Level

Configure via environment variable in `wrangler.jsonc`:

```jsonc
{
  "vars": {
    "LOG_LEVEL": "info"  // debug | info | warn | error
  }
}
```

## Viewing Logs

### Real-time Logs (Development)

```bash
# Start dev server with logs
wrangler dev

# Tail logs from production
wrangler tail
```

### Workers Logs (Production)

View logs in the Cloudflare Dashboard:

1. Go to Workers & Pages
2. Select your Worker
3. Click "Logs" tab
4. Filter by log level, time range, or search text

[Learn more about Workers Logs →](https://developers.cloudflare.com/workers/observability/logs/workers-logs/)

### Real-time Log Streaming

Stream logs to your terminal:

```bash
# Stream all logs
wrangler tail

# Filter by status code
wrangler tail --status=error

# Filter by HTTP method
wrangler tail --method=POST

# Filter by search term
wrangler tail --search="emoji"

# Format as JSON
wrangler tail --format=json
```

[Learn more about real-time logs →](https://developers.cloudflare.com/workers/observability/logs/real-time-logs/)

## Analytics Engine

### Tracked Metrics

nomoji.dev automatically tracks:

**Request Metrics:**
- Endpoint accessed
- HTTP method
- Response status code
- Request duration
- User agent
- Country/region

**Configuration Metrics:**
- Config creations
- Config updates
- Config deletions
- Preset applications

**Analysis Metrics:**
- Text analysis requests
- Emoji detection results
- Text lengths analyzed

### Querying Analytics

Use the [Cloudflare Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) or Dashboard:

1. Go to Analytics & Logs
2. Select Workers Analytics
3. Build custom queries with Query Builder

Example queries:

```sql
-- Cache hit ratio
SELECT 
  SUM(CASE WHEN blob1 = 'HIT' THEN 1 ELSE 0 END) / COUNT(*) as hit_ratio
FROM analytics
WHERE index1 = 'cache'

-- Rate limit violations
SELECT COUNT(*) as rate_limit_hits
FROM analytics
WHERE double1 = 429

-- Average response time by endpoint
SELECT blob1 as endpoint, AVG(double2) as avg_duration
FROM analytics
WHERE index1 = 'request'
GROUP BY blob1
```

## Performance Tracking

### Timing Marks

The `PerformanceTracker` class tracks operation timing:

```typescript
const perf = c.get('perf') as PerformanceTracker;

// Mark start of operation
perf.mark('db_query_start');

// ... perform operation ...

// Mark end
perf.mark('db_query_end');

// Get duration
const duration = perf.getMarkDuration('db_query_start', 'db_query_end');
```

### Response Headers

Each response includes timing information:

- `X-Request-Id`: Unique request identifier
- `X-Response-Time`: Total request duration in ms
- `Server-Timing`: Detailed timing breakdown

Example:
```
X-Request-Id: req_1234567890_abc123
X-Response-Time: 45ms
Server-Timing: request_start;dur=0, db_query_start;dur=10, db_query_end;dur=35
```

## Health Checks

### Health Endpoint

Monitor service health:

```bash
curl https://nomoji.dev/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-05T10:30:45.123Z",
  "version": "1.0.0",
  "environment": "production",
  "checks": {
    "kv": true,
    "analytics": true
  }
}
```

Status values:
- `healthy`: All systems operational
- `degraded`: Some services unavailable but core functionality works
- `unhealthy`: Critical services unavailable

### Status Codes

- `200`: Healthy or degraded
- `503`: Unhealthy

### External Monitoring

Set up external monitoring with tools like:
- Uptime Robot
- Pingdom
- StatusCake
- Datadog Synthetics

Example cron job:
```bash
*/5 * * * * curl -f https://nomoji.dev/health || echo "Health check failed"
```

## Error Tracking

### Automatic Error Logging

All errors are automatically logged with full context:

```json
{
  "timestamp": "2025-11-05T10:30:45.123Z",
  "level": "error",
  "requestId": "req_1234567890_abc123",
  "message": "Failed to update config",
  "environment": "production",
  "data": {
    "error": "KV namespace unavailable",
    "stack": "Error: KV namespace unavailable\n    at updateUserConfig...",
    "userId": "user123",
    "statusCode": 500
  }
}
```

### Error Analytics

Errors are tracked in Analytics Engine for trending:

```typescript
await analytics.trackError({
  endpoint: '/api/config/user123',
  error: 'KV namespace unavailable',
  statusCode: 500
});
```

### Integration with Sentry

For advanced error tracking, integrate with Sentry:

```bash
npm install @sentry/cloudflare-workers
```

[Learn more about Sentry integration →](https://developers.cloudflare.com/workers/observability/integrations/sentry/)

## Tail Workers

### What are Tail Workers?

Tail Workers process logs and exceptions from your main Worker in real-time.

[Learn more about Tail Workers →](https://developers.cloudflare.com/workers/observability/logs/tail-workers/)

### Deploy Tail Worker

1. Deploy the tail worker:
```bash
wrangler deploy src/tail.ts --name nomoji-tail-worker
```

2. Bind it to your main worker in `wrangler.jsonc`:
```jsonc
{
  "tail_consumers": [
    {
      "service": "nomoji-tail-worker"
    }
  ]
}
```

3. Redeploy main worker:
```bash
wrangler deploy
```

### Tail Worker Features

The nomoji.dev tail worker:
- Parses structured logs
- Sends errors to external services (Sentry, Datadog)
- Aggregates metrics
- Tracks request outcomes

## Debugging

### Local Development

Use Wrangler's built-in debugger:

```bash
# Start with debugger
wrangler dev --local --inspector
```

Then open Chrome DevTools:
1. Open `chrome://inspect`
2. Click "Configure"
3. Add `localhost:9229`
4. Click "inspect" on your Worker

[Learn more about debugging →](https://developers.cloudflare.com/workers/observability/dev-tools/)

### Breakpoints

Set breakpoints in your code:

```typescript
// This will pause execution when hit
debugger;
```

### Source Maps

Source maps are automatically uploaded when deploying:

```bash
wrangler deploy  # Automatically uploads source maps
```

View original source in error stack traces and DevTools.

[Learn more about source maps →](https://developers.cloudflare.com/workers/observability/source-maps/)

## Best Practices

1. **Use Structured Logging**: Always log JSON for easy parsing
2. **Include Request IDs**: Trace requests across services
3. **Set Appropriate Log Levels**: Use DEBUG in dev, INFO in production
4. **Monitor Error Rates**: Set up alerts for error spikes
5. **Track Performance**: Monitor response times and identify bottlenecks
6. **Sample in Production**: Use `head_sampling_rate` to reduce costs
7. **Upload Source Maps**: Always enable for better debugging
8. **Use Health Checks**: Monitor service availability
9. **Aggregate Metrics**: Use Analytics Engine for trending
10. **Export Critical Data**: Send to external services for long-term storage

## Monitoring Scheduled Jobs

Track scheduled job execution:

```typescript
logger.info('Scheduled task triggered', {
  cron: event.cron,
  scheduledTime: new Date(event.scheduledTime).toISOString(),
});

// ... perform task ...

logger.info('Scheduled task completed', {
  duration: Date.now() - startTime,
});
```

## External Integrations

### Honeycomb

Export OpenTelemetry data to Honeycomb for advanced observability.

[Learn more →](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/export-to-honeycomb/)

### Grafana Cloud

Export to Grafana Cloud for visualization and alerting.

[Learn more →](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/export-to-grafana-cloud/)

### Axiom

Stream logs to Axiom for long-term storage and analysis.

[Learn more →](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/export-to-axiom/)

## Resources

- [Workers Observability](https://developers.cloudflare.com/workers/observability/)
- [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/)
- [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/)
- [Tracing Beta](https://developers.cloudflare.com/workers/observability/traces/)
- [DevTools](https://developers.cloudflare.com/workers/observability/dev-tools/)
- [Sentry Integration](https://developers.cloudflare.com/workers/observability/integrations/sentry/)

## Support

For issues or questions:
- Check [Cloudflare Status](https://www.cloudflarestatus.com/)
- View [Community Forum](https://community.cloudflare.com/)
- Contact Cloudflare Support

---

**Last Updated**: November 2025
**Status**: Production-ready observability stack
