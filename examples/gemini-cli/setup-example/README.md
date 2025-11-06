# Example Gemini CLI Setup

This directory shows a complete example of a project configured with nomoji.dev rules for Google Gemini CLI.

## Directory Structure

```
your-project/
├── .gemini/
│   ├── config.json           # Gemini configuration
│   └── nomoji-rules.md       # Emoji control rules
├── src/
│   └── your-code.ts
├── README.md
└── package.json
```

## Setup

### Option 1: Copy the Configuration

Copy the `.gemini` directory to your project root:

```bash
cp -r .gemini your-project/
```

### Option 2: Download Directly

```bash
# Create directory
mkdir -p .gemini

# Download nomoji rules
curl https://nomoji.dev/api/template/default/generic -o .gemini/nomoji-rules.md

# Create config file
cat > .gemini/config.json << 'EOF'
{
  "systemInstructions": {
    "include": [
      ".gemini/nomoji-rules.md"
    ]
  },
  "modelParams": {
    "temperature": 0.7,
    "topP": 0.95,
    "topK": 40
  }
}
EOF
```

### Option 3: Global Configuration

Install nomoji rules globally for all your projects:

```bash
# Create global Gemini directory
mkdir -p ~/.gemini

# Download rules
curl https://nomoji.dev/api/template/default/generic -o ~/.gemini/nomoji-rules.md

# Create global config
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

## Usage

Once installed, use Gemini CLI normally and it will follow emoji-free guidelines:

```bash
# Generate code
gemini "Create a Node.js Express server"

# Generate documentation
gemini "Create a README for this project"

# Review code
gemini "Review this file for best practices" --file src/app.ts

# Generate tests
gemini "Create unit tests for this module" --file src/utils.ts
```

## What Happens

With nomoji.dev rules, Gemini CLI will generate clean, professional code:

```bash
# You ask:
gemini "Create a server startup script"

# Gemini generates (WITH nomoji.dev):
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
```

Without nomoji.dev rules, you might get:

```javascript
// WITHOUT nomoji.dev:
console.log('🚀 Server starting...');
console.log('✨ Ready to accept connections!');
console.error('❌ Failed to start server');
```

## Configuration Options

The `config.json` file supports these options:

```json
{
  "systemInstructions": {
    "include": [
      ".gemini/nomoji-rules.md"
    ],
    "text": "Additional inline instructions here"
  },
  "modelParams": {
    "temperature": 0.7,
    "topP": 0.95,
    "topK": 40,
    "maxOutputTokens": 2048
  },
  "safetySettings": {
    "HARM_CATEGORY_HARASSMENT": "BLOCK_MEDIUM_AND_ABOVE",
    "HARM_CATEGORY_HATE_SPEECH": "BLOCK_MEDIUM_AND_ABOVE"
  }
}
```

## Presets

Switch between different strictness levels:

```bash
# Strict (no emojis anywhere)
curl https://nomoji.dev/api/template/strict-user/generic \
  -o .gemini/nomoji-rules.md

# Moderate (limited emojis)
curl https://nomoji.dev/api/template/moderate-user/generic \
  -o .gemini/nomoji-rules.md

# Relaxed (emojis in UI only)
curl https://nomoji.dev/api/template/relaxed-user/generic \
  -o .gemini/nomoji-rules.md
```

## Project-Level vs Global

### Project-Level (Recommended for Teams)

```
your-project/
├── .gemini/
│   ├── config.json
│   └── nomoji-rules.md
```

**Benefits:**
- Team-wide consistency
- Version controlled
- Project-specific configuration
- Can be committed to Git

```bash
# Commit to version control
git add .gemini/
git commit -m "Add Gemini nomoji configuration"
```

### Global (Personal Preference)

```
~/.gemini/
├── config.json
└── nomoji-rules.md
```

**Benefits:**
- Applies to all projects
- No per-project setup needed
- Personal coding standards

**Note:** Project-level config takes precedence over global config.

## Verification

Test that your rules are working:

```bash
# Test 1: Generate console output
gemini "Write a hello world program"
# Should NOT include emojis like 🚀 or 🎉

# Test 2: Generate error handling
gemini "Add error handling to a fetch request"
# Error messages should be plain text

# Test 3: Create documentation
gemini "Create a README for a CLI tool"
# Should use professional markdown without emoji decoration
```

## Updating Rules

To update your rules with the latest from nomoji.dev:

```bash
# Update project rules
curl https://nomoji.dev/api/template/default/generic \
  -o .gemini/nomoji-rules.md

# Or update global rules
curl https://nomoji.dev/api/template/default/generic \
  -o ~/.gemini/nomoji-rules.md

echo "Updated nomoji rules for Gemini CLI"
```

## Team Sharing

Share your configuration with your team:

1. **Commit `.gemini/` to your repository**
```bash
git add .gemini/
git commit -m "Add Gemini nomoji configuration"
git push
```

2. **Team members clone and use immediately**
```bash
git clone your-repo
cd your-repo
# Configuration is already present
gemini "Start coding"
```

3. **Create team update script**
```bash
#!/bin/bash
# scripts/update-gemini-nomoji.sh
curl -s https://nomoji.dev/api/template/default/generic \
  -o .gemini/nomoji-rules.md
echo "Updated team nomoji rules"
```

## Integration with Other Tools

### Pre-commit Hook

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
# Check that Gemini config exists
if [ ! -f ".gemini/nomoji-rules.md" ]; then
  echo "Warning: Gemini nomoji rules not found"
  echo "Run: curl https://nomoji.dev/api/template/default/generic -o .gemini/nomoji-rules.md"
fi
```

### VS Code Task

Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Gemini: Update nomoji rules",
      "type": "shell",
      "command": "curl https://nomoji.dev/api/template/default/generic -o .gemini/nomoji-rules.md",
      "presentation": {
        "reveal": "always"
      }
    }
  ]
}
```

### Make Target

Add to your `Makefile`:

```makefile
.PHONY: gemini-setup gemini-update

gemini-setup:
	mkdir -p .gemini
	curl -s https://nomoji.dev/api/template/default/generic -o .gemini/nomoji-rules.md
	@echo "{ \"systemInstructions\": { \"include\": [\".gemini/nomoji-rules.md\"] } }" > .gemini/config.json
	@echo "✓ Gemini nomoji configuration created"

gemini-update:
	curl -s https://nomoji.dev/api/template/default/generic -o .gemini/nomoji-rules.md
	@echo "✓ Gemini nomoji rules updated"
```

Usage:
```bash
make gemini-setup   # Initial setup
make gemini-update  # Update rules
```

## Troubleshooting

### Rules Not Being Applied

1. **Check config file exists and is valid JSON:**
```bash
cat .gemini/config.json | jq
```

2. **Verify rules file exists:**
```bash
cat .gemini/nomoji-rules.md
```

3. **Test with explicit path:**
```bash
gemini --config .gemini/config.json "test prompt"
```

### Gemini Still Using Emojis

1. **Make rules more explicit** - Use strict preset:
```bash
curl https://nomoji.dev/api/template/strict-user/generic \
  -o .gemini/nomoji-rules.md
```

2. **Check if global config is interfering:**
```bash
mv ~/.gemini ~/.gemini.backup  # Temporarily disable global config
```

3. **Verify Gemini CLI version is up to date:**
```bash
gemini --version
npm update -g @google/generative-ai-cli
```

## Environment Variables

You can also use environment variables:

```bash
# Set via environment
export GEMINI_SYSTEM_INSTRUCTIONS="$(cat .gemini/nomoji-rules.md)"

# Or add to .env file
echo "GEMINI_SYSTEM_INSTRUCTIONS=$(cat .gemini/nomoji-rules.md)" >> .env

# Or add to your shell profile
echo 'export GEMINI_SYSTEM_INSTRUCTIONS="$(cat ~/.gemini/nomoji-rules.md)"' >> ~/.zshrc
```

## Resources

- [Google Gemini CLI](https://github.com/google/generative-ai-cli)
- [nomoji.dev Documentation](https://nomoji.dev)
- [Full Integration Guide](../../docs/GEMINI_CLI_INTEGRATION.md)
- [API Reference](https://nomoji.dev/api)

## Support

Need help?
- Check the [troubleshooting guide](../../docs/GEMINI_CLI_INTEGRATION.md#troubleshooting)
- Visit [nomoji.dev](https://nomoji.dev) for configuration
- Report issues on GitHub

---

**Professional code deserves professional standards** - powered by Google Gemini and nomoji.dev.

