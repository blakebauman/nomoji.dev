#!/bin/bash
# nomoji.dev — Manual git hooks setup
# Usage: curl -s https://nomoji.dev/examples/scripts/setup-hooks.sh | bash
# Docs:  https://nomoji.dev/integrations/git-hooks
#
# Installs two hooks into .git/hooks/:
#   pre-commit  — blocks emoji in staged files
#   commit-msg  — blocks emoji in commit messages

set -e

HOOKS_DIR=".git/hooks"

if [ ! -d "$HOOKS_DIR" ]; then
  echo "Error: Not in a git repository (no .git/hooks/ found)."
  echo "Run this script from the root of your project."
  exit 1
fi

# Require python3
if ! command -v python3 &> /dev/null; then
  echo "Error: python3 is required but not found."
  exit 1
fi

echo "Installing nomoji git hooks into $HOOKS_DIR ..."

# ---------------------------------------------------------------------------
# pre-commit hook
# ---------------------------------------------------------------------------
cat > "$HOOKS_DIR/pre-commit" << 'HOOK'
#!/bin/bash
# nomoji pre-commit — blocks emoji in staged files
python3 - << 'PY'
import sys, re, subprocess

EMOJI = re.compile(
    '[\U0001F600-\U0001F64F'
    '\U0001F300-\U0001F5FF'
    '\U0001F680-\U0001F6FF'
    '\U0001F1E0-\U0001F1FF'
    '\U00002600-\U000026FF'
    '\U00002700-\U000027BF'
    '\U0001F900-\U0001F9FF'
    '\U0001FA00-\U0001FA6F'
    '\U0001FA70-\U0001FAFF]'
)

try:
    files = subprocess.check_output(
        ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM'],
        stderr=subprocess.DEVNULL
    ).decode().splitlines()
except subprocess.CalledProcessError:
    sys.exit(0)

found = False
for f in files:
    try:
        for i, line in enumerate(open(f, errors='ignore'), 1):
            if EMOJI.search(line):
                print(f'{f}:{i}: emoji found')
                found = True
    except Exception:
        pass

if found:
    print('\nCommit blocked: emoji found in staged files.')
    print('Remove the emoji and try again.')
    sys.exit(1)
PY
HOOK
chmod +x "$HOOKS_DIR/pre-commit"

# ---------------------------------------------------------------------------
# commit-msg hook
# ---------------------------------------------------------------------------
cat > "$HOOKS_DIR/commit-msg" << 'HOOK'
#!/bin/bash
# nomoji commit-msg — blocks emoji in commit messages
python3 - "$1" << 'PY'
import sys, re

EMOJI = re.compile(
    '[\U0001F600-\U0001F64F'
    '\U0001F300-\U0001F5FF'
    '\U0001F680-\U0001F6FF'
    '\U0001F1E0-\U0001F1FF'
    '\U00002600-\U000026FF'
    '\U00002700-\U000027BF'
    '\U0001F900-\U0001F9FF'
    '\U0001FA00-\U0001FA6F'
    '\U0001FA70-\U0001FAFF]'
)

msg_file = sys.argv[1]
try:
    msg = open(msg_file, errors='ignore').read()
except Exception:
    sys.exit(0)

if EMOJI.search(msg):
    print('Commit message contains emoji. Please use text only.')
    sys.exit(1)
PY
HOOK
chmod +x "$HOOKS_DIR/commit-msg"

echo ""
echo "nomoji hooks installed:"
echo "  pre-commit  checks staged files for emoji"
echo "  commit-msg  checks commit messages for emoji"
echo ""
echo "To uninstall: rm $HOOKS_DIR/pre-commit $HOOKS_DIR/commit-msg"
