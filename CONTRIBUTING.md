# Contributing to nomoji.dev

Thank you for considering contributing to nomoji.dev! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project follows a simple principle: Be respectful, be professional, and help make code better.

## How to Contribute

### Reporting Issues

Found a bug or have a feature request?

1. Check existing issues first
2. Create a new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Environment details

### Suggesting Features

Have an idea for a new feature?

1. Open an issue with the "feature" label
2. Describe the use case
3. Explain why it would be valuable
4. Provide examples if possible

### Submitting Pull Requests

Ready to contribute code?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

#### PR Guidelines

- **One feature per PR**: Keep changes focused
- **Clear commit messages**: Use conventional commit format
- **Tests**: Add tests for new features
- **Documentation**: Update docs as needed
- **No emojis**: Practice what we preach - no emojis in code or commits
- **Code style**: Follow existing patterns

#### Commit Message Format

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

Examples:
```
feat(api): add emoji category filtering

Allow users to filter emojis by category (faces, symbols, etc.)
when configuring allowed emojis.

Closes #123
```

```
fix(rules): correct emoji regex pattern

Previous pattern missed some emoji combinations.
Updated to include all Unicode emoji ranges.
```

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/blakebauman/nomoji.dev.git
cd nomoji.dev
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development server:
```bash
pnpm run dev
```

4. Visit http://localhost:8787

### Project Structure

Understanding the codebase:

```
src/
├── index.ts              # Main app entry point
├── types.ts              # TypeScript type definitions
├── config/
│   └── defaults.ts       # Default configurations
├── rules/
│   └── generator.ts      # Rule generation logic
├── utils/
│   ├── emoji.ts          # Emoji detection
│   └── storage.ts        # KV storage
└── views/
    ├── layout.tsx        # HTML layout
    └── home.tsx          # Home page
```

### Testing

Run tests:
```bash
pnpm test
```

Test your changes:
- Manual testing with different configurations
- Test all API endpoints
- Verify emoji detection works correctly
- Check integration with AI assistants

### Code Style

Follow these conventions:

**TypeScript:**
- Use TypeScript strict mode
- Define types for all function parameters
- Use interfaces for object shapes
- Prefer `const` over `let`

**Naming:**
- camelCase for variables and functions
- PascalCase for types and interfaces
- UPPER_CASE for constants
- Descriptive names (no abbreviations unless common)

**Functions:**
- Small, focused functions
- Document complex logic
- Handle errors gracefully
- Return early when possible

**Comments:**
- Explain why, not what
- Update comments when changing code
- No commented-out code in commits
- No emojis in comments

### Documentation

Update documentation when:
- Adding new features
- Changing API endpoints
- Adding integration examples
- Updating configuration options

Documentation locations:
- `README.md`: Project overview
- `docs/`: Integration guides
- `CONTRIBUTING.md`: This file
- Code comments: Complex logic
- API docs: All endpoints

### Adding AI Assistant Integrations

To add support for a new AI assistant:

1. Update `types.ts`:
```typescript
export interface RuleTemplate {
  assistant: 'cursor' | 'copilot' | 'YOUR_ASSISTANT' | ...;
}
```

2. Add template in `rules/generator.ts`:
```typescript
case 'YOUR_ASSISTANT':
  return `Format specific to your assistant`;
```

3. Add integration guide in `docs/`:
```
docs/YOUR_ASSISTANT_INTEGRATION.md
```

4. Update README with new integration
5. Add examples to `examples/` directory

### Areas for Contribution

Looking for ideas? Consider:

**High Priority:**
- Additional AI assistant integrations
- Improved emoji detection (compound emojis, skin tones)
- Performance optimizations
- Better error handling

**Medium Priority:**
- Browser extension
- VS Code extension
- Analytics dashboard
- Team management features

**Low Priority:**
- Additional presets
- More example scripts
- Automated cleanup tools
- Rule testing framework

### Questions?

Not sure about something?

- Check existing documentation
- Look at similar code in the project
- Ask in an issue or discussion
- Reach out to maintainers

## Review Process

PRs are reviewed for:

1. **Functionality**: Does it work as intended?
2. **Code quality**: Is it well-written and maintainable?
3. **Tests**: Are there adequate tests?
4. **Documentation**: Is it documented properly?
5. **Style**: Does it follow project conventions?

Reviews may take a few days. Be patient and responsive to feedback.

## Recognition

Contributors are recognized in:
- GitHub contributors page
- Release notes for significant contributions
- README acknowledgments (for major features)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You

Every contribution helps make nomoji.dev better. Whether it's fixing a typo, reporting a bug, or adding a major feature - thank you for your time and effort!

---

Remember: No emojis in contributions. Let's practice what we preach and keep our codebase professional and accessible.

