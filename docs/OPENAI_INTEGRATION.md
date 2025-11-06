# OpenAI / Codex Integration Guide

> Developer-focused emoji control for OpenAI Codex CLI and OpenAI API

This guide covers integration with OpenAI's developer tools:

1. **OpenAI Codex** (CLI agent) - Recommended for coding workflows
2. **OpenAI API** - For developers building with the API

## Table of Contents

- [OpenAI Codex CLI](#openai-codex-cli)
- [OpenAI API Integration](#openai-api-integration)
- [Model Recommendations](#model-recommendations)
- [Troubleshooting](#troubleshooting)

---

## OpenAI Codex CLI

**Recommended for:** Developers using AI coding agents

OpenAI Codex is an AI coding agent included in ChatGPT Plus, Pro, Business, Edu, and Enterprise plans. It works in your terminal and IDE for code generation, review, and bug fixes.

### Quick Setup

```bash
# 1. Install Codex globally
npm i -g @openai/codex

# 2. Download nomoji configuration
curl https://nomoji.dev/api/template/default/openai-codex -o ~/nomoji-codex.md

# 3. Configure system instructions
codex config --system-instructions ~/nomoji-codex.md

# 4. Test it
codex "Create a hello world Express server"
```

### Project-Specific Configuration

Add nomoji rules to individual projects:

```bash
# In your project root
mkdir -p .codex
curl https://nomoji.dev/api/template/default/openai-codex -o .codex/nomoji.md

# Configure per-project (if supported)
codex config --local --system-instructions .codex/nomoji.md

# Commit to version control
git add .codex/
git commit -m "Add Codex nomoji configuration"
```

### Presets

Choose from three strictness levels:

**Strict Mode** (no emojis anywhere):
```bash
curl https://nomoji.dev/api/template/strict-user/openai-codex -o ~/nomoji-codex.md
```

**Moderate Mode** (emojis in UI only):
```bash
curl https://nomoji.dev/api/template/moderate-user/openai-codex -o ~/nomoji-codex.md
```

**Relaxed Mode** (minimal restrictions):
```bash
curl https://nomoji.dev/api/template/relaxed-user/openai-codex -o ~/nomoji-codex.md
```

### What Gets Controlled

When configured, Codex will avoid emojis in:

- Code generation
- Console and terminal output
- Documentation and README files
- Git commit messages
- Code comments
- Error messages and logs
- Progress indicators

### Usage Examples

```bash
# Generate code
codex "Create a REST API with Express and TypeScript"

# Code review
codex review server.js

# Bug fixes
codex fix "Handle null pointer in user service"

# Documentation
codex docs "Generate API documentation for this module"
```

---

## OpenAI API Integration

**Recommended for:** Developers building applications with OpenAI's API

Use nomoji rules as system instructions in your API calls.

### Quick Setup

```bash
# Download system instructions
curl https://nomoji.dev/api/template/default/openai -o nomoji-system-prompt.md
```

### Node.js / TypeScript

```typescript
import OpenAI from 'openai';
import fs from 'fs';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Load system prompt
const systemPrompt = fs.readFileSync('nomoji-system-prompt.md', 'utf-8');

// Make API call
const response = await client.chat.completions.create({
  model: 'gpt-4',
  temperature: 0, // More consistent output
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: 'Create a Node.js HTTP server' }
  ]
});

console.log(response.choices[0].message.content);
```

### Dynamic Fetching

Fetch rules directly from the API:

```typescript
// Fetch latest rules
const response = await fetch(
  'https://nomoji.dev/api/template/default/openai'
);
const systemPrompt = await response.text();

// Use in OpenAI API call
const completion = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]
});
```

### Python

```python
import openai
import requests

# Fetch nomoji system prompt
response = requests.get('https://nomoji.dev/api/template/default/openai')
system_prompt = response.text

# Make API call
completion = openai.ChatCompletion.create(
    model="gpt-4",
    temperature=0,
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Create a Flask REST API"}
    ]
)

print(completion.choices[0].message.content)
```

### Caching System Prompts

For efficiency, cache the system prompt:

```typescript
class NomojiOpenAI {
  private systemPrompt: string | null = null;
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async loadSystemPrompt() {
    if (!this.systemPrompt) {
      const response = await fetch(
        'https://nomoji.dev/api/template/default/openai'
      );
      this.systemPrompt = await response.text();
    }
    return this.systemPrompt;
  }

  async complete(userPrompt: string) {
    const systemPrompt = await this.loadSystemPrompt();
    
    return await this.client.chat.completions.create({
      model: 'gpt-4',
      temperature: 0,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    });
  }
}

// Usage
const ai = new NomojiOpenAI(process.env.OPENAI_API_KEY!);
const result = await ai.complete('Create a TypeScript utility function');
```

### Best Practices

1. **Always include system prompt** - Don't skip it in API calls
2. **Use temperature=0** - More deterministic, professional output
3. **Cache the prompt** - Reduce token usage and API calls
4. **Monitor output** - Log instances where emojis still appear
5. **Use reasoning models** - o1, o3-mini for stricter adherence

---

## Model Recommendations

### Best for Emoji-Free Code

**Reasoning Models** (highest adherence to constraints):
- `o1` - Best at following strict no-emoji instructions
- `o3-mini` - Cost-effective with strong instruction following
- `o3-mini-high` - Enhanced reasoning for code generation

**GPT-4 Series** (good adherence):
- `gpt-4` - Reliable for most coding tasks
- `gpt-4-turbo` - Fast with good instruction following
- `gpt-4-32k` - Large context, good for complex projects

**Avoid for Strict Control:**
- `gpt-4o` - Designed to use MORE emojis (since Jan 29, 2025)
- `gpt-3.5-turbo` - Less reliable at following constraints

### Model Selection by Use Case

| Use Case | Recommended Model | Why |
|----------|------------------|-----|
| Code generation | o3-mini, gpt-4 | Balance of cost and quality |
| Documentation | o1, o3-mini-high | Better at following formatting rules |
| Code review | gpt-4-turbo | Fast, professional output |
| Bug fixes | o1 | Deep reasoning, strict adherence |
| Quick snippets | gpt-4 | Reliable and fast enough |

---

## Troubleshooting

### Codex: Rules Not Being Applied

**Check Codex installation:**
```bash
codex --version
```

**Verify your ChatGPT plan:**
- Codex requires Plus, Pro, Business, Edu, or Enterprise
- Check at: https://chat.openai.com/settings

**Re-apply configuration:**
```bash
curl https://nomoji.dev/api/template/strict-user/openai-codex -o ~/nomoji-codex.md
codex config --system-instructions ~/nomoji-codex.md
```

**Try per-project configuration:**
```bash
mkdir -p .codex
curl https://nomoji.dev/api/template/strict-user/openai-codex -o .codex/nomoji.md
codex config --local --system-instructions .codex/nomoji.md
```

### API: Emojis Still Appearing

**Verify system prompt is included:**
```typescript
console.log(messages[0].role === 'system'); // Should be true
console.log(messages[0].content.includes('emoji')); // Should be true
```

**Switch to reasoning models:**
```typescript
const response = await client.chat.completions.create({
  model: 'o3-mini', // or 'o1'
  messages: [...]
});
```

**Set temperature to 0:**
```typescript
temperature: 0, // More consistent, professional output
```

**Refresh rules:**
```bash
curl https://nomoji.dev/api/template/strict-user/openai -o nomoji-system-prompt.md
```

**Verify message structure:**
```typescript
// System message must be first
const messages = [
  { role: 'system', content: systemPrompt }, // Must be first!
  { role: 'user', content: userPrompt }
];
```

---

## Examples

### Codex: Generate a REST API

```bash
codex "Create a TypeScript REST API with Express that has:
- User authentication with JWT
- CRUD endpoints for products
- Error handling middleware
- OpenAPI documentation
- Unit tests with Jest"
```

Result: Professional, emoji-free code with clean documentation.

### API: Code Review Tool

```typescript
async function reviewCode(code: string): Promise<string> {
  const systemPrompt = await fetch(
    'https://nomoji.dev/api/template/strict-user/openai'
  ).then(r => r.text());

  const response = await openai.chat.completions.create({
    model: 'o3-mini',
    temperature: 0,
    messages: [
      { role: 'system', content: systemPrompt },
      { 
        role: 'user', 
        content: `Review this code for best practices, security issues, and performance:\n\n${code}` 
      }
    ]
  });

  return response.choices[0].message.content;
}
```

---

## Resources

- [OpenAI Codex Documentation](https://openai.com/codex/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [OpenAI Community Forum: Turning Off Emojis](https://community.openai.com/t/how-i-can-turn-off-emojis/1116532)
- [nomoji.dev API Documentation](https://nomoji.dev/docs)
- [ChatGPT Settings](https://chat.openai.com/settings/personalization)

---

## Summary

| Product | Setup Difficulty | Effectiveness | Best For |
|---------|-----------------|---------------|----------|
| **Codex CLI** | Easy | High | Daily coding, terminal workflows |
| **OpenAI API** | Medium | Very High | Building tools, automation, CI/CD |

**Recommendation:** Use Codex CLI for interactive development or OpenAI API with reasoning models (o1, o3-mini) for programmatic code generation with strict emoji control.

---

For questions or custom configurations, visit [nomoji.dev](https://nomoji.dev) or check the [API documentation](https://nomoji.dev/docs).

