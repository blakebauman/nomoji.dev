import { PageHeader } from "../components/page-header";
import { Layout } from "../layout";

export const GitHooksIntegrationPage = (theme?: string) => (
  <Layout title="Git Hooks Integration - nomoji.dev" theme={theme}>
    <main class="integration-page">
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/setup">Setup</a>
          </li>
          <li>Git Hooks</li>
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
        title="Git Hooks Integration Guide"
        subtitle="Automatically check commits and messages for emojis"
      />

      <div class="quick-setup">
        <h2>Quick Setup with Lefthook</h2>
        <p>
          Lefthook is a fast, cross-platform Git hooks manager. Recommended for
          team projects.
        </p>
        <div class="setup-box">
          <div class="command-step">
            <span class="step-label">1. Install Lefthook</span>
            <div class="code-with-copy">
              <code id="cmd1">npm install --save-dev lefthook</code>
              <button type="button" onclick="copy('cmd1')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">2. Download configuration</span>
            <div class="code-with-copy">
              <code id="cmd2">
                curl https://nomoji.dev/examples/lefthook.yml -o lefthook.yml
              </code>
              <button type="button" onclick="copy('cmd2')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">3. Add to package.json</span>
            <div class="code-with-copy">
              <code id="cmd3">{`{
  "scripts": {
    "prepare": "lefthook install"
  }
}`}</code>
              <button type="button" onclick="copy('cmd3')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">4. Install hooks</span>
            <div class="code-with-copy">
              <code id="cmd4">npm run prepare</code>
              <button type="button" onclick="copy('cmd4')">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>Manual Setup (Alternative)</h2>
        <p>For projects without Node.js or for simple setup:</p>
        <div class="code-with-copy">
          <code id="manual-setup">
            curl -s https://nomoji.dev/examples/scripts/setup-hooks.sh | bash
          </code>
          <button type="button" onclick="copy('manual-setup')">
            Copy
          </button>
        </div>
        <p class="help-text">
          This installs hooks directly to <code>.git/hooks/</code>
        </p>
      </div>

      <div class="content-section">
        <h2>What Gets Checked</h2>
        <div class="comparison-table">
          <div class="comparison-item">
            <h3>Pre-commit Hook</h3>
            <p>Runs before each commit:</p>
            <ul>
              <li>Validates staged files are emoji-free</li>
              <li>Checks code, documentation, and comments</li>
              <li>Runs linting and type checking</li>
            </ul>
          </div>
          <div class="comparison-item">
            <h3>Commit-msg Hook</h3>
            <p>Validates commit messages:</p>
            <ul>
              <li>Checks message for emojis</li>
              <li>Enforces conventional commit format</li>
              <li>Ensures professional standards</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>Usage</h2>
        <p>Hooks run automatically during normal Git workflow:</p>
        <div class="code-with-copy">
          <code id="usage">{`git add .
git commit -m "feat: add new feature"
# Lefthook automatically runs pre-commit hooks

git push
# Lefthook automatically runs pre-push hooks`}</code>
          <button type="button" onclick="copy('usage')">
            Copy
          </button>
        </div>
      </div>

      <div class="content-section">
        <h2>Bypassing Hooks</h2>
        <p>In exceptional circumstances, you can bypass hooks:</p>
        <div class="code-with-copy">
          <code id="bypass">{`# Skip pre-commit and commit-msg hooks
git commit --no-verify -m "emergency fix"

# Skip pre-push hooks
git push --no-verify`}</code>
          <button type="button" onclick="copy('bypass')">
            Copy
          </button>
        </div>
        <p class="warning-text">
          <svg
            class="warning-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Warning"
          >
            <path
              d="M8.865 1.52c-.18-.31-.51-.5-.865-.5s-.685.19-.865.5L.435 13.37c-.18.31-.18.69 0 1 .18.31.51.5.865.5h13.4c.355 0 .685-.19.865-.5.18-.31.18-.69 0-1L8.865 1.52zM8.5 11.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.75-5.25a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75z"
              fill="currentColor"
            />
          </svg>
          Not recommended - only for emergencies
        </p>
      </div>

      <div class="content-section">
        <h2>Comparison: Lefthook vs Manual Hooks</h2>
        <div class="comparison-table">
          <div class="comparison-item">
            <h3>Lefthook (Recommended)</h3>
            <p>
              <strong>Pros:</strong>
            </p>
            <ul>
              <li>Version controlled via lefthook.yml</li>
              <li>Automatic installation via npm</li>
              <li>Cross-platform compatibility</li>
              <li>Parallel execution</li>
              <li>Easy to share and update</li>
              <li>Team-friendly</li>
            </ul>
            <p>
              <strong>Cons:</strong>
            </p>
            <ul>
              <li>Requires npm package</li>
              <li>Small learning curve</li>
            </ul>
          </div>
          <div class="comparison-item">
            <h3>Manual Hooks</h3>
            <p>
              <strong>Pros:</strong>
            </p>
            <ul>
              <li>No additional dependencies</li>
              <li>Direct control</li>
              <li>Simple for single developer</li>
            </ul>
            <p>
              <strong>Cons:</strong>
            </p>
            <ul>
              <li>Not version controlled</li>
              <li>Must be installed manually by each developer</li>
              <li>Hard to update and share</li>
              <li>Platform-specific scripts</li>
            </ul>
          </div>
        </div>
      </div>

      <details class="content-section accordion">
        <summary>
          <h2>Troubleshooting</h2>
        </summary>
        <div class="accordion-content">
          <h3>Hooks Not Running?</h3>
          <ol>
            <li>
              Verify installation:
              <div class="code-with-copy">
                <code id="verify">
                  npx lefthook version && ls -la .git/hooks/
                </code>
                <button type="button" onclick="copy('verify')">
                  Copy
                </button>
              </div>
            </li>
            <li>
              Reinstall hooks:
              <div class="code-with-copy">
                <code id="reinstall">npx lefthook install</code>
                <button type="button" onclick="copy('reinstall')">
                  Copy
                </button>
              </div>
            </li>
          </ol>

          <h3>API Request Failures?</h3>
          <p>If emoji check fails due to network issues:</p>
          <div class="code-with-copy">
            <code id="api-test">curl https://nomoji.dev/api/health</code>
            <button type="button" onclick="copy('api-test')">
              Copy
            </button>
          </div>

          <h3>Performance Issues?</h3>
          <p>Skip expensive checks in development:</p>
          <div class="code-with-copy">
            <code id="skip">LEFTHOOK_EXCLUDE=type-check git commit</code>
            <button type="button" onclick="copy('skip')">
              Copy
            </button>
          </div>
        </div>
      </details>

      <details class="content-section accordion">
        <summary>
          <h2>Team Setup</h2>
        </summary>
        <div class="accordion-content">
          <p>To ensure all team members use the same hooks:</p>
          <ol>
            <li>
              Commit <code>lefthook.yml</code> to version control
            </li>
            <li>
              Add <code>prepare</code> script to <code>package.json</code>
            </li>
            <li>
              Document in README:
              <div class="code-with-copy">
                <code id="team-readme">{`## Development Setup

After cloning the repository:

\`\`\`bash
npm install  # Automatically installs git hooks
\`\`\``}</code>
                <button type="button" onclick="copy('team-readme')">
                  Copy
                </button>
              </div>
            </li>
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
            <a href="https://lefthook.dev/">Lefthook Documentation</a>
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
