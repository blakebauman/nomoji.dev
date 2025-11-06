# Quick Start Guide

Get nomoji.dev up and running in 5 minutes.

> **Note**: Examples below use `default` as the user ID. Replace it with any identifier like your project name or team name (e.g., `my-project`, `acme-corp`). User IDs are simple namespaces - no signup required. [Learn more →](API.md#user-id-parameter)

## Supported AI Assistants

| Assistant | Setup | Auto-Enforcement | Guide |
|-----------|-------|------------------|-------|
| **Claude Code** | Easy | Yes (Proactive Subagent) | [Below](#claude-code-recommended) |
| **Cursor** | Easy | Yes (Rules Engine) | [Below](#cursor) |
| **GitHub Copilot** | Easy | Partial (Suggestions) | [Below](#github-copilot) |
| **Google Gemini CLI** | Medium | Manual | [Below](#google-gemini-cli) |
| **Git Hooks** | Easy | Yes (Pre-commit/Push) | [Below](#git-hooks) |

---

## For Users: Integration Setup

### Claude Code (Recommended)

**Best for:** Proactive emoji detection with automatic fixes

1. Download the nomoji subagent:
```bash
curl https://nomoji.dev/api/claude/default -o nomoji.mdc
```

2. Place it in your project:
```bash
mkdir -p .claude/agents
mv nomoji.mdc .claude/agents/
```

3. That's it! Claude Code will automatically invoke the subagent to check for emojis.

**What you get:**
- Automatically invoked after code generation
- Scans for emojis and provides specific fixes
- Works with git diff to check recent changes
- Can be manually invoked for audits

[Full Claude Code guide →](CLAUDE_CODE_INTEGRATION.md)

---

### Cursor

**Best for:** IDE-integrated emoji control with zero configuration

1. Download rules file:
```bash
mkdir -p .cursor/rules
curl https://nomoji.dev/api/cursor-rules/default -o .cursor/rules/nomoji.mdc
```

2. Cursor will automatically apply the rules to all AI interactions.

**What you get:**
- Zero-config - works immediately after download
- Applies to all AI interactions in Cursor
- Supports project-level and global rules
- Version controllable

[Full Cursor guide →](CURSOR_INTEGRATION.md)

---

### GitHub Copilot

**Best for:** VS Code users wanting emoji-free code suggestions

1. Add to `.vscode/settings.json`:
```json
{
  "github.copilot.advanced": {
    "customInstructions": "Do not use emojis in code, documentation, console output, CLI tools, logging, or commit messages. Use clear, professional language only."
  }
}
```

Or download full template:
```bash
curl https://nomoji.dev/api/template/default/copilot
```

**What you get:**
- Works in VS Code and JetBrains IDEs
- Supports both code completions and Copilot Chat
- Project-level and global configuration
- Team-shareable settings

[Full Copilot guide →](COPILOT_INTEGRATION.md)

---

### Google Gemini CLI

**Best for:** Terminal-based AI coding workflow

1. Setup configuration:
```bash
mkdir -p ~/.gemini
curl https://nomoji.dev/api/template/default/gemini -o ~/.gemini/nomoji-rules.md
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

**What you get:**
- Terminal-native AI assistant
- Project-level and global configuration
- Works with existing CLI workflows
- Scriptable and CI/CD friendly

[Full Gemini CLI guide →](GEMINI_CLI_INTEGRATION.md)

---

### Git Hooks

**Best for:** Automated enforcement at commit/push time across entire team

#### Using Lefthook (Recommended)

```bash
# Install and setup
npm install --save-dev lefthook
curl https://nomoji.dev/examples/lefthook.yml -o lefthook.yml
npx lefthook install
```

**What you get:**
- Automatically checks code and commit messages for emojis
- Runs linting, formatting, and type checking
- Executes tests before pushing
- Cross-platform and version controlled

[Full Lefthook guide →](LEFTHOOK_INTEGRATION.md)

#### Manual Installation

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

---

## Configuration Presets

Choose from three built-in presets:

### Strict (Recommended for Enterprise)
- No emojis anywhere
- Applies to all contexts
- Maximum professionalism

```bash
curl -X POST https://nomoji.dev/api/config/YOUR_USER_ID/preset/strict
```

### Moderate (Balanced Approach)
- No emojis in docs, console, CLI, logging
- Relaxed for comments and UI
- Good for most teams

```bash
curl -X POST https://nomoji.dev/api/config/YOUR_USER_ID/preset/moderate
```

### Relaxed (Minimal Restrictions)
- Emojis allowed in UI
- Restricted in technical contexts (logs, CLI)
- Good for startups/personal projects

```bash
curl -X POST https://nomoji.dev/api/config/YOUR_USER_ID/preset/relaxed
```

---

## Multi-Assistant Setup

Using multiple AI assistants? Set them all up at once:

```bash
#!/bin/bash
# setup-all-nomoji.sh

echo "Setting up nomoji.dev for all AI assistants..."

# Claude Code
if [ -d ".claude" ] || command -v claude &> /dev/null; then
  mkdir -p .claude/agents
  curl -s https://nomoji.dev/api/claude/default -o .claude/agents/nomoji.mdc
  echo "✓ Claude Code configured"
fi

# Cursor
if [ -d ".cursor" ] || command -v cursor &> /dev/null; then
  mkdir -p .cursor/rules
  curl -s https://nomoji.dev/api/cursor-rules/default -o .cursor/rules/nomoji.mdc
  echo "✓ Cursor configured"
fi

# GitHub Copilot
if [ -f "package.json" ] || [ -f "requirements.txt" ]; then
  mkdir -p .vscode
  cat > .vscode/settings.json << 'SETTINGS_EOF'
{
  "github.copilot.advanced": {
    "customInstructions": "Do not use emojis in code, documentation, console output, CLI tools, logging, or commit messages."
  }
}
SETTINGS_EOF
  echo "✓ GitHub Copilot configured"
fi

# Google Gemini CLI
if command -v gemini &> /dev/null; then
  mkdir -p .gemini
  curl -s https://nomoji.dev/api/template/default/gemini -o .gemini/nomoji-rules.md
  cat > .gemini/config.json << 'GEMINI_EOF'
{
  "systemInstructions": {
    "include": [".gemini/nomoji-rules.md"]
  }
}
GEMINI_EOF
  echo "✓ Google Gemini CLI configured"
fi

echo ""
echo "✓ All available AI assistants configured"
echo "Commit these files to share with your team:"
echo "  git add .claude .cursor .vscode .github .gemini"
echo "  git commit -m 'Add nomoji configuration for AI assistants'"
```

Save as `setup-all-nomoji.sh` and run:
```bash
chmod +x setup-all-nomoji.sh
./setup-all-nomoji.sh
```

---

## Testing Your Setup

### Test Claude Code Integration

1. Create a test file with emojis:
```bash
echo "console.log('🚀 Test');" > test.js
```

2. Ask Claude to review it - the nomoji subagent should automatically flag the emoji

### Test Cursor Integration

1. Open Cursor in a project with `.cursor/rules/nomoji.mdc`
2. Ask: "Create a README with installation instructions"
3. Verify no emojis appear in the output

### Test Git Hooks

1. Try to commit a file with emojis:
```bash
echo "console.log('Hello 👋')" > test.js
git add test.js
git commit -m "test"
```

2. The commit should be blocked
3. Remove the emoji and try again

### Test API

```bash
# Get default configuration
curl https://nomoji.dev/api/config/default | jq

# Analyze text for emojis
curl -X POST https://nomoji.dev/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello 👋"}' | jq
```

---

## For Developers: Local Development

### Prerequisites

- Node.js 18+
- Wrangler CLI
- Cloudflare account (for deployment)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/blakebauman/nomoji.dev.git
cd nomoji.dev
```

2. Install dependencies:
```bash
npm install
```

3. Create KV namespaces:
```bash
# Production namespace
wrangler kv:namespace create "PREFERENCES"

# Preview namespace
wrangler kv:namespace create "PREFERENCES" --preview
```

4. Update `wrangler.jsonc` with your namespace IDs:
```jsonc
[[kv_namespaces]]
binding = "PREFERENCES"
id = "your_production_namespace_id"
preview_id = "your_preview_namespace_id"
```

5. Start development server:
```bash
npm run dev
```

6. Visit http://localhost:8787

### Deploy to Cloudflare Workers

1. Login to Cloudflare:
```bash
wrangler login
```

2. Deploy:
```bash
npm run deploy
```

3. Your site will be live at `https://blakebauman.YOUR_SUBDOMAIN.workers.dev`

### Custom Domain

1. Add a route in `wrangler.jsonc`:
```jsonc
routes = [
  { pattern = "nomoji.dev/*", zone_name = "nomoji.dev" }
]
```

2. Deploy:
```bash
npm run deploy
```

---

## Common Use Cases

### Team Setup

Share a configuration with your team:

```bash
# Create team config
curl -X POST https://nomoji.dev/api/shared \
  -H "Content-Type: application/json" \
  -d @team-config.json

# Team members download for Claude Code
TEAM_CONFIG_ID=<from-response>
curl https://nomoji.dev/api/shared/$TEAM_CONFIG_ID | \
  jq -r '.data' > .claude/agents/nomoji.mdc
```

### CI/CD Integration

Add to GitHub Actions:

```yaml
# .github/workflows/nomoji-check.yml
name: No Emoji Check
on: [push, pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check for emojis
        run: |
          curl -s https://nomoji.dev/examples/scripts/check-project.sh | bash
```

### Project Scan

Scan existing project for emojis:

```bash
curl -s https://nomoji.dev/examples/scripts/check-project.sh | bash
```

---

## Troubleshooting

### Claude Code subagent not invoking

1. Check file location: `.claude/agents/nomoji.mdc`
2. Verify file format (YAML frontmatter + markdown body)
3. Try explicit invocation: "Use nomoji subagent to check this file"

### Cursor not applying rules

1. Check `.cursor/rules/nomoji.mdc` exists
2. Restart Cursor
3. Verify rules format is correct

### Git hooks not working

1. Verify hooks are executable: `ls -l .git/hooks/`
2. Check curl and jq are installed
3. Test hook manually: `.git/hooks/pre-commit`

### API errors

1. Check you're online
2. Verify API is up: `curl https://nomoji.dev/api`
3. Check request format matches documentation

---

## Next Steps

- Read the [API documentation](API.md)
- Check [detailed integration guides](.)
- Browse [CLI automation guide](CLI_INTEGRATION.md)
- Explore [examples](../examples/)
- Review [security features](SECURITY_IMPROVEMENTS.md)
- Learn about [observability](OBSERVABILITY.md)

---

## Need Help?

- Documentation: https://nomoji.dev/docs
- API Reference: [API.md](API.md)
- Integration Guides: Individual guides in this directory

---

**nomoji.dev** - Professional code deserves professional standards.
