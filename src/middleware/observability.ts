import type { Context } from "hono";
import type { Env, Variables } from "../types";

/**
 * Log levels following industry standards
 */
export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

/**
 * Structured logger for observability
 */
export class Logger {
  constructor(
    private requestId: string,
    private env: Env,
    private logLevel: LogLevel = LogLevel.INFO,
  ) {}

  private shouldLog(level: LogLevel): boolean {
    const levels = [
      LogLevel.DEBUG,
      LogLevel.INFO,
      LogLevel.WARN,
      LogLevel.ERROR,
    ];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  private formatLog(level: LogLevel, message: string, data?: any) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      requestId: this.requestId,
      message,
      environment: this.env.ENVIRONMENT,
      ...(data && { data }),
    });
  }

  debug(message: string, data?: any) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatLog(LogLevel.DEBUG, message, data));
    }
  }

  info(message: string, data?: any) {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatLog(LogLevel.INFO, message, data));
    }
  }

  warn(message: string, data?: any) {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatLog(LogLevel.WARN, message, data));
    }
  }

  error(message: string, error?: Error | any, data?: any) {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(
        this.formatLog(LogLevel.ERROR, message, {
          error: error?.message || error,
          stack: error?.stack,
          ...data,
        }),
      );
    }
  }
}

/**
 * Analytics data point structure
 */
interface AnalyticsDataPoint {
  blobs?: string[];
  doubles?: number[];
  indexes?: string[];
}

/**
 * Analytics helper for tracking metrics
 */
export class Analytics {
  constructor(private env: Env) {}

  /**
   * Track API request metrics
   */
  async trackRequest(data: {
    endpoint: string;
    method: string;
    statusCode: number;
    duration: number;
    userId?: string;
    userAgent?: string;
    country?: string;
  }) {
    if (!this.env.ANALYTICS) return;

    try {
      const dataPoint: AnalyticsDataPoint = {
        blobs: [
          data.endpoint,
          data.method,
          data.userId || "anonymous",
          data.userAgent || "unknown",
          data.country || "unknown",
        ],
        doubles: [data.statusCode, data.duration],
        indexes: [data.endpoint],
      };

      this.env.ANALYTICS.writeDataPoint(dataPoint);
    } catch (error) {
      console.error("Failed to write analytics", error);
    }
  }

  /**
   * Track configuration changes
   */
  async trackConfigChange(data: {
    userId: string;
    action: "create" | "update" | "delete";
    preset?: string;
  }) {
    if (!this.env.ANALYTICS) return;

    try {
      const dataPoint: AnalyticsDataPoint = {
        blobs: [
          "config_change",
          data.action,
          data.userId,
          data.preset || "custom",
        ],
        indexes: ["config_change"],
      };

      this.env.ANALYTICS.writeDataPoint(dataPoint);
    } catch (error) {
      console.error("Failed to write analytics", error);
    }
  }

  /**
   * Track emoji analysis requests
   */
  async trackAnalysis(data: {
    hasEmojis: boolean;
    emojiCount: number;
    textLength: number;
  }) {
    if (!this.env.ANALYTICS) return;

    try {
      const dataPoint: AnalyticsDataPoint = {
        blobs: ["emoji_analysis", data.hasEmojis ? "has_emojis" : "clean"],
        doubles: [data.emojiCount, data.textLength],
        indexes: ["emoji_analysis"],
      };

      this.env.ANALYTICS.writeDataPoint(dataPoint);
    } catch (error) {
      console.error("Failed to write analytics", error);
    }
  }

  /**
   * Track errors
   */
  async trackError(data: {
    endpoint: string;
    error: string;
    statusCode: number;
  }) {
    if (!this.env.ANALYTICS) return;

    try {
      const dataPoint: AnalyticsDataPoint = {
        blobs: ["error", data.endpoint, data.error],
        doubles: [data.statusCode],
        indexes: ["error"],
      };

      this.env.ANALYTICS.writeDataPoint(dataPoint);
    } catch (error) {
      console.error("Failed to write error analytics", error);
    }
  }
}

/**
 * Performance tracker for timing operations
 */
export class PerformanceTracker {
  private startTime: number;
  private marks: Map<string, number> = new Map();

  constructor() {
    this.startTime = Date.now();
  }

  mark(name: string) {
    this.marks.set(name, Date.now());
  }

  getDuration(fromMark?: string): number {
    const start = fromMark
      ? this.marks.get(fromMark) || this.startTime
      : this.startTime;
    return Date.now() - start;
  }

  getMarkDuration(startMark: string, endMark: string): number {
    const start = this.marks.get(startMark);
    const end = this.marks.get(endMark);
    if (!start || !end) return 0;
    return end - start;
  }

  getAllMarks(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const [name, time] of this.marks.entries()) {
      result[name] = time - this.startTime;
    }
    return result;
  }
}

/**
 * Generate unique request ID
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Observability middleware for Hono
 */
export function observability() {
  return async (
    c: Context<{ Bindings: Env; Variables: Variables }>,
    next: Function,
  ) => {
    const requestId = generateRequestId();
    const perf = new PerformanceTracker();

    // Get log level from environment
    const logLevel = (c.env.LOG_LEVEL as LogLevel) || LogLevel.INFO;
    const logger = new Logger(requestId, c.env, logLevel);
    const analytics = new Analytics(c.env);

    // Attach to context
    c.set("requestId", requestId);
    c.set("logger", logger);
    c.set("analytics", analytics);
    c.set("perf", perf);

    // Extract request metadata
    const method = c.req.method;
    const url = new URL(c.req.url);
    const path = url.pathname;
    const userAgent = c.req.header("user-agent") || "unknown";
    const cfRay = c.req.header("cf-ray") || "unknown";
    const country = (c.req.raw?.cf?.country as string) || "unknown";

    // Log incoming request
    logger.info("Request received", {
      method,
      path,
      userAgent,
      cfRay,
      country,
    });

    perf.mark("request_start");

    try {
      // Process request
      await next();

      perf.mark("request_end");
      const duration = perf.getDuration();

      // Log successful response
      logger.info("Request completed", {
        method,
        path,
        statusCode: c.res.status,
        duration,
      });

      // Track in analytics
      await analytics.trackRequest({
        endpoint: path,
        method,
        statusCode: c.res.status,
        duration,
        userAgent,
        country,
      });

      // Add observability headers
      c.res.headers.set("X-Request-Id", requestId);
      c.res.headers.set("X-Response-Time", `${duration}ms`);

      // Add timing header for client-side metrics
      if (perf.getAllMarks()) {
        c.res.headers.set(
          "Server-Timing",
          Object.entries(perf.getAllMarks())
            .map(([name, time]) => `${name};dur=${time}`)
            .join(", "),
        );
      }
    } catch (error: any) {
      perf.mark("error");
      const duration = perf.getDuration();

      // Log error
      logger.error("Request failed", error, {
        method,
        path,
        duration,
      });

      // Track error in analytics
      await analytics.trackError({
        endpoint: path,
        error: error?.message || "Unknown error",
        statusCode: 500,
      });

      // Re-throw to be handled by error middleware
      throw error;
    }
  };
}

/**
 * Error tracking middleware
 */
export function errorHandler() {
  return async (
    error: Error,
    c: Context<{ Bindings: Env; Variables: Variables }>,
  ) => {
    const logger = c.get("logger") as Logger;
    const analytics = c.get("analytics") as Analytics;
    const requestId = c.get("requestId") as string;

    // Determine status code
    const statusCode = (error as any).statusCode || 500;

    // Log the error
    if (logger) {
      logger.error("Unhandled error", error, {
        statusCode,
        path: c.req.path,
      });
    }

    // Track in analytics
    if (analytics) {
      await analytics.trackError({
        endpoint: c.req.path,
        error: error.message,
        statusCode,
      });
    }

    // Return error response
    return c.json(
      {
        success: false,
        error:
          c.env.ENVIRONMENT === "production"
            ? "Internal server error"
            : error.message,
        requestId,
      },
      statusCode,
    );
  };
}

/**
 * Health check endpoint data
 */
export interface HealthCheckData {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version?: string;
  checks: {
    kv: {
      status: "ok" | "error";
      message?: string;
    };
    analytics?: {
      status: "ok" | "error";
      message?: string;
    };
  };
}

/**
 * Health check utility
 */
export async function healthCheck(env: Env): Promise<HealthCheckData> {
  const checks: HealthCheckData["checks"] = {
    kv: { status: "error", message: "Not checked" },
  };

  // Check KV availability
  try {
    await env.PREFERENCES.get("health_check");
    checks.kv = { status: "ok" };
  } catch (error) {
    checks.kv = {
      status: "error",
      message: error instanceof Error ? error.message : "KV check failed",
    };
    console.error("KV health check failed", error);
  }

  // Check Analytics Engine availability
  try {
    if (env.ANALYTICS) {
      checks.analytics = { status: "ok" };
    }
  } catch (error) {
    checks.analytics = {
      status: "error",
      message:
        error instanceof Error ? error.message : "Analytics check failed",
    };
    console.error("Analytics health check failed", error);
  }

  const kvHealthy = checks.kv.status === "ok";
  const analyticsHealthy = checks.analytics
    ? checks.analytics.status === "ok"
    : true;
  const allHealthy = kvHealthy && analyticsHealthy;
  const someHealthy = kvHealthy || analyticsHealthy;

  return {
    status: allHealthy ? "healthy" : someHealthy ? "degraded" : "unhealthy",
    timestamp: new Date().toISOString(),
    version: env.VERSION,
    checks,
  };
}
