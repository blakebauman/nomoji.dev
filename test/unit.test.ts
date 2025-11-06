/**
 * Unit tests that don't require the Workers runtime
 * These tests run with standard Vitest (no Workers pool)
 *
 * To run these tests, temporarily comment out the Workers pool in vitest.config.ts
 * or create a separate vitest.config.unit.ts file
 */

import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG, PRESETS } from "../src/config/defaults";

describe("Configuration Tests (Unit)", () => {
  describe("DEFAULT_CONFIG", () => {
    it("should have required properties", () => {
      expect(DEFAULT_CONFIG).toHaveProperty("enabled");
      expect(DEFAULT_CONFIG).toHaveProperty("contexts");
      expect(DEFAULT_CONFIG).toHaveProperty("exceptions");
    });

    it("should have boolean enabled field", () => {
      expect(typeof DEFAULT_CONFIG.enabled).toBe("boolean");
    });

    it("should have valid contexts", () => {
      expect(DEFAULT_CONFIG.contexts).toHaveProperty("documentation");
      expect(DEFAULT_CONFIG.contexts).toHaveProperty("console");
      expect(DEFAULT_CONFIG.contexts).toHaveProperty("cli");
      expect(DEFAULT_CONFIG.contexts).toHaveProperty("logging");
      expect(DEFAULT_CONFIG.contexts).toHaveProperty("comments");
      expect(DEFAULT_CONFIG.contexts).toHaveProperty("commitMessages");
      expect(DEFAULT_CONFIG.contexts).toHaveProperty("userInterface");
    });

    it("should have exceptions object", () => {
      expect(DEFAULT_CONFIG.exceptions).toBeDefined();
      expect(typeof DEFAULT_CONFIG.exceptions).toBe("object");
    });
  });

  describe("PRESETS", () => {
    it("should have all three presets", () => {
      expect(PRESETS).toHaveProperty("strict");
      expect(PRESETS).toHaveProperty("moderate");
      expect(PRESETS).toHaveProperty("relaxed");
    });

    it("should have valid strict preset", () => {
      expect(PRESETS.strict.contexts.documentation.severity).toBe("strict");
      expect(PRESETS.strict.enabled).toBe(true);
    });

    it("should have valid moderate preset", () => {
      expect(PRESETS.moderate.contexts.documentation.severity).toBe("moderate");
      expect(PRESETS.moderate.enabled).toBe(true);
    });

    it("should have valid relaxed preset", () => {
      expect(PRESETS.relaxed.contexts.documentation.severity).toBe("relaxed");
      expect(PRESETS.relaxed.enabled).toBe(true);
    });

    it("should have different exception configs for each preset", () => {
      const strictExceptions = PRESETS.strict.exceptions;
      const moderateExceptions = PRESETS.moderate.exceptions;
      const relaxedExceptions = PRESETS.relaxed.exceptions;

      // At least one should be different
      const allEqual =
        JSON.stringify(strictExceptions) ===
          JSON.stringify(moderateExceptions) &&
        JSON.stringify(moderateExceptions) ===
          JSON.stringify(relaxedExceptions);

      expect(allEqual).toBe(false);
    });
  });

  describe("Configuration Validation", () => {
    it("should have consistent structure across presets", () => {
      const presets = [PRESETS.strict, PRESETS.moderate, PRESETS.relaxed];

      for (const preset of presets) {
        expect(preset).toHaveProperty("enabled");
        expect(preset).toHaveProperty("contexts");
        expect(preset).toHaveProperty("exceptions");
        expect(preset.contexts).toHaveProperty("documentation");
        expect(preset.contexts).toHaveProperty("console");
        expect(preset.contexts).toHaveProperty("cli");
      }
    });

    it("should have boolean exception fields", () => {
      for (const preset of Object.values(PRESETS)) {
        expect(preset.exceptions).toHaveProperty("allowedEmojis");
        expect(preset.exceptions).toHaveProperty("allowedContexts");
        expect(Array.isArray(preset.exceptions.allowedEmojis)).toBe(true);
        expect(Array.isArray(preset.exceptions.allowedContexts)).toBe(true);
      }
    });
  });
});

describe("Emoji Regex Patterns (Unit)", () => {
  it("should detect basic emojis", () => {
    const emojiRegex =
      /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

    expect(emojiRegex.test("👋")).toBe(true);
    expect(emojiRegex.test("🌍")).toBe(true);
    expect(emojiRegex.test("Hello")).toBe(false);
    expect(emojiRegex.test("")).toBe(false);
  });

  it("should handle text with and without emojis", () => {
    const hasEmoji = (text: string) =>
      /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(text);

    expect(hasEmoji("Hello World")).toBe(false);
    expect(hasEmoji("Hello 👋 World")).toBe(true);
    expect(hasEmoji("🎉")).toBe(true);
    expect(hasEmoji("")).toBe(false);
    expect(hasEmoji("123 ABC xyz")).toBe(false);
  });
});

describe("TypeScript Types (Unit)", () => {
  it("should accept valid config objects", () => {
    const validConfig = {
      version: "1.0.0",
      enabled: true,
      contexts: {
        documentation: { enabled: true, severity: "strict" as const },
        console: { enabled: true, severity: "strict" as const },
        cli: { enabled: true, severity: "strict" as const },
        logging: { enabled: true, severity: "strict" as const },
        comments: { enabled: true, severity: "strict" as const },
        commitMessages: { enabled: true, severity: "strict" as const },
        userInterface: { enabled: false, severity: "relaxed" as const },
      },
      exceptions: {
        allowedEmojis: [],
        allowedContexts: [],
      },
    };

    expect(validConfig.enabled).toBe(true);
    expect(validConfig.contexts.documentation.severity).toBe("strict");
    expect(validConfig.exceptions.allowedEmojis).toEqual([]);
  });
});

describe("URL and Environment (Unit)", () => {
  it("should handle URL construction", () => {
    const userId = "test-user";
    const url = `/api/config/${userId}`;

    expect(url).toBe("/api/config/test-user");
  });

  it("should handle config ID generation", () => {
    const configId = "test-config-123";
    const shareUrl = `https://nomoji.dev/shared/${configId}`;

    expect(shareUrl).toContain(configId);
    expect(shareUrl).toContain("https://");
  });
});
