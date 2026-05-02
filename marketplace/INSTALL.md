# nomoji — Agent Skill (universal)

A single `SKILL.md` that drops into any of the 37+ tools that consume the
[Agent Skills standard](https://agentskills.io). Strict preset: no emojis in
any context.

## Install

The `SKILL.md` here is the canonical artifact. Place the `nomoji/` folder
into your tool's skills directory:

| Tool                | Path                                                          |
|---------------------|---------------------------------------------------------------|
| Claude Code         | `~/.claude/skills/nomoji/`  or  `.claude/skills/nomoji/`      |
| Claude (claude.ai)  | upload via Settings → Skills                                  |
| Cursor              | `.cursor/skills/nomoji/`                                      |
| OpenAI Codex        | `~/.codex/skills/nomoji/`                                     |
| Gemini CLI          | `~/.gemini/skills/nomoji/`                                    |
| GitHub Copilot      | `.github/skills/nomoji/`                                      |
| VS Code (Copilot)   | `.vscode/skills/nomoji/`                                      |
| Goose               | `~/.config/goose/skills/nomoji/`                              |
| Junie               | per Junie skills docs                                         |
| Roo Code, Kiro, Amp, Factory, OpenHands, OpenCode, etc. | per each tool's skills docs |

(Authoritative install paths: each tool's docs page, linked from
<https://agentskills.io/home>.)

### One-liner

```bash
# Claude Code (project)
mkdir -p .claude/skills && cp -r nomoji .claude/skills/

# Claude Code (user)
mkdir -p ~/.claude/skills && cp -r nomoji ~/.claude/skills/

# Cursor
mkdir -p .cursor/skills && cp -r nomoji .cursor/skills/

# Codex
mkdir -p ~/.codex/skills && cp -r nomoji ~/.codex/skills/

# Gemini CLI
mkdir -p ~/.gemini/skills && cp -r nomoji ~/.gemini/skills/
```

## What's in the skill

- `SKILL.md` — Agent Skills frontmatter (`name`, `description`, `allowed-tools`)
  + the no-emoji rules across 7 contexts at strict severity.

## Customization

This is the strict preset. For weaker presets (moderate, relaxed) or custom
exceptions, generate a personalized skill at <https://nomoji.dev/setup>.
