/**
 * Structured data utilities for SEO and AI understanding
 * Generates Schema.org JSON-LD for improved discoverability
 */

export interface StructuredDataConfig {
  url?: string;
  title?: string;
  description?: string;
}

/**
 * Generate WebSite structured data
 */
export function generateWebsiteStructuredData(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "nomoji.dev",
    alternateName: "No Emoji Developer Tools",
    url: "https://nomoji.dev",
    description:
      "Control emoji usage in AI-generated code, documentation, and logs. Free rules for AI coding assistants including Cursor, Claude Code, and GitHub Copilot.",
    inLanguage: "en-US",
    keywords:
      "AI code generation, emoji control, developer tools, code quality, accessibility",
    publisher: {
      "@type": "Organization",
      name: "nomoji.dev",
      url: "https://nomoji.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://nomoji.dev/logo.png",
        width: 512,
        height: 512,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://nomoji.dev/api?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  });
}

/**
 * Generate SoftwareApplication structured data
 */
export function generateSoftwareApplicationData(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "nomoji.dev",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "API and rules engine for controlling emoji usage in AI-generated code. Supports Cursor, Claude Code, GitHub Copilot, Google Gemini CLI, and more.",
    url: "https://nomoji.dev",
    screenshot: "https://nomoji.dev/screenshot.png",
    featureList: [
      "Granular emoji control for AI coding assistants",
      "Multiple configuration presets (strict, moderate, relaxed)",
      "Support for Cursor, Claude Code, GitHub Copilot, Gemini CLI",
      "RESTful API for programmatic access",
      "Git hooks for automatic emoji detection",
      "Text analysis for emoji usage",
      "Shareable team configurations",
    ],
    installUrl: "https://nomoji.dev/setup",
    downloadUrl: "https://nomoji.dev/api/cursor-rules/default",
    softwareVersion: "1.0.0",
    releaseNotes: "Initial release with full AI assistant support",
    license: "https://opensource.org/licenses/MIT",
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: "nomoji.dev",
      url: "https://nomoji.dev",
    },
  });
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is nomoji.dev?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "nomoji.dev is a free platform that provides configurable rules to control emoji usage in AI-generated code, documentation, console output, and logs. It works with popular AI coding assistants like Cursor, Claude Code, GitHub Copilot, and Google Gemini CLI.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I avoid emojis in code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Emojis in code can reduce accessibility for screen readers, create inconsistent rendering across platforms, make text harder to search and parse, appear unprofessional in enterprise contexts, and clutter technical output and logs.",
        },
      },
      {
        "@type": "Question",
        name: "How do I use nomoji with Cursor?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For Cursor, create a .cursor/rules directory and download the nomoji rules file: mkdir -p .cursor/rules && curl https://nomoji.dev/api/cursor-rules/default -o .cursor/rules/nomoji.mdc",
        },
      },
      {
        "@type": "Question",
        name: "How do I use nomoji with Claude Code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For Claude Code, create a .claude/agents directory and download the nomoji subagent: mkdir -p .claude/agents && curl https://nomoji.dev/api/claude/default -o .claude/agents/nomoji.mdc. Claude Code will automatically use the subagent to check for emojis.",
        },
      },
      {
        "@type": "Question",
        name: "Is nomoji.dev free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, nomoji.dev is completely free to use. It's open source and runs on Cloudflare Workers. There are no premium features or paid tiers.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize the emoji rules?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can customize rules using the API. Choose from three presets (strict, moderate, relaxed) or create custom configurations for specific contexts like documentation, console output, CLI tools, logging, comments, commit messages, and UI text.",
        },
      },
      {
        "@type": "Question",
        name: "Does nomoji work offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once you download the rules files for your AI assistant, they work offline. The API requires internet access for configuration updates and text analysis.",
        },
      },
      {
        "@type": "Question",
        name: "Which AI assistants does nomoji support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "nomoji supports Cursor, Claude Code, GitHub Copilot, Google Gemini CLI, Codeium, Tabnine, and other AI coding assistants through generic templates. It also provides Git hooks for additional enforcement.",
        },
      },
    ],
  });
}

/**
 * Generate HowTo structured data for setup
 */
export function generateHowToStructuredData(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Stop AI from Adding Emojis to Your Code",
    description:
      "Step-by-step guide to configure AI coding assistants to stop using emojis in code, documentation, and logs",
    image: "https://nomoji.dev/setup-guide.png",
    totalTime: "PT5M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    tool: [
      {
        "@type": "HowToTool",
        name: "Cursor, Claude Code, GitHub Copilot, or Google Gemini CLI",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Choose Your AI Assistant",
        text: "Identify which AI coding assistant you're using: Cursor, Claude Code, GitHub Copilot, or Google Gemini CLI",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Download Rules File",
        text: "For Cursor: curl https://nomoji.dev/api/cursor-rules/default -o .cursor/rules/nomoji.mdc. For Claude Code: curl https://nomoji.dev/api/claude/default -o .claude/agents/nomoji.mdc",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Place File in Project",
        text: "Create the appropriate directory (.cursor/rules or .claude/agents) and place the downloaded file there",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Start Coding",
        text: "Your AI assistant will now follow the emoji-free rules automatically. No restart required.",
        position: 4,
      },
    ],
  });
}

/**
 * Generate API Documentation structured data
 */
export function generateAPIDocumentationData(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "APIReference",
    name: "nomoji.dev API",
    description: "RESTful API for controlling emoji usage in AI-generated code",
    url: "https://nomoji.dev/docs",
    documentation: "https://nomoji.dev/docs",
    termsOfService: "https://nomoji.dev/terms",
    version: "1.0.0",
    applicationCategory: "DeveloperTools",
    isAccessibleForFree: true,
    license: "https://opensource.org/licenses/MIT",
  });
}

/**
 * Generate breadcrumb list structured data
 */
export function generateBreadcrumbList(
  items: Array<{ name: string; url: string }>,
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationData(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "nomoji.dev",
    url: "https://nomoji.dev",
    logo: "https://nomoji.dev/logo.png",
    description:
      "Professional developer tools for controlling emoji usage in AI-generated code",
    foundingDate: "2024",
    sameAs: ["https://github.com/blakebauman/nomoji.dev"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Technical Support",
      url: "https://github.com/blakebauman/nomoji.dev/issues",
    },
  });
}

/**
 * Combine multiple structured data items into a single @graph
 */
export function combineStructuredData(...items: string[]): string {
  const parsed = items.map((item) => JSON.parse(item));
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": parsed,
  });
}
