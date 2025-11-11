import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import type { Context } from "hono";
import { DEFAULT_CONFIG, PRESETS } from "./config/defaults";
import { corsMiddleware } from "./middleware/cors";
import {
  type Analytics,
  errorHandler,
  healthCheck,
  type Logger,
  observability,
  type PerformanceTracker,
} from "./middleware/observability";
import { RateLimitPresets } from "./middleware/ratelimit";
import { requestSizeLimit, securityHeaders } from "./middleware/security";
import {
  analyzeTextRoute,
  apiInfoRoute,
  applyPresetRoute,
  deleteUserConfigRoute,
  getClaudeSubagentRoute,
  getCursorRulesRoute,
  getJsonRoute,
  getPresetsRoute,
  getRulesRoute,
  getSharedConfigRoute,
  getTemplateRoute,
  getUserConfigRoute,
  healthRoute,
  shareConfigRoute,
  updateUserConfigRoute,
} from "./routes/openapi";
import { generateClaudeSubagent } from "./rules/claude";
import { generateCursorRules } from "./rules/cursor";
import {
  generateJSON,
  generateLegacyCursorRules,
  generateRules,
  generateTemplate,
} from "./rules/generator";
import type { Env, NomojiConfig, Variables } from "./types";
import { analyzeEmojis } from "./utils/emoji";
import {
  generateAIFriendlyData,
  generateApiSitemap,
  generateManifest,
  generateRobotsTxt,
  generateSitemap,
} from "./utils/seo";
import {
  deleteUserPreferences,
  getOrCreateUserConfig,
  getSharedConfig,
  saveSharedConfig,
  updateUserConfig,
} from "./utils/storage";
import { HomePage } from "./views/home";
import { ClaudeCodeIntegrationPage } from "./views/integrations/claude-code";
import { CopilotIntegrationPage } from "./views/integrations/copilot";
import { CursorIntegrationPage } from "./views/integrations/cursor";
import { GeminiIntegrationPage } from "./views/integrations/gemini";
import { GitHooksIntegrationPage } from "./views/integrations/git-hooks";
import { OpenAIIntegrationPage } from "./views/integrations/openai";
import { SetupPage } from "./views/setup";

const app = new OpenAPIHono<{ Bindings: Env; Variables: Variables }>();

// Security headers (should be first)
app.use("*", securityHeaders());

// CORS middleware (environment-aware)
app.use("*", corsMiddleware());

// Request size limit (100KB)
app.use("*", requestSizeLimit(100 * 1024));

// Observability middleware
app.use("*", observability());

// Global rate limiting (moderate)
app.use("/api/*", RateLimitPresets.moderate);

// Error handler
app.onError(errorHandler());

// OpenAPI documentation
app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "nomoji.dev API",
    description:
      "Control emoji usage in AI-generated code and documentation. This API provides configuration management, rule generation for various AI assistants, and text analysis for emoji detection.",
    contact: {
      name: "nomoji.dev",
      url: "https://nomoji.dev",
    },
    license: {
      name: "MIT",
      url: "https://github.com/nomoji/nomoji.dev/blob/main/LICENSE",
    },
  },
  servers: [
    {
      url: "https://nomoji.dev",
      description: "Production server",
    },
    {
      url: "http://localhost:8787",
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "System",
      description: "System health and API information endpoints",
    },
    {
      name: "Configuration",
      description: "User configuration management",
    },
    {
      name: "Rules",
      description: "Rule generation for various AI assistants",
    },
    {
      name: "Analysis",
      description: "Text analysis for emoji detection",
    },
    {
      name: "Sharing",
      description: "Configuration sharing",
    },
  ],
  security: [],
});

// Scalar API Documentation UI
app.get(
  "/docs",
  apiReference({
    theme: "none",
    withDefaultFonts: false,
    url: "/openapi.json",
    pageTitle: "nomoji.dev API Documentation",
    metaData: {
      title: "nomoji.dev API Docs",
      description:
        "Interactive API documentation for nomoji.dev - Control emoji usage in AI-generated code",
      ogDescription:
        "Interactive API documentation for nomoji.dev - Control emoji usage in AI-generated code",
      ogTitle: "nomoji.dev API Documentation",
    },
    customCss: `
      @import url('https://fonts.cdnfonts.com/css/sf-mono');
      
      * {
        border-radius: 0 !important;
      }

      :root {
        --scalar-font: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Source Code Pro', monospace;
        --scalar-font-code: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
      }

      .light-mode {
        --scalar-color-1: #0a0a0a;
        --scalar-color-2: #666666;
        --scalar-color-3: #a0a0a0;
        --scalar-color-accent: #1a1a1a;
        --scalar-background-1: #ffffff;
        --scalar-background-2: #fafafa;
        --scalar-background-3: #f5f5f5;
        --scalar-background-accent: rgba(0, 0, 0, 0.05);
        --scalar-border-color: #e0e0e0;
      }

      .dark-mode {
        --scalar-color-1: #e5e5e5;
        --scalar-color-2: #a0a0a0;
        --scalar-color-3: #666666;
        --scalar-color-accent: #f5f5f5;
        --scalar-background-1: #0a0a0a;
        --scalar-background-2: #151515;
        --scalar-background-3: #1a1a1a;
        --scalar-background-accent: rgba(255, 255, 255, 0.05);
        --scalar-border-color: #2a2a2a;
      }

      .light-mode .sidebar {
        --scalar-sidebar-background-1: #ffffff;
        --scalar-sidebar-item-hover-color: #0a0a0a;
        --scalar-sidebar-item-hover-background: #fafafa;
        --scalar-sidebar-item-active-background: #f5f5f5;
        --scalar-sidebar-border-color: #e0e0e0;
        --scalar-sidebar-color-1: #0a0a0a;
        --scalar-sidebar-color-2: #666666;
        --scalar-sidebar-color-active: #0a0a0a;
        --scalar-sidebar-search-background: #fafafa;
        --scalar-sidebar-search-border-color: #e0e0e0;
        --scalar-sidebar-search-color: #666666;
      }

      .dark-mode .sidebar {
        --scalar-sidebar-background-1: #0a0a0a;
        --scalar-sidebar-item-hover-color: #e5e5e5;
        --scalar-sidebar-item-hover-background: #151515;
        --scalar-sidebar-item-active-background: #1a1a1a;
        --scalar-sidebar-border-color: #2a2a2a;
        --scalar-sidebar-color-1: #e5e5e5;
        --scalar-sidebar-color-2: #a0a0a0;
        --scalar-sidebar-color-active: #e5e5e5;
        --scalar-sidebar-search-background: #151515;
        --scalar-sidebar-search-border-color: #2a2a2a;
        --scalar-sidebar-search-color: #a0a0a0;
      }

      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      button, .button {
        border: 1px solid var(--scalar-border-color) !important;
        transition: all 0.15s ease !important;
      }

      button:hover, .button:hover {
        border-color: var(--scalar-color-1) !important;
      }

      code, pre {
        font-family: var(--scalar-font-code) !important;
      }

      /* Main content area spacing */
      main[role="main"] {
        padding: 3rem 2rem !important;
      }

      /* API title/header spacing */
      main h1:first-of-type {
        margin-bottom: 2rem !important;
      }

      /* Section spacing */
      section {
        margin-bottom: 4rem !important;
      }

      /* Section headers */
      section h2,
      section h3 {
        margin-top: 3rem !important;
        margin-bottom: 1.5rem !important;
        padding-top: 1rem !important;
      }

      section h2:first-child,
      section h3:first-child {
        margin-top: 0 !important;
      }

      /* Endpoint operation spacing */
      [data-section] {
        padding: 2rem 0 !important;
        margin-bottom: 2rem !important;
      }

      /* Description and content spacing */
      p, .description {
        margin-bottom: 1.25rem !important;
        line-height: 1.6 !important;
      }

      /* Code blocks */
      pre {
        margin: 1.5rem 0 !important;
        padding: 1.25rem !important;
      }

      /* Response/Request sections */
      .responses, .request-body {
        margin-top: 2rem !important;
        margin-bottom: 2rem !important;
      }

      /* Response items spacing - using Scalar's actual classes */
      .parameter-item {
        margin-bottom: 1rem !important;
      }

      /* Response buttons/items */
      .parameter-item-trigger {
        padding: 1rem !important;
      }

      /* Tags/Categories spacing */
      [data-section-tag] {
        margin-bottom: 3rem !important;
        padding-bottom: 2rem !important;
      }

      /* View More buttons */
      button[class*="ShowMore"], button[class*="show-more"] {
        margin-top: 1.5rem !important;
        margin-bottom: 1.5rem !important;
        padding: 0.75rem 1.5rem !important;
      }

      /* Operations list spacing */
      .operations-list > * {
        margin-bottom: 2rem !important;
      }

      /* Improve spacing in parameter lists */
      .parameters, [class*="parameter"] {
        margin-bottom: 1rem !important;
      }

      /* Schema sections */
      .schema, [class*="Schema"] {
        padding: 1.5rem !important;
        margin: 1.5rem 0 !important;
      }
    `,
  }),
);

// Helper function to get initial theme (client-side localStorage will override)
// We default to light since actual theme is managed client-side via localStorage
function getThemeFromRequest(_c: Context): string {
  return "light"; // Client-side JS will immediately set correct theme from localStorage
}

// Website pages (non-OpenAPI)
app.get("/", (c) => {
  const theme = getThemeFromRequest(c);
  return c.html(HomePage(theme));
});

app.get("/setup", (c) => {
  const theme = getThemeFromRequest(c);
  return c.html(SetupPage(theme));
});

app.get("/integrations/cursor", (c) => {
  const theme = getThemeFromRequest(c);
  return c.html(CursorIntegrationPage(theme));
});

app.get("/integrations/claude-code", (c) => {
  const theme = getThemeFromRequest(c);
  return c.html(ClaudeCodeIntegrationPage(theme));
});

app.get("/integrations/copilot", (c) => {
  const theme = getThemeFromRequest(c);
  return c.html(CopilotIntegrationPage(theme));
});

app.get("/integrations/gemini", (c) => {
  const theme = getThemeFromRequest(c);
  return c.html(GeminiIntegrationPage(theme));
});

app.get("/integrations/openai", (c) => {
  const theme = getThemeFromRequest(c);
  return c.html(OpenAIIntegrationPage(theme));
});

app.get("/integrations/git-hooks", (c) => {
  const theme = getThemeFromRequest(c);
  return c.html(GitHooksIntegrationPage(theme));
});

// Static assets are served via Wrangler's assets configuration
// See wrangler.jsonc for assets directory configuration
// These routes will be handled by Wrangler's static asset handler in production
// For development, Wrangler dev will serve files from the public directory

// SEO and discoverability endpoints
app.get("/robots.txt", (c) => {
  return c.text(generateRobotsTxt(), 200, {
    "Content-Type": "text/plain",
    "Cache-Control": "public, max-age=86400",
  });
});

app.get("/sitemap.xml", (c) => {
  return c.text(generateSitemap(), 200, {
    "Content-Type": "application/xml",
    "Cache-Control": "public, max-age=86400",
  });
});

app.get("/sitemap-api.xml", (c) => {
  return c.text(generateApiSitemap(), 200, {
    "Content-Type": "application/xml",
    "Cache-Control": "public, max-age=86400",
  });
});

app.get("/manifest.json", (c) => {
  return c.text(generateManifest(), 200, {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=86400",
  });
});

// LLM-friendly structured data endpoint
app.get("/structured-data.json", (c) => {
  return c.text(generateAIFriendlyData(), 200, {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=3600",
  });
});

// OpenAPI routes
app.openapi(healthRoute, async (c) => {
  const health = await healthCheck(c.env);
  const statusCode =
    health.status === "healthy"
      ? 200
      : health.status === "degraded"
        ? 200
        : 503;
  return c.json(health, statusCode);
});

app.openapi(apiInfoRoute, (c) => {
  return c.json({
    name: "nomoji.dev",
    version: "1.0.0",
    description: "Control emoji usage in AI-generated code and documentation",
    endpoints: {
      config: "/api/config/:userId",
      rules: "/api/rules/:userId",
      claude: "/api/claude/:userId",
      cursorRules: "/api/cursor-rules/:userId",
      cursorrules: "/api/cursorrules/:userId (deprecated)",
      template: "/api/template/:userId/:assistant",
      presets: "/api/presets",
      analyze: "/api/analyze",
      shared: "/api/shared/:configId",
    },
    assistants: {
      claude: "Claude Code - Download .claude/agents/nomoji.mdc subagent",
      cursor: "Cursor - Download .cursor/rules/nomoji.mdc rules",
      copilot: "GitHub Copilot - Get instructions format",
      gemini: "Google Gemini CLI - Get configuration instructions",
      codeium: "Codeium - Generic template",
    },
  });
});

app.openapi(getPresetsRoute, (c) => {
  return c.json({
    success: true as const,
    data: {
      available: ["strict", "moderate", "relaxed"],
      presets: PRESETS,
      default: DEFAULT_CONFIG,
    },
  });
});

// @ts-expect-error - OpenAPI type inference issue with union response types
app.openapi(getUserConfigRoute, async (c) => {
  const { userId } = c.req.valid("param");

  try {
    const config = await getOrCreateUserConfig(c.env, userId);
    return c.json({
      success: true,
      data: config,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get config",
      },
      500,
    );
  }
});

// @ts-expect-error - OpenAPI type inference issue with union response types
app.openapi(updateUserConfigRoute, async (c) => {
  const { userId } = c.req.valid("param");
  const body = c.req.valid("json");
  const logger = c.get("logger") as Logger;
  const analytics = c.get("analytics") as Analytics;
  const perf = c.get("perf") as PerformanceTracker;

  try {
    perf.mark("config_update_start");

    perf.mark("config_update_db_start");
    const config = await updateUserConfig(c.env, userId, body);
    perf.mark("config_update_db_end");

    const dbDuration = perf.getMarkDuration(
      "config_update_db_start",
      "config_update_db_end",
    );

    logger.info("Configuration updated", { userId, dbDuration });

    await analytics.trackConfigChange({
      userId,
      action: "update",
    });

    return c.json({
      success: true,
      data: config,
      message: "Configuration updated successfully",
    });
  } catch (error) {
    logger.error("Failed to update config", error as Error, { userId });

    return c.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update config",
      },
      500,
    );
  }
});

// @ts-expect-error - OpenAPI type inference issue with union response types
app.openapi(applyPresetRoute, async (c) => {
  const { userId, presetName } = c.req.valid("param");

  try {
    const preset = PRESETS[presetName as keyof typeof PRESETS];
    const config = await updateUserConfig(c.env, userId, preset);

    return c.json({
      success: true,
      data: config,
      message: `Preset '${presetName}' applied successfully`,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to apply preset",
      },
      500,
    );
  }
});

// @ts-expect-error - OpenAPI type inference issue with union response types
app.openapi(deleteUserConfigRoute, async (c) => {
  const { userId } = c.req.valid("param");

  try {
    await deleteUserPreferences(c.env, userId);
    return c.json({
      success: true,
      message: "Configuration deleted successfully",
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete config",
      },
      500,
    );
  }
});

// @ts-expect-error - OpenAPI type inference issue with union response types
app.openapi(getRulesRoute, async (c) => {
  const { userId } = c.req.valid("param");

  try {
    const config = await getOrCreateUserConfig(c.env, userId);
    const rules = generateRules(config);
    return c.text(rules);
  } catch (_error) {
    return c.text("Error generating rules", 500);
  }
});

app.openapi(getClaudeSubagentRoute, async (c) => {
  const { userId } = c.req.valid("param");

  try {
    const config = await getOrCreateUserConfig(c.env, userId);
    const subagent = generateClaudeSubagent(config);

    c.header("Content-Disposition", 'attachment; filename="nomoji.mdc"');
    c.header("Content-Type", "text/markdown");

    return c.text(subagent);
  } catch (_error) {
    return c.text("Error generating Claude subagent file", 500);
  }
});

app.openapi(getCursorRulesRoute, async (c) => {
  const { userId } = c.req.valid("param");

  try {
    const config = await getOrCreateUserConfig(c.env, userId);
    const rules = generateCursorRules(config);

    c.header("Content-Disposition", 'attachment; filename="nomoji.mdc"');
    c.header("Content-Type", "text/markdown");

    return c.text(rules);
  } catch (_error) {
    return c.text("Error generating Cursor rules file", 500);
  }
});

// Legacy cursorrules endpoint (non-OpenAPI, deprecated)
app.get("/api/cursorrules/:userId", async (c) => {
  const userId = c.req.param("userId");

  try {
    const config = await getOrCreateUserConfig(c.env, userId);
    const rules = generateLegacyCursorRules(config);

    c.header("Content-Disposition", 'attachment; filename=".cursorrules"');
    c.header("Content-Type", "text/plain");
    c.header("X-Deprecated", "true");
    c.header("X-Replacement-Endpoint", "/api/cursor-rules/:userId");

    return c.text(rules);
  } catch (_error) {
    return c.text("Error generating .cursorrules file", 500);
  }
});

// @ts-expect-error - OpenAPI type inference issue with union response types
app.openapi(getTemplateRoute, async (c) => {
  const { userId, assistant } = c.req.valid("param");

  try {
    const config = await getOrCreateUserConfig(c.env, userId);
    const template = generateTemplate(config, assistant);
    return c.text(template);
  } catch (_error) {
    return c.text("Error generating template", 500);
  }
});

// @ts-expect-error - OpenAPI type inference issue with union response types
app.openapi(getJsonRoute, async (c) => {
  const { userId } = c.req.valid("param");

  try {
    const config = await getOrCreateUserConfig(c.env, userId);
    const jsonOutput = generateJSON(config);
    return c.text(jsonOutput, 200, {
      "Content-Type": "application/json",
    });
  } catch (_error) {
    return c.json({ error: "Error generating JSON" }, 500);
  }
});

// @ts-expect-error - OpenAPI type inference issue with union response types
app.openapi(analyzeTextRoute, async (c) => {
  const logger = c.get("logger") as Logger;
  const analytics = c.get("analytics") as Analytics;
  const perf = c.get("perf") as PerformanceTracker;

  try {
    const { text } = c.req.valid("json");

    perf.mark("analyze_start");
    const stats = analyzeEmojis(text);
    perf.mark("analyze_end");

    const analyzeDuration = perf.getMarkDuration(
      "analyze_start",
      "analyze_end",
    );

    logger.debug("Text analyzed", {
      textLength: text.length,
      hasEmojis: stats.hasEmojis,
      emojiCount: stats.count,
      duration: analyzeDuration,
    });

    await analytics.trackAnalysis({
      hasEmojis: stats.hasEmojis,
      emojiCount: stats.count,
      textLength: text.length,
    });

    return c.json({
      success: true,
      data: {
        ...stats,
        violations: stats.hasEmojis ? ["Text contains emojis"] : [],
      },
    });
  } catch (error) {
    logger.error("Failed to analyze text", error as Error);

    return c.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to analyze text",
      },
      500,
    );
  }
});

// @ts-expect-error - OpenAPI type inference issue with union response types
app.openapi(shareConfigRoute, async (c) => {
  try {
    const body = c.req.valid("json");
    const configId = crypto.randomUUID();

    // Add version to config if not present
    const configWithVersion = { version: "1.0.0", ...body };
    await saveSharedConfig(c.env, configId, configWithVersion as NomojiConfig);

    return c.json({
      success: true,
      data: {
        configId,
        url: `https://nomoji.dev/shared/${configId}`,
      },
      message: "Config shared successfully",
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to share config",
      },
      500,
    );
  }
});

// @ts-expect-error - OpenAPI type inference issue with union response types
app.openapi(getSharedConfigRoute, async (c) => {
  const { configId } = c.req.valid("param");

  try {
    const config = await getSharedConfig(c.env, configId);

    if (!config) {
      return c.json({ success: false, error: "Config not found" }, 404);
    }

    return c.json({
      success: true,
      data: config,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get shared config",
      },
      500,
    );
  }
});

// Export the Hono app as the default fetch handler
export default {
  fetch: app.fetch,
  // Scheduled handler for cron triggers
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const { scheduled } = await import("./scheduled");
    return scheduled(event, env, ctx);
  },
};
