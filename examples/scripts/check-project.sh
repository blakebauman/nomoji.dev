#!/bin/bash
# Check entire project for emojis using nomoji.dev
# Usage: ./check-project.sh [directory]

set -e

NOMOJI_API="https://nomoji.dev/api"
USER_ID="${NOMOJI_USER_ID:-default}"
TARGET_DIR="${1:-.}"

# File extensions to check
EXTENSIONS=("*.js" "*.ts" "*.jsx" "*.tsx" "*.py" "*.md" "*.txt" "*.json" "*.yaml" "*.yml")

echo "nomoji.dev: Scanning project for emojis..."
echo "Directory: $TARGET_DIR"
echo ""

# Build find command with extensions
FIND_CMD="find \"$TARGET_DIR\" -type f \\( "
for i in "${!EXTENSIONS[@]}"; do
  if [ $i -eq 0 ]; then
    FIND_CMD="$FIND_CMD -name \"${EXTENSIONS[$i]}\""
  else
    FIND_CMD="$FIND_CMD -o -name \"${EXTENSIONS[$i]}\""
  fi
done
FIND_CMD="$FIND_CMD \\)"

# Get list of files
files=$(eval $FIND_CMD)

# Counters
total_files=0
checked_files=0
files_with_emojis=0
total_emojis=0

# Results array
declare -a results

# Check each file
while IFS= read -r file; do
  total_files=$((total_files + 1))
  
  # Skip node_modules, .git, dist, build directories
  if echo "$file" | grep -qE "(node_modules|\.git|dist|build|\.next)"; then
    continue
  fi
  
  # Skip binary files
  if file "$file" | grep -q "binary"; then
    continue
  fi
  
  # Read file content
  if [ ! -r "$file" ]; then
    continue
  fi
  
  content=$(cat "$file" 2>/dev/null || echo "")
  
  # Skip empty files
  if [ -z "$content" ]; then
    continue
  fi
  
  checked_files=$((checked_files + 1))
  
  # Show progress
  printf "\rChecking: %d files..." "$checked_files"
  
  # Analyze with nomoji.dev API
  result=$(curl -s -X POST "$NOMOJI_API/analyze" \
    -H "Content-Type: application/json" \
    -d "{\"text\":$(echo "$content" | jq -Rs .)}" 2>/dev/null)
  
  # Check if request was successful
  if [ $? -ne 0 ]; then
    continue
  fi
  
  # Parse result
  has_emojis=$(echo "$result" | jq -r '.data.hasEmojis' 2>/dev/null)
  
  if [ "$has_emojis" = "true" ]; then
    emoji_count=$(echo "$result" | jq -r '.data.count')
    unique_emojis=$(echo "$result" | jq -r '.data.unique | join(", ")')
    
    files_with_emojis=$((files_with_emojis + 1))
    total_emojis=$((total_emojis + emoji_count))
    
    # Store result
    results+=("$file|$emoji_count|$unique_emojis")
  fi
done <<< "$files"

# Clear progress line
printf "\r                                           \r"

# Print results
echo "=================================="
echo "Scan Complete"
echo "=================================="
echo "Total files: $total_files"
echo "Checked files: $checked_files"
echo "Files with emojis: $files_with_emojis"
echo "Total emojis: $total_emojis"
echo ""

if [ $files_with_emojis -gt 0 ]; then
  echo "Files containing emojis:"
  echo ""
  for result in "${results[@]}"; do
    IFS='|' read -r file count emojis <<< "$result"
    echo "  ❌ $file"
    echo "     Count: $count"
    echo "     Emojis: $emojis"
    echo ""
  done
  
  echo "=================================="
  echo "❌ Project contains emojis"
  echo "=================================="
  echo ""
  echo "Run 'nomoji.dev/docs/removing-emojis' for cleanup guide"
  exit 1
else
  echo "=================================="
  echo "✓ Project is emoji-free!"
  echo "=================================="
  exit 0
fi

