# Claude Code Integration Guide

Learn how to integrate nomoji.dev with Claude Code using specialized subagents to enforce emoji-free code standards.

Based on the [official Claude Code subagents documentation](https://docs.claude.com/en/docs/claude-code/sub-agents).

## What is Claude Code?

Claude Code is Anthropic's AI coding assistant that uses specialized **subagents** to handle specific types of tasks. Subagents operate in their own context window and can be configured with custom system prompts and tools.

## Quick Setup

### Method 1: Download Pre-configured Subagent (Recommended)

1. Download the nomoji subagent:
```bash
curl https://nomoji.dev/api/claude/default -o nomoji.mdc
```

2. Place it in your project:
```bash
mkdir -p .claude/agents
mv nomoji.mdc .claude/agents/
```

3. That's it! Claude Code will automatically detect and use the subagent.

### Method 2: Use the /agents Command

1. In Claude Code, run:
```
/agents
```

2. Select "Create New Agent"
3. Choose "Project-level agent"
4. Describe the agent:
```
Create a nomoji subagent that checks code for emoji usage.
Visit https://nomoji.dev for the configuration.
```

5. Let Claude generate it, then customize as needed

## How It Works

The nomoji subagent is **proactive** and will be automatically invoked after:
- Generating or modifying code files
- Creating or updating documentation
- Writing console output or logging statements
- Composing commit messages

You can also explicitly invoke it:
```
> Use the nomoji subagent to audit my recent changes
> Have nomoji check this file for emojis
> Ask nomoji to review the console output
```

## Subagent Configuration

The nomoji subagent is configured with:

**Tools:**
- `Read` - Examine file contents
- `Grep` - Search for emoji patterns
- `Glob` - Find relevant files
- `Bash` - Run git diff, detection scripts

**Model:** `inherit` - Uses the same model as your main conversation

**Priority:** HIGH - Will be invoked proactively when appropriate

## What It Does

When invoked, the nomoji subagent:

1. **Scans Recent Changes**: Runs `git diff` to see what was modified
2. **Analyzes All Contexts**: Documentation, console output, CLI, logging, comments, commits
3. **Provides Detailed Report** with specific line numbers and recommendations
4. **Offers Automatic Fixes**: Creates diffs showing proposed changes

Example report:
```
NOMOJI AUDIT REPORT

Files Checked: 12
Emojis Found: 3

CRITICAL ISSUES (Console/Logging):
  - src/server.ts:42 | console.log('🚀 Starting...')
  - src/logger.ts:15 | logger.error('❌ Failed')

HIGH PRIORITY (Documentation):
  - README.md:5 | # 📚 Documentation

RECOMMENDATIONS:
1. Remove all emojis from console output immediately
2. Update README headers to plain text

Would you like me to fix these automatically?
```

## Project-Level vs User-Level

### Project-Level (Recommended)

```bash
# Available only in current project
mkdir -p .claude/agents
curl https://nomoji.dev/api/claude/default -o .claude/agents/nomoji.mdc
git add .claude/agents/nomoji.mdc
```

**Benefits:**
- Team-wide consistency
- Version controlled
- Project-specific configuration

### User-Level

```bash
# Available across all your projects
mkdir -p ~/.claude/agents
curl https://nomoji.dev/api/claude/default -o ~/.claude/agents/nomoji.mdc
```

**Benefits:**
- Use across all projects
- Personal preference enforcement
- No need to configure per-project

**Note:** Project-level subagents override user-level ones.

## Customization

### Apply Different Presets

Download different configurations:

```bash
# Strict mode (no emojis anywhere)
curl https://nomoji.dev/api/claude/strict-user -o .claude/agents/nomoji.mdc

# Moderate mode (limited emojis)
curl https://nomoji.dev/api/claude/moderate-user -o .claude/agents/nomoji.mdc

# Relaxed mode (emojis in UI only)
curl https://nomoji.dev/api/claude/relaxed-user -o .claude/agents/nomoji.mdc
```

### Edit the Subagent

The nomoji.mdc file has two parts:

**Frontmatter** (YAML):
```yaml
---
name: nomoji
description: When to invoke this subagent
tools: Read, Grep, Glob, Bash
model: inherit
---
```

**System Prompt** (Markdown):
```markdown
You are an emoji control specialist...

## Detection Process
1. Scan recent changes
2. Analyze contexts
3. Report findings
```

Edit either section to customize behavior:
```bash
code .claude/agents/nomoji.mdc
# or
vim .claude/agents/nomoji.mdc
```

## Usage Examples

### Automatic Invocation

Claude Code will automatically use nomoji when appropriate:

```
You: Update the README with installation instructions

Claude: [Generates README]

[nomoji subagent automatically runs]

nomoji: I found emojis in the generated README. Would you like me to fix them?
```

### Explicit Invocation

Request nomoji specifically:

```
You: Use nomoji to check my recent commits

nomoji: Scanning commit history...
Found 2 commits with emojis in messages:
- abc1234: "feat: ✨ add feature"
- def5678: "fix: 🐛 resolve bug"

Would you like me to help rewrite these?
```

## Verification

Test that nomoji is working:

1. Create a test file with emojis:
```bash
echo "console.log('🚀 Test');" > test.js
```

2. Ask Claude to review it:
```
> Review test.js for code quality
```

3. Nomoji should be automatically invoked and flag the emoji

## Managing Subagents

### List Available Subagents
```
/agents
```

### View Subagent Details
```
/agents show nomoji
```

### Remove Subagent
```bash
rm .claude/agents/nomoji.mdc
# or
rm ~/.claude/agents/nomoji.mdc
```

## Best Practices

1. **Start with Claude-generated agent**: Use `/agents` to generate, then customize
2. **Commit to version control**: Share with your team
3. **Use explicit invocation for audits**: Manually call nomoji for existing code
4. **Let automatic invocation handle new code**: Trust nomoji to catch issues in new content
5. **Customize for your needs**: Edit the subagent to match your project's requirements

## Troubleshooting

### Subagent Not Being Invoked

1. Check file location: `.claude/agents/nomoji.mdc`
2. Verify file format (YAML frontmatter + markdown body)
3. Make sure description is clear about when to invoke
4. Try explicit invocation first: `Use nomoji subagent`

### Wrong Behavior

1. Check the system prompt in nomoji.mdc
2. Verify tools list includes Read, Grep, Glob, Bash
3. Update the configuration at https://nomoji.dev
4. Download fresh version

## Resources

- [Claude Code Subagents Docs](https://docs.claude.com/en/docs/claude-code/sub-agents)
- [nomoji.dev Configuration](https://nomoji.dev)
- [API Reference](API.md)

## Support

Issues with integration?
- Check Claude Code documentation
- Verify subagent file format
- Test with explicit invocation first
- Report persistent issues on GitHub

---

**Professional code deserves professional standards** - powered by Claude Code and nomoji.dev.
