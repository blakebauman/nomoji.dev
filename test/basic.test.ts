import { SELF, env } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("Basic Vitest Integration Tests", () => {
  describe("Cloudflare Workers Environment", () => {
    it("should have access to SELF", () => {
      expect(SELF).toBeDefined();
      expect(typeof SELF.fetch).toBe("function");
    });

    it("should have access to env bindings", () => {
      expect(env).toBeDefined();
    });

    it("should have access to KV binding", () => {
      expect(env.PREFERENCES).toBeDefined();
    });

    it("should be able to make fetch requests", async () => {
      const response = await SELF.fetch("https://example.com/health");
      expect(response).toBeDefined();
      expect(response.status).toBeDefined();
    });
  });

  describe("KV Storage", () => {
    it("should be able to write and read from KV", async () => {
      const testKey = "test-key";
      const testValue = "test-value";

      await env.PREFERENCES.put(testKey, testValue);
      const retrieved = await env.PREFERENCES.get(testKey);

      expect(retrieved).toBe(testValue);
    });

    it("should handle JSON values in KV", async () => {
      const testKey = "test-json";
      const testData = { hello: "world", count: 42 };

      await env.PREFERENCES.put(testKey, JSON.stringify(testData));
      const retrieved = await env.PREFERENCES.get(testKey, "json");

      expect(retrieved).toEqual(testData);
    });

    it("should return null for non-existent keys", async () => {
      const result = await env.PREFERENCES.get("non-existent-key");
      expect(result).toBeNull();
    });
  });

  describe("Basic JavaScript Features", () => {
    it("should support async/await", async () => {
      const promise = Promise.resolve(42);
      const result = await promise;
      expect(result).toBe(42);
    });

    it("should support fetch API", async () => {
      expect(typeof fetch).toBe("function");
    });

    it("should support crypto API", () => {
      expect(typeof crypto.randomUUID).toBe("function");
      const uuid = crypto.randomUUID();
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
    });

    it("should support URL API", () => {
      const url = new URL("https://example.com/path?query=value");
      expect(url.hostname).toBe("example.com");
      expect(url.pathname).toBe("/path");
      expect(url.searchParams.get("query")).toBe("value");
    });
  });
});
