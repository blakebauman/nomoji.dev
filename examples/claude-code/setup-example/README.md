# Example Claude Code Setup

This directory shows a complete example of a project configured with the nomoji.dev subagent for Claude Code.

## Directory Structure

```
your-project/
├── .claude/
│   └── agents/
│       └── nomoji.mdc          # Emoji control subagent
├── src/
│   └── your-code.ts
├── README.md
└── package.json
```

## Setup

1. Copy the `.claude` directory to your project root:
```bash
cp -r .claude your-project/
```

2. Or download directly:
```bash
mkdir -p .claude/agents
curl https://nomoji.dev/api/claude/default -o .claude/agents/nomoji.mdc
```

## Usage

Once installed, Claude Code will:

1. **Automatically invoke nomoji** after generating code
2. **Check for emojis** in all relevant contexts
3. **Provide specific fixes** for any issues found
4. **Offer to apply fixes** automatically

### Explicit Invocation

You can also manually invoke the subagent:

```
> Use nomoji to check my recent changes
> Have nomoji audit the entire src directory
> Ask nomoji to review my commit messages
```

## What Happens

When you generate code with emojis:

```
You: Create a server startup script with good logging

Claude: Here's a server script with logging...
[Creates file with console.log('🚀 Server starting...')]

[nomoji subagent automatically invoked]

nomoji: I found emojis in the generated code:
  - server.ts:15 | console.log('🚀 Server starting...')
  
Recommended fix:
  - server.ts:15 | console.log('Server starting on port 3000')

Would you like me to apply this fix?
```

## Configuration

The nomoji.mdc file contains:

- **Frontmatter**: Configuration (tools, model, description)
- **System Prompt**: Instructions for emoji detection and remediation

Edit `.claude/agents/nomoji.mdc` to customize behavior.

## Presets

Switch between different strictness levels:

```bash
# Strict (no emojis anywhere)
curl https://nomoji.dev/api/claude/strict-user -o .claude/agents/nomoji.mdc

# Moderate (limited emojis)
curl https://nomoji.dev/api/claude/moderate-user -o .claude/agents/nomoji.mdc

# Relaxed (emojis in UI only)
curl https://nomoji.dev/api/claude/relaxed-user -o .claude/agents/nomoji.mdc
```

## Resources

- [Claude Code Subagents Documentation](https://docs.claude.com/en/docs/claude-code/sub-agents)
- [nomoji.dev Documentation](https://nomoji.dev)
- [Full Integration Guide](../../docs/CLAUDE_CODE_INTEGRATION.md)

