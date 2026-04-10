# Claude Code Integration Guide

Learn how to install the nomoji Agent Skill in Claude Code to enforce emoji-free code standards.

See also: [Agent Skills standard](https://agentskills.io) | [Anthropic Skills Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

## Quick Setup

### Project-level (shared with team)

```bash
mkdir -p .claude/skills/nomoji
curl https://nomoji.dev/api/skill/default -o .claude/skills/nomoji/SKILL.md
```

### User-level (all projects)

```bash
mkdir -p ~/.claude/skills/nomoji
curl https://nomoji.dev/api/skill/default -o ~/.claude/skills/nomoji/SKILL.md
```

Claude Code auto-discovers skills in `.claude/skills/` — no additional configuration needed.

## How It Works

The nomoji skill uses the [Agent Skills](https://agentskills.io) open standard. Claude loads skill metadata at startup and applies instructions on demand:

- **Level 1 (always active):** Skill name and description loaded at startup — Claude knows nomoji exists and when to apply it
- **Level 2 (on demand):** Full instructions loaded when relevant — after generating code, docs, or commits

The skill is automatically applied after:
- Generating or modifying code files
- Creating or updating documentation
- Writing console output or logging statements
- Composing commit messages

Invoke manually with `/nomoji` in Claude Code.

## Skill Frontmatter

The generated SKILL.md includes Claude Code-specific frontmatter:

```yaml
---
name: nomoji
description: Enforce no-emoji standards. Use after generating code, docs, comments, logs, CLI output, or commit messages to remove emojis and keep output professional and accessible.
allowed-tools: Read Grep Glob Bash
---
```

Key fields:
- **`description`** — front-loaded with key terms so Claude auto-invokes at the right time; kept under 250 characters
- **`allowed-tools`** — pre-approves Read, Grep, Glob, Bash so nomoji runs without per-use permission prompts

## Presets

```bash
# Strict mode (no emojis anywhere — recommended for enterprise)
curl https://nomoji.dev/api/skill/strict-user -o .claude/skills/nomoji/SKILL.md

# Moderate mode (balanced)
curl https://nomoji.dev/api/skill/moderate-user -o .claude/skills/nomoji/SKILL.md

# Relaxed mode (emojis in UI only)
curl https://nomoji.dev/api/skill/relaxed-user -o .claude/skills/nomoji/SKILL.md
```

Or configure your own at [nomoji.dev/setup](https://nomoji.dev/setup) and download with your user ID:

```bash
curl https://nomoji.dev/api/skill/YOUR-USER-ID -o .claude/skills/nomoji/SKILL.md
```

## Team Setup

Commit the skill to version control so all team members get it automatically:

```bash
git add .claude/skills/nomoji/SKILL.md
git commit -m "Add nomoji Agent Skill"
```

## Usage Examples

### Automatic invocation

```
You: Update the README with installation instructions

Claude: [Generates README — nomoji skill active, no emojis added]
```

### Manual invocation

```
You: /nomoji check my recent commits

nomoji: Scanning commit history...
Found 2 commits with emojis in messages:
- abc1234: "feat: add feature" — OK
- def5678: "fix: resolve bug"  — OK
No issues found.
```

## Troubleshooting

**Skill not being applied?**
1. Check file location: `.claude/skills/nomoji/SKILL.md`
2. Verify YAML frontmatter is present (name and description fields)
3. Try explicit invocation: `/nomoji`

**Wrong behavior?**
1. Re-download a fresh SKILL.md: `curl https://nomoji.dev/api/skill/default -o .claude/skills/nomoji/SKILL.md`
2. Update your configuration at [nomoji.dev/setup](https://nomoji.dev/setup)

## Resources

- [Agent Skills Integration page](https://nomoji.dev/integrations/agent-skills) — install guides for all tools
- [nomoji.dev API](https://nomoji.dev/docs) — personalized skill generation
- [agentskills.io](https://agentskills.io) — open standard spec
- [Anthropic Skills Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

---

Professional code deserves professional standards — powered by [nomoji.dev](https://nomoji.dev).
