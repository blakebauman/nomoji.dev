#!/bin/bash
# Setup nomoji.dev git hooks
# Run this script from your project root: ./setup-hooks.sh

set -e

echo "Setting up nomoji.dev git hooks..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
  echo "Error: Not a git repository"
  echo "Run this script from your project root"
  exit 1
fi

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Base URL for downloading hooks
HOOKS_URL="https://nomoji.dev/examples/hooks"

# Download pre-commit hook
echo "Installing pre-commit hook..."
curl -s "$HOOKS_URL/pre-commit" -o .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# Download commit-msg hook
echo "Installing commit-msg hook..."
curl -s "$HOOKS_URL/commit-msg" -o .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg

# Check for required dependencies
echo ""
echo "Checking dependencies..."

if ! command -v curl &> /dev/null; then
  echo "⚠️  Warning: curl is not installed"
  echo "   Install curl to use nomoji.dev hooks"
fi

if ! command -v jq &> /dev/null; then
  echo "⚠️  Warning: jq is not installed"
  echo "   Install jq to use nomoji.dev hooks"
  echo "   macOS: brew install jq"
  echo "   Linux: apt-get install jq"
fi

echo ""
echo "=================================="
echo "✓ nomoji.dev hooks installed"
echo "=================================="
echo ""
echo "Hooks installed:"
echo "  • pre-commit  - Checks staged files for emojis"
echo "  • commit-msg  - Checks commit messages for emojis"
echo ""
echo "Configuration:"
echo "  Set NOMOJI_USER_ID environment variable to use custom config"
echo "  export NOMOJI_USER_ID=your-user-id"
echo ""
echo "To bypass hooks (not recommended):"
echo "  git commit --no-verify"
echo ""
echo "Learn more: https://nomoji.dev/docs/git-hooks"

