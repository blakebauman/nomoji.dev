import type { Context, Next } from "hono";
import type { Env } from "../types";

/**
 * Cache utilities for Cloudflare Workers Cache API
 * See: https://developers.cloudflare.com/workers/runtime-apis/cache/
 */

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  cacheKey?: string; // Custom cache key
  methods?: string[]; // HTTP methods to cache (default: GET only)
  varyHeaders?: string[]; // Headers to vary cache by
}

/**
 * Cache middleware for GET requests
 */
export function cacheMiddleware(options: CacheOptions = {}) {
  const {
    ttl = 300, // Default 5 minutes
    methods = ["GET"],
    varyHeaders = [],
  } = options;

  return async (c: Context<{ Bindings: Env }>, next: Next) => {
    // Only cache allowed methods
    if (!methods.includes(c.req.method)) {
      return await next();
    }

    // Skip caching in development
    if (c.env.ENVIRONMENT === "development") {
      return await next();
    }

    const cache = caches.default;
    const cacheKey = buildCacheKey(c, options.cacheKey, varyHeaders);

    // Try to get from cache
    let response = await cache.match(cacheKey);

    if (response) {
      // Cache hit
      console.log("Cache hit:", cacheKey);
      return new Response(response.body, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers),
          "X-Cache": "HIT",
          "X-Cache-Key": cacheKey,
        },
      });
    }

    // Cache miss - continue with request
    await next();

    // Clone response for caching
    response = c.res.clone();

    // Only cache successful responses
    if (response.status === 200) {
      // Add cache control headers
      const cachedResponse = new Response(response.body, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers),
          "Cache-Control": `public, max-age=${ttl}`,
          "X-Cache": "MISS",
          "X-Cache-Key": cacheKey,
        },
      });

      // Store in cache (don't await - use waitUntil)
      c.executionCtx.waitUntil(cache.put(cacheKey, cachedResponse));
    }
  };
}

/**
 * Build cache key from request
 */
function buildCacheKey(
  c: Context,
  customKey?: string,
  varyHeaders: string[] = [],
): string {
  if (customKey) {
    return customKey;
  }

  const url = new URL(c.req.url);
  let key = url.toString();

  // Add vary headers to cache key
  if (varyHeaders.length > 0) {
    const headerValues = varyHeaders
      .map((header) => `${header}:${c.req.header(header) || ""}`)
      .join("|");
    key += `?vary=${encodeURIComponent(headerValues)}`;
  }

  return key;
}

/**
 * Manually cache a response
 */
export async function cacheResponse(
  url: string,
  response: Response,
  ttl: number = 300,
): Promise<void> {
  const cache = caches.default;
  const cacheKey = new Request(url);

  const cachedResponse = new Response(response.body, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers),
      "Cache-Control": `public, max-age=${ttl}`,
    },
  });

  await cache.put(cacheKey, cachedResponse);
}

/**
 * Invalidate cache by key or pattern
 */
export async function invalidateCache(keyOrPattern: string): Promise<void> {
  const cache = caches.default;
  await cache.delete(keyOrPattern);
}

/**
 * Purge all cache (use with caution)
 */
export async function purgeAllCache(): Promise<void> {
  // Note: Cache API doesn't have a "delete all" method
  // You need to track keys or use Cloudflare API for purging
  console.warn("Purge all cache is not implemented. Use Cloudflare API.");
}

/**
 * Cache configuration presets
 */
export const CachePresets = {
  // Short-lived cache for frequently changing data (1 minute)
  short: {
    ttl: 60,
  },

  // Medium cache for semi-static data (5 minutes)
  medium: {
    ttl: 300,
  },

  // Long cache for static data (1 hour)
  long: {
    ttl: 3600,
  },

  // Very long cache for immutable data (1 day)
  immutable: {
    ttl: 86400,
  },
};
