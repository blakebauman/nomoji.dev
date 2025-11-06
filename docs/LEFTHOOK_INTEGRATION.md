# Lefthook Integration Guide

This guide explains how to use [Lefthook](https://lefthook.dev/) as a Git hooks manager for nomoji.dev in your projects.

## What is Lefthook?

Lefthook is a fast, cross-platform Git hooks manager written in Rust that provides:

- Configuration-based hook management via `lefthook.yml`
- Parallel execution of multiple commands
- Easy sharing of hooks across teams
- Cross-platform compatibility (Windows, macOS, Linux)
- No dependencies (single binary)
- Automatic installation via npm scripts

## Installation

### For New Projects

1. Install lefthook:
```bash
npm install --save-dev lefthook
```

2. Download configuration:
```bash
curl https://nomoji.dev/examples/lefthook.yml -o lefthook.yml
```

3. Add to your `package.json`:
```json
{
  "scripts": {
    "prepare": "lefthook install"
  }
}
```

4. Install hooks:
```bash
npm run prepare
```

### For Existing nomoji.dev Users

This repository already has Lefthook configured! When you run `npm install`, the hooks are automatically installed via the `prepare` script.

To manually reinstall hooks:
```bash
npm run hooks:install
```

To uninstall hooks:
```bash
npm run hooks:uninstall
```

## Configuration

The `lefthook.yml` in this repository includes:

### Pre-commit Hook

Runs automatically before each commit:

1. **Biome Check**: Lints and formats TypeScript/JavaScript files
2. **Type Check**: Validates TypeScript types
3. **Emoji Check**: Validates code is emoji-free

All commands run in parallel for maximum speed.

### Commit-msg Hook

Validates commit messages:
- Checks commit message for emojis
- Enforces conventional commit format

### Pre-push Hook

Runs before pushing to remote:
- Executes full test suite
- Ensures all tests pass before pushing

[View full configuration →](../examples/lefthook.yml)

## Usage

### Normal Workflow

Lefthook runs automatically:

```bash
git add .
git commit -m "feat: add new feature"
# Lefthook automatically runs pre-commit hooks

git push
# Lefthook automatically runs pre-push hooks
```

### Bypassing Hooks

In rare cases where you need to bypass hooks:

```bash
# Skip pre-commit and commit-msg hooks
git commit --no-verify -m "emergency fix"

# Skip pre-push hooks
git push --no-verify
```

**Note**: Bypassing hooks is not recommended and should only be done in exceptional circumstances.

### Running Hooks Manually

Test hooks without committing:

```bash
# Run all pre-commit hooks
npx lefthook run pre-commit

# Run all pre-push hooks
npx lefthook run pre-push
```

## Customization

### Adding New Commands

Edit `lefthook.yml` to add custom commands. See the [examples/lefthook.yml](../examples/lefthook.yml) for the full configuration format.

### Disabling Specific Commands

Skip specific commands temporarily:

```bash
LEFTHOOK_EXCLUDE=emoji-check git commit -m "feat: new feature"
```

Or disable permanently in `lefthook.yml`:

```yml
pre-commit:
  commands:
    emoji-check:
      skip: true  # or skip: "Add reason here"
```

### Configuration Options

Key Lefthook configuration options:

- `parallel: true`: Run commands concurrently
- `glob`: File patterns to match
- `run`: Command to execute
- `stage_fixed: true`: Stage files after automatic fixes
- `skip`: Disable a command
- `fail_text`: Custom error message

See [Lefthook documentation](https://lefthook.dev/) for all options.

## Environment Variables

### nomoji.dev Configuration

Configure nomoji.dev API calls:

```bash
# Use custom user ID for nomoji.dev API
export NOMOJI_USER_ID=your-project-name

# Then run git commands normally
git commit -m "feat: new feature"
```

Add to your shell profile for persistence:

```bash
echo 'export NOMOJI_USER_ID=your-project-name' >> ~/.zshrc
source ~/.zshrc
```

### Lefthook Variables

Control Lefthook behavior:

```bash
# Skip specific commands
LEFTHOOK_EXCLUDE=emoji-check git commit

# Disable lefthook entirely
LEFTHOOK=0 git commit

# Verbose output
LEFTHOOK_VERBOSE=1 git commit
```

## Troubleshooting

### Hooks Not Running

1. Verify installation:
```bash
npx lefthook version
ls -la .git/hooks/
```

2. Reinstall hooks:
```bash
npm run hooks:install
```

### API Request Failures

If emoji check fails due to network issues:

```bash
# Check nomoji.dev API status
curl https://nomoji.dev/api/health

# Test analyze endpoint
curl -X POST https://nomoji.dev/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"test"}'
```

### Performance Issues

If hooks are slow:

1. Use `parallel: true` in `lefthook.yml`
2. Limit file glob patterns
3. Skip expensive checks in development:
```bash
LEFTHOOK_EXCLUDE=type-check git commit
```

### Dependencies

Ensure required tools are installed:

```bash
# Check for curl and jq (required for emoji checks)
which curl jq

# Install on macOS
brew install jq

# Install on Ubuntu/Debian
sudo apt-get install jq curl
```

## Comparison with Manual Hooks

### Manual Git Hooks

**Pros:**
- No additional dependencies
- Direct control
- Simple for single developer

**Cons:**
- Not version controlled
- Must be installed manually by each developer
- Hard to update and share
- Platform-specific scripts
- No parallel execution

### Lefthook

**Pros:**
- Version controlled via `lefthook.yml`
- Automatic installation via npm
- Cross-platform compatibility
- Parallel execution
- Easy to share and update
- Rich configuration options
- Team-friendly

**Cons:**
- Requires npm package
- Small learning curve
- Additional configuration file

## CI/CD Integration

Run Lefthook checks in CI:

```yml
# GitHub Actions example
- name: Install dependencies
  run: npm ci

- name: Run pre-commit checks
  run: npx lefthook run pre-commit

- name: Run tests
  run: npm test
```

Note: Set `CI=true` to skip interactive prompts.

## Team Setup

To ensure all team members use the same hooks:

1. Commit `lefthook.yml` to version control
2. Add `prepare` script to `package.json`
3. Document in README:

```md
## Development Setup

After cloning the repository:

\`\`\`bash
npm install  # Automatically installs git hooks
\`\`\`
```

4. Optional: Add to `.gitattributes`:
```
lefthook.yml text eol=lf
```

## Migration from Manual Hooks

If you're currently using the manual hooks from `examples/hooks/`:

1. Install lefthook:
```bash
npm install --save-dev lefthook
```

2. Download configuration:
```bash
curl https://nomoji.dev/examples/lefthook.yml -o lefthook.yml
```

3. Install hooks:
```bash
pnpm exec lefthook install
```

4. Remove old hooks (optional):
```bash
rm .git/hooks/pre-commit .git/hooks/commit-msg
```

The Lefthook configuration provides the same functionality as the manual hooks, plus additional benefits.

## Example Output

### Successful pre-commit:
```
Lefthook v2.0.2
EXECUTE > biome-check
EXECUTE > type-check  
EXECUTE > emoji-check

nomoji.dev: Checking staged files for emojis...
OK: src/index.ts
OK: src/utils/helper.ts

==================================
All files are emoji-free
==================================

biome-check: ✓ 0.34s
type-check: ✓ 1.23s
emoji-check: ✓ 0.87s
```

### Failed commit with emojis:
```
Lefthook v2.0.2
EXECUTE > emoji-check

nomoji.dev: Checking staged files for emojis...
FAIL: src/index.ts contains 2 emoji(s): 🎉, ✨

==================================
COMMIT REJECTED
==================================
Found 2 emoji(s) in 1 file(s)

Please remove emojis from your code before committing.

ERROR > emoji-check: exit status 1
```

## Additional Resources

- [Lefthook Documentation](https://lefthook.dev/)
- [Lefthook GitHub Repository](https://github.com/evilmartians/lefthook)
- [nomoji.dev API Documentation](API.md)
- [nomoji.dev Quick Reference](QUICK_REFERENCE.md)

## Support

If you encounter issues with Lefthook integration:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review [Lefthook documentation](https://lefthook.dev/)
3. Open an issue on the nomoji.dev repository
4. Check existing examples in `examples/hooks/`

## License

This integration guide is part of nomoji.dev, licensed under MIT.
