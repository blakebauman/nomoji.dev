import { PageHeader } from "../components/page-header";
import { Layout } from "../layout";

export const CursorIntegrationPage = (theme?: string) => (
  <Layout title="Cursor Integration - nomoji.dev" theme={theme}>
    <main class="integration-page">
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/setup">Setup</a>
          </li>
          <li>Cursor</li>
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
        title="Cursor Integration Guide"
        subtitle="IDE-integrated emoji control with zero configuration"
      />

      <div class="quick-setup">
        <h2>Quick Setup</h2>
        <div class="setup-box">
          <div class="command-step">
            <span class="step-label">1. Create directory</span>
            <div class="code-with-copy">
              <code id="cmd1">mkdir -p .cursor/rules</code>
              <button type="button" onclick="copy('cmd1')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">2. Download rules</span>
            <div class="code-with-copy">
              <code id="cmd2">
                curl https://nomoji.dev/api/cursor-rules/default -o
                .cursor/rules/nomoji.mdc
              </code>
              <button type="button" onclick="copy('cmd2')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">3. Done!</span>
            <p>Cursor will automatically apply the rules</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>What You Get</h2>
        <ul class="feature-list">
          <li>Zero-config - works immediately after download</li>
          <li>Applies to all AI interactions in Cursor</li>
          <li>Supports project-level and global rules</li>
          <li>Version controllable</li>
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
                curl https://nomoji.dev/api/cursor-rules/strict-user -o
                .cursor/rules/nomoji.mdc
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
                curl https://nomoji.dev/api/cursor-rules/moderate-user -o
                .cursor/rules/nomoji.mdc
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
                curl https://nomoji.dev/api/cursor-rules/relaxed-user -o
                .cursor/rules/nomoji.mdc
              </code>
              <button type="button" onclick="copy('relaxed')">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>Project vs Global Rules</h2>
        <div class="comparison-table">
          <div class="comparison-item">
            <h3>Project-Level (Recommended)</h3>
            <p>Place rules in your project directory:</p>
            <code class="inline-code">.cursor/rules/nomoji.mdc</code>
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
            <h3>Global Rules</h3>
            <p>Configure in Cursor Settings:</p>
            <ol>
              <li>Open Cursor Settings</li>
              <li>Go to "Rules" section</li>
              <li>Add nomoji.dev rules</li>
            </ol>
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

      <details class="content-section accordion">
        <summary>
          <h2>Troubleshooting</h2>
        </summary>
        <div class="accordion-content">
          <h3>Rules Not Working?</h3>
          <ol>
            <li>
              Verify <code>.cursor/rules/nomoji.mdc</code> exists in project
              root
            </li>
            <li>Check file content is properly formatted</li>
            <li>Restart Cursor to reload rules</li>
            <li>Clear Cursor cache: Cmd/Ctrl + Shift + P → "Clear Cache"</li>
          </ol>

          <h3>Emojis Still Appearing?</h3>
          <ol>
            <li>Check severity levels in your configuration</li>
            <li>Verify all desired contexts are enabled</li>
            <li>Try the strict preset</li>
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
            <li>Download rules to your project</li>
            <li>
              Commit to version control:
              <div class="code-with-copy">
                <code id="git">
                  git add .cursor/rules/nomoji.mdc && git commit -m "Add Cursor
                  nomoji rules"
                </code>
                <button type="button" onclick="copy('git')">
                  Copy
                </button>
              </div>
            </li>
            <li>Team members pull and Cursor auto-applies</li>
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
            <a href="https://github.com/nomoji-dev/nomoji.dev/blob/main/docs/CURSOR_INTEGRATION.md">
              Full Documentation (Markdown)
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
