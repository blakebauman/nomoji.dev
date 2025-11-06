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
        subtitle="Proactive emoji detection with AI subagents"
      />

      <div class="quick-setup">
        <h2>Quick Setup</h2>
        <div class="setup-box">
          <div class="command-step">
            <span class="step-label">1. Create agents directory</span>
            <div class="code-with-copy">
              <code id="cmd1">mkdir -p .claude/agents</code>
              <button type="button" onclick="copy('cmd1')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">2. Download subagent</span>
            <div class="code-with-copy">
              <code id="cmd2">
                curl https://nomoji.dev/api/claude/default -o
                .claude/agents/nomoji.mdc
              </code>
              <button type="button" onclick="copy('cmd2')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">3. Done!</span>
            <p>Claude Code will automatically detect and use the subagent</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>How It Works</h2>
        <p>
          The nomoji subagent is proactive and will be automatically invoked
          after:
        </p>
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
                curl https://nomoji.dev/api/claude/strict-user -o
                .claude/agents/nomoji.mdc
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
                curl https://nomoji.dev/api/claude/moderate-user -o
                .claude/agents/nomoji.mdc
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
                curl https://nomoji.dev/api/claude/relaxed-user -o
                .claude/agents/nomoji.mdc
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
            <p>Place subagent in your project directory:</p>
            <code class="inline-code">.claude/agents/nomoji.mdc</code>
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
            <p>Place subagent in your home directory:</p>
            <code class="inline-code">~/.claude/agents/nomoji.mdc</code>
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
          <h3>Automatic Invocation</h3>
          <p>Claude Code will automatically use nomoji when appropriate:</p>
          <code class="code-example">
            You: Update the README with installation instructions
            <br />
            <br />
            Claude: [Generates README]
            <br />
            <br />
            [nomoji subagent automatically runs]
            <br />
            <br />
            nomoji: I found emojis in the generated README. Would you like me to
            fix them?
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
          <h3>Subagent Not Being Invoked?</h3>
          <ol>
            <li>
              Check file location: <code>.claude/agents/nomoji.mdc</code>
            </li>
            <li>Verify file format (YAML frontmatter + markdown body)</li>
            <li>Make sure description is clear about when to invoke</li>
            <li>Try explicit invocation first: "Use nomoji subagent"</li>
          </ol>

          <h3>Wrong Behavior?</h3>
          <ol>
            <li>Check the system prompt in nomoji.mdc</li>
            <li>Verify tools list includes Read, Grep, Glob, Bash</li>
            <li>Update the configuration at nomoji.dev</li>
            <li>Download fresh version</li>
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
            <li>Download subagent to your project</li>
            <li>
              Commit to version control:
              <div class="code-with-copy">
                <code id="git">
                  git add .claude/agents/nomoji.mdc && git commit -m "Add Claude
                  Code nomoji subagent"
                </code>
                <button type="button" onclick="copy('git')">
                  Copy
                </button>
              </div>
            </li>
            <li>Team members pull and Claude Code auto-detects</li>
          </ol>
        </div>
      </details>

      <div class="related-links">
        <h2>Related Resources</h2>
        <ul>
          <li>
            <a href="/setup">Back to Setup Wizard</a>
          </li>
          <li>
            <a href="/docs">API Documentation</a>
          </li>
          <li>
            <a href="https://docs.claude.com/en/docs/claude-code/sub-agents">
              Claude Code Subagents Documentation
            </a>
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
