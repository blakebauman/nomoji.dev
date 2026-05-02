# nomoji — marketplace bundles

Pre-built distribution of nomoji as an [Agent Skill](https://agentskills.io)
— one `SKILL.md` that works with 37+ AI coding tools (Claude Code, Cursor,
OpenAI Codex, Gemini CLI, GitHub Copilot, VS Code, Goose, Junie, Roo Code,
Kiro, Factory, Amp, OpenHands, OpenCode, and more).

## Layout

```
marketplace/
├── nomoji/                  # ← the universal Agent Skill
│   └── SKILL.md
├── INSTALL.md               # per-tool install paths
├── claude-plugin/           # optional: Claude Code plugin wrapper
└── README.md                # this file
```

## What ships

- **`nomoji/`** — the canonical Agent Skill. Drop into any compatible tool's
  skills directory. See [INSTALL.md](INSTALL.md) for per-tool paths.
- **`claude-plugin/`** — a thin Claude Code plugin wrapper (`plugin.json` +
  the same skill). Use this for submitting to Anthropic's plugin marketplace
  specifically, where a "plugin" is a higher-level bundle than a skill.

For everything else (Cursor, Codex, Gemini, etc.), the universal `nomoji/`
folder is what you ship — those tools all consume the Agent Skills standard
directly.

## Strategy

1. **Universal skill** ships the strict preset. Copy `nomoji/` into any
   compatible tool's skills directory and it Just Works.
2. **Claude plugin marketplace** gets the `claude-plugin/` bundle for
   discoverability via `/plugin install nomoji`.
3. **<https://nomoji.dev/setup>** stays the power-user path for custom
   presets and exceptions.

## Regenerating

```bash
npm run build:marketplace
```

The script ([scripts/build-marketplace.mjs](../scripts/build-marketplace.mjs))
fetches the canonical `SKILL.md` from the live API and writes it to both
`nomoji/SKILL.md` and `claude-plugin/skills/nomoji/SKILL.md`.

### Known gap

The API has no preset-by-name endpoint. `/api/skill/:userId` looks up KV by
`userId` and falls back to `DEFAULT_CONFIG` when missing — which is *not*
`PRESETS.strict` (comments at moderate, UI disabled, `userInterface`
exception).

Until `/api/skill/preset/:name` exists or a marketplace `userId` is seeded
in KV, the `SKILL.md` here is hand-written from `PRESETS.strict`. Re-applying
hand edits after `build:marketplace` is the workaround.

## Publishing

- **Claude plugin marketplace**: push `claude-plugin/` as the root of a
  dedicated repo (`nomoji/claude-plugin`), tag a release, submit per
  Anthropic's docs.
- **Other tools**: publish the `nomoji/` folder via GitHub
  (`nomoji/agent-skill`) and link from <https://nomoji.dev/setup>.
  Most tools' skills directories are populated by `cp` / `git clone`, not
  hosted marketplaces — so a public repo is the distribution channel.
