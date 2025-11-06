/**
 * Configuration for emoji usage control across different contexts
 */
export interface NomojiConfig {
  version: string;
  enabled: boolean;
  contexts: {
    documentation: ContextConfig;
    console: ContextConfig;
    cli: ContextConfig;
    logging: ContextConfig;
    comments: ContextConfig;
    commitMessages: ContextConfig;
    userInterface: ContextConfig;
  };
  exceptions?: {
    allowedEmojis?: string[];
    allowedContexts?: string[];
  };
  customRules?: string[];
  metadata?: {
    createdAt: string;
    updatedAt: string;
    userId?: string;
  };
}

export interface ContextConfig {
  enabled: boolean;
  severity: "strict" | "moderate" | "relaxed";
  customMessage?: string;
}

/**
 * Rule templates for different AI assistants
 */
export interface RuleTemplate {
  id: string;
  name: string;
  assistant:
    | "claude"
    | "cursor"
    | "copilot"
    | "gemini"
    | "openai"
    | "openai-codex"
    | "codeium"
    | "tabnine"
    | "generic";
  format: "markdown" | "xml" | "json" | "text";
  template: string;
}

/**
 * User preferences stored in KV
 */
export interface UserPreferences {
  userId: string;
  config: NomojiConfig;
  integrations: {
    cursor?: boolean;
    copilot?: boolean;
    gemini?: boolean;
    openai?: boolean;
    openaiCodex?: boolean;
    codeium?: boolean;
  };
}

/**
 * API response types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Analytics Engine binding
 */
export interface AnalyticsEngineDataset {
  writeDataPoint(data: {
    blobs?: string[];
    doubles?: number[];
    indexes?: string[];
  }): void;
}

/**
 * Environment bindings for Cloudflare Workers
 */
export interface Env {
  PREFERENCES: KVNamespace;
  ANALYTICS?: AnalyticsEngineDataset;
  ENVIRONMENT: string;
  LOG_LEVEL?: string;
  VERSION?: string;
}

/**
 * Custom context variables for OpenAPIHono
 */
export interface Variables {
  requestId: string;
  logger: any;
  analytics: any;
  perf: any;
  validatedConfig?: any;
  apiKey?: string;
}
