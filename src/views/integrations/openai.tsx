import { PageHeader } from "../components/page-header";
import { Layout } from "../layout";

export const OpenAIIntegrationPage = (theme?: string) => (
  <Layout title="OpenAI Codex & API Integration - nomoji.dev" theme={theme}>
    <main class="integration-page">
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/setup">Setup</a>
          </li>
          <li>OpenAI / Codex</li>
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
        title="OpenAI Integration Guide"
        subtitle="Configure emoji control for Codex CLI and OpenAI API"
      />

      <div class="integration-tabs">
        <div class="tabs">
          <button
            type="button"
            class="tab active"
            data-tab="codex"
            onclick="switchTab('codex')"
          >
            Codex CLI
          </button>
          <button
            type="button"
            class="tab"
            data-tab="api"
            onclick="switchTab('api')"
          >
            OpenAI API
          </button>
        </div>

        <div class="tab-content active" data-content="codex">
          <div class="quick-setup">
            <h2>OpenAI Codex CLI - Quick Setup</h2>
            <p class="setup-intro">
              OpenAI Codex is an AI coding agent included in ChatGPT Plus, Pro,
              Business, Edu, and Enterprise plans. Configure it to generate
              emoji-free code.
            </p>

            <div class="setup-box">
              <div class="command-step">
                <span class="step-label">1. Install Codex CLI</span>
                <div class="code-with-copy">
                  <code id="codex-install">npm i -g @openai/codex</code>
                  <button type="button" onclick="copy('codex-install')">
                    Copy
                  </button>
                </div>
              </div>

              <div class="command-step">
                <span class="step-label">2. Download nomoji rules</span>
                <div class="code-with-copy">
                  <code id="codex-download">
                    curl https://nomoji.dev/api/template/default/openai-codex -o
                    ~/nomoji-codex.md
                  </code>
                  <button type="button" onclick="copy('codex-download')">
                    Copy
                  </button>
                </div>
              </div>

              <div class="command-step">
                <span class="step-label">
                  3. Configure Codex system instructions
                </span>
                <div class="code-with-copy">
                  <code id="codex-config">
                    codex config --system-instructions ~/nomoji-codex.md
                  </code>
                  <button type="button" onclick="copy('codex-config')">
                    Copy
                  </button>
                </div>
                <p class="help-text">
                  Note: Check Codex documentation for the exact configuration
                  command as it may vary
                </p>
              </div>

              <div class="command-step">
                <span class="step-label">4. Verify it works</span>
                <p>Test with a simple prompt:</p>
                <div class="code-with-copy">
                  <code id="codex-test">
                    codex "Create a hello world Express server"
                  </code>
                  <button type="button" onclick="copy('codex-test')">
                    Copy
                  </button>
                </div>
                <p class="help-text">Output should be emoji-free</p>
              </div>
            </div>
          </div>

          <div class="content-section">
            <h2>Project-Specific Configuration</h2>
            <p>Add nomoji rules to your project:</p>
            <div class="code-with-copy">
              <code id="codex-project">{`# In your project root
mkdir -p .codex
curl https://nomoji.dev/api/template/default/openai-codex -o .codex/nomoji.md

# Configure per-project (if supported)
codex config --local --system-instructions .codex/nomoji.md

# Commit to version control
git add .codex/
git commit -m "Add Codex nomoji configuration"`}</code>
              <button type="button" onclick="copy('codex-project')">
                Copy
              </button>
            </div>
          </div>

          <div class="content-section">
            <h2>How It Works</h2>
            <p>Once configured, Codex will:</p>
            <ul class="feature-list">
              <li>Generate code without emojis in any context</li>
              <li>Use plain ASCII for console output and progress indicators</li>
              <li>Create professional documentation and README files</li>
              <li>Write clean commit messages and code comments</li>
              <li>Follow emoji-free guidelines across all file operations</li>
            </ul>
          </div>
        </div>

        <div class="tab-content" data-content="api">
          <div class="quick-setup">
            <h2>OpenAI API - Integration Guide</h2>
            <p class="setup-intro">
              Use nomoji rules as system instructions when calling the OpenAI
              API for code generation.
            </p>

            <div class="setup-box">
              <div class="command-step">
                <span class="step-label">1. Download system instructions</span>
                <div class="code-with-copy">
                  <code id="api-download">
                    curl https://nomoji.dev/api/template/default/openai -o
                    nomoji-system-prompt.md
                  </code>
                  <button type="button" onclick="copy('api-download')">
                    Copy
                  </button>
                </div>
              </div>

              <div class="command-step">
                <span class="step-label">2. Load and use in your code</span>
                <div class="code-with-copy">
                  <code id="api-usage">{`import OpenAI from 'openai';
import fs from 'fs';

const client = new OpenAI();
const systemPrompt = fs.readFileSync('nomoji-system-prompt.md', 'utf-8');

const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: 'Create a Node.js server' }
  ]
});`}</code>
                  <button type="button" onclick="copy('api-usage')">
                    Copy
                  </button>
                </div>
              </div>

              <div class="command-step">
                <span class="step-label">3. Or fetch dynamically</span>
                <div class="code-with-copy">
                  <code id="api-dynamic">{`const response = await fetch(
  'https://nomoji.dev/api/template/default/openai'
);
const systemPrompt = await response.text();

// Use in OpenAI API calls
const completion = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]
});`}</code>
                  <button type="button" onclick="copy('api-dynamic')">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="content-section">
            <h2>Recommended Models</h2>
            <p>
              For best emoji-free results, use reasoning models which better
              follow constraints:
            </p>
            <ul class="feature-list">
              <li>
                <code>o1</code> - Best at following strict no-emoji
                instructions
              </li>
              <li>
                <code>o3-mini</code> - Cost-effective with strong instruction
                following
              </li>
              <li>
                <code>o3-mini-high</code> - Enhanced reasoning for code
                generation
              </li>
              <li>
                <code>gpt-4</code> - Works well but may occasionally include
                emojis
              </li>
              <li>
                <code>gpt-4-turbo</code> - Fast with good instruction adherence
              </li>
            </ul>
            <p class="help-text">
              Note: GPT-4o was designed to use more emojis. For code generation,
              prefer the models listed above.
            </p>
          </div>

          <div class="content-section">
            <h2>API Best Practices</h2>
            <ul class="feature-list">
              <li>Always include the system prompt in your API calls</li>
              <li>
                Use temperature=0 for more deterministic, professional output
              </li>
              <li>Consider caching the system prompt to reduce token usage</li>
              <li>
                Monitor completions and provide feedback if emojis appear
              </li>
              <li>Use reasoning models for stricter constraint adherence</li>
            </ul>
          </div>
        </div>
      </div>

      <details class="content-section accordion">
        <summary>
          <h2>Troubleshooting</h2>
        </summary>
        <div class="accordion-content">
          <h3>Codex: Rules not being applied?</h3>
          <ol>
            <li>Verify Codex is installed: <code>codex --version</code></li>
            <li>Check your ChatGPT plan includes Codex access</li>
            <li>Re-apply configuration with updated rules</li>
            <li>Try setting rules per-project instead of globally</li>
          </ol>

          <h3>API: Emojis still appearing in responses?</h3>
          <ol>
            <li>Verify system prompt is included in messages array</li>
            <li>Try switching to o1 or o3-mini models</li>
            <li>Set temperature to 0 for more consistent output</li>
            <li>Check your system prompt is the first message in the array</li>
            <li>Refresh rules: <code>curl https://nomoji.dev/api/template/default/openai</code></li>
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
            <a href="https://openai.com/codex/">OpenAI Codex Documentation</a>
          </li>
          <li>
            <a href="https://platform.openai.com/docs">
              OpenAI API Documentation
            </a>
          </li>
          <li>
            <a href="https://community.openai.com/t/how-i-can-turn-off-emojis/1116532">
              OpenAI Community: Turning Off Emojis
            </a>
          </li>
        </ul>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
      // Cookie helper functions
      function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
      }

      function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      }

      function copy(id) {
        const el = document.getElementById(id);
        const text = el.textContent || el.innerText;
        navigator.clipboard.writeText(text).then(function() {
          const btn = el.nextElementSibling;
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(function() { btn.textContent = orig; }, 2000);
        });
      }
      
      function switchTab(tab) {
        // Update tabs
        document.querySelectorAll('.tab').forEach(function(t) {
          t.classList.remove('active');
        });
        document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(function(content) {
          content.classList.remove('active');
        });
        document.querySelector('[data-content="' + tab + '"]').classList.add('active');
        
        // Save to cookie (expires in 365 days)
        setCookie('nomoji-openai-tab', tab, 365);
      }
      
      // Initialize from cookie on page load
      window.addEventListener('DOMContentLoaded', function() {
        const savedTab = getCookie('nomoji-openai-tab');
        if (savedTab && (savedTab === 'codex' || savedTab === 'api')) {
          switchTab(savedTab);
        }
      });
    `,
        }}
      ></script>

      <style>{`
      .integration-tabs {
        margin: 2rem 0;
      }
      
      .tabs {
        display: flex;
        gap: 0.5rem;
        border-bottom: 2px solid var(--border);
        margin-bottom: 2rem;
      }
      
      .tab {
        padding: 0.75rem 1.5rem;
        border: none;
        background: none;
        color: var(--secondary);
        font-family: inherit;
        font-size: 1rem;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        transition: all 0.2s;
      }
      
      .tab.active {
        color: var(--primary);
        border-bottom-color: var(--primary);
      }
      
      .tab:hover {
        color: var(--primary);
      }
      
      .tab-content {
        display: none;
      }
      
      .tab-content.active {
        display: block;
      }
      
      .setup-intro {
        color: var(--secondary);
        margin-bottom: 2rem;
        font-size: 1.125rem;
        line-height: 1.6;
      }
      
      .help-text {
        color: var(--secondary);
        font-size: 0.875rem;
        margin-top: 0.5rem;
        line-height: 1.5;
      }
      
      .help-text code {
        font-size: 0.85em;
      }
      
      .alert {
        padding: 1.5rem;
        margin: 1.5rem 0;
        border: 2px solid var(--border);
        background: var(--card-bg);
        border-radius: 0;
      }
      
      .alert-warning {
        border-color: #ff9800;
        background: rgba(255, 152, 0, 0.1);
      }
      
      .alert strong {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }
      
      @media (prefers-color-scheme: dark) {
        html:not([data-theme="light"]) .alert-warning {
          border-color: #ff9800;
          background: rgba(255, 152, 0, 0.15);
        }
      }
      
      html[data-theme="dark"] .alert-warning {
        border-color: #ff9800;
        background: rgba(255, 152, 0, 0.15);
      }
    `}</style>
    </main>
  </Layout>
);

