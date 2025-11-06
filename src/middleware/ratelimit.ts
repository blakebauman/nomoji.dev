import type { Context, Next } from "hono";
import type { Env } from "../types";

/**
 * Rate limiting middleware using KV for state storage
 * Implements token bucket algorithm
 */

interface RateLimitConfig {
  maxRequests: number; // Maximum requests allowed
  windowSeconds: number; // Time window in seconds
  keyPrefix?: string; // KV key prefix
}

interface RateLimitState {
  count: number;
  resetAt: number;
}

/**
 * Create rate limit middleware
 */
export function rateLimit(config: RateLimitConfig) {
  const { maxRequests, windowSeconds, keyPrefix = "ratelimit:" } = config;

  return async (c: Context<{ Bindings: Env }>, next: Next) => {
    // Skip rate limiting in development
    if (c.env.ENVIRONMENT === "development") {
      return await next();
    }

    // Generate rate limit key based on IP or user ID
    const identifier = getIdentifier(c);
    const key = `${keyPrefix}${identifier}`;

    try {
      // Get current rate limit state
      const stateJson = await c.env.PREFERENCES.get(key);
      const now = Date.now();

      let state: RateLimitState;

      if (stateJson) {
        state = JSON.parse(stateJson);

        // Check if window has expired
        if (now > state.resetAt) {
          // Reset the window
          state = {
            count: 1,
            resetAt: now + windowSeconds * 1000,
          };
        } else if (state.count >= maxRequests) {
          // Rate limit exceeded
          const retryAfter = Math.ceil((state.resetAt - now) / 1000);

          return c.json(
            {
              success: false,
              error: "Rate limit exceeded. Please try again later.",
              retryAfter,
            },
            429,
            {
              "Retry-After": retryAfter.toString(),
              "X-RateLimit-Limit": maxRequests.toString(),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": new Date(state.resetAt).toISOString(),
            },
          );
        } else {
          // Increment counter
          state.count++;
        }
      } else {
        // First request in window
        state = {
          count: 1,
          resetAt: now + windowSeconds * 1000,
        };
      }

      // Save updated state
      // Ensure TTL is at least 60 seconds (Cloudflare KV minimum)
      const calculatedTtl = Math.ceil((state.resetAt - now) / 1000) + 10;
      const ttl = Math.max(60, calculatedTtl);
      await c.env.PREFERENCES.put(key, JSON.stringify(state), {
        expirationTtl: ttl,
      });

      // Add rate limit headers
      c.header("X-RateLimit-Limit", maxRequests.toString());
      c.header("X-RateLimit-Remaining", (maxRequests - state.count).toString());
      c.header("X-RateLimit-Reset", new Date(state.resetAt).toISOString());

      await next();
    } catch (error) {
      // If rate limiting fails, allow the request but log the error
      console.error("Rate limiting error:", error);
      await next();
    }
  };
}

/**
 * Get identifier for rate limiting (IP address or user ID)
 */
function getIdentifier(c: Context<{ Bindings: Env }>): string {
  // Try to get user ID from path parameters
  const userId = c.req.param("userId");
  if (userId) {
    return `user:${userId}`;
  }

  // Fall back to IP address
  const cfConnectingIp = c.req.header("cf-connecting-ip");
  if (cfConnectingIp) {
    return `ip:${cfConnectingIp}`;
  }

  // Last resort: use a generic key
  return "anonymous";
}

/**
 * Preset rate limit configurations
 */
export const RateLimitPresets = {
  // Strict: 60 requests per minute
  strict: rateLimit({
    maxRequests: 60,
    windowSeconds: 60,
    keyPrefix: "rl:strict:",
  }),

  // Moderate: 100 requests per minute
  moderate: rateLimit({
    maxRequests: 100,
    windowSeconds: 60,
    keyPrefix: "rl:moderate:",
  }),

  // Relaxed: 300 requests per minute
  relaxed: rateLimit({
    maxRequests: 300,
    windowSeconds: 60,
    keyPrefix: "rl:relaxed:",
  }),

  // API writes: 20 requests per minute (for POST/PUT/DELETE)
  writes: rateLimit({
    maxRequests: 20,
    windowSeconds: 60,
    keyPrefix: "rl:writes:",
  }),
};
