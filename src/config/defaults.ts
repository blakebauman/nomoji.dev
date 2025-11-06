import type { NomojiConfig } from "../types";

/**
 * Default configuration - strict mode, no emojis anywhere
 */
export const DEFAULT_CONFIG: NomojiConfig = {
  version: "1.0.0",
  enabled: true,
  contexts: {
    documentation: {
      enabled: true,
      severity: "strict",
      customMessage:
        "Do not use emojis in documentation, markdown files, or README files.",
    },
    console: {
      enabled: true,
      severity: "strict",
      customMessage:
        "Do not use emojis in console.log, console.error, or any console output.",
    },
    cli: {
      enabled: true,
      severity: "strict",
      customMessage:
        "Do not use emojis in CLI tool output, progress bars, or command-line messages.",
    },
    logging: {
      enabled: true,
      severity: "strict",
      customMessage:
        "Do not use emojis in application logs, error messages, or logging statements.",
    },
    comments: {
      enabled: true,
      severity: "moderate",
      customMessage:
        "Avoid using emojis in code comments unless absolutely necessary for clarity.",
    },
    commitMessages: {
      enabled: true,
      severity: "strict",
      customMessage: "Do not use emojis in git commit messages.",
    },
    userInterface: {
      enabled: false,
      severity: "relaxed",
      customMessage:
        "Emojis may be used in user-facing UI when appropriate for UX.",
    },
  },
  exceptions: {
    allowedEmojis: [],
    allowedContexts: ["userInterface"],
  },
};

/**
 * Preset configurations for different use cases
 */
export const PRESETS = {
  strict: {
    ...DEFAULT_CONFIG,
    contexts: {
      ...DEFAULT_CONFIG.contexts,
      documentation: { enabled: true, severity: "strict" as const },
      console: { enabled: true, severity: "strict" as const },
      cli: { enabled: true, severity: "strict" as const },
      logging: { enabled: true, severity: "strict" as const },
      comments: { enabled: true, severity: "strict" as const },
      commitMessages: { enabled: true, severity: "strict" as const },
      userInterface: { enabled: true, severity: "strict" as const },
    },
    exceptions: { allowedEmojis: [], allowedContexts: [] },
  },
  moderate: {
    ...DEFAULT_CONFIG,
    contexts: {
      ...DEFAULT_CONFIG.contexts,
      documentation: { enabled: true, severity: "moderate" as const },
      console: { enabled: true, severity: "moderate" as const },
      cli: { enabled: true, severity: "moderate" as const },
      logging: { enabled: true, severity: "strict" as const },
      comments: { enabled: false, severity: "relaxed" as const },
      commitMessages: { enabled: true, severity: "moderate" as const },
      userInterface: { enabled: false, severity: "relaxed" as const },
    },
  },
  relaxed: {
    ...DEFAULT_CONFIG,
    contexts: {
      ...DEFAULT_CONFIG.contexts,
      documentation: { enabled: true, severity: "relaxed" as const },
      console: { enabled: false, severity: "relaxed" as const },
      cli: { enabled: true, severity: "relaxed" as const },
      logging: { enabled: true, severity: "strict" as const },
      comments: { enabled: false, severity: "relaxed" as const },
      commitMessages: { enabled: false, severity: "relaxed" as const },
      userInterface: { enabled: false, severity: "relaxed" as const },
    },
  },
};
