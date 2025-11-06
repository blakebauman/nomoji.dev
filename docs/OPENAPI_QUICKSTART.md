# OpenAPI Quick Start

## Access the API Documentation

Once the server is running:

```bash
npm run dev
```

### Interactive Documentation
Visit [http://localhost:8787/docs](http://localhost:8787/docs)

This gives you a beautiful, interactive API reference where you can:
- Browse all endpoints
- See request/response schemas
- Try API calls directly
- Generate code examples
- Download the OpenAPI spec

### OpenAPI Specification
Visit [http://localhost:8787/openapi.json](http://localhost:8787/openapi.json)

This returns the full OpenAPI 3.1.0 specification in JSON format.

## Using the Documentation

### 1. Browse Endpoints
Navigate through organized sections:
- **System** - Health checks and API info
- **Configuration** - User config management
- **Rules** - Generate rules for AI assistants
- **Analysis** - Emoji detection
- **Sharing** - Share configurations

### 2. View Schemas
Click any endpoint to see:
- Path parameters
- Request body schema
- Response schemas for each status code
- Example values

### 3. Try It Out
1. Click "Try It Out" on any endpoint
2. Fill in required parameters (see note below about `userId`)
3. Click "Execute"
4. See the actual response

**Note on User IDs**: Many endpoints require a `userId` parameter. This is a simple namespace identifier (3-64 chars, alphanumeric with `._-`). You can use any value like `test-user`, `my-project`, or `default`. No authentication required. [Learn more →](API.md#user-id-parameter)

### 4. Generate Code
Get code examples in:
- curl
- JavaScript/Fetch
- Node.js
- Python
- Go
- PHP
- And more...

## Example: Using an Endpoint

### Get User Configuration

**Endpoint:** `GET /api/config/{userId}`

**In Scalar UI:**
1. Navigate to "Configuration" section
2. Click "Get user configuration"
3. Enter a userId (e.g., "test-user")
4. Click "Execute"
5. See the response with full configuration

**Generated curl command:**
```bash
curl -X GET 'http://localhost:8787/api/config/test-user'
```

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
        "severity": "strict"
      }
      // ... more contexts
    }
  }
}
```

### Update Configuration

**Endpoint:** `POST /api/config/{userId}`

**Request Body:**
```json
{
  "enabled": true,
  "contexts": {
    "documentation": {
      "enabled": true,
      "severity": "moderate"
    }
  }
}
```

**In Scalar UI:**
1. Find "Update user configuration"
2. Enter userId
3. Modify the request body JSON
4. Click "Execute"

## Import into Other Tools

### Postman
1. In Postman, click "Import"
2. Enter URL: `http://localhost:8787/openapi.json`
3. Get full collection with all endpoints

### Insomnia
1. Create new Design Document
2. Import from URL
3. Use: `http://localhost:8787/openapi.json`

### VS Code REST Client
Use the OpenAPI spec with REST Client extension to get auto-completion.

### TypeScript Client Generation
Generate a type-safe client:

```bash
# Install openapi-typescript
npm install -D openapi-typescript

# Generate types
npx openapi-typescript http://localhost:8787/openapi.json -o ./types/api.ts
```

## Production Use

When deployed to nomoji.dev:
- Docs: `https://nomoji.dev/docs`
- Spec: `https://nomoji.dev/openapi.json`

The spec includes both development and production server URLs, so you can switch between them in the documentation UI.

## Customization

### Theme
Currently using "purple" theme. Other options in `src/index.ts`:
- `default`, `alternate`, `moon`, `purple`, `solarized`, `bluePlanet`

### Metadata
Update OpenAPI info in `src/index.ts`:
```typescript
app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: {
    title: "Your API Title",
    description: "Your description",
    // ... more options
  }
});
```

### Adding Examples
In route definitions (`src/routes/openapi.ts`), add examples:

```typescript
responses: {
  200: {
    description: "Success",
    content: {
      "application/json": {
        schema: YourSchema,
        example: {
          // Your example data
        }
      }
    }
  }
}
```

## Benefits

### For API Development
- **Spot Inconsistencies** - See all endpoints in one place
- **Test Quickly** - No need for separate tools
- **Share Easily** - Send docs link to teammates

### For Integration
- **Clear Contracts** - Know exactly what each endpoint expects
- **Generate Clients** - Auto-generate SDKs in any language
- **Mock Servers** - Use spec to create mock APIs

### For Documentation
- **Always Up-to-Date** - Generated from actual code
- **Interactive** - Try before integrating
- **No Maintenance** - Docs update automatically with code changes

## Troubleshooting

### Docs not loading?
Check console for errors. Ensure server is running on correct port.

### "Try It Out" not working?
CORS must be enabled. Check `src/middleware/cors.ts`.

### Schema validation errors?
Ensure request body matches the Zod schema exactly. Check Required fields in the docs.

## Next Steps

1. Explore all endpoints in `/docs`
2. Try making API calls
3. Generate code examples for your language
4. Import spec into your favorite API tool
5. Generate TypeScript types for type-safe client

