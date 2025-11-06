# Google Gemini CLI Integration Guide

Learn how to integrate nomoji.dev with Google Gemini CLI to enforce emoji-free code standards in your terminal-based AI coding workflow.

## What is Gemini CLI?

Gemini CLI is an open-source AI agent that brings Google's Gemini AI directly into your terminal. It provides code understanding, generation, and automation capabilities while working alongside your existing development tools.

## Quick Setup

### Method 1: Configuration File (Recommended)

1. Download nomoji rules for Gemini:
```bash
curl https://nomoji.dev/api/template/default/generic -o ~/.gemini/nomoji-rules.md
```

2. Configure Gemini to use the rules:
```bash
mkdir -p ~/.gemini
cat > ~/.gemini/config.json << 'EOF'
{
  "systemInstructions": {
    "include": [
      "~/.gemini/nomoji-rules.md"
    ]
  }
}
EOF
```

3. Gemini will now follow emoji-free guidelines in all interactions

### Method 2: Environment Variable

Set system instructions via environment variable:

```bash
# Download rules
curl https://nomoji.dev/api/template/default/generic > ~/.gemini/nomoji-rules.txt

# Set environment variable (add to .bashrc/.zshrc)
export GEMINI_SYSTEM_INSTRUCTIONS="$(cat ~/.gemini/nomoji-rules.txt)"
```

### Method 3: Inline Instructions

Pass rules directly when running Gemini:

```bash
NOMOJI_RULES=$(curl -s https://nomoji.dev/api/template/default/generic)
gemini --system-prompt "$NOMOJI_RULES" "Create a server.js file"
```

## How It Works

When configured, Gemini CLI will:

1. **Follow emoji-free guidelines** in all code generation
2. **Avoid emojis** in console output, documentation, and comments
3. **Use professional language** in all generated content
4. **Respect context-specific rules** (logging, CLI output, commits)

## Usage Examples

### Generate Code Without Emojis

```bash
# Create a new file
gemini "Create a Node.js Express server with error handling"

# With nomoji.dev rules, output will be professional:
# console.log('Server starting on port 3000');
# console.error('Error: Failed to connect to database');
```

### Documentation Generation

```bash
# Generate README
gemini "Create a README for my CLI tool"

# Output will be clean markdown without emoji decoration
```

### Code Review

```bash
# Review code
gemini "Review this file for best practices" --file server.js

# Gemini will provide feedback without emoji decoration
```

## Project-Specific Configuration

Configure nomoji rules per project:

```bash
# In your project directory
mkdir -p .gemini
curl https://nomoji.dev/api/template/default/generic -o .gemini/nomoji-rules.md

# Create project config
cat > .gemini/config.json << 'EOF'
{
  "systemInstructions": {
    "include": [
      ".gemini/nomoji-rules.md"
    ]
  }
}
EOF

# Commit to version control
git add .gemini/
git commit -m "Add Gemini nomoji configuration"
```

## Presets

Download different strictness levels:

```bash
# Strict mode (no emojis anywhere)
curl https://nomoji.dev/api/template/strict-user/generic \
  -o ~/.gemini/nomoji-strict.md

# Moderate mode (limited emojis)
curl https://nomoji.dev/api/template/moderate-user/generic \
  -o ~/.gemini/nomoji-moderate.md

# Relaxed mode (emojis in UI only)
curl https://nomoji.dev/api/template/relaxed-user/generic \
  -o ~/.gemini/nomoji-relaxed.md
```

Update your config to reference the desired preset:

```json
{
  "systemInstructions": {
    "include": [
      "~/.gemini/nomoji-strict.md"
    ]
  }
}
```

## Shell Aliases

Add convenience commands to your `.bashrc` or `.zshrc`:

```bash
# Update nomoji rules for Gemini
alias gemini-nomoji-update='curl -s https://nomoji.dev/api/template/default/generic -o ~/.gemini/nomoji-rules.md && echo "✓ Nomoji rules updated"'

# Gemini with strict emoji enforcement
alias gemini-strict='gemini --system-prompt "$(cat ~/.gemini/nomoji-strict.md)"'
```

Usage:
```bash
gemini-nomoji-update           # Update rules
gemini-strict "Create tests"   # Use strict mode
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Gemini Code Review

on:
  pull_request:
    branches: [main]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Gemini
        run: |
          npm install -g @google/generative-ai-cli
          mkdir -p ~/.gemini
          curl -s https://nomoji.dev/api/template/strict-user/generic \
            -o ~/.gemini/nomoji-rules.md
      
      - name: Review Changed Files
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
        run: |
          NOMOJI_RULES=$(cat ~/.gemini/nomoji-rules.md)
          for file in $(git diff --name-only origin/main...HEAD); do
            if [ -f "$file" ]; then
              gemini --system-prompt "$NOMOJI_RULES" \
                "Review this file for code quality" --file "$file"
            fi
          done
```

## VS Code Integration

Create VS Code task (`.vscode/tasks.json`):

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Gemini: Generate with nomoji",
      "type": "shell",
      "command": "gemini",
      "args": [
        "--system-prompt",
        "$(cat ~/.gemini/nomoji-rules.md)",
        "${input:prompt}"
      ]
    }
  ],
  "inputs": [
    {
      "id": "prompt",
      "type": "promptString",
      "description": "What would you like Gemini to do?"
    }
  ]
}
```

Run via: Cmd/Ctrl + Shift + P → "Tasks: Run Task" → "Gemini: Generate with nomoji"

## Verification

Test your configuration:

```bash
# Test 1: Generate console output
gemini "Write a hello world with console.log"
# Expected: No emojis in output

# Test 2: Generate documentation
gemini "Create a quick README for a TODO app"
# Expected: Clean markdown without emoji decoration

# Test 3: Generate error handling
gemini "Add error handling to this function" --file app.js
# Expected: Professional error messages
```

## Troubleshooting

### Rules Not Applied

1. Check config file exists:
```bash
ls -la ~/.gemini/config.json
cat ~/.gemini/config.json
```

2. Verify rules file is readable:
```bash
cat ~/.gemini/nomoji-rules.md
```

3. Test with explicit system prompt:
```bash
gemini --system-prompt "$(cat ~/.gemini/nomoji-rules.md)" "test prompt"
```

### Emojis Still Appearing

Download strict preset:

```bash
curl https://nomoji.dev/api/template/strict-user/generic \
  -o ~/.gemini/nomoji-rules.md
```

### Project Config Not Working

Ensure Gemini CLI checks project-level config:

```bash
cd your-project/
gemini --config .gemini/config.json "test prompt"
```

## Best Practices

1. **Use project-level config**: Commit `.gemini/` to version control
2. **Choose appropriate preset**: Strict for enterprise, moderate for flexibility
3. **Regular updates**: Refresh rules monthly for improvements
4. **Team consistency**: Share config across team members
5. **Document exceptions**: Note any project-specific emoji allowances

## Updating Rules

Keep rules current with automatic updates:

```bash
# Create update script
cat > ~/bin/update-gemini-nomoji << 'EOF'
#!/bin/bash
echo "Updating nomoji rules for Gemini CLI..."

# Update global rules
curl -s https://nomoji.dev/api/template/default/generic \
  -o ~/.gemini/nomoji-rules.md

# Update project rules if in a project
if [ -f ".gemini/config.json" ]; then
  curl -s https://nomoji.dev/api/template/default/generic \
    -o .gemini/nomoji-rules.md
  echo "✓ Updated project rules"
fi

echo "✓ Updated global rules"
EOF

chmod +x ~/bin/update-gemini-nomoji
```

Run weekly or add to cron:
```bash
# Add to crontab
(crontab -l 2>/dev/null; echo "0 0 * * 0 ~/bin/update-gemini-nomoji") | crontab -
```

## Resources

- [Gemini CLI Documentation](https://github.com/google/generative-ai-cli)
- [nomoji.dev](https://nomoji.dev) - Configure your rules
- [API Documentation](API.md)

## Comparison with Other Tools

| Feature | Gemini CLI | Cursor | Claude Code |
|---------|------------|--------|-------------|
| Setup Complexity | Medium | Easy | Easy |
| Terminal Native | Yes | No | Yes |
| IDE Integration | Manual | Built-in | Built-in |
| Config Format | JSON/Markdown | .mdc | .mdc |
| Auto-invoke | No | Yes | Yes |

## Support

Issues with integration?
- Check Gemini CLI documentation
- Verify API key is set correctly
- Test with explicit system prompts first
- Report persistent issues on GitHub

---

**Professional code deserves professional standards** - powered by Google Gemini and nomoji.dev.
