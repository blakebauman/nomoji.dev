import type { NomojiConfig, RuleTemplate } from "../types";
import { generateClaudeSubagent } from "./claude";
import { generateCursorRules } from "./cursor";

/**
 * Generate rule text based on configuration
 */
export function generateRules(config: NomojiConfig): string {
  if (!config.enabled) {
    return "";
  }

  const rules: string[] = [];
  const contexts = config.contexts;

  // Header
  rules.push("EMOJI USAGE RULES:");
  rules.push("");

  // Per-context rules
  if (contexts.documentation.enabled) {
    rules.push("DOCUMENTATION & MARKDOWN:");
    rules.push(
      contexts.documentation.customMessage ||
        `- ${contexts.documentation.severity.toUpperCase()}: Do not use emojis in markdown files, README files, or documentation.`,
    );
    rules.push(
      "- This includes headers, lists, paragraphs, and code examples.",
    );
    rules.push("- Use clear, professional language without emoji decoration.");
    rules.push("");
  }

  if (contexts.console.enabled) {
    rules.push("CONSOLE OUTPUT:");
    rules.push(
      contexts.console.customMessage ||
        `- ${contexts.console.severity.toUpperCase()}: Do not use emojis in console.log, console.error, console.warn, or any console output.`,
    );
    rules.push("- Use plain text for all terminal output.");
    rules.push("");
  }

  if (contexts.cli.enabled) {
    rules.push("CLI TOOLS & COMMAND-LINE OUTPUT:");
    rules.push(
      contexts.cli.customMessage ||
        `- ${contexts.cli.severity.toUpperCase()}: Do not use emojis in CLI tool output, progress bars, spinners, or command-line messages.`,
    );
    rules.push("- Use ASCII characters and plain text only.");
    rules.push("");
  }

  if (contexts.logging.enabled) {
    rules.push("LOGGING & ERROR MESSAGES:");
    rules.push(
      contexts.logging.customMessage ||
        `- ${contexts.logging.severity.toUpperCase()}: Do not use emojis in application logs, error messages, debug output, or logging statements.`,
    );
    rules.push("- Logs should be machine-parseable and professional.");
    rules.push("");
  }

  if (contexts.comments.enabled) {
    rules.push("CODE COMMENTS:");
    rules.push(
      contexts.comments.customMessage ||
        `- ${contexts.comments.severity.toUpperCase()}: Avoid using emojis in code comments.`,
    );
    rules.push("- Write clear, descriptive comments using words only.");
    rules.push("");
  }

  if (contexts.commitMessages.enabled) {
    rules.push("GIT COMMIT MESSAGES:");
    rules.push(
      contexts.commitMessages.customMessage ||
        `- ${contexts.commitMessages.severity.toUpperCase()}: Do not use emojis in git commit messages.`,
    );
    rules.push("- Use conventional commit format with plain text.");
    rules.push("");
  }

  // Exceptions
  if (config.exceptions) {
    if (
      config.exceptions.allowedEmojis &&
      config.exceptions.allowedEmojis.length > 0
    ) {
      rules.push("EXCEPTIONS:");
      rules.push(
        `- The following emojis are allowed: ${config.exceptions.allowedEmojis.join(", ")}`,
      );
      rules.push("");
    }

    if (
      config.exceptions.allowedContexts &&
      config.exceptions.allowedContexts.length > 0
    ) {
      rules.push("ALLOWED CONTEXTS:");
      rules.push(
        `- Emojis may be used in: ${config.exceptions.allowedContexts.join(", ")}`,
      );
      rules.push("");
    }
  }

  // Custom rules
  if (config.customRules && config.customRules.length > 0) {
    rules.push("CUSTOM RULES:");
    config.customRules.forEach((rule) => {
      rules.push(`- ${rule}`);
    });
    rules.push("");
  }

  // Footer
  rules.push(
    "REMEMBER: Professional code should prioritize clarity and consistency over decoration.",
  );
  rules.push("When in doubt, do not use emojis.");

  return rules.join("\n");
}

/**
 * Generate template for specific AI assistant
 */
export function generateTemplate(
  config: NomojiConfig,
  assistant: RuleTemplate["assistant"],
): string {
  const rules = generateRules(config);

  switch (assistant) {
    case "claude":
      return generateClaudeSubagent(config);

    case "cursor":
      return generateCursorRules(config);

    case "copilot":
      return `# Emoji Usage Guidelines

${rules}

Please adhere to these rules when generating suggestions.`;

    case "gemini":
      return `# Emoji Usage Rules

${rules}

---

Generated from: https://nomoji.dev
Configuration: ${config.enabled ? "Enabled" : "Disabled"}
Version: ${config.version}

This configuration enforces professional, emoji-free code and documentation across all contexts.
For questions or to customize these rules, visit https://nomoji.dev`;

    case "openai":
      return `# OpenAI API - System Instructions

You are a professional coding assistant that generates clean, emoji-free code.

${rules}

## Important Guidelines

- Never use emojis in any code generation
- Keep all output professional and accessible
- Use clear, descriptive text instead of decorative characters
- This applies to all programming languages and contexts
- When generating documentation, use plain text formatting

## Reasoning Models

If using o1, o3-mini, or o3-mini-high models, these guidelines will be strictly enforced due to enhanced reasoning capabilities.

---

Generated from: https://nomoji.dev
Configuration: ${config.enabled ? "Enabled" : "Disabled"}
Version: ${config.version}`;

    case "openai-codex":
      return `# OpenAI Codex Configuration

${rules}

## Codex-Specific Guidelines

When working in terminal or IDE contexts:
- All code generation must be emoji-free
- Console output should use plain ASCII characters
- Error messages and logs must not contain emojis
- Git commit messages should be professional and clear
- Code comments should use descriptive text only
- Progress indicators should use ASCII (e.g., "[OK]" not "✓")

## File Operations

When creating or modifying files:
- Documentation: No emojis in markdown headers or content
- README files: Use plain text formatting
- Configuration files: Keep all output machine-readable
- Test files: Use descriptive assertions without emoji decoration

## Integration Context

Codex operates in ChatGPT Plus, Pro, Business, Edu, and Enterprise plans. These rules ensure:
- Professional output across all team interactions
- Accessibility for screen readers and CI/CD tools
- Consistent cross-platform rendering
- Clean git history and logs

---

Generated from: https://nomoji.dev
Configuration: ${config.enabled ? "Enabled" : "Disabled"}
Version: ${config.version}

To configure Codex with these rules, use: npx @openai/codex config --system-instructions <this-file>`;

    default:
      return rules;
  }
}

/**
 * Generate .cursorrules format (legacy - deprecated)
 */
export function generateLegacyCursorRules(config: NomojiConfig): string {
  return `# DEPRECATED: This file format is outdated
# Modern Cursor uses .cursor/rules/ directory
# See .cursor/rules/nomoji.mdc for current rules

Please download the new format at: https://nomoji.dev/api/cursor-rules/default

Generated: ${new Date().toISOString()}
Version: ${config.version}
`;
}

/**
 * Generate JSON format for programmatic use
 */
export function generateJSON(config: NomojiConfig): string {
  return JSON.stringify(
    {
      nomoji: {
        version: config.version,
        enabled: config.enabled,
        rules: generateRules(config),
        config: config,
      },
    },
    null,
    2,
  );
}
