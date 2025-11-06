# nomoji.dev API Documentation

Complete API reference for nomoji.dev

## Base URL

```
https://nomoji.dev/api
```

## Authentication

Currently, no authentication is required. User IDs are used for namespace isolation.

## User ID Parameter

Many API endpoints use a `:userId` path parameter to namespace configurations. Understanding how this works is important for using the API effectively.

### What is a User ID?

A `userId` is a **simple identifier** used to store and retrieve personalized configurations. It's not an authenticated user account - it's just a namespace key for organizing preferences in storage.

**Key characteristics:**
- No signup or authentication required
- Anyone who knows a `userId` can access/modify that configuration
- Acts as a namespace for storing user-specific settings
- Can be any identifier: project name, team name, username, etc.

### Validation Rules

User IDs must follow these format rules:

- **Length**: 3-64 characters
- **Allowed characters**: 
  - Alphanumeric: `a-z`, `A-Z`, `0-9`
  - Special characters: `.`, `_`, `-`
- **Pattern**: `/^[a-zA-Z0-9._-]{3,64}$/`

**Valid examples:**
- `john-doe`
- `my_project`
- `team.alpha`
- `user123`
- `acme-corp`
- `project_2024`

**Invalid examples:**
- `ab` - too short (minimum 3 characters)
- `user@email` - invalid character (@)
- `my user` - invalid character (space)
- `a-very-long-user-id-that-exceeds-the-maximum-allowed-length-limit` - too long (>64 characters)

### How It Works

When you make a request to an endpoint with a `userId`:

1. **Validation**: The `userId` is validated against the format rules
2. **Storage Key**: Converted to a storage key: `prefs:{userId}`
3. **Lookup**: The system checks if configuration exists for this key
4. **Response**: 
   - If found: Returns the custom configuration
   - If not found: Returns the default configuration

**Example flow:**
```bash
# First request creates default config
curl https://nomoji.dev/api/config/my-project

# Update the config
curl -X POST https://nomoji.dev/api/config/my-project \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'

# Future requests retrieve the saved config
curl https://nomoji.dev/api/config/my-project
```

### Choosing a User ID

Since there's no authentication, you can use any identifier that makes sense for your use case:

**For individuals:**
- Your username: `john-doe`
- Your GitHub handle: `octocat`
- A project identifier: `my-website`

**For teams:**
- Team name: `frontend-team`
- Organization: `acme-corp`
- Project name: `nomoji-web`

**For testing:**
- Use descriptive IDs: `test-strict`, `demo-config`
- Or the default: `default`

### Privacy and Security

**Important considerations:**

- **No Authentication**: Anyone who knows your `userId` can access and modify your configuration
- **Public by Design**: Don't use sensitive information as your `userId`
- **No Personal Data Required**: The API doesn't collect or require any personal information
- **Namespace Isolation**: Different `userId` values have completely separate configurations

**Best practices:**
- Use non-sensitive identifiers (project names, not email addresses)
- For team use, share the `userId` with your team members
- For private configs, use a hard-to-guess identifier or use the [shared configs feature](#post-apishared)

### Rate Limiting

Rate limits are applied **per user ID**:

- Each `userId` gets its own rate limit bucket
- Prevents one user from exhausting quota for others
- Format: `user:{userId}` (e.g., `user:my-project`)
- Falls back to IP-based limiting for endpoints without `userId`

**Example:**
```bash
# These count against separate rate limits:
curl https://nomoji.dev/api/config/project-a  # user:project-a
curl https://nomoji.dev/api/config/project-b  # user:project-b
```

### Storage

Configurations are stored in Cloudflare KV with these keys:

- **User configs**: `prefs:{userId}` (e.g., `prefs:my-project`)
- **Shared configs**: `config:{uuid}` (e.g., `config:abc-123-def`)

User configurations include:
- Your custom settings
- Metadata (created/updated timestamps)
- The `userId` reference

## Response Format

All API endpoints return JSON in the following format:

```json
{
  "success": true,
  "data": { },
  "message": "Optional message",
  "error": "Optional error message"
}
```

## Endpoints

### GET /api

Get API information and available endpoints.

**Response:**
```json
{
  "name": "nomoji.dev",
  "version": "1.0.0",
  "description": "Control emoji usage in AI-generated code and documentation",
  "endpoints": {
    "config": "/api/config/:userId",
    "rules": "/api/rules/:userId",
    "cursorrules": "/api/cursorrules/:userId",
    "template": "/api/template/:userId/:assistant",
    "presets": "/api/presets",
    "analyze": "/api/analyze",
    "shared": "/api/shared/:configId"
  }
}
```

### GET /api/presets

Get all available configuration presets.

**Response:**
```json
{
  "success": true,
  "data": {
    "available": ["strict", "moderate", "relaxed"],
    "presets": {
      "strict": { },
      "moderate": { },
      "relaxed": { }
    },
    "default": { }
  }
}
```

### GET /api/config/:userId

Get user configuration.

**Parameters:**
- `userId` (string): User identifier

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "enabled": true,
    "contexts": {
      "documentation": {
        "enabled": true,
        "severity": "strict",
        "customMessage": "..."
      }
    },
    "exceptions": {
      "allowedEmojis": [],
      "allowedContexts": []
    },
    "metadata": {
      "createdAt": "2025-11-05T00:00:00.000Z",
      "updatedAt": "2025-11-05T00:00:00.000Z",
      "userId": "user123"
    }
  }
}
```

### POST /api/config/:userId

Update user configuration.

**Parameters:**
- `userId` (string): User identifier

**Request Body:**
```json
{
  "enabled": true,
  "contexts": {
    "documentation": {
      "enabled": true,
      "severity": "strict",
      "customMessage": "Custom message"
    },
    "console": {
      "enabled": true,
      "severity": "strict"
    }
  },
  "exceptions": {
    "allowedEmojis": ["✓"],
    "allowedContexts": ["userInterface"]
  },
  "customRules": [
    "Additional custom rule"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": { },
  "message": "Configuration updated successfully"
}
```

### POST /api/config/:userId/preset/:presetName

Apply a preset configuration.

**Parameters:**
- `userId` (string): User identifier
- `presetName` (string): One of: `strict`, `moderate`, `relaxed`

**Response:**
```json
{
  "success": true,
  "data": { },
  "message": "Preset 'strict' applied successfully"
}
```

### DELETE /api/config/:userId

Delete user configuration (resets to default).

**Parameters:**
- `userId` (string): User identifier

**Response:**
```json
{
  "success": true,
  "message": "Configuration deleted successfully"
}
```

### GET /api/rules/:userId

Get rules as plain text.

**Parameters:**
- `userId` (string): User identifier

**Response:**
```
EMOJI USAGE RULES:

DOCUMENTATION & MARKDOWN:
- STRICT: Do not use emojis in markdown files...

CONSOLE OUTPUT:
- STRICT: Do not use emojis in console.log...
...
```

**Content-Type:** `text/plain`

### GET /api/cursorrules/:userId

Download .cursorrules file for Cursor AI.

**Parameters:**
- `userId` (string): User identifier

**Response:**
```
# nomoji.dev - Emoji Control Rules
# Generated configuration for Cursor AI Assistant
...
```

**Content-Type:** `text/plain`
**Content-Disposition:** `attachment; filename=".cursorrules"`

### GET /api/template/:userId/:assistant

Get template formatted for specific AI assistant.

**Parameters:**
- `userId` (string): User identifier
- `assistant` (string): One of: `cursor`, `copilot`, `codeium`, `tabnine`, `generic`

**Response:**
```
<emoji_rules>
EMOJI USAGE RULES:
...
</emoji_rules>
```

**Content-Type:** `text/plain`

### GET /api/json/:userId

Get configuration and rules as JSON.

**Parameters:**
- `userId` (string): User identifier

**Response:**
```json
{
  "nomoji": {
    "version": "1.0.0",
    "enabled": true,
    "rules": "EMOJI USAGE RULES:\n...",
    "config": { }
  }
}
```

**Content-Type:** `application/json`

### POST /api/analyze

Analyze text for emoji usage.

**Request Body:**
```json
{
  "text": "Hello 👋 World 🌍"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "count": 2,
    "unique": ["👋", "🌍"],
    "hasEmojis": true,
    "cleanText": "Hello  World",
    "violations": ["Text contains emojis"]
  }
}
```

### POST /api/shared

Create shareable configuration.

**Request Body:**
```json
{
  "version": "1.0.0",
  "enabled": true,
  "contexts": { }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "configId": "uuid-here",
    "url": "https://nomoji.dev/shared/uuid-here"
  },
  "message": "Config shared successfully"
}
```

### GET /api/shared/:configId

Get shared configuration.

**Parameters:**
- `configId` (string): Configuration UUID

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "enabled": true,
    "contexts": { }
  }
}
```

## Error Responses

All endpoints may return error responses:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad request
- `404`: Not found
- `500`: Internal server error

## Rate Limiting

Rate limiting is enforced on all `/api/*` endpoints using a moderate preset:

- **Limit**: 100 requests per minute per user/IP
- **Identification**: Per-user ID when available, falls back to IP address
- **Headers**: Rate limit info included in response headers

Rate limits are tracked separately for each `userId`, ensuring fair usage across different users and projects. See the [User ID Parameter](#user-id-parameter) section for more details on how identification works.

## CORS

CORS is enabled for all endpoints. You can call the API from any origin.

## Examples

### Using curl

```bash
# Get configuration
curl https://nomoji.dev/api/config/myuser

# Update configuration
curl -X POST https://nomoji.dev/api/config/myuser \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'

# Apply preset
curl -X POST https://nomoji.dev/api/config/myuser/preset/strict

# Download .cursorrules
curl https://nomoji.dev/api/cursorrules/myuser -o .cursorrules

# Analyze text
curl -X POST https://nomoji.dev/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Test 🎉"}'
```

### Using JavaScript

```javascript
// Get configuration
const response = await fetch('https://nomoji.dev/api/config/myuser');
const data = await response.json();
console.log(data);

// Update configuration
await fetch('https://nomoji.dev/api/config/myuser', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contexts: {
      documentation: { enabled: true, severity: 'strict' }
    }
  })
});

// Analyze text
const analysis = await fetch('https://nomoji.dev/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Hello 👋' })
}).then(r => r.json());

console.log(analysis.data.hasEmojis); // true
```

### Using Python

```python
import requests

# Get configuration
response = requests.get('https://nomoji.dev/api/config/myuser')
config = response.json()
print(config)

# Update configuration
requests.post('https://nomoji.dev/api/config/myuser',
  json={
    'contexts': {
      'documentation': {'enabled': True, 'severity': 'strict'}
    }
  }
)

# Analyze text
analysis = requests.post('https://nomoji.dev/api/analyze',
  json={'text': 'Hello 👋'}
).json()

print(analysis['data']['hasEmojis'])  # True
```

## SDK (Coming Soon)

Official SDKs planned for:
- JavaScript/TypeScript
- Python
- Go
- Rust

## Webhooks (Future)

Planned webhook support for:
- Configuration updates
- Shared config access
- Analysis results

## Support

Questions about the API?
- Visit [nomoji.dev](https://nomoji.dev)
- Check examples in the repository
- File an issue on GitHub

