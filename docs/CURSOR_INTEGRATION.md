# Cursor Integration Guide

This guide shows you how to integrate nomoji.dev with Cursor AI to control emoji usage in your code generation.

## Quick Setup

### Download Pre-configured Rules

1. Download rules file:
```bash
mkdir -p .cursor/rules
curl https://nomoji.dev/api/cursor-rules/default -o .cursor/rules/nomoji.mdc
```

2. Cursor will automatically apply these rules

That's it! Cursor will now follow nomoji.dev rules in all AI interactions.

## Configuration Options

### Presets

Choose from three built-in presets:

```bash
# Strict mode (no emojis anywhere) - Recommended for enterprise
curl https://nomoji.dev/api/cursor-rules/strict-user -o .cursor/rules/nomoji.mdc

# Moderate mode (limited emojis) - Balanced approach
curl https://nomoji.dev/api/cursor-rules/moderate-user -o .cursor/rules/nomoji.mdc

# Relaxed mode (emojis in UI only) - Minimal restrictions
curl https://nomoji.dev/api/cursor-rules/relaxed-user -o .cursor/rules/nomoji.mdc
```

### Custom Configuration

Create a custom configuration via API:

```bash
curl -X POST https://nomoji.dev/api/config/YOUR_USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "contexts": {
      "documentation": { "enabled": true, "severity": "strict" },
      "console": { "enabled": true, "severity": "strict" },
      "cli": { "enabled": true, "severity": "strict" },
      "logging": { "enabled": true, "severity": "strict" },
      "comments": { "enabled": false, "severity": "relaxed" },
      "commitMessages": { "enabled": true, "severity": "moderate" },
      "userInterface": { "enabled": false, "severity": "relaxed" }
    }
  }'

# Download your custom rules
curl https://nomoji.dev/api/cursor-rules/YOUR_USER_ID -o .cursor/rules/nomoji.mdc
```

## Project-Level Rules

Place `.cursor/rules/nomoji.mdc` in your project root for project-specific configuration:

```
your-project/
├── .cursor/
│   └── rules/
│       └── nomoji.mdc      # Project-specific nomoji rules
├── .gitignore
├── package.json
└── src/
```

Commit to version control to share with your team:

```bash
git add .cursor/rules/nomoji.mdc
git commit -m "Add Cursor nomoji rules"
```

## Global Rules

For global Cursor configuration:

1. Open Cursor Settings
2. Go to "Rules" section
3. Add nomoji.dev rules to global configuration
4. These rules will apply to all projects unless overridden

## Verification

Test that your rules are working:

1. Open Cursor in your project
2. Ask Cursor to "Create a README with installation instructions"
3. Verify the output contains no emojis
4. Try with console.log statements, CLI output, etc.

## Updating Rules

To update your rules:

```bash
# Download latest rules for your user ID
curl https://nomoji.dev/api/cursor-rules/YOUR_USER_ID -o .cursor/rules/nomoji.mdc

# Or refresh with default settings
curl https://nomoji.dev/api/cursor-rules/default -o .cursor/rules/nomoji.mdc
```

## Team Sharing

Share your configuration with your team:

1. Create a shared config:
```bash
curl -X POST https://nomoji.dev/api/shared \
  -H "Content-Type: application/json" \
  -d @your-config.json
```

2. Get the share URL from the response

3. Team members can download:
```bash
SHARED_ID=<from-response>
curl https://nomoji.dev/api/shared/$SHARED_ID | \
  jq -r '.data' > custom-config.json

# Apply the shared config
curl -X POST https://nomoji.dev/api/config/YOUR_USER_ID \
  -H "Content-Type: application/json" \
  -d @custom-config.json

# Download rules
curl https://nomoji.dev/api/cursor-rules/YOUR_USER_ID -o .cursor/rules/nomoji.mdc
```

## Troubleshooting

### Rules Not Working

1. Verify `.cursor/rules/nomoji.mdc` exists in project root
2. Check file content is properly formatted
3. Restart Cursor to reload rules
4. Clear Cursor cache if needed:
   - Cmd/Ctrl + Shift + P
   - Search for "Clear Cache"
   - Restart Cursor

### Partial Application

If emojis still appear in some contexts:

1. Check severity levels in your configuration (strict vs moderate vs relaxed)
2. Verify all desired contexts are enabled
3. Download the strict preset:
```bash
curl https://nomoji.dev/api/cursor-rules/strict-user -o .cursor/rules/nomoji.mdc
```

## Best Practices

1. **Use version control**: Commit `.cursor/rules/nomoji.mdc` to your repository
2. **Document exceptions**: If you need emojis somewhere, document why
3. **Team consistency**: Use shared configs for team projects
4. **Regular updates**: Refresh rules periodically for improvements
5. **Context awareness**: Use different configs for different project types

## Advanced Usage

### Automated Updates

Add to your CI/CD or local scripts:

```bash
#!/bin/bash
# update-cursor-rules.sh

echo "Updating Cursor nomoji rules..."
curl -s https://nomoji.dev/api/cursor-rules/default \
  -o .cursor/rules/nomoji.mdc

echo "✓ Rules updated"
```

### Multiple Configurations

Manage different configurations for different projects:

```bash
# Enterprise project - strict
cd ~/projects/enterprise-app
curl https://nomoji.dev/api/cursor-rules/strict-user -o .cursor/rules/nomoji.mdc

# Personal project - relaxed
cd ~/projects/personal-site
curl https://nomoji.dev/api/cursor-rules/relaxed-user -o .cursor/rules/nomoji.mdc
```

## Resources

- [nomoji.dev](https://nomoji.dev) - Configure your rules
- [API Documentation](API.md) - Complete API reference
- [Quick Reference](QUICK_REFERENCE.md) - Quick command reference

## Support

Need help?
- Visit [nomoji.dev](https://nomoji.dev) for configuration
- Check the [API docs](API.md)
- Report issues on GitHub

---

**Professional code deserves professional standards** - powered by Cursor and nomoji.dev.
