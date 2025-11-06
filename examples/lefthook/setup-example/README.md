# Lefthook Setup Example

This example demonstrates how to set up Lefthook with nomoji.dev for automated emoji checking in your Git workflow.

## Quick Start

### 1. Install Lefthook

Add lefthook to your project:

```bash
npm install --save-dev lefthook
```

Or if using yarn:

```bash
yarn add -D lefthook
```

### 2. Download Configuration

Get the nomoji.dev Lefthook configuration:

```bash
curl https://nomoji.dev/examples/lefthook.yml -o lefthook.yml
```

Or copy from this example:

```bash
cp examples/lefthook.yml lefthook.yml
```

### 3. Install Hooks

Run the install command:

```bash
npx lefthook install
```

This will create Git hooks in `.git/hooks/` that automatically run when you commit or push.

### 4. Add to package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "prepare": "lefthook install",
    "hooks:install": "lefthook install",
    "hooks:uninstall": "lefthook uninstall"
  }
}
```

The `prepare` script ensures hooks are installed automatically when anyone runs `npm install`.

## What Gets Checked

### Pre-commit Hook

Before each commit, Lefthook will:

1. Run Biome linting and formatting on staged files
2. Run TypeScript type checking
3. Check all staged files for emojis using nomoji.dev API

If any check fails, the commit is blocked.

### Commit-msg Hook

Before accepting a commit message, Lefthook will:

1. Check the commit message for emojis using nomoji.dev API
2. Ensure professional commit message format

### Pre-push Hook

Before pushing to remote, Lefthook will:

1. Run the full test suite
2. Ensure all tests pass

## Usage Examples

### Normal Workflow

Everything runs automatically:

```bash
git add src/index.ts
git commit -m "feat: add new feature"
# Lefthook automatically runs all pre-commit checks
# If everything passes, commit succeeds

git push
# Lefthook runs tests before pushing
```

### Successful Output

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

### Failed Check

If emojis are detected:

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

### Bypassing Hooks

In emergency situations only:

```bash
git commit --no-verify -m "emergency fix"
```

**Warning**: This is not recommended and should only be used in exceptional circumstances.

## Configuration

### Basic Configuration

The default `lefthook.yml` includes emoji checking. Here's a minimal version:

```yml
pre-commit:
  commands:
    emoji-check:
      run: |
        # Your emoji checking script
        curl -X POST https://nomoji.dev/api/analyze \
          -H "Content-Type: application/json" \
          -d '{"text":"test"}'
```

### Customization

Edit `lefthook.yml` to customize behavior:

```yml
pre-commit:
  parallel: true  # Run commands in parallel
  commands:
    biome-check:
      glob: "*.{ts,tsx,js,jsx}"  # File patterns to match
      run: npx biome check --write {staged_files}
      stage_fixed: true  # Stage automatically fixed files
    
    emoji-check:
      skip: false  # Set to true to disable
```

### Environment Variables

Configure nomoji.dev API:

```bash
# Set custom user ID
export NOMOJI_USER_ID=your-project-name

# Then use git normally
git commit -m "feat: new feature"
```

### Skipping Specific Commands

Skip a specific command temporarily:

```bash
LEFTHOOK_EXCLUDE=type-check git commit -m "feat: new feature"
```

## Testing

### Test Hooks Manually

Run hooks without committing:

```bash
# Test pre-commit hooks
npx lefthook run pre-commit

# Test commit-msg hooks (requires a test message)
echo "test: commit message" > .git/COMMIT_EDITMSG
npx lefthook run commit-msg

# Test pre-push hooks
npx lefthook run pre-push
```

### Verbose Output

See detailed execution:

```bash
LEFTHOOK_VERBOSE=1 git commit -m "feat: test"
```

## Integration with CI/CD

Run Lefthook checks in your CI pipeline:

### GitHub Actions

```yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Lefthook checks
        run: npx lefthook run pre-commit
      
      - name: Run tests
        run: npm test
```

### GitLab CI

```yml
test:
  image: node:20
  script:
    - npm ci
    - npx lefthook run pre-commit
    - npm test
```

## Troubleshooting

### Hooks Not Running

1. Check installation:
```bash
npx lefthook version
ls -la .git/hooks/
```

2. Reinstall:
```bash
npx lefthook uninstall
npx lefthook install
```

### API Errors

If emoji checking fails:

```bash
# Test API connectivity
curl https://nomoji.dev/api/health

# Test analyze endpoint
curl -X POST https://nomoji.dev/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"test 🎉"}'
```

### Missing Dependencies

Ensure required tools are installed:

```bash
# Check for curl and jq
which curl jq

# Install on macOS
brew install jq curl

# Install on Ubuntu/Debian
sudo apt-get install jq curl
```

### Performance Issues

If hooks are slow:

1. Enable parallel execution in `lefthook.yml`:
```yml
pre-commit:
  parallel: true
```

2. Limit file globs:
```yml
commands:
  biome-check:
    glob: "src/**/*.ts"  # Only check specific directories
```

3. Skip expensive checks in development:
```bash
LEFTHOOK_EXCLUDE=tests git commit
```

## Team Setup

### For New Team Members

When someone clones the repository:

```bash
git clone <repository>
cd <repository>
npm install  # Automatically installs hooks via prepare script
```

That's it! Hooks are ready to use.

### Documenting in README

Add to your project's README:

```md
## Development Setup

After cloning:

```bash
npm install
```

This automatically installs Git hooks that:
- Check for emojis in code and commits
- Run linting and type checking
- Execute tests before pushing

To bypass hooks in emergencies: `git commit --no-verify`
```
```

## Project Structure

```
your-project/
├── lefthook.yml          # Lefthook configuration
├── package.json          # Includes prepare script
├── .git/
│   └── hooks/           # Auto-generated by lefthook
│       ├── pre-commit
│       ├── commit-msg
│       └── pre-push
└── src/
    └── ...
```

## Advanced Features

### Multiple Configurations

Use different configs for different branches:

```yml
pre-commit:
  commands:
    emoji-check:
      skip: 
        - ref: main  # Skip on main branch
        - ref: develop
```

### Custom Scripts

Create custom validation scripts:

```yml
pre-commit:
  commands:
    custom-check:
      run: node scripts/custom-validation.js {staged_files}
      glob: "*.ts"
```

### Tags

Group and run specific command groups:

```yml
pre-commit:
  commands:
    emoji-check:
      tags: [emoji, validation]
    lint:
      tags: [style, validation]
```

Run only tagged commands:

```bash
npx lefthook run pre-commit --tag emoji
```

## Additional Resources

- [Lefthook Documentation](https://lefthook.dev/)
- [nomoji.dev Lefthook Guide](https://nomoji.dev/docs/LEFTHOOK_INTEGRATION.md)
- [nomoji.dev API Documentation](https://nomoji.dev/docs/API.md)
- [Lefthook GitHub Repository](https://github.com/evilmartians/lefthook)

## Support

For issues or questions:

1. Check the [troubleshooting section](#troubleshooting)
2. Review [Lefthook documentation](https://lefthook.dev/)
3. Visit [nomoji.dev](https://nomoji.dev)
4. Open an issue on GitHub

## License

This example is part of nomoji.dev, licensed under MIT.

