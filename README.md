# nomoji.dev

> Control emoji usage in AI-generated code, documentation, and output

**nomoji.dev** is a platform for configuring granular emoji control across AI coding assistants. Stop emojis from cluttering your documentation, console logs, CLI tools, and commit messages.

## Why nomoji?

AI coding assistants love emojis. They add them to:
- Documentation headers and markdown files (README, API docs)
- Console output and logging statements
- CLI progress bars and messages  
- Code comments and docstrings
- Git commit messages
- Error messages and alerts
- Test output and assertions

While sometimes fun, emojis often:
- Reduce accessibility for screen readers
- Create inconsistent rendering across platforms
- Make text harder to search and parse
- Appear unprofessional in enterprise contexts
- Clutter technical output

**nomoji.dev** gives you control. Configure exactly where AI assistants can and cannot use emojis.

## Features

- **Claude Code Subagents**: Proactive emoji detection using specialized AI subagents
- **Granular Control**: Configure emoji rules for documentation, console, CLI, logging, comments, commits, and UI
- **Multiple Presets**: Strict, moderate, and relaxed configurations
- **AI Assistant Integration**: Works with Claude Code, Cursor, GitHub Copilot, Google Gemini CLI, and more
- **API Access**: RESTful API for programmatic access
- **Text Analysis**: Detect emoji usage in existing code
- **Shareable Configs**: Share configurations with your team
- **Git Hooks**: Pre-commit and commit-msg hooks to enforce rules
- **Zero Dependencies**: Lightweight, running on Cloudflare Workers

## Quick Start

> **Note**: Examples use `default` as the user ID. Replace with your identifier (e.g., `my-project`, `team-alpha`). [Learn more about user IDs →](docs/API.md#user-id-parameter)

### Claude Code Users (Recommended)

1. Download the nomoji subagent:
```bash
curl https://nomoji.dev/api/claude/default -o nomoji.mdc
```

2. Place it in your project:
```bash
mkdir -p .claude/agents
mv nomoji.mdc .claude/agents/
```

3. Claude Code will automatically use the subagent to check for emojis!

**What it does**: The nomoji subagent proactively checks your code after any changes and flags emoji usage with specific recommendations.

[Read the full Claude Code integration guide →](docs/CLAUDE_CODE_INTEGRATION.md)

### Cursor Users

1. Download your rules file:
```bash
mkdir -p .cursor/rules
curl https://nomoji.dev/api/cursor-rules/default -o .cursor/rules/nomoji.mdc
```

2. Cursor will automatically apply the rules

[Read the full Cursor integration guide →](docs/CURSOR_INTEGRATION.md)

### GitHub Copilot Users

1. Add to `.vscode/settings.json`:
```json
{
  "github.copilot.advanced": {
    "customInstructions": "Do not use emojis in code, documentation, console output, CLI tools, logging, or commit messages. Use clear, professional language only."
  }
}
```

2. Or download full template:
```bash
curl https://nomoji.dev/api/template/default/copilot
```

[Read the full GitHub Copilot integration guide →](docs/COPILOT_INTEGRATION.md)

### Google Gemini CLI Users

1. Download and configure:
```bash
mkdir -p ~/.gemini
curl https://nomoji.dev/api/template/default/generic -o ~/.gemini/nomoji-rules.md
```

2. Create config file:
```bash
cat > ~/.gemini/config.json << 'EOF'
{
  "systemInstructions": {
    "include": ["~/.gemini/nomoji-rules.md"]
  }
}
EOF
```

3. Use Gemini CLI normally - it will follow emoji-free guidelines

[Read the full Google Gemini CLI integration guide →](docs/GEMINI_CLI_INTEGRATION.md)

### OpenAI Codex Users (New!)

1. Install and configure:
```bash
# Install Codex CLI (requires ChatGPT Plus/Pro/Business/Edu/Enterprise)
npm i -g @openai/codex

# Download nomoji configuration
curl https://nomoji.dev/api/template/default/openai-codex -o ~/nomoji-codex.md

# Configure system instructions
codex config --system-instructions ~/nomoji-codex.md
```

2. Use Codex normally - it will generate emoji-free code

**What it does**: OpenAI Codex is an AI coding agent that works in your terminal and IDE. The nomoji configuration ensures all code generation, documentation, and output is professional and emoji-free.

**Also supported**: OpenAI API integration and ChatGPT custom instructions (see full guide)

[Read the full OpenAI/Codex integration guide →](docs/OPENAI_INTEGRATION.md)

### Git Hooks

#### Using Lefthook (Recommended)

[Lefthook](https://lefthook.dev/) is a fast, cross-platform Git hooks manager that makes it easy to manage and share hooks across your team.

```bash
# Install lefthook
npm install --save-dev lefthook

# Download configuration
curl https://nomoji.dev/examples/lefthook.yml -o lefthook.yml

# Install hooks
npx lefthook install
```

Lefthook automatically:
- Checks for emojis in code and commits
- Runs linting and formatting
- Executes type checking
- Runs tests before pushing

[Read the full Lefthook integration guide →](docs/LEFTHOOK_INTEGRATION.md)

#### Manual Installation

Install pre-commit and commit-msg hooks manually:

```bash
# Download and run setup script
curl -s https://nomoji.dev/examples/scripts/setup-hooks.sh | bash
```

Or manually:
```bash
# Pre-commit hook
curl https://nomoji.dev/examples/hooks/pre-commit -o .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# Commit message hook
curl https://nomoji.dev/examples/hooks/commit-msg -o .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
```

## Configuration

### Presets

Choose from three built-in presets:

**Strict** (Recommended for enterprise):
- No emojis anywhere
- Applies to all contexts
- Maximum professionalism

**Moderate** (Balanced approach):
- No emojis in docs, console, CLI, logging
- Relaxed for comments and UI
- Good for most teams

**Relaxed** (Minimal restrictions):
- Emojis allowed in UI
- Restricted in technical contexts (logs, CLI)
- Good for startups/personal projects

### API Usage

Replace `YOUR_USER_ID` with your chosen identifier (e.g., `my-project`, `team-alpha`):

Get configuration:
```bash
curl https://nomoji.dev/api/config/YOUR_USER_ID
```

Apply preset:
```bash
curl -X POST https://nomoji.dev/api/config/YOUR_USER_ID/preset/strict
```

Update configuration:
```bash
curl -X POST https://nomoji.dev/api/config/YOUR_USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "contexts": {
      "documentation": { "enabled": true, "severity": "strict" },
      "console": { "enabled": true, "severity": "strict" },
      "cli": { "enabled": true, "severity": "strict" }
    }
  }'
```

## Context Control

Configure emoji rules for specific contexts:

- **Documentation**: README, markdown, API docs
- **Console**: console.log, console.error, terminal output
- **CLI**: Command-line tools, progress bars, spinners
- **Logging**: Application logs, debug output, error messages
- **Comments**: Code comments, JSDoc, docstrings
- **Commit Messages**: Git commits, PR descriptions
- **User Interface**: UI text, user-facing messages

Each context supports three severity levels:
- **Strict**: No emojis allowed
- **Moderate**: Emojis discouraged but not forbidden
- **Relaxed**: Emojis allowed

## API Endpoints

### Configuration

- `GET /api/config/:userId` - Get user configuration
- `POST /api/config/:userId` - Update configuration
- `POST /api/config/:userId/preset/:preset` - Apply preset
- `DELETE /api/config/:userId` - Delete configuration

### Rules & Templates

- `GET /api/claude/:userId` - Download Claude Code subagent (.claude/agents/nomoji.mdc)
- `GET /api/cursor-rules/:userId` - Download Cursor rules (.cursor/rules/nomoji.mdc)
- `GET /api/rules/:userId` - Get plain text rules
- `GET /api/template/:userId/:assistant` - Get template for specific AI assistant
- `GET /api/json/:userId` - Get JSON format rules
- `GET /api/cursorrules/:userId` - Download .cursorrules (deprecated legacy format)

### Analysis

- `POST /api/analyze` - Analyze text for emoji usage

### Sharing

- `POST /api/shared` - Create shareable configuration
- `GET /api/shared/:configId` - Get shared configuration

### Utilities

- `GET /api/presets` - Get available presets
- `GET /api` - API documentation

## Documentation

### Getting Started
- [Quick Start Guide](docs/QUICKSTART.md) - Setup all AI assistants in 5 minutes
- [API Documentation](docs/API.md) - Complete API reference
- [Quick Reference](docs/QUICK_REFERENCE.md) - Security & performance features

### Integration Guides
- [Claude Code Integration](docs/CLAUDE_CODE_INTEGRATION.md) - **Recommended**
- [Cursor Integration](docs/CURSOR_INTEGRATION.md)
- [GitHub Copilot Integration](docs/COPILOT_INTEGRATION.md)
- [Google Gemini CLI Integration](docs/GEMINI_CLI_INTEGRATION.md)
- [OpenAI / Codex / ChatGPT Integration](docs/OPENAI_INTEGRATION.md) - **New**
- [Lefthook Integration](docs/LEFTHOOK_INTEGRATION.md) - Git hooks manager
- [CLI & Automation](docs/CLI_INTEGRATION.md)

### Operations & Development
- [Security & Performance](docs/SECURITY_IMPROVEMENTS.md) - Best practices checklist & implementation
- [Observability Guide](docs/OBSERVABILITY.md) - Logging, metrics, tracing, and debugging

## Examples

Check the `examples/` directory for:
- Git hooks (pre-commit, commit-msg)
- Shell scripts for automation
- CI/CD integration examples
- Project scanning tools

## Development

### Prerequisites

- Node.js 18+
- Wrangler CLI
- Cloudflare account (for deployment)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:8787
```

### Configuration

Update `wrangler.jsonc` with your KV namespace IDs:

```toml
[[kv_namespaces]]
binding = "PREFERENCES"
id = "your_kv_namespace_id"
preview_id = "your_preview_kv_namespace_id"
```

### Deployment

```bash
# Deploy to Cloudflare Workers
npm run deploy
```

## Project Structure

```
nomoji.dev/
├── src/
│   ├── index.ts              # Main application entry
│   ├── types.ts              # TypeScript types
│   ├── config/
│   │   └── defaults.ts       # Default configurations
│   ├── rules/
│   │   └── generator.ts      # Rule generation logic
│   ├── utils/
│   │   ├── emoji.ts          # Emoji detection utilities
│   │   └── storage.ts        # KV storage utilities
│   └── views/
│       ├── layout.tsx        # HTML layout
│       └── home.tsx          # Home page
├── docs/
│   ├── CLAUDE_CODE_INTEGRATION.md
│   ├── CURSOR_INTEGRATION.md
│   ├── COPILOT_INTEGRATION.md
│   ├── GEMINI_CLI_INTEGRATION.md
│   └── CLI_INTEGRATION.md
├── examples/
│   ├── hooks/
│   │   ├── pre-commit
│   │   └── commit-msg
│   └── scripts/
│       ├── setup-hooks.sh
│       └── check-project.sh
├── package.json
├── tsconfig.json
├── wrangler.jsonc
└── README.md
```

## Contributing

Contributions welcome! Areas for improvement:

- Additional AI assistant integrations
- Enhanced emoji detection
- More configuration options
- Integration examples
- Documentation improvements

## Roadmap

- [ ] Browser extension for editing configs
- [ ] VS Code extension
- [ ] Analytics dashboard
- [ ] Team management features
- [ ] Custom emoji allowlists per project
- [ ] Integration with more AI assistants
- [ ] Automated cleanup tools
- [ ] Rule testing framework

## FAQ

**Q: Does this completely block AI assistants from using emojis?**
A: It provides strong guidance, but AI assistants may occasionally still use emojis. The effectiveness depends on the assistant and how rules are enforced.

**Q: Can I allow specific emojis?**
A: Yes! Use the exceptions configuration to allow specific emojis while blocking others.

**Q: Does this work offline?**
A: The `.cursorrules` file works offline once downloaded. API calls require internet access.

**Q: Is this free?**
A: Yes, nomoji.dev is free to use. The service runs on Cloudflare Workers.

**Q: Can I self-host?**
A: Yes! Clone the repository and deploy to your own Cloudflare Workers account.

## License

MIT License - see LICENSE file for details

## Links

- Website: [nomoji.dev](https://nomoji.dev)
- API: [nomoji.dev/api](https://nomoji.dev/api)
- Documentation: [nomoji.dev/docs](https://nomoji.dev/docs)

---

**nomoji.dev** - Professional code deserves professional standards.

No emojis were used in the making of this documentation.

