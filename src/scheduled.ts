import { Logger, LogLevel } from "./middleware/observability";
import type { Env } from "./types";

/**
 * Scheduled event handler for cron triggers
 * See: https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/
 */
export async function scheduled(
  event: ScheduledEvent,
  env: Env,
  _ctx: ExecutionContext,
) {
  const logger = new Logger(`cron_${Date.now()}`, env, LogLevel.INFO);

  logger.info("Scheduled task triggered", {
    cron: event.cron,
    scheduledTime: new Date(event.scheduledTime).toISOString(),
  });

  // Determine which task to run based on cron schedule
  if (event.cron === "0 2 * * *") {
    // Daily cleanup at 2 AM
    await cleanupOldConfigs(env, logger);
  } else if (event.cron === "0 * * * *") {
    // Hourly analytics aggregation
    await aggregateAnalytics(env, logger);
  }

  logger.info("Scheduled task completed");
}

/**
 * Clean up old shared configurations (older than 30 days)
 */
async function cleanupOldConfigs(env: Env, logger: Logger) {
  logger.info("Starting config cleanup");

  try {
    const prefix = "config:";
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

    // List all config keys
    const list = await env.PREFERENCES.list({ prefix });
    let deletedCount = 0;

    for (const key of list.keys) {
      const value = await env.PREFERENCES.get(key.name, "json");
      if (value && typeof value === "object") {
        const metadata = (value as any).metadata;
        if (metadata?.createdAt) {
          const createdAt = new Date(metadata.createdAt).getTime();
          if (createdAt < thirtyDaysAgo) {
            await env.PREFERENCES.delete(key.name);
            deletedCount++;
          }
        }
      }
    }

    logger.info("Config cleanup completed", { deletedCount });
  } catch (error) {
    logger.error("Config cleanup failed", error as Error);
  }
}

/**
 * Aggregate analytics data
 * In production, you might want to:
 * - Calculate daily/weekly stats
 * - Store aggregated data in KV
 * - Send reports to external services
 */
async function aggregateAnalytics(env: Env, logger: Logger) {
  logger.info("Starting analytics aggregation");

  try {
    // Placeholder for analytics aggregation logic
    // This could query Analytics Engine and store summaries

    // Example: Store hourly request count
    const timestamp = new Date().toISOString();
    await env.PREFERENCES.put(
      `analytics:hourly:${timestamp}`,
      JSON.stringify({
        timestamp,
        // Add aggregated metrics here
      }),
      {
        expirationTtl: 7 * 24 * 60 * 60, // Keep for 7 days
      },
    );

    logger.info("Analytics aggregation completed");
  } catch (error) {
    logger.error("Analytics aggregation failed", error as Error);
  }
}
