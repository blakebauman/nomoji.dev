import {
  combineStructuredData,
  generateOrganizationData,
  generateWebsiteStructuredData,
} from "../utils/structured-data";
import { Layout } from "./layout";

export const HomePage = (theme?: string) => {
  const structuredData = combineStructuredData(
    generateWebsiteStructuredData(),
    generateOrganizationData(),
  );

  return (
    <Layout
      title="nomoji.dev - The no-emoji Agent Skill for AI coding tools"
      description="Install the nomoji Agent Skill to keep AI-generated code, docs, and commits emoji-free. Works with Claude Code, Cursor, OpenAI Codex, Gemini CLI, and 35+ tools."
      keywords="agent skill, nomoji, AI code generation, emoji control, Claude Code skills, Cursor skills, code quality, accessibility, professional code"
      canonical="https://nomoji.dev"
      structuredData={structuredData}
      theme={theme}
    >
      <main class="home">
        <header class="home-header">
          <button
            id="theme-toggle"
            type="button"
            class="theme-toggle"
            onclick="window.toggleTheme()"
            aria-label="Toggle theme"
          >
            [D]
          </button>
          <h1>nomoji.dev</h1>
          <p class="home-tagline">
            The open <a href="https://agentskills.io">Agent Skill</a> that keeps
            AI-generated code, docs, and commits emoji-free.
          </p>
        </header>

        <div class="home-install">
          <div class="code-block">
            <code id="install-cmd">
              mkdir -p .claude/skills/nomoji && curl https://nomoji.dev/skill -o
              .claude/skills/nomoji/SKILL.md
            </code>
          </div>
          <p class="home-install-note">
            Works with Claude Code, Cursor, OpenAI Codex, Gemini CLI, and{" "}
            <a href="https://agentskills.io">35+ tools</a>.{" "}
            <a href="/how">Other install methods →</a>
          </p>
        </div>

        <nav class="home-nav">
          <a href="/why" class="home-nav-item">
            <span class="home-nav-label">Why?</span>
            <span class="home-nav-desc">Why emojis hurt AI-generated code</span>
          </a>
          <a href="/how" class="home-nav-item">
            <span class="home-nav-label">How</span>
            <span class="home-nav-desc">
              Install for your tool in one command
            </span>
          </a>
          <a href="/setup" class="home-nav-item">
            <span class="home-nav-label">Configure</span>
            <span class="home-nav-desc">
              Customize strictness and context rules
            </span>
          </a>
          <a href="/docs" class="home-nav-item">
            <span class="home-nav-label">API</span>
            <span class="home-nav-desc">
              Integrate nomoji into your own tools
            </span>
          </a>
        </nav>
      </main>
    </Layout>
  );
};
