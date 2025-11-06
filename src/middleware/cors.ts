import type { Context, Next } from "hono";
import { cors as honoCors } from "hono/cors";
import type { Env } from "../types";

/**
 * Environment-aware CORS configuration
 * Restricts origins based on environment
 */
export function corsMiddleware() {
  return async (c: Context<{ Bindings: Env }>, next: Next) => {
    const env = c.env.ENVIRONMENT || "production";

    // Define allowed origins based on environment
    const allowedOrigins =
      env === "development"
        ? ["http://localhost:8787", "http://127.0.0.1:8787"]
        : env === "staging"
          ? [
              "https://staging.nomoji.dev",
              "https://nomoji.dev",
              "https://api.nomoji.dev",
            ]
          : [
              "https://nomoji.dev",
              "https://api.nomoji.dev",
              "https://www.nomoji.dev",
            ];

    // Apply CORS with environment-specific configuration
    return honoCors({
      origin: (origin) => {
        // Allow requests with no origin (like curl, Postman)
        if (!origin) return origin;

        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
          return origin;
        }

        // In development, be more permissive
        if (env === "development") {
          return origin;
        }

        // Reject unauthorized origins in production
        return allowedOrigins[0];
      },
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
      exposeHeaders: ["X-Request-Id", "X-Response-Time", "Server-Timing"],
      credentials: true,
      maxAge: 86400, // 24 hours
    })(c, next);
  };
}
