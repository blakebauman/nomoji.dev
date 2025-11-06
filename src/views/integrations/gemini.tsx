import { PageHeader } from "../components/page-header";
import { Layout } from "../layout";

export const GeminiIntegrationPage = (theme?: string) => (
  <Layout title="Google Gemini CLI Integration - nomoji.dev" theme={theme}>
    <main class="integration-page">
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/setup">Setup</a>
          </li>
          <li>Gemini CLI</li>
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
        title="Google Gemini CLI Integration Guide"
        subtitle="Terminal-native emoji control with system instructions"
      />

      <div class="quick-setup">
        <h2>Quick Setup</h2>
        <div class="setup-box">
          <div class="command-step">
            <span class="step-label">1. Create Gemini config directory</span>
            <div class="code-with-copy">
              <code id="cmd1">mkdir -p ~/.gemini</code>
              <button type="button" onclick="copy('cmd1')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">2. Download nomoji rules</span>
            <div class="code-with-copy">
              <code id="cmd2">
                curl https://nomoji.dev/api/template/default/generic -o
                ~/.gemini/nomoji-rules.md
              </code>
              <button type="button" onclick="copy('cmd2')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">3. Create config file</span>
            <div class="code-with-copy">
              <code id="cmd3">{`cat > ~/.gemini/config.json << 'EOF'
{
  "systemInstructions": {
    "include": ["~/.gemini/nomoji-rules.md"]
  }
}
EOF`}</code>
              <button type="button" onclick="copy('cmd3')">
                Copy
              </button>
            </div>
          </div>
          <div class="command-step">
            <span class="step-label">4. Done!</span>
            <p>
              Gemini will now follow emoji-free guidelines in all interactions
            </p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>How It Works</h2>
        <p>When configured, Gemini CLI will:</p>
        <ul class="feature-list">
          <li>Follow emoji-free guidelines in all code generation</li>
          <li>Avoid emojis in console output, documentation, and comments</li>
          <li>Use professional language in all generated content</li>
          <li>Respect context-specific rules (logging, CLI output, commits)</li>
        </ul>
      </div>

      <div class="content-section">
        <h2>Project-Specific Configuration</h2>
        <p>Configure nomoji rules per project:</p>
        <div class="code-with-copy">
          <code id="project-config">{`# In your project directory
mkdir -p .gemini
curl https://nomoji.dev/api/template/default/generic -o .gemini/nomoji-rules.md

# Create project config
cat > .gemini/config.json << 'EOF'
{
  "systemInstructions": {
    "include": [".gemini/nomoji-rules.md"]
  }
}
EOF

# Commit to version control
git add .gemini/
git commit -m "Add Gemini nomoji configuration"`}</code>
          <button type="button" onclick="copy('project-config')">
            Copy
          </button>
        </div>
      </div>

      <div class="content-section">
        <h2>Presets</h2>
        <div class="preset-grid">
          <div class="preset-option">
            <h3>Strict Mode</h3>
            <p>No emojis anywhere</p>
            <div class="code-with-copy">
              <code id="strict">
                curl https://nomoji.dev/api/template/strict-user/generic -o
                ~/.gemini/nomoji-strict.md
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
                curl https://nomoji.dev/api/template/moderate-user/generic -o
                ~/.gemini/nomoji-moderate.md
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
                curl https://nomoji.dev/api/template/relaxed-user/generic -o
                ~/.gemini/nomoji-relaxed.md
              </code>
              <button type="button" onclick="copy('relaxed')">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>Usage Examples</h2>
        <div class="usage-examples">
          <h3>Generate Code</h3>
          <div class="code-with-copy">
            <code id="example1">
              gemini "Create a Node.js Express server with error handling"
            </code>
            <button type="button" onclick="copy('example1')">
              Copy
            </button>
          </div>
          <p class="example-note">
            Output will be professional with no emoji decoration
          </p>
        </div>
        <div class="usage-examples">
          <h3>Generate Documentation</h3>
          <div class="code-with-copy">
            <code id="example2">gemini "Create a README for my CLI tool"</code>
            <button type="button" onclick="copy('example2')">
              Copy
            </button>
          </div>
          <p class="example-note">Clean markdown without emojis</p>
        </div>
        <div class="usage-examples">
          <h3>Code Review</h3>
          <div class="code-with-copy">
            <code id="example3">
              gemini "Review this file for best practices" --file server.js
            </code>
            <button type="button" onclick="copy('example3')">
              Copy
            </button>
          </div>
          <p class="example-note">
            Professional feedback without emoji decoration
          </p>
        </div>
      </div>

      <details class="content-section accordion">
        <summary>
          <h2>Troubleshooting</h2>
        </summary>
        <div class="accordion-content">
          <h3>Rules Not Applied?</h3>
          <ol>
            <li>
              Check config file exists:
              <code class="inline-code">ls -la ~/.gemini/config.json</code>
            </li>
            <li>
              Verify rules file is readable:
              <code class="inline-code">cat ~/.gemini/nomoji-rules.md</code>
            </li>
            <li>
              Test with explicit system prompt:
              <code class="inline-code">
                gemini --system-prompt "$(cat ~/.gemini/nomoji-rules.md)" "test
                prompt"
              </code>
            </li>
          </ol>

          <h3>Emojis Still Appearing?</h3>
          <p>Download strict preset:</p>
          <div class="code-with-copy">
            <code id="troubleshoot">
              curl https://nomoji.dev/api/template/strict-user/generic -o
              ~/.gemini/nomoji-rules.md
            </code>
            <button type="button" onclick="copy('troubleshoot')">
              Copy
            </button>
          </div>
        </div>
      </details>

      <details class="content-section accordion">
        <summary>
          <h2>Shell Aliases</h2>
        </summary>
        <div class="accordion-content">
          <p>
            Add convenience commands to your <code>.bashrc</code> or{" "}
            <code>.zshrc</code>:
          </p>
          <div class="code-with-copy">
            <code id="aliases">{`# Update nomoji rules for Gemini
alias gemini-nomoji-update='curl -s https://nomoji.dev/api/template/default/generic -o ~/.gemini/nomoji-rules.md && echo "✓ Nomoji rules updated"'

# Gemini with strict emoji enforcement
alias gemini-strict='gemini --system-prompt "$(cat ~/.gemini/nomoji-strict.md)"'`}</code>
            <button type="button" onclick="copy('aliases')">
              Copy
            </button>
          </div>
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
            <a href="https://github.com/google/generative-ai-cli">
              Gemini CLI Documentation
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
