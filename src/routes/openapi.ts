import { createRoute } from "@hono/zod-openapi";
import {
  AnalyzeRequestSchema,
  AnalyzeResponseSchema,
  ApiErrorResponseSchema,
  ApiInfoResponseSchema,
  AssistantParamSchema,
  ConfigIdParamSchema,
  ConfigResponseSchema,
  HealthCheckResponseSchema,
  NomojiConfigUpdateSchema,
  PresetNameParamSchema,
  PresetsResponseSchema,
  ShareConfigRequestSchema,
  ShareConfigResponseSchema,
  UserIdParamSchema,
} from "../schemas";

/**
 * OpenAPI route definitions with schemas and documentation
 */

// Health check route
export const healthRoute = createRoute({
  method: "get",
  path: "/health",
  tags: ["System"],
  summary: "Health check",
  description: "Check the health status of the API and its dependencies",
  responses: {
    200: {
      description: "Health status",
      content: {
        "application/json": {
          schema: HealthCheckResponseSchema,
        },
      },
    },
    503: {
      description: "Service unavailable",
      content: {
        "application/json": {
          schema: HealthCheckResponseSchema,
        },
      },
    },
  },
});

// API info route
export const apiInfoRoute = createRoute({
  method: "get",
  path: "/api",
  tags: ["System"],
  summary: "API information",
  description:
    "Get information about the API, available endpoints, and supported assistants",
  responses: {
    200: {
      description: "API information",
      content: {
        "application/json": {
          schema: ApiInfoResponseSchema,
        },
      },
    },
  },
});

// Get presets route
export const getPresetsRoute = createRoute({
  method: "get",
  path: "/api/presets",
  tags: ["Configuration"],
  summary: "Get available presets",
  description:
    "Get all available configuration presets (strict, moderate, relaxed) and the default configuration",
  responses: {
    200: {
      description: "Available presets",
      content: {
        "application/json": {
          schema: PresetsResponseSchema,
        },
      },
    },
  },
});

// Get user config route
export const getUserConfigRoute = createRoute({
  method: "get",
  path: "/api/config/{userId}",
  tags: ["Configuration"],
  summary: "Get user configuration",
  description:
    "Get the configuration for a specific user, creating it if it doesn't exist",
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    200: {
      description: "User configuration",
      content: {
        "application/json": {
          schema: ConfigResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid user ID",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

// Update user config route
export const updateUserConfigRoute = createRoute({
  method: "post",
  path: "/api/config/{userId}",
  tags: ["Configuration"],
  summary: "Update user configuration",
  description: "Update the configuration for a specific user",
  request: {
    params: UserIdParamSchema,
    body: {
      description: "Configuration updates to apply",
      content: {
        "application/json": {
          schema: NomojiConfigUpdateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Configuration updated successfully",
      content: {
        "application/json": {
          schema: ConfigResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request body or user ID",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

// Apply preset route
export const applyPresetRoute = createRoute({
  method: "post",
  path: "/api/config/{userId}/preset/{presetName}",
  tags: ["Configuration"],
  summary: "Apply configuration preset",
  description:
    "Apply a predefined configuration preset (strict, moderate, or relaxed) to a user",
  request: {
    params: UserIdParamSchema.merge(PresetNameParamSchema),
  },
  responses: {
    200: {
      description: "Preset applied successfully",
      content: {
        "application/json": {
          schema: ConfigResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid user ID or preset name",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

// Delete user config route
export const deleteUserConfigRoute = createRoute({
  method: "delete",
  path: "/api/config/{userId}",
  tags: ["Configuration"],
  summary: "Delete user configuration",
  description: "Delete a user's configuration and reset to defaults",
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    200: {
      description: "Configuration deleted successfully",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema.extend({
            success: ApiErrorResponseSchema.shape.success.or(
              ApiErrorResponseSchema.shape.success,
            ),
          }),
        },
      },
    },
    400: {
      description: "Invalid user ID",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

// Get rules route
export const getRulesRoute = createRoute({
  method: "get",
  path: "/api/rules/{userId}",
  tags: ["Rules"],
  summary: "Get rules as plain text",
  description: "Get emoji control rules for a user as plain text",
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    200: {
      description: "Rules in plain text format",
      content: {
        "text/plain": {
          schema: {
            type: "string",
          },
        },
      },
    },
    400: {
      description: "Invalid user ID",
      content: {
        "text/plain": {
          schema: {
            type: "string",
          },
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "text/plain": {
          schema: {
            type: "string",
          },
        },
      },
    },
  },
});

// Get Claude subagent route
export const getClaudeSubagentRoute = createRoute({
  method: "get",
  path: "/api/claude/{userId}",
  tags: ["Rules"],
  summary: "Download Claude Code subagent file",
  description:
    "Download emoji control rules formatted as a Claude Code subagent (.claude/agents/nomoji.mdc)",
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    200: {
      description: "Claude subagent file",
      content: {
        "text/markdown": {
          schema: {
            type: "string",
          },
        },
      },
      headers: {
        "Content-Disposition": {
          schema: {
            type: "string",
          },
          description: 'attachment; filename="nomoji.mdc"',
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "text/plain": {
          schema: {
            type: "string",
          },
        },
      },
    },
  },
});

// Get Cursor rules route
export const getCursorRulesRoute = createRoute({
  method: "get",
  path: "/api/cursor-rules/{userId}",
  tags: ["Rules"],
  summary: "Download Cursor rules file",
  description:
    "Download emoji control rules formatted for Cursor IDE (.cursor/rules/nomoji.mdc)",
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    200: {
      description: "Cursor rules file",
      content: {
        "text/markdown": {
          schema: {
            type: "string",
          },
        },
      },
      headers: {
        "Content-Disposition": {
          schema: {
            type: "string",
          },
          description: 'attachment; filename="nomoji.mdc"',
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "text/plain": {
          schema: {
            type: "string",
          },
        },
      },
    },
  },
});

// Get template route
export const getTemplateRoute = createRoute({
  method: "get",
  path: "/api/template/{userId}/{assistant}",
  tags: ["Rules"],
  summary: "Get template for specific AI assistant",
  description:
    "Get emoji control rules formatted for a specific AI assistant (Cursor, Copilot, Gemini, etc.)",
  request: {
    params: UserIdParamSchema.merge(AssistantParamSchema),
  },
  responses: {
    200: {
      description: "Rules template",
      content: {
        "text/plain": {
          schema: {
            type: "string",
          },
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "text/plain": {
          schema: {
            type: "string",
          },
        },
      },
    },
  },
});

// Get JSON format route
export const getJsonRoute = createRoute({
  method: "get",
  path: "/api/json/{userId}",
  tags: ["Rules"],
  summary: "Get configuration as JSON",
  description: "Get user configuration and rules in JSON format",
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    200: {
      description: "Configuration in JSON format",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nomoji: {
                type: "object",
                properties: {
                  version: { type: "string" },
                  enabled: { type: "boolean" },
                  rules: { type: "string" },
                  config: { type: "object" },
                },
              },
            },
          },
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

// Analyze text route
export const analyzeTextRoute = createRoute({
  method: "post",
  path: "/api/analyze",
  tags: ["Analysis"],
  summary: "Analyze text for emoji usage",
  description: "Analyze a text string to detect emojis and get statistics",
  request: {
    body: {
      description: "Text to analyze",
      content: {
        "application/json": {
          schema: AnalyzeRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Analysis results",
      content: {
        "application/json": {
          schema: AnalyzeResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request body",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

// Share config route
export const shareConfigRoute = createRoute({
  method: "post",
  path: "/api/shared",
  tags: ["Sharing"],
  summary: "Create shareable configuration",
  description: "Create a shareable link for a configuration",
  request: {
    body: {
      description: "Configuration to share",
      content: {
        "application/json": {
          schema: ShareConfigRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Configuration shared successfully",
      content: {
        "application/json": {
          schema: ShareConfigResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid request body",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

// Get shared config route
export const getSharedConfigRoute = createRoute({
  method: "get",
  path: "/api/shared/{configId}",
  tags: ["Sharing"],
  summary: "Get shared configuration",
  description: "Get a configuration by its shareable ID",
  request: {
    params: ConfigIdParamSchema,
  },
  responses: {
    200: {
      description: "Shared configuration",
      content: {
        "application/json": {
          schema: ConfigResponseSchema,
        },
      },
    },
    404: {
      description: "Configuration not found",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    400: {
      description: "Invalid configuration ID",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    500: {
      description: "Server error",
      content: {
        "application/json": {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});
