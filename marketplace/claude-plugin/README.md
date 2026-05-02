# nomoji — Claude Code plugin wrapper

The same nomoji Agent Skill, packaged as a Claude Code **plugin** for
submission to Anthropic's plugin marketplace.

> If you just want to install the skill, use [`marketplace/nomoji/`](../nomoji/)
> — it works in Claude Code and 36 other tools. This wrapper exists only for
> plugin-marketplace distribution, where a "plugin" can bundle skills,
> commands, and hooks together.

## Layout

```
claude-plugin/
├── .claude-plugin/
│   └── plugin.json          # plugin manifest
└── skills/
    └── nomoji/
        └── SKILL.md         # same file as ../nomoji/SKILL.md
```

## Install via plugin marketplace

```
/plugin install nomoji
```

(Once submitted and accepted.)

## Install manually

```bash
mkdir -p ~/.claude/plugins/nomoji
cp -r marketplace/claude-plugin/* ~/.claude/plugins/nomoji/
```

## Publish

1. Push this directory as the root of a dedicated repo (e.g.
   `nomoji/claude-plugin`).
2. Tag a release matching `plugin.json` `version`.
3. Submit the repo URL per Anthropic's plugin-marketplace docs.

## Regenerating

```bash
npm run build:marketplace
```

This refreshes `skills/nomoji/SKILL.md` from the live API. The `plugin.json`
manifest is hand-maintained.
