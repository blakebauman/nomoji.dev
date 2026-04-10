import type { NomojiConfig } from "../types";

/**
 * Generate Agent Skill format (SKILL.md) for Claude Code and compatible tools.
 * Spec: https://agentskills.io
 */
export function generateSkill(config: NomojiConfig, userId?: string): string {
  const enabledContexts = getEnabledContexts(config);
  const severity = getMostStrictSeverity(config);

  // description must be ≤250 chars; front-load key terms for Claude auto-invocation
  const description =
    "Enforce no-emoji standards. Use after generating code, docs, comments, logs, CLI output, or commit messages to remove emojis and keep output professional and accessible.";

  const frontmatter = `---
name: nomoji
description: ${description}
allowed-tools: Read Grep Glob Bash
---`;

  const rulesSection = buildRulesSection(config);
  const exceptionsSection = buildExceptionsSection(config);

  const configRef = userId
    ? `https://nomoji.dev/setup — user: ${userId}`
    : "https://nomoji.dev/setup";

  const body = `
# NoMoji — Emoji-Free Development

Prevent emoji characters in all AI-generated content to maintain professional, accessible code.

## Rules

${rulesSection}

## Validation

Before finalizing any response, scan output for Unicode emoji characters. Key ranges:
- U+1F600–U+1F64F (emoticons)
- U+1F300–U+1F5FF (symbols and pictographs)
- U+1F680–U+1F6FF (transport and map)
- U+2600–U+26FF (miscellaneous symbols)
- U+2700–U+27BF (dingbats)
- U+1F900–U+1FFFF (supplemental symbols)

If emoji are found in generated content, remove them and regenerate the affected output. Never use emoji as substitutes for words, status indicators, or decorative elements.

## Detection

Use grep to scan for emoji in files:
\`\`\`bash
grep -rn --include="*.{js,ts,jsx,tsx,py,md,txt,sh}" -P "[\\x{1F300}-\\x{1FFFF}]|[\\x{2600}-\\x{27BF}]" .
\`\`\`
${exceptionsSection}
## Contexts Active

${enabledContexts.length > 0 ? enabledContexts.map((ctx) => `- ${ctx}`).join("\n") : "- All contexts (default strict)"}

Severity: ${severity}

## Configuration

Managed at ${configRef}
`;

  return `${frontmatter}\n${body}`;
}

function buildRulesSection(config: NomojiConfig): string {
  const lines: string[] = [];

  if (config.contexts.documentation.enabled) {
    lines.push(
      `- **Documentation** (${config.contexts.documentation.severity}): No emojis in markdown, README files, API docs, or any documentation.`,
    );
  }
  if (config.contexts.console.enabled) {
    lines.push(
      `- **Console output** (${config.contexts.console.severity}): No emojis in console.log, console.error, or any terminal output.`,
    );
  }
  if (config.contexts.cli.enabled) {
    lines.push(
      `- **CLI tools** (${config.contexts.cli.severity}): No emojis in command-line output, progress bars, spinners, or status messages.`,
    );
  }
  if (config.contexts.logging.enabled) {
    lines.push(
      `- **Logging** (${config.contexts.logging.severity}): No emojis in application logs, error messages, or debug output.`,
    );
  }
  if (config.contexts.comments.enabled) {
    lines.push(
      `- **Code comments** (${config.contexts.comments.severity}): No emojis in inline comments, JSDoc, or docstrings.`,
    );
  }
  if (config.contexts.commitMessages.enabled) {
    lines.push(
      `- **Git commits** (${config.contexts.commitMessages.severity}): No emojis in commit messages, PR titles, or descriptions.`,
    );
  }
  if (config.contexts.userInterface?.enabled) {
    lines.push(
      `- **User interface** (${config.contexts.userInterface.severity}): No emojis in UI text strings or user-facing messages.`,
    );
  }

  if (lines.length === 0) {
    lines.push(
      "- No emojis in any generated code, documentation, or output (default strict policy).",
    );
  }

  return lines.join("\n");
}

function buildExceptionsSection(config: NomojiConfig): string {
  const parts: string[] = [];

  if (
    config.exceptions?.allowedEmojis &&
    config.exceptions.allowedEmojis.length > 0
  ) {
    parts.push(`
## Allowed Emojis

These specific emojis are permitted: ${config.exceptions.allowedEmojis.join(" ")}`);
  }

  if (
    config.exceptions?.allowedContexts &&
    config.exceptions.allowedContexts.length > 0
  ) {
    parts.push(`
## Allowed Contexts

Emojis may be used in: ${config.exceptions.allowedContexts.join(", ")}`);
  }

  return parts.join("\n");
}

function getMostStrictSeverity(config: NomojiConfig): string {
  const severities = Object.values(config.contexts)
    .filter((ctx) => ctx.enabled)
    .map((ctx) => ctx.severity);

  if (severities.includes("strict")) return "strict";
  if (severities.includes("moderate")) return "moderate";
  return "relaxed";
}

function getEnabledContexts(config: NomojiConfig): string[] {
  return Object.entries(config.contexts)
    .filter(([_, ctx]) => ctx.enabled)
    .map(([name]) =>
      name
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()
        .trim(),
    );
}
