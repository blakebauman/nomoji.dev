/**
 * Comprehensive emoji detection and validation utilities
 */

// Emoji regex patterns
const EMOJI_REGEX =
  /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F170}-\u{1F251}]|[\u{1F910}-\u{1F96B}]|[\u{1F980}-\u{1F9E0}]|[\u{200D}]|[\u{FE0F}]|[\u{E0020}-\u{E007F}]|[\u{1F191}-\u{1F19A}]/gu;

/**
 * Detect if text contains emojis
 */
export function containsEmoji(text: string): boolean {
  return EMOJI_REGEX.test(text);
}

/**
 * Extract all emojis from text
 */
export function extractEmojis(text: string): string[] {
  const matches = text.match(EMOJI_REGEX);
  return matches ? Array.from(new Set(matches)) : [];
}

/**
 * Remove all emojis from text
 */
export function removeEmojis(text: string): string {
  return text.replace(EMOJI_REGEX, "").trim();
}

/**
 * Count emojis in text
 */
export function countEmojis(text: string): number {
  const matches = text.match(EMOJI_REGEX);
  return matches ? matches.length : 0;
}

/**
 * Validate if emoji is in allowed list
 */
export function isEmojiAllowed(emoji: string, allowedList: string[]): boolean {
  return allowedList.includes(emoji);
}

/**
 * Get emoji statistics for text
 */
export interface EmojiStats {
  count: number;
  unique: string[];
  hasEmojis: boolean;
  cleanText: string;
}

export function analyzeEmojis(text: string): EmojiStats {
  const unique = extractEmojis(text);
  return {
    count: countEmojis(text),
    unique,
    hasEmojis: unique.length > 0,
    cleanText: removeEmojis(text),
  };
}

/**
 * Common emoji categories for filtering
 */
export const EMOJI_CATEGORIES = {
  faces: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
  ],
  gestures: ["👍", "👎", "👌", "🤞", "🤝", "👏", "🙌", "👋", "🤚"],
  symbols: ["✅", "❌", "⚠️", "🚨", "💡", "🔥", "⭐", "✨"],
  objects: ["📝", "📄", "📊", "📈", "📉", "🎯", "🔨", "🔧", "⚙️"],
  nature: ["🌟", "🌈", "🌍", "🌎", "🌏", "🌙", "⚡"],
};

/**
 * Check if emoji is in a specific category
 */
export function isEmojiInCategory(
  emoji: string,
  category: keyof typeof EMOJI_CATEGORIES,
): boolean {
  return EMOJI_CATEGORIES[category].includes(emoji);
}
