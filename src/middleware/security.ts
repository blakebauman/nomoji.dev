import type { Context, Next } from "hono";
import type { Env, Variables } from "../types";

/**
 * Security middleware for headers and policies
 */

/**
 * Content Security Policy middleware
 */
export function securityHeaders() {
  return async (
    c: Context<{ Bindings: Env; Variables: Variables }>,
    next: Next,
  ) => {
    await next();

    // Only apply CSP to HTML responses
    const contentType = c.res.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
      // Strict CSP for HTML pages
      c.res.headers.set(
        "Content-Security-Policy",
        [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net", // Allow Scalar CDN
          "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net", // Allow Scalar CDN styles
          "img-src 'self' data: https:",
          "font-src 'self' data: https://cdn.jsdelivr.net", // Allow Scalar fonts
          "connect-src 'self' http://localhost:* https://nomoji.dev https://api.nomoji.dev https://cdn.jsdelivr.net", // Allow API calls
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; "),
      );
    }

    // Security headers for all responses
    c.res.headers.set("X-Content-Type-Options", "nosniff");
    c.res.headers.set("X-Frame-Options", "DENY");
    c.res.headers.set("X-XSS-Protection", "1; mode=block");
    c.res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    c.res.headers.set(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=()",
    );

    // HSTS (HTTP Strict Transport Security)
    if (c.env.ENVIRONMENT === "production") {
      c.res.headers.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains; preload",
      );
    }
  };
}

/**
 * Request size limit middleware
 */
export function requestSizeLimit(maxBytes: number = 100 * 1024) {
  return async (c: Context, next: Next) => {
    const contentLength = c.req.header("content-length");

    if (contentLength && Number.parseInt(contentLength, 10) > maxBytes) {
      return c.json(
        {
          success: false,
          error: `Request body too large. Maximum size is ${maxBytes} bytes.`,
        },
        413,
      );
    }

    await next();
  };
}

/**
 * API key validation middleware (optional, for future use)
 */
export function validateApiKey() {
  return async (
    c: Context<{ Bindings: Env; Variables: Variables }>,
    next: Next,
  ) => {
    // Skip in development
    if (c.env.ENVIRONMENT === "development") {
      return await next();
    }

    const apiKey = c.req.header("x-api-key");

    // For now, API key is optional
    // In the future, you can enforce it for certain endpoints
    if (apiKey) {
      // TODO: Validate API key against KV or database
      c.set("apiKey", apiKey);
    }

    await next();
  };
}
