import { PageHeader } from "../components/page-header";
import { Layout } from "../layout";

export const CopilotIntegrationPage = (theme?: string) => (
  <Layout title="GitHub Copilot Integration - nomoji.dev" theme={theme}>
    <main class="integration-page">
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/setup">Setup</a>
          </li>
          <li>GitHub Copilot</li>
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
        title="GitHub Copilot Integration Guide"
        subtitle="Configure emoji-free suggestions in VS Code and JetBrains IDEs"
      />

      <div class="quick-setup">
        <h2>Quick Setup for VS Code</h2>
        <div class="setup-box">
          <div class="command-step">
            <span class="step-label">1. Create VS Code settings directory</span>
            <div class="code-with-copy">
              <code id="cmd1">mkdir -p .vscode</code>
              <button type="button" onclick="copy('cmd1')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">2. Add to settings.json</span>
            <p>
              Add this to your <code>.vscode/settings.json</code>:
            </p>
            <div class="code-with-copy">
              <code id="cmd2">{`{
  "github.copilot.advanced": {
    "customInstructions": "Do not use emojis in code, documentation, console output, CLI tools, logging, or commit messages."
  }
}`}</code>
              <button type="button" onclick="copy('cmd2')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">3. Restart VS Code</span>
            <p>Reload Copilot: Cmd/Ctrl + Shift + P → "Copilot: Reload"</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>Copilot Chat Instructions</h2>
        <p>
          For Copilot Chat, create a{" "}
          <code>.github/copilot-instructions.md</code> file:
        </p>
        <div class="code-with-copy">
          <code id="chat-instructions">{`# Copilot Instructions

## Emoji Usage Rules

Do not use emojis in any generated content including:
- Documentation and markdown files
- Console output (console.log, console.error, etc.)
- CLI tool output
- Application logs and error messages
- Code comments
- Git commit messages

Use clear, professional language without emoji decoration.

Source: nomoji.dev`}</code>
          <button type="button" onclick="copy('chat-instructions')">
            Copy
          </button>
        </div>
      </div>

      <div class="content-section">
        <h2>Project vs Global Settings</h2>
        <div class="comparison-table">
          <div class="comparison-item">
            <h3>Workspace Settings (Recommended)</h3>
            <p>
              Create <code>.vscode/settings.json</code> in your project
            </p>
            <p>
              <strong>Benefits:</strong>
            </p>
            <ul>
              <li>Team-wide consistency</li>
              <li>Version controlled</li>
              <li>Project-specific rules</li>
            </ul>
          </div>
          <div class="comparison-item">
            <h3>Global Settings</h3>
            <p>Open VS Code Settings (Cmd/Ctrl + ,)</p>
            <p>Search for "Copilot Instructions" and add rules</p>
            <p>
              <strong>Benefits:</strong>
            </p>
            <ul>
              <li>Apply to all projects</li>
              <li>Personal defaults</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>JetBrains IDEs Setup</h2>
        <p>For IntelliJ, PyCharm, WebStorm, etc.:</p>
        <ol>
          <li>Go to Settings → Tools → GitHub Copilot</li>
          <li>Add custom instructions</li>
          <li>Paste nomoji.dev rules</li>
          <li>Apply changes</li>
        </ol>
      </div>

      <div class="content-section">
        <h2>Presets</h2>
        <p>Get rules directly from nomoji.dev API:</p>
        <div class="preset-grid">
          <div class="preset-option">
            <h3>Strict Mode</h3>
            <p>No emojis anywhere</p>
            <div class="code-with-copy">
              <code id="strict">
                curl https://nomoji.dev/api/template/strict-user/copilot
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
                curl https://nomoji.dev/api/template/moderate-user/copilot
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
                curl https://nomoji.dev/api/template/relaxed-user/copilot
              </code>
              <button type="button" onclick="copy('relaxed')">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <details class="content-section accordion">
        <summary>
          <h2>Troubleshooting</h2>
        </summary>
        <div class="accordion-content">
          <h3>Rules Not Applied?</h3>
          <ol>
            <li>Restart VS Code</li>
            <li>Reload Copilot: Cmd/Ctrl + Shift + P → "Copilot: Reload"</li>
            <li>Check Copilot status in bottom bar</li>
            <li>Verify custom instructions are saved</li>
          </ol>

          <h3>Partial Working?</h3>
          <p>If rules work inconsistently:</p>
          <ol>
            <li>Make instructions more explicit</li>
            <li>Increase severity to "strict" for all contexts</li>
            <li>Add specific examples of what to avoid</li>
            <li>Update to latest Copilot version</li>
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
            <li>
              Create <code>.vscode/settings.json</code> with Copilot
              instructions
            </li>
            <li>
              Commit to version control:
              <div class="code-with-copy">
                <code id="git">
                  git add .vscode/settings.json && git commit -m "Add Copilot
                  nomoji rules"
                </code>
                <button type="button" onclick="copy('git')">
                  Copy
                </button>
              </div>
            </li>
            <li>Team members pull and restart VS Code</li>
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
            <a href="https://docs.github.com/copilot">
              GitHub Copilot Documentation
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
