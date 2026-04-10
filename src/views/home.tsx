import {
  combineStructuredData,
  generateFAQStructuredData,
  generateHowToStructuredData,
  generateOrganizationData,
  generateSoftwareApplicationData,
  generateWebsiteStructuredData,
} from "../utils/structured-data";
import { Layout } from "./layout";

export const HomePage = (theme?: string) => {
  const structuredData = combineStructuredData(
    generateWebsiteStructuredData(),
    generateSoftwareApplicationData(),
    generateFAQStructuredData(),
    generateHowToStructuredData(),
    generateOrganizationData(),
  );

  return (
    <Layout
      title="nomoji.dev - The no-emoji Agent Skill for AI coding tools"
      description="Install the nomoji Agent Skill to keep AI-generated code, docs, and commits emoji-free. Works with Claude Code, Cursor, OpenAI Codex, Gemini CLI, and 35+ tools via the open Agent Skills standard."
      keywords="agent skill, nomoji, AI code generation, emoji control, Claude Code skills, Cursor skills, OpenAI Codex skills, Gemini CLI skills, code quality, accessibility, professional code, agentskills.io"
      canonical="https://nomoji.dev"
      structuredData={structuredData}
      theme={theme}
    >
      <main>
        <header>
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
          <p class="tagline">
            The open Agent Skill that keeps AI-generated code, docs, and commits
            emoji-free
          </p>
        </header>

        <section class="hero">
          <p class="hero-text">
            AI tools love adding emojis everywhere. <strong>nomoji.dev</strong>{" "}
            publishes the official nomoji{" "}
            <a href="https://agentskills.io">Agent Skill</a> — one install,
            works across Claude Code, Cursor, OpenAI Codex, Gemini CLI, and 35+
            tools.
          </p>
          <div class="hero-actions">
            <a href="/setup" class="btn btn-primary">
              Get Started →
            </a>
            <a href="/docs" class="btn btn-secondary">
              View API Docs
            </a>
          </div>
        </section>

        <section class="integrations">
          <h2>Install</h2>
          <p class="subtitle">
            One <a href="https://agentskills.io">Agent Skill</a> — works across
            Claude Code, Cursor, OpenAI Codex, Gemini CLI, and 35+ tools
          </p>

          <div class="install-primary">
            <div class="code-block">
              <code id="install-cmd">
                mkdir -p .claude/skills/nomoji && curl https://nomoji.dev/skill
                -o .claude/skills/nomoji/SKILL.md
              </code>
            </div>
            <div class="hero-actions">
              <a href="/integrations/agent-skills" class="btn btn-primary">
                All install guides →
              </a>
              <a href="/skill" class="btn btn-secondary" download>
                Download SKILL.md
              </a>
            </div>
          </div>

          <div class="install-cards">
            <div class="install-card">
              <div class="install-card-icon">CC</div>
              <div class="install-card-name">Claude Code</div>
              <code class="install-card-path">
                .claude/skills/nomoji/SKILL.md
              </code>
            </div>
            <div class="install-card">
              <div class="install-card-icon">CR</div>
              <div class="install-card-name">Cursor</div>
              <code class="install-card-path">
                .cursor/skills/nomoji/SKILL.md
              </code>
            </div>
            <div class="install-card">
              <div class="install-card-icon">OC</div>
              <div class="install-card-name">OpenAI Codex</div>
              <code class="install-card-path">
                .agents/skills/nomoji/SKILL.md
              </code>
            </div>
            <div class="install-card">
              <div class="install-card-icon">GC</div>
              <div class="install-card-name">Gemini CLI</div>
              <code class="install-card-path">
                .gemini/skills/nomoji/SKILL.md
              </code>
            </div>
          </div>

          <p class="other-integrations">
            Not using a Skills-compatible tool?{" "}
            <a href="/integrations/copilot">GitHub Copilot</a> and{" "}
            <a href="/integrations/git-hooks">Git Hooks</a> are also supported.
          </p>
        </section>

        <div class="section-divider"></div>

        <section class="why-section">
          <h2>Why No Emojis?</h2>
          <div class="reasons-grid">
            <div class="reason-card">
              <div class="reason-icon">A11y</div>
              <h3>Accessibility</h3>
              <p>Screen readers struggle with emojis</p>
            </div>
            <div class="reason-card">
              <div class="reason-icon">PRO</div>
              <h3>Professional</h3>
              <p>Enterprise code needs to look professional</p>
            </div>
            <div class="reason-card">
              <div class="reason-icon">LOG</div>
              <h3>Clean Logs</h3>
              <p>Emojis clutter console output and logs</p>
            </div>
            <div class="reason-card">
              <div class="reason-icon">XPL</div>
              <h3>Cross-Platform</h3>
              <p>Inconsistent rendering across systems</p>
            </div>
          </div>
        </section>

        <div class="section-divider"></div>

        <section class="extras">
          <h2>Additional Tools</h2>

          <div class="tool-card">
            <h3>Git Hooks</h3>
            <p>Automatically check commits and messages for emojis</p>
            <div class="code-block">
              <code>
                curl -s https://nomoji.dev/examples/scripts/setup-hooks.sh |
                bash
              </code>
            </div>
            <a href="/integrations/git-hooks" class="btn-link">
              Learn more about Git Hooks →
            </a>
          </div>

          <div class="tool-card">
            <h3>API Access</h3>
            <p>Integrate nomoji rules into your own tools and workflows</p>
            <div class="endpoint-list">
              <code>GET /api/rules/default</code>
              <code>GET /api/template/default/:assistant</code>
              <code>POST /api/analyze</code>
            </div>
            <a href="/docs" class="btn-link">
              View Full API Documentation
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
};
