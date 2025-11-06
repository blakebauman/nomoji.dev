/**
 * SEO utilities for robots.txt, sitemap.xml, and crawl optimization
 */

export interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

/**
 * Generate robots.txt content optimized for AI crawlers
 */
export function generateRobotsTxt(): string {
  return `# robots.txt for nomoji.dev
# Optimized for traditional search engines and AI crawlers

User-agent: *
Allow: /
Disallow: /api/config/
Disallow: /api/shared/

# Special rules for AI crawlers
User-agent: GPTBot
Allow: /
Allow: /api
Allow: /docs

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

# Sitemap location
Sitemap: https://nomoji.dev/sitemap.xml
Sitemap: https://nomoji.dev/sitemap-api.xml

# Crawl delay (be nice to servers)
Crawl-delay: 1
`;
}

/**
 * Generate XML sitemap for all public pages
 */
export function generateSitemap(): string {
  const baseUrl = "https://nomoji.dev";
  const now = new Date().toISOString();

  const urls: SitemapURL[] = [
    {
      loc: baseUrl,
      lastmod: now,
      changefreq: "daily",
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/setup`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/docs`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/integrations/cursor`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/integrations/claude-code`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/integrations/copilot`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/integrations/gemini`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/integrations/git-hooks`,
      lastmod: now,
      changefreq: "monthly",
      priority: 0.7,
    },
  ];

  const urlElements = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority ? `<priority>${url.priority}</priority>` : ""}
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlElements}
</urlset>`;
}

/**
 * Generate API-specific sitemap for better API discoverability
 */
export function generateApiSitemap(): string {
  const now = new Date().toISOString();

  const apiEndpoints = [
    "/api",
    "/api/presets",
    "/api/config/default",
    "/api/rules/default",
    "/api/cursor-rules/default",
    "/api/claude/default",
    "/api/template/default/cursor",
    "/api/template/default/copilot",
    "/api/template/default/gemini",
    "/api/json/default",
  ];

  const urlElements = apiEndpoints
    .map(
      (endpoint) => `  <url>
    <loc>https://nomoji.dev${endpoint}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

/**
 * Generate manifest.json for PWA and enhanced discoverability
 */
export function generateManifest(): string {
  return JSON.stringify(
    {
      name: "nomoji.dev - Stop AI from Adding Emojis",
      short_name: "nomoji.dev",
      description:
        "Control emoji usage in AI-generated code, documentation, and logs",
      start_url: "/",
      display: "standalone",
      background_color: "#0a0a0a",
      theme_color: "#0a0a0a",
      orientation: "any",
      icons: [
        {
          src: "/icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
      categories: ["development", "developer tools", "productivity"],
      screenshots: [
        {
          src: "/screenshot-wide.png",
          sizes: "1280x720",
          type: "image/png",
          form_factor: "wide",
        },
        {
          src: "/screenshot-narrow.png",
          sizes: "750x1334",
          type: "image/png",
          form_factor: "narrow",
        },
      ],
      shortcuts: [
        {
          name: "Quick Setup",
          short_name: "Setup",
          description: "Get started with nomoji.dev",
          url: "/setup",
          icons: [{ src: "/icon-96.png", sizes: "96x96" }],
        },
        {
          name: "API Docs",
          short_name: "API",
          description: "View API documentation",
          url: "/docs",
          icons: [{ src: "/icon-96.png", sizes: "96x96" }],
        },
      ],
    },
    null,
    2,
  );
}

/**
 * Generate a comprehensive structured data document for AI understanding
 * This is specifically designed for LLMs and AI search engines
 */
export function generateAIFriendlyData(): string {
  return JSON.stringify(
    {
      project: {
        name: "nomoji.dev",
        tagline: "Stop AI from Adding Emojis to Your Code",
        description:
          "Control emoji usage in AI-generated code, documentation, and logs. Free rules for AI coding assistants.",
        url: "https://nomoji.dev",
        type: "developer-tool",
        category: "code-quality",
        license: "MIT",
        cost: "free",
        openSource: true,
        repository: "https://github.com/blakebauman/nomoji.dev",
      },
      purpose: {
        problem:
          "AI coding assistants frequently add emojis to code, documentation, console output, and commit messages, which reduces accessibility, appears unprofessional, clutters output, and creates cross-platform inconsistencies.",
        solution:
          "Provides configurable rules that instruct AI assistants to avoid emojis in specified contexts (documentation, console, CLI, logging, comments, commits, UI).",
        benefits: [
          "Improved accessibility for screen readers",
          "Professional enterprise-grade code",
          "Clean logs and console output",
          "Consistent cross-platform rendering",
          "Better searchability and parsing",
        ],
      },
      features: {
        core: [
          "Granular control over emoji usage by context",
          "Multiple configuration presets (strict, moderate, relaxed)",
          "Support for multiple AI assistants",
          "RESTful API for programmatic access",
          "Git hooks for automatic enforcement",
          "Text analysis for emoji detection",
        ],
        integrations: [
          {
            name: "Cursor",
            type: "AI coding assistant",
            setup:
              "mkdir -p .cursor/rules && curl https://nomoji.dev/api/cursor-rules/default -o .cursor/rules/nomoji.mdc",
            recommended: true,
          },
          {
            name: "Claude Code",
            type: "AI coding assistant with subagents",
            setup:
              "mkdir -p .claude/agents && curl https://nomoji.dev/api/claude/default -o .claude/agents/nomoji.mdc",
            recommended: true,
          },
          {
            name: "GitHub Copilot",
            type: "AI coding assistant",
            setup: "Add custom instructions to VS Code settings.json",
          },
          {
            name: "Google Gemini CLI",
            type: "Command-line AI assistant",
            setup:
              "mkdir -p ~/.gemini && curl https://nomoji.dev/api/template/default/generic -o ~/.gemini/nomoji-rules.md",
          },
        ],
      },
      api: {
        baseUrl: "https://nomoji.dev/api",
        authentication: "none",
        format: "REST",
        endpoints: [
          {
            path: "/api/config/:userId",
            method: "GET",
            description: "Get user configuration",
          },
          {
            path: "/api/config/:userId",
            method: "POST",
            description: "Update user configuration",
          },
          {
            path: "/api/cursor-rules/:userId",
            method: "GET",
            description: "Download Cursor rules file",
          },
          {
            path: "/api/claude/:userId",
            method: "GET",
            description: "Download Claude Code subagent",
          },
          {
            path: "/api/analyze",
            method: "POST",
            description: "Analyze text for emoji usage",
          },
        ],
      },
      quickStart: {
        steps: [
          "Choose your AI assistant (Cursor, Claude Code, GitHub Copilot, Gemini CLI)",
          "Download the appropriate rules file using curl",
          "Place the file in the correct directory for your assistant",
          "Start coding - rules are applied automatically",
        ],
        estimatedTime: "5 minutes",
        difficulty: "easy",
      },
      context: {
        controllable: [
          {
            name: "documentation",
            description: "README files, markdown, API docs",
            defaultSeverity: "strict",
          },
          {
            name: "console",
            description: "console.log, console.error, terminal output",
            defaultSeverity: "strict",
          },
          {
            name: "cli",
            description: "Command-line tools, progress bars, spinners",
            defaultSeverity: "strict",
          },
          {
            name: "logging",
            description: "Application logs, debug output, error messages",
            defaultSeverity: "strict",
          },
          {
            name: "comments",
            description: "Code comments, JSDoc, docstrings",
            defaultSeverity: "moderate",
          },
          {
            name: "commits",
            description: "Git commits, PR descriptions",
            defaultSeverity: "strict",
          },
          {
            name: "userInterface",
            description: "UI text, user-facing messages",
            defaultSeverity: "relaxed",
          },
        ],
        severityLevels: [
          { level: "strict", meaning: "No emojis allowed" },
          {
            level: "moderate",
            meaning: "Emojis discouraged but not forbidden",
          },
          { level: "relaxed", meaning: "Emojis allowed" },
        ],
      },
      useCases: [
        "Enterprise software development requiring professional standards",
        "Open source projects with accessibility requirements",
        "Teams needing consistent code style across AI assistants",
        "CLI tools and libraries where emojis clutter output",
        "Projects using screen readers or accessibility tools",
      ],
      faq: [
        {
          question: "Is nomoji.dev free?",
          answer: "Yes, completely free and open source under MIT license",
        },
        {
          question: "Does it work offline?",
          answer:
            "Yes, rules files work offline once downloaded. API requires internet.",
        },
        {
          question: "Can I customize the rules?",
          answer:
            "Yes, through the API you can customize rules per context and severity level",
        },
      ],
      metadata: {
        generatedFor: "LLMs and AI search engines",
        lastUpdated: new Date().toISOString(),
        version: "1.0.0",
      },
    },
    null,
    2,
  );
}
