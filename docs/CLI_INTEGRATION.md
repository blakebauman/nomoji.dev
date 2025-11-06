# CLI Integration Guide

Use nomoji.dev programmatically from the command line to enforce emoji-free code.

## Installation

No installation required - use curl or any HTTP client to access the API.

## Quick Commands

### Download Configuration Files

```bash
# Download Cursor rules
curl https://nomoji.dev/api/cursor-rules/default -o .cursor/rules/nomoji.mdc

# Download Claude Code subagent
curl https://nomoji.dev/api/claude/default -o .claude/agents/nomoji.mdc

# Get plain text rules
curl https://nomoji.dev/api/rules/default
```

### Apply Preset

```bash
# Apply strict preset
curl -X POST https://nomoji.dev/api/config/YOUR_USER_ID/preset/strict

# Apply moderate preset
curl -X POST https://nomoji.dev/api/config/YOUR_USER_ID/preset/moderate
```

### Get Current Config

```bash
# JSON output
curl https://nomoji.dev/api/config/YOUR_USER_ID | jq

# Pretty print
curl -s https://nomoji.dev/api/config/YOUR_USER_ID | jq '.data'
```

### Update Configuration

```bash
curl -X POST https://nomoji.dev/api/config/YOUR_USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "contexts": {
      "documentation": { "enabled": true, "severity": "strict" },
      "console": { "enabled": true, "severity": "strict" }
    }
  }'
```

### Analyze Text

```bash
# Analyze a file for emojis
curl -X POST https://nomoji.dev/api/analyze \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"$(cat README.md)\"}" | jq

# Analyze string
curl -X POST https://nomoji.dev/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello 👋 World 🌍"}' | jq
```

## Shell Functions

Add helper functions to your `.bashrc` or `.zshrc`:

```bash
# Download nomoji rules
nomoji-pull() {
  local user_id=${1:-default}
  curl -s "https://nomoji.dev/api/cursorrules/$user_id" -o .cursorrules
  echo "Downloaded .cursorrules for user: $user_id"
}

# Apply nomoji preset
nomoji-preset() {
  local preset=${1:-strict}
  local user_id=${2:-default}
  curl -s -X POST "https://nomoji.dev/api/config/$user_id/preset/$preset"
  echo "Applied preset: $preset"
}

# Check file for emojis
nomoji-check() {
  local file=$1
  if [ -z "$file" ]; then
    echo "Usage: nomoji-check <file>"
    return 1
  fi
  curl -s -X POST https://nomoji.dev/api/analyze \
    -H "Content-Type: application/json" \
    -d "{\"text\":$(cat "$file" | jq -Rs .)}" | jq
}
```

Usage:
```bash
nomoji-pull my-project    # Download rules
nomoji-preset strict      # Apply strict preset
nomoji-check README.md    # Check file for emojis
```

## Git Hooks

### Pre-commit Hook

Use the provided hook from examples:

```bash
# Download and install
curl https://nomoji.dev/examples/hooks/pre-commit -o .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### Commit Message Hook

```bash
# Download and install
curl https://nomoji.dev/examples/hooks/commit-msg -o .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
```

### Automated Setup

```bash
curl -s https://nomoji.dev/examples/scripts/setup-hooks.sh | bash
```

For more details, see the [git hooks examples directory](../examples/hooks/).

## NPM Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "nomoji:pull": "curl https://nomoji.dev/api/cursorrules/default -o .cursorrules",
    "nomoji:check": "find src -type f \\( -name '*.js' -o -name '*.ts' \\) -exec sh -c 'curl -s -X POST https://nomoji.dev/api/analyze -H \"Content-Type: application/json\" -d \"{\\\"text\\\":\\\"$(cat {} | jq -Rs .)\\\"} \" | jq \".data | select(.hasEmojis == true)\"' \\;",
    "nomoji:strict": "curl -X POST https://nomoji.dev/api/config/$npm_config_user/preset/strict"
  }
}
```

Usage:
```bash
npm run nomoji:pull
npm run nomoji:check
npm run nomoji:strict --user=YOUR_USER_ID
```

## GitHub Actions

Create `.github/workflows/nomoji-check.yml`:

```yaml
name: Check for Emojis

on:
  pull_request:
    paths:
      - '**.js'
      - '**.ts'
      - '**.jsx'
      - '**.tsx'
      - '**.md'

jobs:
  nomoji-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check for emojis
        run: |
          curl -s https://nomoji.dev/examples/scripts/check-project.sh | bash
      
      - name: Check commit messages
        run: |
          for commit in $(git rev-list origin/main..HEAD); do
            msg=$(git log --format=%B -n 1 $commit)
            result=$(curl -s -X POST https://nomoji.dev/api/analyze \
              -H "Content-Type: application/json" \
              -d "{\"text\":\"$msg\"}")
            
            has_emojis=$(echo "$result" | jq -r '.data.hasEmojis')
            
            if [ "$has_emojis" = "true" ]; then
              echo "::error::Commit $commit message contains emojis"
              exit 1
            fi
          done
```

## Makefile Integration

Add to your `Makefile`:

```makefile
.PHONY: nomoji-setup nomoji-check

NOMOJI_USER_ID ?= default

nomoji-setup:
	@curl -s https://nomoji.dev/api/cursorrules/$(NOMOJI_USER_ID) -o .cursorrules
	@echo "✓ Downloaded .cursorrules"

nomoji-check:
	@find . -type f \( -name "*.js" -o -name "*.ts" -o -name "*.md" \) | while read file; do \
		result=$$(curl -s -X POST https://nomoji.dev/api/analyze \
			-H "Content-Type: application/json" \
			-d "{\"text\":\"$$(cat $$file | jq -Rs .)\"}"); \
		has_emojis=$$(echo "$$result" | jq -r '.data.hasEmojis'); \
		if [ "$$has_emojis" = "true" ]; then \
			count=$$(echo "$$result" | jq -r '.data.count'); \
			echo "✗ $$file contains $$count emoji(s)"; \
		fi; \
	done
```

Usage:
```bash
make nomoji-setup
make nomoji-check
```

## Docker Integration

Add to your Dockerfile:

```dockerfile
FROM node:18-alpine

# Install curl and jq
RUN apk add --no-cache curl jq

# Download nomoji rules
RUN curl -s https://nomoji.dev/api/cursorrules/default -o /workspace/.cursorrules

WORKDIR /workspace
COPY . .

# Verify no emojis in source
RUN find src -type f | while read file; do \
    result=$(curl -s -X POST https://nomoji.dev/api/analyze \
      -H "Content-Type: application/json" \
      -d "{\"text\":\"$(cat $file | jq -Rs .)\"}"); \
    has_emojis=$(echo "$result" | jq -r '.data.hasEmojis'); \
    if [ "$has_emojis" = "true" ]; then \
      echo "ERROR: $file contains emojis"; \
      exit 1; \
    fi; \
  done

CMD ["npm", "start"]
```

## VS Code Tasks

Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "nomoji: Pull Rules",
      "type": "shell",
      "command": "curl https://nomoji.dev/api/cursorrules/default -o .cursorrules"
    },
    {
      "label": "nomoji: Check Current File",
      "type": "shell",
      "command": "curl -s -X POST https://nomoji.dev/api/analyze -H 'Content-Type: application/json' -d \"{\\\"text\\\":\\\"$(cat ${file} | jq -Rs .)\\\"}\" | jq"
    }
  ]
}
```

Run via: Cmd/Ctrl + Shift + P → "Tasks: Run Task" → Select nomoji task

## API Patterns

### Error Handling

```bash
response=$(curl -s -w "\n%{http_code}" https://nomoji.dev/api/config/user123)
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
  echo "Success: $body"
else
  echo "Error ($http_code): $body"
fi
```

### Retry Logic

```bash
retry_api_call() {
  local max_attempts=3
  local attempt=1
  
  while [ $attempt -le $max_attempts ]; do
    response=$(curl -s https://nomoji.dev/api/config/default)
    if [ $? -eq 0 ]; then
      echo "$response"
      return 0
    fi
    echo "Attempt $attempt failed, retrying..." >&2
    ((attempt++))
    sleep 2
  done
  
  echo "All attempts failed" >&2
  return 1
}
```

### Batch Processing

```bash
# Check multiple files
for file in src/**/*.ts; do
  echo "Checking $file..."
  curl -s -X POST https://nomoji.dev/api/analyze \
    -H "Content-Type: application/json" \
    -d "{\"text\":\"$(cat "$file" | jq -Rs .)\"}" | \
    jq -r 'if .data.hasEmojis then "❌ \(.data.count) emoji(s) found" else "✓ Clean" end'
done
```

## Resources

- [API Documentation](API.md) - Complete API reference
- [Quick Reference](QUICK_REFERENCE.md) - Security & performance features
- [Examples Directory](../examples/) - Git hooks and scripts

## Support

Questions or issues? Check the [documentation](https://nomoji.dev) or file an issue.

---

**Tip**: For team-wide enforcement, use [Lefthook](LEFTHOOK_INTEGRATION.md) instead of manual git hooks.
