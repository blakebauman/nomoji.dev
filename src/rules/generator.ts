import type { NomojiConfig } from "../types";
import { generateSkill } from "./skill";

/**
 * Generate plain text rules — used by /api/rules/:userId and as fallback
 */
export function generateRules(config: NomojiConfig): string {
  if (!config.enabled) {
    return "";
  }

  const lines: string[] = ["EMOJI USAGE RULES:", ""];
  const { contexts } = config;

  if (contexts.documentation.enabled)
    lines.push(
      `DOCUMENTATION: ${contexts.documentation.severity.toUpperCase()} — no emojis in markdown, README, or API docs.`,
      "",
    );
  if (contexts.console.enabled)
    lines.push(
      `CONSOLE: ${contexts.console.severity.toUpperCase()} — no emojis in console.log, console.error, or terminal output.`,
      "",
    );
  if (contexts.cli.enabled)
    lines.push(
      `CLI: ${contexts.cli.severity.toUpperCase()} — no emojis in CLI output, progress bars, or spinners.`,
      "",
    );
  if (contexts.logging.enabled)
    lines.push(
      `LOGGING: ${contexts.logging.severity.toUpperCase()} — no emojis in application logs or error messages.`,
      "",
    );
  if (contexts.comments.enabled)
    lines.push(
      `COMMENTS: ${contexts.comments.severity.toUpperCase()} — no emojis in code comments, JSDoc, or docstrings.`,
      "",
    );
  if (contexts.commitMessages.enabled)
    lines.push(
      `COMMITS: ${contexts.commitMessages.severity.toUpperCase()} — no emojis in git commit messages.`,
      "",
    );

  if (config.exceptions?.allowedEmojis?.length)
    lines.push(
      `ALLOWED EMOJIS: ${config.exceptions.allowedEmojis.join(" ")}`,
      "",
    );
  if (config.exceptions?.allowedContexts?.length)
    lines.push(
      `ALLOWED IN: ${config.exceptions.allowedContexts.join(", ")}`,
      "",
    );

  lines.push("When in doubt, do not use emojis.");
  return lines.join("\n");
}

/**
 * Generate SKILL.md for any Agent Skills-compatible tool (Claude Code, Cursor,
 * OpenAI Codex, Gemini CLI, …).  For tools without Skills support, falls back
 * to plain-text rules wrapped in a minimal system-prompt header.
 */
export function generateTemplate(
  config: NomojiConfig,
  assistant: string,
): string {
  switch (assistant) {
    // All Agent Skills-compatible tools share the same SKILL.md
    case "claude":
    case "cursor":
    case "codex":
    case "gemini":
      return generateSkill(config);

    // Copilot: custom-instructions block for VS Code settings.json
    case "copilot":
      return `# Emoji Usage Guidelines\n\n${generateRules(config)}\n\nPlease adhere to these rules when generating suggestions.`;

    // Generic / API fallback
    default:
      return generateRules(config);
  }
}

/**
 * Generate JSON representation — used by /api/json/:userId
 */
export function generateJSON(config: NomojiConfig): string {
  return JSON.stringify(
    {
      nomoji: {
        version: config.version,
        enabled: config.enabled,
        rules: generateRules(config),
        config,
      },
    },
    null,
    2,
  );
}
