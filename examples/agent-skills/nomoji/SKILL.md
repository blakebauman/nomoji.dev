---
name: nomoji
description: Enforce no-emoji standards. Use after generating code, docs, comments, logs, CLI output, or commit messages to remove emojis and keep output professional and accessible.
allowed-tools: Read Grep Glob Bash
---

# NoMoji — Emoji-Free Development

Prevent emoji characters in all AI-generated content to maintain professional, accessible code.

## Rules

- **Documentation** (strict): No emojis in markdown, README files, API docs, or any documentation.
- **Console output** (strict): No emojis in console.log, console.error, or any terminal output.
- **CLI tools** (strict): No emojis in command-line output, progress bars, spinners, or status messages.
- **Logging** (strict): No emojis in application logs, error messages, or debug output.
- **Code comments** (strict): No emojis in inline comments, JSDoc, or docstrings.
- **Git commits** (strict): No emojis in commit messages, PR titles, or descriptions.
- **User interface** (strict): No emojis in UI text strings or user-facing messages.

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
```bash
grep -rn --include="*.{js,ts,jsx,tsx,py,md,txt,sh}" -P "[\x{1F300}-\x{1FFFF}]|[\x{2600}-\x{27BF}]" .
```

## Contexts Active

- documentation
- console
- cli
- logging
- comments
- commit messages
- user interface

Severity: strict

## Configuration

Managed at https://nomoji.dev/setup
