# Cursor Rules for nomoji.dev

This directory contains comprehensive Cursor AI rules for the nomoji.dev project. These rules guide AI assistants in maintaining code quality, consistency, and best practices.

## Rule Files

### Core Rules

#### `nomoji.mdc` (Priority: High)
**Emoji Control Rules**
- Strict emoji usage guidelines
- Context-specific restrictions
- Professional code standards
- This project practices what it preaches

### Development Rules

#### `typescript.mdc` (Priority: High)
**TypeScript Standards**
- Type safety and strict mode
- Naming conventions
- Function design patterns
- Async/await best practices
- Common anti-patterns to avoid

#### `cloudflare-workers.mdc` (Priority: High)
**Cloudflare Workers Best Practices**
- Edge-first design principles
- Comprehensive bindings reference (Storage, Compute, Media)
- KV, D1, R2, Durable Objects, Queues integration
- Workers AI, Vectorize, Workflows, Browser Rendering
- Analytics Engine and Cache/CDN usage
- Performance optimization
- CPU time and memory limits
- Scheduled tasks and cron triggers

#### `api-development.mdc` (Priority: High)
**API Development Standards**
- RESTful conventions
- Request/response formatting
- HTTP status codes
- Middleware patterns
- Rate limiting and caching
- Security best practices

#### `testing.mdc` (Priority: High)
**Testing Standards**
- Testing philosophy and coverage goals
- Test organization
- Mocking strategies
- API endpoint testing
- Async testing patterns
- Vitest configuration

#### `architecture.mdc` (Priority: High)
**Architecture and Design Patterns**
- Project structure
- Architectural principles
- Design patterns used
- Request flow
- Error handling strategy
- Observability architecture
- Scalability considerations

#### `code-style.mdc` (Priority: Medium)
**Code Style and Formatting**
- Biome configuration
- TypeScript style rules
- Naming conventions
- Import/export organization
- Comments and documentation
- Editor configuration

## How Cursor Uses These Rules

Cursor automatically discovers and applies rules from the `.cursor/rules/` directory. All `.mdc` files in this directory are:

1. **Automatically Loaded**: Cursor reads all `.mdc` files on project load
2. **Priority-Based**: Rules with higher priority take precedence
3. **Context-Aware**: Applied based on the files you're editing
4. **Composable**: Multiple rule files work together

## Rule Priority

- **High Priority**: Core standards that must be followed
- **Medium Priority**: Style preferences and conventions
- **Low Priority**: Suggestions and recommendations

## When to Reference Which Rules

### Writing TypeScript Code
→ `typescript.mdc`, `code-style.mdc`

### Building API Endpoints
→ `api-development.mdc`, `cloudflare-workers.mdc`

### Writing Tests
→ `testing.mdc`

### Architectural Decisions
→ `architecture.mdc`, `cloudflare-workers.mdc`

### Code Review
→ All rules apply

### Documentation
→ `nomoji.mdc` (no emojis!), `code-style.mdc`

## Rule Maintenance

### Adding New Rules
1. Create new `.mdc` file with frontmatter:
```markdown
---
title: Rule Name
version: 1.0.0
priority: high|medium|low
description: Brief description
---
```

2. Add clear sections with examples
3. Update this README
4. Test with Cursor AI

### Updating Existing Rules
1. Update the version number
2. Document changes in the rule file
3. Keep examples current
4. Ensure consistency with other rules

### Rule Format

Each `.mdc` file should have:
- **Frontmatter**: Metadata (title, version, priority, description)
- **Clear Sections**: Organized with headers
- **Examples**: Good and bad code examples
- **Rationale**: Explain why, not just what
- **No Emojis**: Practice what we preach

## Validation

To ensure rules are effective:

1. **Test with Cursor**: Ask Cursor AI to generate code
2. **Check Compliance**: Verify generated code follows rules
3. **Iterate**: Refine rules based on results
4. **Document**: Update examples and explanations

## Common Patterns Across Rules

### Code Examples
Use clear "Good" vs "Avoid" examples:
```typescript
// Good
const value = await getValue();

// Avoid
const value = getValue(); // Missing await
```

### Emphasis
Important rules use bold:
**Never use any without justification**

### Section Organization
1. Overview
2. Principles
3. Detailed Guidelines
4. Examples
5. Anti-patterns
6. Best Practices

## Files Not Included

Some aspects not covered by rules:
- **Git Hooks**: See `/examples/hooks/`
- **CI/CD**: Handled by GitHub Actions
- **Deployment**: See `wrangler.jsonc`

## Integration with Other Tools

These rules complement:
- **Biome**: Formatting and linting (automated)
- **TypeScript**: Type checking (compiler)
- **Vitest**: Testing (framework)
- **Wrangler**: Deployment (CLI)

Cursor rules provide AI guidance; other tools enforce mechanically.

## Tips for Working with Cursor

### Get the Most from Rules
1. **Be Specific**: Ask Cursor to "follow the TypeScript standards"
2. **Reference Files**: "Use patterns from architecture.mdc"
3. **Iterate**: If code doesn't follow rules, point it out
4. **Trust but Verify**: Review generated code

### Example Prompts
- "Create a new API endpoint following our API development standards"
- "Write tests for this function using our testing standards"
- "Refactor this to follow our TypeScript conventions"
- "Add error handling following our architecture patterns"

## Rule Coverage

### Covered Areas
- TypeScript development
- API design
- Testing practices
- Code style
- Architecture patterns
- Cloudflare Workers specifics
- Emoji control

### Areas for Future Rules
- Deployment procedures
- Monitoring and alerting
- Database migrations (if added)
- Team collaboration guidelines

## Contributing to Rules

When contributing:
1. Follow existing rule format
2. Include practical examples
3. Explain rationale
4. Keep it concise
5. No emojis (obviously!)
6. Test with Cursor AI

## Version History

### v1.0.0 (Current)
- Initial comprehensive rule set
- 7 rule files covering major areas
- Aligned with project standards

## Questions?

If rules are unclear or conflicting:
1. Check this README
2. Review related documentation in `/docs`
3. Look at existing code for patterns
4. Ask in project discussions

## Remember

These rules exist to:
- Maintain consistency
- Improve code quality
- Speed up development
- Reduce cognitive load
- Help AI assistants help you

Follow them, but use judgment. Rules should enable, not restrict.

---

**nomoji.dev** - Professional code deserves professional standards.

