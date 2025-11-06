import type { Context, Next } from "hono";
import type { NomojiConfig } from "../types";

/**
 * Input validation schemas and utilities
 * Provides type-safe validation without external dependencies
 */

/**
 * Validate user ID format
 */
export function isValidUserId(userId: string): boolean {
  // Must be alphanumeric with optional hyphens, underscores, or dots
  // Length: 3-64 characters
  const userIdRegex = /^[a-zA-Z0-9._-]{3,64}$/;
  return userIdRegex.test(userId);
}

/**
 * Validate config ID format (UUIDs)
 */
export function isValidConfigId(configId: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(configId);
}

/**
 * Validate preset name
 */
export function isValidPreset(preset: string): boolean {
  return ["strict", "moderate", "relaxed"].includes(preset);
}

/**
 * Validate severity level
 */
export function isValidSeverity(severity: string): boolean {
  return ["strict", "moderate", "relaxed"].includes(severity);
}

/**
 * Validate context name
 */
export function isValidContext(context: string): boolean {
  return [
    "documentation",
    "console",
    "cli",
    "logging",
    "comments",
    "commitMessages",
    "userInterface",
  ].includes(context);
}

/**
 * Validate NomojiConfig structure
 */
export function validateConfig(
  config: unknown,
): config is Partial<NomojiConfig> {
  if (!config || typeof config !== "object") {
    return false;
  }

  // Cast to record for property access
  const configObj = config as Record<string, unknown>;

  // Check version if provided
  if (
    configObj.version !== undefined &&
    typeof configObj.version !== "string"
  ) {
    return false;
  }

  // Check enabled if provided
  if (
    configObj.enabled !== undefined &&
    typeof configObj.enabled !== "boolean"
  ) {
    return false;
  }

  // Validate contexts if provided
  if (configObj.contexts !== undefined) {
    if (typeof configObj.contexts !== "object" || configObj.contexts === null) {
      return false;
    }

    for (const [key, value] of Object.entries(configObj.contexts)) {
      if (!isValidContext(key)) {
        return false;
      }

      const contextConfig = value as Record<string, unknown>;
      if (typeof contextConfig !== "object" || contextConfig === null) {
        return false;
      }

      if (
        contextConfig.enabled !== undefined &&
        typeof contextConfig.enabled !== "boolean"
      ) {
        return false;
      }

      if (
        contextConfig.severity !== undefined &&
        !isValidSeverity(contextConfig.severity as string)
      ) {
        return false;
      }

      if (
        contextConfig.customMessage !== undefined &&
        typeof contextConfig.customMessage !== "string"
      ) {
        return false;
      }
    }
  }

  // Validate exceptions if provided
  if (configObj.exceptions !== undefined) {
    if (
      typeof configObj.exceptions !== "object" ||
      configObj.exceptions === null
    ) {
      return false;
    }

    const exceptions = configObj.exceptions as Record<string, unknown>;
    if (
      exceptions.allowedEmojis !== undefined &&
      !Array.isArray(exceptions.allowedEmojis)
    ) {
      return false;
    }

    if (
      exceptions.allowedContexts !== undefined &&
      !Array.isArray(exceptions.allowedContexts)
    ) {
      return false;
    }
  }

  // Validate customRules if provided
  if (
    configObj.customRules !== undefined &&
    !Array.isArray(configObj.customRules)
  ) {
    return false;
  }

  return true;
}

/**
 * Validation middleware for user IDs
 */
export function validateUserId() {
  return async (c: Context, next: Next) => {
    const userId = c.req.param("userId");

    if (!userId || !isValidUserId(userId)) {
      return c.json(
        {
          success: false,
          error:
            "Invalid user ID. Must be 3-64 alphanumeric characters, hyphens, underscores, or dots.",
        },
        400,
      );
    }

    await next();
  };
}

/**
 * Validation middleware for config IDs
 */
export function validateConfigId() {
  return async (c: Context, next: Next) => {
    const configId = c.req.param("configId");

    if (!configId || !isValidConfigId(configId)) {
      return c.json(
        {
          success: false,
          error: "Invalid config ID. Must be a valid UUID.",
        },
        400,
      );
    }

    await next();
  };
}

/**
 * Validation middleware for preset names
 */
export function validatePresetName() {
  return async (c: Context, next: Next) => {
    const presetName = c.req.param("presetName");

    if (!presetName || !isValidPreset(presetName)) {
      return c.json(
        {
          success: false,
          error:
            "Invalid preset name. Must be 'strict', 'moderate', or 'relaxed'.",
        },
        400,
      );
    }

    await next();
  };
}

/**
 * Validation middleware for request body config
 */
export function validateConfigBody() {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();

      if (!validateConfig(body)) {
        return c.json(
          {
            success: false,
            error: "Invalid configuration format.",
          },
          400,
        );
      }

      // Attach validated body to context
      c.set("validatedConfig", body);
      await next();
    } catch (_error) {
      return c.json(
        {
          success: false,
          error: "Invalid JSON body.",
        },
        400,
      );
    }
  };
}
