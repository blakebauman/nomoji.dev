import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG, PRESETS } from "../src/config/defaults";
import { generateClaudeSubagent } from "../src/rules/claude";
import { generateCursorRules } from "../src/rules/cursor";
import {
  generateJSON,
  generateLegacyCursorRules,
  generateRules,
  generateTemplate,
} from "../src/rules/generator";

describe("Rule Generators", () => {
  describe("generateRules", () => {
    it("should generate basic rules with default config", () => {
      const rules = generateRules(DEFAULT_CONFIG);

      expect(rules).toContain("emoji");
      expect(rules.length).toBeGreaterThan(0);
    });

    it("should include strict level rules", () => {
      const rules = generateRules(PRESETS.strict);

      expect(rules).toBeTruthy();
      expect(rules.toLowerCase()).toContain("emoji");
    });

    it("should include context-specific settings", () => {
      const config = {
        ...DEFAULT_CONFIG,
        contexts: {
          ...DEFAULT_CONFIG.contexts,
          documentation: {
            ...DEFAULT_CONFIG.contexts.documentation,
            customMessage: "Custom documentation rules",
          },
        },
      };
      const rules = generateRules(config);

      expect(rules).toContain("Custom documentation rules");
    });
  });

  describe("generateClaudeSubagent", () => {
    it("should generate valid Claude subagent format", () => {
      const subagent = generateClaudeSubagent(DEFAULT_CONFIG);

      expect(subagent).toBeTruthy();
      expect(subagent).toContain("nomoji");
      expect(subagent.length).toBeGreaterThan(0);
    });

    it("should include context information in output", () => {
      const subagent = generateClaudeSubagent(PRESETS.strict);

      expect(subagent).toBeTruthy();
      expect(subagent.toLowerCase()).toContain("emoji");
      expect(subagent.toLowerCase()).toContain("strict");
    });
  });

  describe("generateCursorRules", () => {
    it("should generate valid Cursor rules format", () => {
      const rules = generateCursorRules(DEFAULT_CONFIG);

      expect(rules).toBeTruthy();
      expect(rules.toLowerCase()).toContain("nomoji" || "emoji");
      expect(rules.length).toBeGreaterThan(0);
    });

    it("should adapt to different strictness levels", () => {
      const strictRules = generateCursorRules(PRESETS.strict);
      const relaxedRules = generateCursorRules(PRESETS.relaxed);

      expect(strictRules).not.toEqual(relaxedRules);
      expect(strictRules.length).toBeGreaterThan(0);
      expect(relaxedRules.length).toBeGreaterThan(0);
    });
  });

  describe("generateLegacyCursorRules", () => {
    it("should generate legacy .cursorrules format", () => {
      const rules = generateLegacyCursorRules(DEFAULT_CONFIG);

      expect(rules).toBeTruthy();
      expect(rules.length).toBeGreaterThan(0);
    });

    it("should be compatible with old format", () => {
      const rules = generateLegacyCursorRules(DEFAULT_CONFIG);

      // Should not contain markdown front-matter
      expect(rules).not.toMatch(/^---/);
    });
  });

  describe("generateTemplate", () => {
    it("should generate cursor template", () => {
      const template = generateTemplate(DEFAULT_CONFIG, "cursor");

      expect(template).toBeTruthy();
      expect(template.length).toBeGreaterThan(0);
    });

    it("should generate copilot template", () => {
      const template = generateTemplate(DEFAULT_CONFIG, "copilot");

      expect(template).toBeTruthy();
      expect(template.length).toBeGreaterThan(0);
    });

    it("should generate codeium template", () => {
      const template = generateTemplate(DEFAULT_CONFIG, "codeium");

      expect(template).toBeTruthy();
      expect(template.length).toBeGreaterThan(0);
    });

    it("should generate generic template", () => {
      const template = generateTemplate(DEFAULT_CONFIG, "generic");

      expect(template).toBeTruthy();
      expect(template.length).toBeGreaterThan(0);
    });

    it("should handle different configs for each assistant", () => {
      const assistants = ["cursor", "copilot", "codeium", "generic"] as const;

      for (const assistant of assistants) {
        const strictTemplate = generateTemplate(PRESETS.strict, assistant);
        const relaxedTemplate = generateTemplate(PRESETS.relaxed, assistant);

        expect(strictTemplate).not.toEqual(relaxedTemplate);
      }
    });
  });

  describe("generateJSON", () => {
    it("should generate valid JSON", () => {
      const json = generateJSON(DEFAULT_CONFIG);

      expect(() => JSON.parse(json)).not.toThrow();
    });

    it("should contain config data", () => {
      const json = generateJSON(DEFAULT_CONFIG);
      const parsed = JSON.parse(json);

      expect(parsed).toHaveProperty("nomoji");
      expect(parsed.nomoji).toHaveProperty("enabled");
      expect(parsed.nomoji).toHaveProperty("config");
      expect(parsed.nomoji.config).toHaveProperty("contexts");
      expect(parsed.nomoji.config).toHaveProperty("exceptions");
    });

    it("should preserve config values", () => {
      const config = {
        ...PRESETS.strict,
        customRules: ["Test rule 1", "Test rule 2"],
      };
      const json = generateJSON(config);
      const parsed = JSON.parse(json);

      expect(parsed.nomoji.config.customRules).toEqual(config.customRules);
    });
  });

  describe("Exception Handling in Rules", () => {
    it("should reflect allowed contexts", () => {
      const config = {
        ...DEFAULT_CONFIG,
        exceptions: {
          ...DEFAULT_CONFIG.exceptions,
          allowedContexts: ["comments", "userInterface"],
        },
      };

      const rules = generateRules(config);
      expect(rules.toLowerCase()).toContain("allowed");
    });

    it("should handle allowed emojis", () => {
      const config = {
        ...DEFAULT_CONFIG,
        exceptions: {
          ...DEFAULT_CONFIG.exceptions,
          allowedEmojis: ["✅", "❌"],
        },
      };

      const rules = generateRules(config);
      // The rules should mention emojis are allowed or list them
      expect(rules).toBeTruthy();
    });

    it("should respect context-specific settings", () => {
      const config = {
        ...DEFAULT_CONFIG,
        contexts: {
          ...DEFAULT_CONFIG.contexts,
          comments: {
            enabled: false,
            severity: "relaxed",
          },
        },
      };

      const rules = generateRules(config);
      expect(rules).toBeTruthy();
    });
  });

  describe("Preset Configurations", () => {
    it("should generate different rules for each preset", () => {
      const strictRules = generateRules(PRESETS.strict);
      const moderateRules = generateRules(PRESETS.moderate);
      const relaxedRules = generateRules(PRESETS.relaxed);

      expect(strictRules).not.toEqual(moderateRules);
      expect(moderateRules).not.toEqual(relaxedRules);
      expect(strictRules).not.toEqual(relaxedRules);
    });

    it("should maintain consistent format across presets", () => {
      const presets = ["strict", "moderate", "relaxed"] as const;

      for (const preset of presets) {
        const rules = generateRules(PRESETS[preset]);

        expect(rules).toBeTruthy();
        expect(rules.length).toBeGreaterThan(0);
        expect(typeof rules).toBe("string");
      }
    });
  });
});
