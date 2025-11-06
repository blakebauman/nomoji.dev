# Example GitHub Copilot Setup

This directory shows a complete example of a project configured with nomoji.dev rules for GitHub Copilot.

## Directory Structure

```
your-project/
├── .vscode/
│   └── settings.json         # Copilot configuration
├── .github/
│   └── copilot-instructions.md  # Chat instructions
├── src/
│   └── your-code.ts
├── README.md
└── package.json
```

## Setup

### Option 1: Copy the Configuration

Copy the configuration files to your project:

```bash
cp -r .vscode your-project/
cp -r .github your-project/
```

### Option 2: Download Directly

**For Copilot Completions:**

```bash
# Create VS Code directory
mkdir -p .vscode

# Download nomoji rules
NOMOJI_RULES=$(curl -s https://nomoji.dev/api/template/default/copilot)

# Create settings.json
cat > .vscode/settings.json << EOF
{
  "github.copilot.advanced": {
    "customInstructions": "$NOMOJI_RULES"
  }
}
EOF
```

**For Copilot Chat:**

```bash
# Create GitHub directory
mkdir -p .github

# Download chat instructions
curl https://nomoji.dev/api/template/default/copilot \
  -o .github/copilot-instructions.md
```

### Option 3: Global Configuration

Install nomoji rules globally in VS Code:

1. Open VS Code Settings (Cmd/Ctrl + ,)
2. Search for "Copilot Instructions"
3. Click "Edit in settings.json"
4. Add:

```json
{
  "github.copilot.advanced": {
    "customInstructions": "EMOJI RULES: Do not use emojis in code, documentation, console output, CLI tools, logging, or commit messages. Use clear, professional language only."
  }
}
```

Or download full rules:

```bash
# Get rules
curl https://nomoji.dev/api/template/default/copilot

# Manually paste into VS Code settings
```

## Usage

Once configured, GitHub Copilot will suggest code without emojis:

### Code Completions

```javascript
// You type:
console.log('Server starting on port

// Copilot suggests (WITH nomoji.dev):
console.log('Server starting on port 3000');

// Instead of (WITHOUT nomoji.dev):
console.log('🚀 Server starting on port 3000');
```

### Copilot Chat

```
You: Create a README with installation instructions

Copilot Chat (WITH nomoji.dev):
# Installation

Follow these steps to install:

1. Clone the repository
2. Install dependencies
3. Run the application

---

Copilot Chat (WITHOUT nomoji.dev):
# 📦 Installation

Follow these steps to install: 🚀

1. Clone the repository 📥
2. Install dependencies ⚙️
3. Run the application 🎉
```

## What It Does

The nomoji.dev rules configure Copilot to:

1. **Avoid emojis in all code suggestions**
2. **Keep documentation professional**
3. **Use plain text in console/logs**
4. **Follow conventional commit format**
5. **Maintain consistent style across team**

## Configuration Options

### Workspace Settings (.vscode/settings.json)

```json
{
  "github.copilot.advanced": {
    "customInstructions": "Do not use emojis in code, documentation, console output, logging, or commit messages."
  },
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": true,
    "scminput": false
  }
}
```

### Chat Instructions (.github/copilot-instructions.md)

```markdown
# Copilot Instructions

## Emoji Usage Rules

Do not use emojis in any generated content.

Use clear, professional language in:
- Code and comments
- Documentation
- Console output
- Error messages
- Commit messages

## Why?
- Improves accessibility
- Ensures consistent rendering
- Makes content machine-parseable
- Maintains professional standards
```

## Presets

Switch between different strictness levels:

```bash
# Strict mode (no emojis anywhere)
curl https://nomoji.dev/api/template/strict-user/copilot

# Moderate mode (limited emojis)
curl https://nomoji.dev/api/template/moderate-user/copilot

# Relaxed mode (emojis in UI only)
curl https://nomoji.dev/api/template/relaxed-user/copilot
```

Update your `.vscode/settings.json` with the output.

## Project-Level vs Global

### Project-Level (Recommended for Teams)

```
your-project/
├── .vscode/settings.json
└── .github/copilot-instructions.md
```

**Benefits:**
- Team-wide consistency
- Version controlled
- Project-specific rules
- Easy to share

```bash
# Commit to version control
git add .vscode/settings.json .github/copilot-instructions.md
git commit -m "Add Copilot nomoji configuration"
```

### Global (Personal Preference)

Configure in VS Code user settings:

1. Cmd/Ctrl + Shift + P
2. "Preferences: Open User Settings (JSON)"
3. Add nomoji rules

**Benefits:**
- Applies to all projects
- Personal coding standards
- No per-project setup

**Note:** Project-level settings override global settings.

## Verification

Test that your rules are working:

### Test 1: Code Completion

Type in a JavaScript file:
```javascript
console.log('Starting server
```

Copilot should suggest without emojis:
```javascript
console.log('Starting server on port 3000');
```

### Test 2: Copilot Chat

Ask Copilot Chat:
```
Create a README with quick start guide
```

Output should be clean markdown without emoji decoration.

### Test 3: Comment Generation

Type:
```javascript
// TODO: Add error handling
```

Copilot suggestions should not include emojis in subsequent code.

## Team Setup

Share configuration across your team:

### Step 1: Create Team Config

```bash
# Create setup script
cat > scripts/setup-copilot-nomoji.sh << 'EOF'
#!/bin/bash
echo "Setting up GitHub Copilot with nomoji.dev rules..."

# Create directories
mkdir -p .vscode .github

# Download rules
NOMOJI_RULES=$(curl -s https://nomoji.dev/api/template/default/copilot)

# Create VS Code settings
cat > .vscode/settings.json << INNER_EOF
{
  "github.copilot.advanced": {
    "customInstructions": "$NOMOJI_RULES"
  }
}
INNER_EOF

# Download chat instructions
curl -s https://nomoji.dev/api/template/default/copilot \
  -o .github/copilot-instructions.md

echo "✓ Copilot nomoji configuration complete"
EOF

chmod +x scripts/setup-copilot-nomoji.sh
```

### Step 2: Commit and Share

```bash
git add scripts/setup-copilot-nomoji.sh
git add .vscode/settings.json .github/copilot-instructions.md
git commit -m "Add Copilot nomoji configuration"
git push
```

### Step 3: Team Members Run

```bash
# After cloning
./scripts/setup-copilot-nomoji.sh

# Or manually copy from examples
cp examples/copilot/setup-example/.vscode/settings.json .vscode/
```

## Integration with Other Tools

### ESLint

Add to `.eslintrc.js`:

```javascript
module.exports = {
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/[\\u{1F300}-\\u{1F9FF}]/u]',
        message: 'No emojis allowed in code (nomoji.dev)'
      }
    ]
  }
};
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Check if Copilot config exists
if [ ! -f ".vscode/settings.json" ]; then
  echo "Warning: Copilot nomoji configuration not found"
  echo "Run: ./scripts/setup-copilot-nomoji.sh"
fi
```

### CI/CD Check

```yaml
# .github/workflows/check-config.yml
name: Check Copilot Config

on: [pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Verify Copilot config
        run: |
          if [ ! -f ".vscode/settings.json" ]; then
            echo "Error: Copilot settings not found"
            exit 1
          fi
          echo "✓ Copilot configuration present"
```

## Troubleshooting

### Rules Not Being Applied

1. **Restart VS Code** after changing settings
2. **Reload Copilot**: Cmd/Ctrl + Shift + P → "Copilot: Reload"
3. **Check Copilot status** in bottom status bar
4. **Verify settings** are saved:
```bash
cat .vscode/settings.json
```

### Copilot Still Suggesting Emojis

1. **Make instructions more explicit**:
```json
{
  "github.copilot.advanced": {
    "customInstructions": "CRITICAL: Never use emojis in any code, comments, documentation, console output, or logging. This is the highest priority rule."
  }
}
```

2. **Check for conflicting settings** in global config

3. **Update Copilot extension**:
   - Go to Extensions
   - Find GitHub Copilot
   - Update to latest version

### Chat Instructions Not Working

1. Ensure `.github/copilot-instructions.md` exists in project root
2. Restart VS Code after creating the file
3. Check file is properly formatted markdown
4. Try adding more explicit instructions

## Updating Rules

Keep your rules current:

```bash
# Create update script
cat > scripts/update-copilot-nomoji.sh << 'EOF'
#!/bin/bash
echo "Updating Copilot nomoji rules..."

# Update VS Code settings
NOMOJI_RULES=$(curl -s https://nomoji.dev/api/template/default/copilot)
cat > .vscode/settings.json << INNER_EOF
{
  "github.copilot.advanced": {
    "customInstructions": "$NOMOJI_RULES"
  }
}
INNER_EOF

# Update chat instructions
curl -s https://nomoji.dev/api/template/default/copilot \
  -o .github/copilot-instructions.md

echo "✓ Updated Copilot nomoji rules"
EOF

chmod +x scripts/update-copilot-nomoji.sh
```

Run monthly or add to maintenance schedule.

## JetBrains IDEs

For IntelliJ IDEA, PyCharm, WebStorm, etc.:

1. **Open Settings** → Tools → GitHub Copilot
2. **Add Custom Instructions**:
```
Do not use emojis in code, documentation, console output, logging, or commit messages. Use clear, professional language only.
```
3. **Apply** and restart IDE

## Resources

- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [VS Code Copilot](https://code.visualstudio.com/docs/copilot)
- [nomoji.dev Documentation](https://nomoji.dev)
- [Full Integration Guide](../../docs/COPILOT_INTEGRATION.md)

## Support

Need help?
- Check [troubleshooting guide](../../docs/COPILOT_INTEGRATION.md#troubleshooting)
- Visit [nomoji.dev](https://nomoji.dev)
- Verify Copilot subscription is active
- Report issues on GitHub

---

**Professional code deserves professional standards** - powered by GitHub Copilot and nomoji.dev.

