/**
 * Tail Worker for processing logs from the main Worker
 * Deploy this separately with: wrangler deploy --name nomoji-tail-worker
 *
 * See: https://developers.cloudflare.com/workers/observability/logs/tail-workers/
 */

interface TailEvent {
  logs: TailLog[];
  exceptions: TailException[];
  scriptName: string;
  outcome: "ok" | "exception" | "exceededCpu" | "exceededMemory" | "unknown";
}

interface TailLog {
  message: any[];
  level: "log" | "debug" | "info" | "warn" | "error";
  timestamp: number;
}

interface TailException {
  name: string;
  message: string;
  timestamp: number;
}

interface Env {
  // Add bindings for external services (e.g., Sentry, Datadog, Honeycomb)
  SENTRY_DSN?: string;
  DATADOG_API_KEY?: string;
  HONEYCOMB_API_KEY?: string;
}

/**
 * Tail handler processes logs and exceptions from the main Worker
 */
export default {
  async tail(events: TailEvent[], env: Env, _ctx: ExecutionContext) {
    // Process each batch of tail events
    for (const event of events) {
      // Log processing
      for (const log of event.logs) {
        await processLog(log, event, env);
      }

      // Exception processing
      for (const exception of event.exceptions) {
        await processException(exception, event, env);
      }

      // Outcome tracking
      if (event.outcome !== "ok") {
        await trackFailedRequest(event, env);
      }
    }
  },
};

/**
 * Process individual log entries
 */
async function processLog(log: TailLog, _event: TailEvent, env: Env) {
  // Parse structured logs (our logs are JSON strings)
  try {
    if (typeof log.message[0] === "string") {
      const logData = JSON.parse(log.message[0]);

      // Send to external logging service
      if (logData.level === "error") {
        await sendToExternalService(logData, env);
      }

      // Track specific metrics
      if (logData.message?.includes("Request completed")) {
        await trackRequestMetrics(logData);
      }
    }
  } catch (error) {
    // Log parsing failed, send raw log
    console.error("Failed to parse log", error);
  }
}

/**
 * Process exceptions
 */
async function processException(
  exception: TailException,
  event: TailEvent,
  env: Env,
) {
  const errorData = {
    name: exception.name,
    message: exception.message,
    timestamp: new Date(exception.timestamp).toISOString(),
    scriptName: event.scriptName,
  };

  // Send to error tracking service (e.g., Sentry)
  if (env.SENTRY_DSN) {
    await sendToSentry(errorData, env.SENTRY_DSN);
  }

  console.error("Exception in worker", errorData);
}

/**
 * Track failed requests
 */
async function trackFailedRequest(event: TailEvent, _env: Env) {
  console.warn("Worker request failed", {
    outcome: event.outcome,
    scriptName: event.scriptName,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Send log data to external service
 */
async function sendToExternalService(_logData: any, env: Env) {
  // Example: Send to custom logging endpoint
  // Implement based on your logging service (Datadog, Honeycomb, etc.)

  if (env.DATADOG_API_KEY) {
    // Send to Datadog
    // await fetch('https://http-intake.logs.datadoghq.com/v1/input', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'DD-API-KEY': env.DATADOG_API_KEY,
    //   },
    //   body: JSON.stringify(logData),
    // });
  }
}

/**
 * Send exception to Sentry
 */
async function sendToSentry(errorData: any, sentryDsn: string) {
  // Basic Sentry error reporting
  // For production, use @sentry/cloudflare-workers
  try {
    const sentryUrl = new URL(sentryDsn);
    const projectId = sentryUrl.pathname.split("/").pop();
    const key = sentryUrl.username;

    await fetch(`https://sentry.io/api/${projectId}/store/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sentry-Auth": `Sentry sentry_version=7, sentry_key=${key}`,
      },
      body: JSON.stringify({
        exception: {
          values: [
            {
              type: errorData.name,
              value: errorData.message,
            },
          ],
        },
        timestamp: errorData.timestamp,
        tags: {
          script: errorData.scriptName,
        },
      }),
    });
  } catch (error) {
    console.error("Failed to send to Sentry", error);
  }
}

/**
 * Track request metrics
 */
async function trackRequestMetrics(_logData: any) {
  // Example: aggregate metrics and send to time-series database
  // Could use InfluxDB, Prometheus, CloudWatch, etc.
}
