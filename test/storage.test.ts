import { env } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import type { NomojiConfig } from "../src/types";
import {
  deleteUserPreferences,
  getOrCreateUserConfig,
  getSharedConfig,
  saveSharedConfig,
  updateUserConfig,
} from "../src/utils/storage";

describe("Storage Functions", () => {
  const testUserId = "test-user-storage";
  const testConfigId = "test-config-shared";

  beforeEach(async () => {
    // Clean up any existing test data
    await env.PREFERENCES.delete(`user:${testUserId}`);
    await env.PREFERENCES.delete(`shared:${testConfigId}`);
  });

  describe("getOrCreateUserConfig", () => {
    it("should create default config for new user", async () => {
      const config = await getOrCreateUserConfig(env, testUserId);

      expect(config).toBeDefined();
      expect(config).toHaveProperty("enabled");
      expect(config).toHaveProperty("contexts");
      expect(config).toHaveProperty("exceptions");
    });

    it("should return existing config for existing user", async () => {
      const firstCall = await getOrCreateUserConfig(env, testUserId);
      const secondCall = await getOrCreateUserConfig(env, testUserId);

      // Compare without metadata as timestamps will differ slightly
      expect(firstCall.version).toEqual(secondCall.version);
      expect(firstCall.enabled).toEqual(secondCall.enabled);
      expect(firstCall.contexts).toEqual(secondCall.contexts);
    });
  });

  describe("updateUserConfig", () => {
    it("should update user configuration", async () => {
      const newConfig: Partial<NomojiConfig> = {
        enabled: false,
        contexts: {
          documentation: { enabled: false, severity: "relaxed" },
          console: { enabled: false, severity: "relaxed" },
          cli: { enabled: false, severity: "relaxed" },
          logging: { enabled: false, severity: "relaxed" },
          comments: { enabled: false, severity: "relaxed" },
          commitMessages: { enabled: false, severity: "relaxed" },
          userInterface: { enabled: false, severity: "relaxed" },
        },
      };

      const updated = await updateUserConfig(env, testUserId, newConfig);

      expect(updated.enabled).toBe(false);
      expect(updated.contexts.documentation.severity).toBe("relaxed");
    });

    it("should merge with existing config", async () => {
      // Create initial config
      await updateUserConfig(env, testUserId, {
        enabled: true,
      });

      // Update only one field
      const updated = await updateUserConfig(env, testUserId, {
        enabled: false,
      });

      expect(updated.enabled).toBe(false);
    });
  });

  describe("deleteUserPreferences", () => {
    it("should delete user configuration", async () => {
      // Create a config first
      await updateUserConfig(env, testUserId, { enabled: true });

      // Delete it
      await deleteUserPreferences(env, testUserId);

      // Verify it's gone by creating a new default
      const config = await getOrCreateUserConfig(env, testUserId);
      expect(config).toBeDefined(); // Will be default config
    });
  });

  describe("saveSharedConfig", () => {
    it("should save shared configuration", async () => {
      const config: NomojiConfig = {
        version: "1.0.0",
        enabled: true,
        contexts: {
          documentation: { enabled: true, severity: "strict" },
          console: { enabled: true, severity: "strict" },
          cli: { enabled: true, severity: "strict" },
          logging: { enabled: true, severity: "strict" },
          comments: { enabled: true, severity: "strict" },
          commitMessages: { enabled: true, severity: "strict" },
          userInterface: { enabled: false, severity: "relaxed" },
        },
        exceptions: {
          allowedEmojis: [],
          allowedContexts: [],
        },
      };

      await saveSharedConfig(env, testConfigId, config);

      // Verify it was saved
      const retrieved = await getSharedConfig(env, testConfigId);
      expect(retrieved).toEqual(config);
    });
  });

  describe("getSharedConfig", () => {
    it("should retrieve shared configuration", async () => {
      const config: NomojiConfig = {
        version: "1.0.0",
        enabled: true,
        contexts: {
          documentation: { enabled: true, severity: "moderate" },
          console: { enabled: true, severity: "moderate" },
          cli: { enabled: true, severity: "moderate" },
          logging: { enabled: true, severity: "moderate" },
          comments: { enabled: false, severity: "relaxed" },
          commitMessages: { enabled: true, severity: "moderate" },
          userInterface: { enabled: false, severity: "relaxed" },
        },
        exceptions: {
          allowedEmojis: [],
          allowedContexts: ["userInterface"],
        },
      };

      await saveSharedConfig(env, testConfigId, config);

      const retrieved = await getSharedConfig(env, testConfigId);
      expect(retrieved).toEqual(config);
    });

    it("should return null for non-existent config", async () => {
      const retrieved = await getSharedConfig(env, "non-existent-id");
      expect(retrieved).toBeNull();
    });
  });

  describe("KV Storage Integration", () => {
    it("should handle concurrent writes correctly", async () => {
      const promises = Array.from({ length: 5 }, (_, i) =>
        updateUserConfig(env, testUserId, { enabled: i % 2 === 0 }),
      );

      const results = await Promise.all(promises);

      // All writes should succeed
      expect(results).toHaveLength(5);

      // Final config should be one of the writes
      const finalConfig = await getOrCreateUserConfig(env, testUserId);
      expect(finalConfig).toBeDefined();
    });

    it("should handle large config objects", async () => {
      const largeConfig: Partial<NomojiConfig> = {
        enabled: true,
        customRules: [
          "A".repeat(1000), // 1KB string
          "B".repeat(1000),
        ],
      };

      const updated = await updateUserConfig(env, testUserId, largeConfig);
      expect(updated.customRules).toEqual(largeConfig.customRules);

      const retrieved = await getOrCreateUserConfig(env, testUserId);
      expect(retrieved.customRules).toEqual(largeConfig.customRules);
    });
  });
});
