import { PageHeader } from "../components/page-header";
import { Layout } from "../layout";

export const ClaudeCodeIntegrationPage = (theme?: string) => (
  <Layout title="Claude Code Integration - nomoji.dev" theme={theme}>
    <main class="integration-page">
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/setup">Setup</a>
          </li>
          <li>Claude Code</li>
        </ol>
        <button
          id="theme-toggle"
          type="button"
          class="theme-toggle-breadcrumb"
          onclick="window.toggleTheme()"
          aria-label="Toggle theme"
        >
          [D]
        </button>
      </nav>

      <PageHeader
        title="Claude Code Integration Guide"
        subtitle="Install the nomoji Agent Skill for automatic emoji-free output"
      />

      <div class="quick-setup">
        <h2>Quick Setup</h2>
        <div class="setup-box">
          <div class="command-step">
            <span class="step-label">1. Add the nomoji plugin marketplace</span>
            <div class="code-with-copy">
              <code id="cmd1">/plugin marketplace add blakebauman/nomoji</code>
              <button type="button" onclick="copy('cmd1')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">2. Install the plugin</span>
            <div class="code-with-copy">
              <code id="cmd2">/plugin install nomoji@nomoji</code>
              <button type="button" onclick="copy('cmd2')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">3. Done!</span>
            <p>
              Claude Code loads the skill automatically. Update later with{" "}
              <code>/plugin marketplace update nomoji</code>.
            </p>
          </div>
        </div>
        <details class="accordion">
          <summary>
            <h2>Prefer a manual install?</h2>
          </summary>
          <div class="accordion-content">
            <p>Drop the SKILL.md directly into your project:</p>
            <div class="code-with-copy">
              <code id="cmd-manual">
                mkdir -p .claude/skills/nomoji && curl https://nomoji.dev/skill
                -o .claude/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('cmd-manual')">
                Copy
              </button>
            </div>
          </div>
        </details>
      </div>

      <div class="content-section">
        <h2>How It Works</h2>
        <p>
          The nomoji skill uses the{" "}
          <a href="https://agentskills.io">Agent Skills</a> open standard.
          Claude Code discovers skills in <code>.claude/skills/</code>{" "}
          automatically and loads them with progressive efficiency:
        </p>
        <ul class="feature-list">
          <li>
            <strong>Level 1 (always active):</strong> Skill metadata loaded at
            startup — Claude knows nomoji exists and when to apply it
          </li>
          <li>
            <strong>Level 2 (on demand):</strong> Full instructions loaded when
            relevant — after generating code, docs, or commits
          </li>
        </ul>
        <p>The skill is automatically applied after:</p>
        <ul class="feature-list">
          <li>Generating or modifying code files</li>
          <li>Creating or updating documentation</li>
          <li>Writing console output or logging statements</li>
          <li>Composing commit messages</li>
        </ul>
      </div>

      <div class="content-section">
        <h2>Choosing a Preset</h2>
        <div class="preset-grid">
          <div class="preset-option">
            <h3>Strict Mode</h3>
            <p>No emojis anywhere (recommended for enterprise)</p>
            <div class="code-with-copy">
              <code id="strict">
                curl https://nomoji.dev/api/skill/strict-user -o
                .claude/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('strict')">
                Copy
              </button>
            </div>
          </div>
          <div class="preset-option">
            <h3>Moderate Mode</h3>
            <p>Limited emojis, balanced approach</p>
            <div class="code-with-copy">
              <code id="moderate">
                curl https://nomoji.dev/api/skill/moderate-user -o
                .claude/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('moderate')">
                Copy
              </button>
            </div>
          </div>
          <div class="preset-option">
            <h3>Relaxed Mode</h3>
            <p>Emojis in UI only</p>
            <div class="code-with-copy">
              <code id="relaxed">
                curl https://nomoji.dev/api/skill/relaxed-user -o
                .claude/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('relaxed')">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>Project vs User Level</h2>
        <div class="comparison-table">
          <div class="comparison-item">
            <h3>Project-Level (Recommended)</h3>
            <p>Place skill in your project directory:</p>
            <code class="inline-code">.claude/skills/nomoji/SKILL.md</code>
            <p>
              <strong>Benefits:</strong>
            </p>
            <ul>
              <li>Team-wide consistency</li>
              <li>Version controlled</li>
              <li>Project-specific configuration</li>
            </ul>
          </div>
          <div class="comparison-item">
            <h3>User-Level</h3>
            <p>Place skill in your home directory:</p>
            <code class="inline-code">~/.claude/skills/nomoji/SKILL.md</code>
            <p>
              <strong>Benefits:</strong>
            </p>
            <ul>
              <li>Apply to all projects</li>
              <li>Personal defaults</li>
              <li>No per-project setup needed</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>Usage Examples</h2>
        <div class="usage-examples">
          <h3>Automatic Application</h3>
          <p>Claude Code applies nomoji automatically when relevant:</p>
          <code class="code-example">
            You: Update the README with installation instructions
            <br />
            <br />
            Claude: [Generates README — nomoji skill active, no emojis added]
          </code>
        </div>
        <div class="usage-examples">
          <h3>Explicit Invocation</h3>
          <p>Request nomoji specifically:</p>
          <code class="code-example">
            You: Use nomoji to check my recent commits
            <br />
            <br />
            nomoji: Scanning commit history...
            <br />
            Found 2 commits with emojis in messages
          </code>
        </div>
      </div>

      <details class="content-section accordion">
        <summary>
          <h2>Troubleshooting</h2>
        </summary>
        <div class="accordion-content">
          <h3>Skill Not Being Applied?</h3>
          <ol>
            <li>
              Check file location: <code>.claude/skills/nomoji/SKILL.md</code>
            </li>
            <li>
              Verify YAML frontmatter is present (name and description fields)
            </li>
            <li>Make sure description explains when to use the skill</li>
            <li>Try explicit invocation: "Use nomoji to check this"</li>
          </ol>

          <h3>Wrong Behavior?</h3>
          <ol>
            <li>Check the rules in SKILL.md match your expectations</li>
            <li>
              Update your configuration at <a href="/setup">nomoji.dev/setup</a>
            </li>
            <li>Re-download a fresh SKILL.md</li>
          </ol>
        </div>
      </details>

      <details class="content-section accordion">
        <summary>
          <h2>Team Setup</h2>
        </summary>
        <div class="accordion-content">
          <p>Share configuration with your team:</p>
          <ol>
            <li>Download skill to your project</li>
            <li>
              Commit to version control:
              <div class="code-with-copy">
                <code id="git">
                  git add .claude/skills/nomoji/SKILL.md && git commit -m "Add
                  nomoji Agent Skill"
                </code>
                <button type="button" onclick="copy('git')">
                  Copy
                </button>
              </div>
            </li>
            <li>Team members pull and Claude Code auto-discovers the skill</li>
          </ol>
        </div>
      </details>

      <div class="related-links">
        <h2>Related Resources</h2>
        <ul>
          <li>
            <a href="/integrations/agent-skills">Agent Skills Overview</a>
          </li>
          <li>
            <a href="/setup">Setup Wizard</a>
          </li>
          <li>
            <a href="/docs">API Documentation</a>
          </li>
          <li>
            <a href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview">
              Agent Skills Documentation
            </a>
          </li>
          <li>
            <a href="https://agentskills.io">agentskills.io — Open Standard</a>
          </li>
        </ul>
      </div>

      <script>{`
      function copy(id) {
        const el = document.getElementById(id);
        const text = el.textContent || el.innerText;
        navigator.clipboard.writeText(text).then(() => {
          const btn = el.nextElementSibling;
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = orig, 2000);
        });
      }
    `}</script>
    </main>
  </Layout>
);
