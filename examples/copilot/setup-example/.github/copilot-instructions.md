# Copilot Instructions

This project enforces professional, emoji-free code and documentation.

## Emoji Usage Rules

Do not use emojis in any generated content including:

### Strict Contexts

- **Documentation and Markdown**: No emojis in README files, documentation, headers, lists, or paragraphs
- **Console Output**: No emojis in console.log, console.error, console.warn, or any console statements
- **CLI Tools**: No emojis in command-line output, progress bars, spinners, or status messages
- **Logging**: No emojis in application logs, error messages, or debug output
- **Commit Messages**: No emojis in git commit messages - use conventional commit format

### Moderate Contexts

- **Code Comments**: Avoid emojis in comments - write clear, descriptive text instead

## Why These Rules?

Emojis in code and documentation:
- Reduce accessibility for screen readers
- Create inconsistent rendering across platforms
- Make text harder to search and parse programmatically
- Appear unprofessional in enterprise contexts
- Clutter console output and logs
- Break compatibility with certain terminals and tools

## Examples

### Good (Professional)
```javascript
console.log('Server starting on port 3000');
console.error('Error: Failed to connect to database');

// Add error handling for network failures
```

```markdown
# Installation Guide

Follow these steps to install the application:

1. Clone the repository
2. Install dependencies
3. Run the application
```

### Bad (Avoid)
```javascript
console.log('🚀 Server starting on port 3000');
console.error('❌ Error: Failed to connect to database');

// 🔧 Add error handling for network failures
```

```markdown
# 📦 Installation Guide

Follow these steps to install the application: 🚀

1. Clone the repository 📥
2. Install dependencies ⚙️
3. Run the application 🎉
```

## Configuration

Generated from: https://nomoji.dev
Update your rules at: https://nomoji.dev/configure

---

**Remember**: Professional code should prioritize clarity and consistency over decoration. When in doubt, do not use emojis.

