import { z } from "zod";

/**
 * Zod schemas for API validation and OpenAPI generation
 */

// Context configuration schema
export const ContextConfigSchema = z.object({
  enabled: z.boolean().describe("Whether this context is enabled"),
  severity: z
    .enum(["strict", "moderate", "relaxed"])
    .describe("Severity level for emoji restrictions"),
  customMessage: z
    .string()
    .optional()
    .describe("Custom message for this context"),
});

// Main nomoji configuration schema
export const NomojiConfigSchema = z.object({
  version: z.string().describe("Configuration version"),
  enabled: z.boolean().describe("Whether nomoji is globally enabled"),
  contexts: z.object({
    documentation: ContextConfigSchema.describe(
      "Settings for documentation and markdown files",
    ),
    console: ContextConfigSchema.describe("Settings for console output"),
    cli: ContextConfigSchema.describe("Settings for CLI output"),
    logging: ContextConfigSchema.describe("Settings for logging"),
    comments: ContextConfigSchema.describe("Settings for code comments"),
    commitMessages: ContextConfigSchema.describe(
      "Settings for commit messages",
    ),
    userInterface: ContextConfigSchema.describe(
      "Settings for user interface elements",
    ),
  }),
  exceptions: z
    .object({
      allowedEmojis: z
        .array(z.string())
        .optional()
        .describe("List of emojis that are always allowed"),
      allowedContexts: z
        .array(z.string())
        .optional()
        .describe("List of contexts where emojis are always allowed"),
    })
    .optional()
    .describe("Exceptions to the emoji rules"),
  customRules: z
    .array(z.string())
    .optional()
    .describe("Additional custom rules"),
  metadata: z
    .object({
      createdAt: z.string().describe("ISO 8601 timestamp of creation"),
      updatedAt: z.string().describe("ISO 8601 timestamp of last update"),
      userId: z.string().optional().describe("User identifier"),
    })
    .optional()
    .describe("Metadata about the configuration"),
});

// Partial config for updates
export const NomojiConfigUpdateSchema = NomojiConfigSchema.partial().omit({
  version: true,
  metadata: true,
});

// API Response schemas
export const ApiSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.any().optional().describe("Response data"),
  message: z.string().optional().describe("Success message"),
});

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string().describe("Error message"),
});

export const ApiResponseSchema = z.discriminatedUnion("success", [
  ApiSuccessResponseSchema,
  ApiErrorResponseSchema,
]);

// Specific response types
export const ConfigResponseSchema = z.object({
  success: z.literal(true),
  data: NomojiConfigSchema,
  message: z.string().optional(),
});

export const PresetsResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    available: z.array(z.string()).describe("List of available preset names"),
    presets: z
      .record(z.string(), NomojiConfigSchema.partial())
      .describe("Preset configurations"),
    default: NomojiConfigSchema.describe("Default configuration"),
  }),
});

// Analyze request/response
export const AnalyzeRequestSchema = z.object({
  text: z.string().describe("Text to analyze for emoji usage"),
});

export const AnalyzeResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    count: z.number().describe("Total number of emojis found"),
    unique: z.array(z.string()).describe("Unique emojis found"),
    hasEmojis: z.boolean().describe("Whether any emojis were found"),
    cleanText: z.string().describe("Text with emojis removed"),
    violations: z.array(z.string()).describe("List of violations found"),
  }),
});

// Share config request/response
export const ShareConfigRequestSchema = NomojiConfigUpdateSchema;

export const ShareConfigResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    configId: z.string().uuid().describe("Unique configuration identifier"),
    url: z.string().url().describe("Shareable URL for the configuration"),
  }),
  message: z.string().optional(),
});

// Health check response
export const HealthCheckResponseSchema = z.object({
  status: z
    .enum(["healthy", "degraded", "unhealthy"])
    .describe("Overall system health status"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
  version: z.string().optional().describe("API version"),
  checks: z
    .object({
      kv: z
        .object({
          status: z.enum(["ok", "error"]),
          message: z.string().optional(),
        })
        .describe("KV storage health"),
      analytics: z
        .object({
          status: z.enum(["ok", "error"]),
          message: z.string().optional(),
        })
        .optional()
        .describe("Analytics engine health"),
    })
    .describe("Individual service health checks"),
});

// API info response
export const ApiInfoResponseSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string(),
  endpoints: z.record(z.string(), z.string()),
  assistants: z.record(z.string(), z.string()).optional(),
});

// Path parameters
export const UserIdParamSchema = z.object({
  userId: z.string().min(1).max(255).describe("User identifier"),
});

export const PresetNameParamSchema = z.object({
  presetName: z
    .enum(["strict", "moderate", "relaxed"])
    .describe("Preset name to apply"),
});

export const ConfigIdParamSchema = z.object({
  configId: z.string().uuid().describe("Shared configuration identifier"),
});

export const AssistantParamSchema = z.object({
  assistant: z
    .enum(["cursor", "copilot", "gemini", "codeium", "tabnine", "generic"])
    .describe("AI assistant type"),
});

// Type exports for TypeScript
export type NomojiConfig = z.infer<typeof NomojiConfigSchema>;
export type NomojiConfigUpdate = z.infer<typeof NomojiConfigUpdateSchema>;
export type ContextConfig = z.infer<typeof ContextConfigSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;
export type AnalyzeResponse = z.infer<typeof AnalyzeResponseSchema>;
export type ShareConfigRequest = z.infer<typeof ShareConfigRequestSchema>;
export type ShareConfigResponse = z.infer<typeof ShareConfigResponseSchema>;
export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;
export type ApiInfoResponse = z.infer<typeof ApiInfoResponseSchema>;
