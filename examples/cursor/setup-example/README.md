# Example Cursor Setup

This directory shows a complete example of a project configured with nomoji.dev rules for Cursor.

## Directory Structure

```
your-project/
├── .cursor/
│   └── rules/
│       └── nomoji.mdc          # Emoji control rules
├── src/
│   └── your-code.ts
├── README.md
└── package.json
```

## Setup

1. Copy the `.cursor` directory to your project root:
```bash
cp -r .cursor your-project/
```

2. Or download directly:
```bash
mkdir -p .cursor/rules
curl https://nomoji.dev/api/cursor-rules/default -o .cursor/rules/nomoji.mdc
```

## Usage

Once installed, Cursor will automatically apply these rules to all AI interactions in your project.

The rules guide Cursor to:
- Avoid emojis in all code generation
- Use professional language in documentation
- Keep console output and logs emoji-free
- Follow conventional commit format without emojis

## What Happens

When using Cursor with these rules:

```
You: Create a README with installation instructions

Cursor: [Generates README without any emojis]
# Installation Guide

Follow these steps to install the application:

1. Clone the repository
2. Install dependencies
3. Run the application
```

Without nomoji.dev rules, you might get:

```
# 📦 Installation Guide

Follow these steps to install the application: 🚀

1. Clone the repository 📥
2. Install dependencies ⚙️
3. Run the application 🎉
```

## Configuration

The nomoji.mdc file contains rules organized by context:

- Documentation & Markdown
- Console Output
- CLI Tools
- Logging & Error Messages
- Code Comments
- Git Commit Messages

Edit `.cursor/rules/nomoji.mdc` to customize rules for your needs.

## Presets

Switch between different strictness levels:

```bash
# Strict (no emojis anywhere)
curl https://nomoji.dev/api/cursor-rules/strict-user -o .cursor/rules/nomoji.mdc

# Moderate (limited emojis)
curl https://nomoji.dev/api/cursor-rules/moderate-user -o .cursor/rules/nomoji.mdc

# Relaxed (emojis in UI only)
curl https://nomoji.dev/api/cursor-rules/relaxed-user -o .cursor/rules/nomoji.mdc
```

## Legacy .cursorrules

If you have an old `.cursorrules` file in your project root, Cursor will use the new `.cursor/rules/` format instead. You can safely delete the old file:

```bash
rm .cursorrules
```

## Resources

- [Cursor Rules Documentation](https://docs.cursor.com/context/rules)
- [nomoji.dev Documentation](https://nomoji.dev)
- [Full Integration Guide](../../docs/CURSOR_INTEGRATION.md)

