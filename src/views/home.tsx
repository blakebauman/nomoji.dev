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
      title="nomoji.dev - Stop AI from Adding Emojis to Your Code"
      description="Control emoji usage in AI-generated code, documentation, and logs. Free rules for Cursor, Claude Code, GitHub Copilot, and more. Keep your code professional and accessible."
      keywords="AI code generation, emoji control, Cursor rules, Claude Code, GitHub Copilot, code quality, accessibility, professional code, developer tools"
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
            Stop AI coding assistants from adding emojis to your code, docs, and
            logs
          </p>
        </header>

        <section class="hero">
          <p class="hero-text">
            AI assistants love adding emojis everywhere.{" "}
            <strong>nomoji.dev</strong> makes them stop. Simple rules you can
            apply in seconds to keep your code professional.
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
          <h2>Choose Your AI Assistant</h2>
          <p class="subtitle">
            Select your tool and follow the quick setup instructions
          </p>

          <div class="integration-grid">
            <article class="integration-card">
              <div class="integration-header">
                <h3>Cursor</h3>
                <span class="badge badge-recommended">Recommended</span>
              </div>
              <p>Add a single rules file to your project</p>
              <div class="code-block">
                <code>mkdir -p .cursor/rules</code>
                <code>
                  curl https://nomoji.dev/api/cursor-rules/default -o
                  .cursor/rules/nomoji.mdc
                </code>
              </div>
              <div class="card-actions">
                <a href="/integrations/cursor" class="btn btn-link">
                  View Guide →
                </a>
                <a
                  href="/api/cursor-rules/default"
                  class="btn btn-secondary-sm"
                  download
                >
                  Download
                </a>
              </div>
            </article>

            <article class="integration-card">
              <div class="integration-header">
                <h3>Claude Code</h3>
                <span class="badge badge-new">New</span>
              </div>
              <p>Proactive emoji detection with AI subagents</p>
              <div class="code-block">
                <code>mkdir -p .claude/agents</code>
                <code>
                  curl https://nomoji.dev/api/claude/default -o
                  .claude/agents/nomoji.mdc
                </code>
              </div>
              <div class="card-actions">
                <a href="/integrations/claude-code" class="btn btn-link">
                  View Guide →
                </a>
                <a
                  href="/api/claude/default"
                  class="btn btn-secondary-sm"
                  download
                >
                  Download
                </a>
              </div>
            </article>

            <article class="integration-card">
              <div class="integration-header">
                <h3>GitHub Copilot</h3>
                <span class="badge badge-secondary">VS Code</span>
              </div>
              <p>Add custom instructions to VS Code settings</p>
              <div class="code-block">
                <code>
                  curl https://nomoji.dev/api/template/default/copilot
                </code>
              </div>
              <div class="card-actions">
                <a href="/integrations/copilot" class="btn btn-link">
                  View Guide →
                </a>
                <a
                  href="/api/template/default/copilot"
                  class="btn btn-secondary-sm"
                  download
                >
                  Download
                </a>
              </div>
            </article>

            <article class="integration-card">
              <div class="integration-header">
                <h3>Google Gemini CLI</h3>
                <span class="badge badge-secondary">CLI</span>
              </div>
              <p>Configure system instructions for Gemini</p>
              <div class="code-block">
                <code>mkdir -p ~/.gemini</code>
                <code>
                  curl https://nomoji.dev/api/template/default/generic -o
                  ~/.gemini/nomoji-rules.md
                </code>
              </div>
              <div class="card-actions">
                <a href="/integrations/gemini" class="btn btn-link">
                  View Guide →
                </a>
                <a
                  href="/api/template/default/generic"
                  class="btn btn-secondary-sm"
                  download
                >
                  Download
                </a>
              </div>
            </article>

            <article class="integration-card">
              <div class="integration-header">
                <h3>OpenAI Codex</h3>
                <span class="badge badge-new">New</span>
              </div>
              <p>AI coding agent with system instruction support</p>
              <div class="code-block">
                <code>npm i -g @openai/codex</code>
                <code>
                  curl https://nomoji.dev/api/template/default/openai-codex -o
                  ~/nomoji-codex.md
                </code>
              </div>
              <div class="card-actions">
                <a href="/integrations/openai" class="btn btn-link">
                  View Guide →
                </a>
                <a
                  href="/api/template/default/openai-codex"
                  class="btn btn-secondary-sm"
                  download
                >
                  Download
                </a>
              </div>
            </article>
          </div>
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
