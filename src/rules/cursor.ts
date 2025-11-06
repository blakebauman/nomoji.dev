import type { NomojiConfig } from "../types";

/**
 * Generate Cursor rules format (.cursor/rules/*.mdc)
 */
export function generateCursorRules(config: NomojiConfig): string {
  const rules: string[] = [];
  const contexts = config.contexts;

  const frontmatter = `---
title: nomoji.dev - Emoji Control Rules
version: ${config.version}
priority: high
description: Control emoji usage in AI-generated code and documentation
---`;

  rules.push(frontmatter);
  rules.push("");
  rules.push("# Emoji Usage Rules");
  rules.push("");
  rules.push(
    "This project enforces professional, emoji-free code and documentation.",
  );
  rules.push("");

  // Strict contexts
  rules.push("## Strict Contexts");
  rules.push("");

  if (contexts.documentation.enabled) {
    rules.push("### Documentation & Markdown");
    rules.push("Do not use emojis in:");
    rules.push("- README files");
    rules.push("- Markdown documentation");
    rules.push("- API documentation");
    rules.push("- Code examples in docs");
    rules.push("- Headers, lists, or paragraphs");
    rules.push("");
    rules.push("Use clear, professional language without emoji decoration.");
    rules.push("");
  }

  if (contexts.console.enabled) {
    rules.push("### Console Output");
    rules.push("Do not use emojis in:");
    rules.push("- `console.log()`, `console.error()`, `console.warn()`");
    rules.push("- Terminal output");
    rules.push("- Standard output/error streams");
    rules.push("- Debug messages");
    rules.push("");
    rules.push("Use plain text for all terminal output.");
    rules.push("");
  }

  if (contexts.cli.enabled) {
    rules.push("### CLI Tools & Command-Line Output");
    rules.push("Do not use emojis in:");
    rules.push("- Command-line interface output");
    rules.push("- Progress bars");
    rules.push("- Spinners");
    rules.push("- Status messages");
    rules.push("- Help text");
    rules.push("");
    rules.push("Use ASCII characters and plain text only.");
    rules.push("");
  }

  if (contexts.logging.enabled) {
    rules.push("### Logging & Error Messages");
    rules.push("Do not use emojis in:");
    rules.push("- Application logs");
    rules.push("- Error messages");
    rules.push("- Debug output");
    rules.push("- Logging statements");
    rules.push("- Stack traces");
    rules.push("");
    rules.push("Logs should be machine-parseable and professional.");
    rules.push("");
  }

  if (contexts.comments.enabled) {
    rules.push("### Code Comments");
    rules.push("Do not use emojis in:");
    rules.push("- Inline comments");
    rules.push("- JSDoc/TSDoc comments");
    rules.push("- Docstrings");
    rules.push("- Code documentation");
    rules.push("");
    rules.push("Write clear, descriptive comments using words only.");
    rules.push("");
  }

  if (contexts.commitMessages.enabled) {
    rules.push("### Git Commit Messages");
    rules.push("Do not use emojis in:");
    rules.push("- Commit messages");
    rules.push("- PR titles and descriptions");
    rules.push("- Branch names");
    rules.push("");
    rules.push("Use conventional commit format with plain text.");
    rules.push("");
  }

  // Relaxed contexts
  const relaxedContexts = Object.entries(contexts).filter(
    ([_, ctx]) => !ctx.enabled || ctx.severity === "relaxed",
  );

  if (relaxedContexts.length > 0) {
    rules.push("## Relaxed Contexts");
    rules.push("");
    relaxedContexts.forEach(([name, ctx]) => {
      const displayName = name.replace(/([A-Z])/g, " $1").trim();
      rules.push(
        `### ${displayName.charAt(0).toUpperCase() + displayName.slice(1)}`,
      );
      rules.push(ctx.customMessage || "Emojis may be used when appropriate.");
      rules.push("");
    });
  }

  // Rationale
  rules.push("## Rationale");
  rules.push("");
  rules.push("Emojis in code and documentation:");
  rules.push("- Reduce accessibility for screen readers");
  rules.push("- Create inconsistent rendering across platforms");
  rules.push("- Make text harder to search and parse programmatically");
  rules.push("- Appear unprofessional in enterprise contexts");
  rules.push("- Clutter console output and logs");
  rules.push("");

  // Configuration
  rules.push("## Configuration");
  rules.push("");
  rules.push("Generated from: https://nomoji.dev");
  rules.push("Update your rules at: https://nomoji.dev/configure");
  rules.push("");
  rules.push("---");
  rules.push("");
  rules.push(
    "**Remember**: Professional code should prioritize clarity and consistency over decoration. When in doubt, do not use emojis.",
  );

  return rules.join("\n");
}
