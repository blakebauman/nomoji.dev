import { describe, expect, it } from "vitest";
import { analyzeEmojis } from "../src/utils/emoji";

describe("Emoji Utility Functions", () => {
  describe("analyzeEmojis", () => {
    it("should detect emojis in text", () => {
      const result = analyzeEmojis("Hello 👋 World 🌍");

      expect(result.hasEmojis).toBe(true);
      expect(result.count).toBe(2);
      expect(result.unique).toHaveLength(2);
      expect(result.unique).toContain("👋");
      expect(result.unique).toContain("🌍");
    });

    it("should return no emojis for plain text", () => {
      const result = analyzeEmojis("Hello World");

      expect(result.hasEmojis).toBe(false);
      expect(result.count).toBe(0);
      expect(result.unique).toHaveLength(0);
    });

    it("should handle empty text", () => {
      const result = analyzeEmojis("");

      expect(result.hasEmojis).toBe(false);
      expect(result.count).toBe(0);
      expect(result.unique).toHaveLength(0);
    });

    it("should detect multiple different emojis", () => {
      const result = analyzeEmojis("🎉🎊🎈🎁🎀");

      expect(result.hasEmojis).toBe(true);
      expect(result.count).toBe(5);
      expect(result.unique).toHaveLength(5);
    });

    it("should detect emojis with skin tone modifiers", () => {
      const result = analyzeEmojis("👋🏻👋🏿");

      expect(result.hasEmojis).toBe(true);
      expect(result.count).toBeGreaterThanOrEqual(1);
    });

    it("should handle text with mixed content", () => {
      const result = analyzeEmojis(
        "Check out this feature ⭐ it's amazing! 🚀",
      );

      expect(result.hasEmojis).toBe(true);
      expect(result.count).toBeGreaterThanOrEqual(1);
    });
  });
});
