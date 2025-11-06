# GitHub Copilot Integration Guide

Learn how to configure GitHub Copilot to respect emoji usage rules using nomoji.dev.

## Setup for VS Code

### Method 1: Workspace Settings (Recommended)

1. Create `.vscode/settings.json` in your project:

```json
{
  "github.copilot.advanced": {
    "customInstructions": "EMOJI RULES: Do not use emojis in code, documentation, console output, CLI tools, logging, or commit messages. Use clear, professional language only. Emojis reduce accessibility, create parsing issues, and appear unprofessional."
  }
}
```

2. Or download full rules from nomoji.dev:

```bash
RULES=$(curl -s https://nomoji.dev/api/template/default/copilot)
# Add $RULES to your settings.json customInstructions
```

### Method 2: Global Settings

Set global Copilot instructions:

1. Open VS Code Settings (Cmd/Ctrl + ,)
2. Search for "Copilot Instructions"
3. Add your nomoji.dev rules
4. Save settings

Or edit `settings.json` directly:

```json
{
  "github.copilot.advanced": {
    "customInstructions": "Do not use emojis in code, documentation, console output, CLI tools, logging, or commit messages."
  }
}
```

## Copilot Chat Instructions

For Copilot Chat, create a `.github/copilot-instructions.md` file:

```markdown
# Copilot Instructions

## Emoji Usage Rules

Do not use emojis in any generated content including:

- Documentation and markdown files
- Console output (console.log, console.error, etc.)
- CLI tool output
- Application logs and error messages
- Code comments
- Git commit messages

Use clear, professional language without emoji decoration.

## Why?

- Improves accessibility
- Ensures consistent rendering
- Makes content machine-parseable
- Maintains professional standards

Source: nomoji.dev
```

## API Integration

Fetch rules programmatically:

```javascript
// fetch-copilot-rules.js
const userId = process.env.NOMOJI_USER_ID || 'default';
const response = await fetch(
  `https://nomoji.dev/api/template/${userId}/copilot`
);
const rules = await response.text();

// Update VS Code settings
const vscodeSettings = {
  'github.copilot.advanced': {
    'customInstructions': rules
  }
};

await fs.writeFile(
  '.vscode/settings.json',
  JSON.stringify(vscodeSettings, null, 2)
);
```

## Project-Specific Configuration

For different rules per project:

```bash
# Project A - Strict mode
curl https://nomoji.dev/api/template/strict-user/copilot \
  > .vscode/copilot-rules.txt

# Project B - Moderate mode
curl https://nomoji.dev/api/template/moderate-user/copilot \
  > .vscode/copilot-rules.txt
```

## JetBrains IDEs

For IntelliJ, PyCharm, WebStorm, etc.:

1. Go to Settings → Tools → GitHub Copilot
2. Add custom instructions
3. Paste nomoji.dev rules
4. Apply changes

## Verification

Test your configuration:

1. Type a comment that might trigger emoji suggestions:
```javascript
// TODO: Add error handling
```

2. Start a console.log statement:
```javascript
console.log('Processing...');
```

3. Verify suggestions don't include emojis

## Updating Rules

Keep rules current:

```bash
# Create update script
cat > update-copilot-rules.sh << 'EOF'
#!/bin/bash
USER_ID=${NOMOJI_USER_ID:-default}
curl -s https://nomoji.dev/api/template/$USER_ID/copilot > .copilot-rules.txt
echo "Copilot rules updated from nomoji.dev"
EOF

chmod +x update-copilot-rules.sh
```

Run weekly or add to cron:

```bash
# Add to crontab
0 0 * * 0 /path/to/update-copilot-rules.sh
```

## Team Sharing

Share configuration with team:

```bash
# Create shared config
curl -X POST https://nomoji.dev/api/shared \
  -H "Content-Type: application/json" \
  -d @team-config.json

# Team members fetch:
curl https://nomoji.dev/api/shared/CONFIG_ID > .copilot-rules.txt
```

## Troubleshooting

### Rules Not Applied

1. Restart VS Code
2. Reload Copilot: Cmd/Ctrl + Shift + P → "Copilot: Reload"
3. Check Copilot status in bottom bar
4. Verify custom instructions are saved

### Partial Working

If rules work inconsistently:

1. Make instructions more explicit
2. Increase severity to "strict" for all contexts
3. Add specific examples of what to avoid
4. Update to latest Copilot version

### Context-Specific Issues

Add more explicit context rules:

```json
{
  "github.copilot.advanced": {
    "customInstructions": "STRICT: Never use emojis in:\n- console.log() or any console output\n- require() or import statements\n- error messages\n- function names or variables\n- comments explaining code\n- documentation strings"
  }
}
```

## Best Practices

1. **Commit settings**: Include `.vscode/settings.json` in repo
2. **Document overrides**: Note any project-specific exceptions
3. **Use presets**: Start with nomoji.dev presets, customize as needed
4. **Regular updates**: Refresh rules when nomoji.dev updates
5. **Feedback loop**: Report persistent emoji issues to improve rules

## Resources

- [nomoji.dev](https://nomoji.dev) - Configure your rules
- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [VS Code Copilot](https://code.visualstudio.com/docs/copilot)

## Support

Issues with integration?
- Check nomoji.dev documentation
- Verify Copilot subscription is active
- Test with default rules first
- Report persistent issues on GitHub

---

**Professional code deserves professional standards** - powered by GitHub Copilot and nomoji.dev.
