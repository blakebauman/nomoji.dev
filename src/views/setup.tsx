import { generateBreadcrumbList } from "../utils/structured-data";
import { PageHeader } from "./components/page-header";
import { Layout } from "./layout";

export const SetupPage = (theme?: string) => {
  const breadcrumbData = generateBreadcrumbList([
    { name: "Home", url: "https://nomoji.dev" },
    { name: "Setup", url: "https://nomoji.dev/setup" },
  ]);

  return (
    <Layout
      title="Setup Guide - Stop AI from Adding Emojis | nomoji.dev"
      description="Step-by-step setup guide for controlling emoji usage in Cursor, Claude Code, GitHub Copilot, and Google Gemini CLI. Get started in 5 minutes."
      canonical="https://nomoji.dev/setup"
      structuredData={breadcrumbData}
      theme={theme}
    >
      <div class="setup-container">
        <nav class="breadcrumb-container" aria-label="Breadcrumb">
          <ol class="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Setup</li>
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
          title="Setup Your AI Assistant"
          subtitle="Choose your assistant and follow the step-by-step guide"
          className="setup-header"
        />

        <div class="preset-selector">
          <h2>First, choose your strictness level:</h2>
          <div class="preset-cards">
            <div class="preset-card" data-preset="strict">
              <div class="preset-badge">Recommended</div>
              <h3>Strict</h3>
              <p>No emojis anywhere</p>
              <ul>
                <li>Documentation</li>
                <li>Console output</li>
                <li>CLI tools</li>
                <li>Logging</li>
                <li>Comments</li>
                <li>Commit messages</li>
              </ul>
              <button
                type="button"
                class="btn btn-primary"
                onclick="selectPreset('strict')"
              >
                Use Strict Mode
              </button>
            </div>

            <div class="preset-card" data-preset="moderate">
              <h3>Moderate</h3>
              <p>Balanced approach</p>
              <ul>
                <li>Documentation ✓</li>
                <li>Console output ✓</li>
                <li>CLI tools ✓</li>
                <li>Logging ✓</li>
                <li>Comments (relaxed)</li>
                <li>UI (allowed)</li>
              </ul>
              <button
                type="button"
                class="btn"
                onclick="selectPreset('moderate')"
              >
                Use Moderate Mode
              </button>
            </div>

            <div class="preset-card" data-preset="relaxed">
              <h3>Relaxed</h3>
              <p>Minimal restrictions</p>
              <ul>
                <li>Documentation ✓</li>
                <li>Console output ✓</li>
                <li>CLI tools ✓</li>
                <li>Logging ✓</li>
                <li>Comments (allowed)</li>
                <li>UI (allowed)</li>
              </ul>
              <button
                type="button"
                class="btn"
                onclick="selectPreset('relaxed')"
              >
                Use Relaxed Mode
              </button>
            </div>
          </div>
        </div>

        <div class="assistant-tabs">
          <div class="tabs">
            <button
              type="button"
              class="tab active"
              data-tab="cursor"
              onclick="switchTab('cursor')"
            >
              Cursor
            </button>
            <button
              type="button"
              class="tab"
              data-tab="claude-code"
              onclick="switchTab('claude-code')"
            >
              Claude Code
            </button>
            <button
              type="button"
              class="tab"
              data-tab="copilot"
              onclick="switchTab('copilot')"
            >
              GitHub Copilot
            </button>
            <button
              type="button"
              class="tab"
              data-tab="gemini"
              onclick="switchTab('gemini')"
            >
              Gemini CLI
            </button>
            <button
              type="button"
              class="tab"
              data-tab="openai"
              onclick="switchTab('openai')"
            >
              OpenAI Codex
            </button>
          </div>

          <div class="tab-content active" data-content="cursor">
            <h2>Setup Cursor</h2>
            <p class="setup-intro">
              Cursor will automatically apply rules to all AI interactions.
              Perfect for IDE-integrated emoji control.
            </p>

            <div class="setup-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Create the rules directory</h3>
                  <div class="code-block-with-copy">
                    <code id="cursor-step1">mkdir -p .cursor/rules</code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('cursor-step1')"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Download the rules file</h3>
                  <div class="code-block-with-copy">
                    <code id="cursor-step2">
                      curl https://nomoji.dev/api/cursor-rules/
                      <span class="preset-var">default</span> -o
                      .cursor/rules/nomoji.mdc
                    </code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('cursor-step2')"
                    >
                      Copy
                    </button>
                  </div>
                  <p class="help-text">
                    Or{" "}
                    <a
                      href="/api/cursor-rules/default"
                      download
                      class="download-link"
                      data-base-url="/api/cursor-rules"
                    >
                      download directly
                    </a>
                  </p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Restart Cursor</h3>
                  <p>
                    Cursor will automatically detect and apply the rules. Open
                    Cursor in your project and test it out!
                  </p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Verify it's working</h3>
                  <p>
                    Ask Cursor to "Create a README with installation
                    instructions"
                  </p>
                  <p>✓ The output should not contain any emojis</p>
                </div>
              </div>
            </div>

            <div class="next-actions">
              <a href="/integrations/cursor" class="btn-link">
                View detailed Cursor guide →
              </a>
            </div>
          </div>

          <div class="tab-content" data-content="claude-code">
            <h2>Setup Claude Code</h2>
            <p class="setup-intro">
              Claude Code will proactively check for emojis using a specialized
              subagent. Best for automatic detection and fixes.
            </p>

            <div class="setup-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Create the agents directory</h3>
                  <div class="code-block-with-copy">
                    <code id="claude-step1">mkdir -p .claude/agents</code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('claude-step1')"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Download the subagent</h3>
                  <div class="code-block-with-copy">
                    <code id="claude-step2">
                      curl https://nomoji.dev/api/claude/
                      <span class="preset-var">default</span> -o
                      .claude/agents/nomoji.mdc
                    </code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('claude-step2')"
                    >
                      Copy
                    </button>
                  </div>
                  <p class="help-text">
                    Or{" "}
                    <a
                      href="/api/claude/default"
                      download
                      class="download-link"
                      data-base-url="/api/claude"
                    >
                      download directly
                    </a>
                  </p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Claude Code will auto-detect it</h3>
                  <p>
                    The nomoji subagent will automatically run after code
                    generation to check for emojis.
                  </p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Test it out</h3>
                  <p>Create a test file:</p>
                  <div class="code-block-with-copy">
                    <code id="claude-test">{`echo "console.log('🚀 Test');" > test.js`}</code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('claude-test')"
                    >
                      Copy
                    </button>
                  </div>
                  <p>
                    Ask Claude to review it - nomoji should automatically flag
                    the emoji
                  </p>
                </div>
              </div>
            </div>

            <div class="next-actions">
              <a href="/integrations/claude-code" class="btn-link">
                View detailed Claude Code guide →
              </a>
            </div>
          </div>

          <div class="tab-content" data-content="copilot">
            <h2>Setup GitHub Copilot</h2>
            <p class="setup-intro">
              Configure Copilot to avoid emoji suggestions in VS Code and
              JetBrains IDEs.
            </p>

            <div class="setup-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Create VS Code settings directory</h3>
                  <div class="code-block-with-copy">
                    <code id="copilot-step1">mkdir -p .vscode</code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('copilot-step1')"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Add custom instructions to settings.json</h3>
                  <p>
                    Add this to your <code>.vscode/settings.json</code>:
                  </p>
                  <div class="code-block-with-copy">
                    <pre id="copilot-step2">{`{
  "github.copilot.advanced": {
    "customInstructions": "Do not use emojis in code, documentation, console output, CLI tools, logging, or commit messages."
  }
}`}</pre>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('copilot-step2')"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Restart VS Code</h3>
                  <p>
                    Reload Copilot: Cmd/Ctrl + Shift + P → "Copilot: Reload"
                  </p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Verify it's working</h3>
                  <p>Start typing a console.log statement</p>
                  <p>✓ Copilot suggestions should not contain emojis</p>
                </div>
              </div>
            </div>

            <div class="next-actions">
              <a href="/integrations/copilot" class="btn-link">
                View detailed Copilot guide →
              </a>
            </div>
          </div>

          <div class="tab-content" data-content="gemini">
            <h2>Setup Google Gemini CLI</h2>
            <p class="setup-intro">
              Configure Gemini CLI to follow emoji-free guidelines in
              terminal-based workflows.
            </p>

            <div class="setup-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Create Gemini config directory</h3>
                  <div class="code-block-with-copy">
                    <code id="gemini-step1">mkdir -p ~/.gemini</code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('gemini-step1')"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Download nomoji rules</h3>
                  <div class="code-block-with-copy">
                    <code id="gemini-step2">
                      curl https://nomoji.dev/api/template/
                      <span class="preset-var">default</span>/generic -o
                      ~/.gemini/nomoji-rules.md
                    </code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('gemini-step2')"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Create config file</h3>
                  <div class="code-block-with-copy">
                    <pre id="gemini-step3">{`cat > ~/.gemini/config.json << 'EOF'
{
  "systemInstructions": {
    "include": ["~/.gemini/nomoji-rules.md"]
  }
}
EOF`}</pre>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('gemini-step3')"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Test it out</h3>
                  <p>
                    Run Gemini normally - it will follow emoji-free guidelines
                  </p>
                  <div class="code-block-with-copy">
                    <code id="gemini-test">
                      gemini "Create a hello world server"
                    </code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('gemini-test')"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="next-actions">
              <a href="/integrations/gemini" class="btn-link">
                View detailed Gemini CLI guide →
              </a>
            </div>
          </div>

          <div class="tab-content" data-content="openai">
            <h2>Setup OpenAI Codex</h2>
            <p class="setup-intro">
              OpenAI Codex is an AI coding agent included in ChatGPT Plus, Pro,
              Business, Edu, and Enterprise plans. Configure it for emoji-free
              code generation.
            </p>

            <div class="setup-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Install Codex CLI</h3>
                  <div class="code-block-with-copy">
                    <code id="openai-step1">npm i -g @openai/codex</code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('openai-step1')"
                    >
                      Copy
                    </button>
                  </div>
                  <p class="help-text">
                    Requires a ChatGPT Plus, Pro, Business, Edu, or Enterprise
                    plan
                  </p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Download nomoji configuration</h3>
                  <div class="code-block-with-copy">
                    <code id="openai-step2">
                      curl https://nomoji.dev/api/template/
                      <span class="preset-var">default</span>/openai-codex -o
                      ~/nomoji-codex.md
                    </code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('openai-step2')"
                    >
                      Copy
                    </button>
                  </div>
                  <p class="help-text">
                    Or{" "}
                    <a
                      href="/api/template/default/openai-codex"
                      download
                      class="download-link"
                      data-base-url="/api/template"
                      data-assistant="openai-codex"
                    >
                      download directly
                    </a>
                  </p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Configure system instructions</h3>
                  <div class="code-block-with-copy">
                    <code id="openai-step3">
                      codex config --system-instructions ~/nomoji-codex.md
                    </code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('openai-step3')"
                    >
                      Copy
                    </button>
                  </div>
                  <p class="help-text">
                    Check Codex docs for exact config command syntax
                  </p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Test it out</h3>
                  <p>Run a test prompt:</p>
                  <div class="code-block-with-copy">
                    <code id="openai-test">{`codex "Create a hello world Express server"`}</code>
                    <button
                      type="button"
                      class="copy-btn"
                      onclick="copyCode('openai-test')"
                    >
                      Copy
                    </button>
                  </div>
                  <p>✓ The output should not contain any emojis</p>
                </div>
              </div>
            </div>

            <div class="next-actions">
              <a href="/integrations/openai" class="btn-link">
                View detailed OpenAI/Codex guide →
              </a>
            </div>
          </div>
        </div>

        <div class="additional-tools">
          <h2>Additional Tools</h2>
          <div class="tool-grid">
            <div class="tool-card">
              <h3>Git Hooks</h3>
              <p>Automatically check commits for emojis</p>
              <a href="/integrations/git-hooks" class="btn-link">
                Learn more →
              </a>
            </div>
            <div class="tool-card">
              <h3>API Access</h3>
              <p>Integrate into your own tools</p>
              <a href="/docs" class="btn-link">
                View API docs →
              </a>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
      let selectedPreset = 'default';

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

      function selectPreset(preset) {
        selectedPreset = preset;
        
        // Save to cookie (expires in 365 days)
        setCookie('nomoji-preset', preset, 365);
        
        // Update UI
        document.querySelectorAll('.preset-card').forEach(card => {
          card.classList.remove('active');
        });
        document.querySelector('[data-preset="' + preset + '"]').classList.add('active');
        
        // Update all preset variables in code blocks
        const presetValue = preset + '-user';
        document.querySelectorAll('.preset-var').forEach(el => {
          el.textContent = presetValue;
        });
        
        // Update all download links
        document.querySelectorAll('.download-link').forEach(link => {
          const baseUrl = link.getAttribute('data-base-url');
          if (baseUrl) {
            link.href = baseUrl + '/' + presetValue;
          }
        });
      }

      // Load saved preset on page load
      window.addEventListener('DOMContentLoaded', function() {
        const savedPreset = getCookie('nomoji-preset');
        if (savedPreset && (savedPreset === 'strict' || savedPreset === 'moderate' || savedPreset === 'relaxed')) {
          selectPreset(savedPreset);
        }
      });

      function switchTab(tab) {
        // Update tabs
        document.querySelectorAll('.tab').forEach(t => {
          t.classList.remove('active');
        });
        document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        document.querySelector('[data-content="' + tab + '"]').classList.add('active');
        
        // Save to cookie
        window.setCookie('nomoji-selectedAssistant', tab, 365);
      }
      
      // Initialize from cookie on page load
      window.addEventListener('DOMContentLoaded', function() {
        const savedAssistant = window.getCookie('nomoji-selectedAssistant');
        if (savedAssistant) {
          switchTab(savedAssistant);
        }
      });

      function copyCode(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const text = (element.textContent || element.innerText).trim();
        const btn = element.nextElementSibling;
        
        navigator.clipboard.writeText(text).then(function() {
          if (btn && btn.classList.contains('copy-btn')) {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.classList.add('copied');
            btn.style.opacity = '1';
            
            setTimeout(function() {
              btn.textContent = originalText;
              btn.classList.remove('copied');
            }, 2000);
          }
        }).catch(function(err) {
          console.error('Failed to copy:', err);
          if (btn && btn.classList.contains('copy-btn')) {
            const originalText = btn.textContent;
            btn.textContent = 'Failed';
            setTimeout(function() {
              btn.textContent = originalText;
            }, 2000);
          }
        });
      }
    `,
        }}
      ></script>

      <style>{`
      .setup-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
      }

      .breadcrumb-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border);
      }

      .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        list-style: none;
        font-size: 0.9rem;
        color: var(--secondary);
      }

      .breadcrumb li {
        display: flex;
        align-items: center;
      }

      .breadcrumb li:not(:last-child)::after {
        content: "/";
        margin-left: 0.5rem;
        color: var(--secondary);
      }

      .breadcrumb a {
        color: var(--text);
        text-decoration: none;
        transition: opacity 0.2s;
      }

      .breadcrumb a:hover {
        opacity: 0.7;
      }

      .theme-toggle-breadcrumb {
        background: transparent;
        border: 1px solid var(--border);
        padding: 6px 12px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.15s ease;
        font-family: monospace !important;
        color: var(--text);
        font-weight: 500;
      }

      .theme-toggle-breadcrumb:hover {
        border-color: var(--text);
        background: var(--card-bg);
      }

      .setup-header {
        text-align: center;
        margin-bottom: 3rem;
        position: relative;
      }

      .preset-selector {
        margin: 3rem 0;
      }

      .preset-selector h3 {
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 1.25rem;
      }

      .preset-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
      }

      .preset-card {
        border: 2px solid var(--border);
        border-radius: 0;
        padding: 1.5rem;
        background: var(--card-bg);
        transition: all 0.2s;
        position: relative;
      }

      .preset-card.active {
        border-color: var(--primary);
        background: var(--bg);
      }

      .preset-badge {
        position: absolute;
        top: -10px;
        right: 1rem;
        background: var(--primary);
        color: var(--bg);
        padding: 0.25rem 0.75rem;
        font-size: 0.75rem;
        font-weight: bold;
      }

      .preset-card h4 {
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
      }

      .preset-card p {
        color: var(--secondary);
        margin-bottom: 1rem;
      }

      .preset-card ul {
        list-style: none;
        margin: 1rem 0;
        font-size: 0.875rem;
      }

      .preset-card li {
        padding: 0.25rem 0;
      }

      .preset-card button,
      .preset-card button.btn,
      .preset-card .btn {
        font-family: inherit !important;
        width: 100%;
        padding: 0.75rem 1rem;
        background: var(--primary);
        color: var(--bg);
        border: 1px solid var(--primary);
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .preset-card button.btn:hover,
      .preset-card .btn:hover {
        background: var(--primary-dark);
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
      }

      .setup-steps {
        margin: 2rem 0;
      }

      .step {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 2.5rem;
      }

      .step-number {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--primary);
        color: var(--bg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.25rem;
      }

      .step-content {
        flex: 1;
      }

      .step-content h3 {
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
      }

      .code-block-with-copy {
        position: relative;
        margin: 1rem 0;
        border: 1px dotted var(--accent);
        border-radius: 0;
        background: var(--code-bg);
      }

      @media (prefers-color-scheme: dark) {
        html:not([data-theme="light"]) .code-block-with-copy {
          border-color: #666666;
        }
      }

      html[data-theme="dark"] .code-block-with-copy {
        border-color: #666666;
      }

      .code-block-with-copy code,
      .code-block-with-copy pre {
        display: block;
        background: transparent;
        padding: 1rem 4rem 1rem 1rem;
        border-radius: 0;
        overflow-x: auto;
        font-family: ui-monospace, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        line-height: 1.6;
        white-space: pre-wrap;
        word-wrap: break-word;
        max-width: 100%;
        border: none;
        color: var(--text);
        font-size: 0.875rem;
      }

      .step-content .copy-btn {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        padding: 0.5rem 1rem;
        background: var(--text);
        color: var(--bg);
        border: 1px solid var(--text);
        border-radius: 0;
        cursor: pointer;
        font-family: ui-monospace, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        font-size: 0.75rem;
        font-weight: 500;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        opacity: 0;
      }

      .code-block-with-copy:hover .copy-btn {
        opacity: 1;
      }

      .step-content .copy-btn:hover {
        background: var(--primary-dark);
        transform: translateY(-1px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      .step-content .copy-btn:active {
        transform: translateY(0);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }

      .step-content .copy-btn.copied {
        background: var(--success);
        border-color: var(--success);
      }

      @media (prefers-color-scheme: dark) {
        html:not([data-theme="light"]) .step-content .copy-btn {
          background: #e5e5e5;
          color: #0a0a0a;
          border-color: #e5e5e5;
        }

        html:not([data-theme="light"]) .step-content .copy-btn:hover {
          background: #ffffff;
          border-color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
        }

        html:not([data-theme="light"]) .step-content .copy-btn.copied {
          background: var(--success);
          color: var(--bg);
        }
      }

      html[data-theme="dark"] .step-content .copy-btn {
        background: #e5e5e5;
        color: #0a0a0a;
        border-color: #e5e5e5;
      }

      html[data-theme="dark"] .step-content .copy-btn:hover {
        background: #ffffff;
        border-color: #ffffff;
        box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
      }

      html[data-theme="dark"] .step-content .copy-btn.copied {
        background: var(--success);
        color: var(--bg);
      }

      @media (max-width: 768px) {
        .step-content .copy-btn {
          opacity: 1;
        }
      }

      .preset-var {
        color: var(--accent);
        font-weight: bold;
      }

      .step-content code {
        border: none;
      }

      .help-text {
        color: var(--secondary);
        font-size: 0.875rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }

      .help-text code {
        font-size: 0.85em;
      }

      .next-actions {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border);
      }

      .additional-tools {
        margin-top: 4rem;
        padding-top: 3rem;
        border-top: 2px solid var(--border);
      }

      .tool-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }

      .tool-card {
        border: 1px solid var(--border);
        padding: 1.5rem;
        background: var(--card-bg);
      }

      .tool-card h3 {
        margin-bottom: 0.5rem;
      }

      .tool-card p {
        color: var(--secondary);
        margin-bottom: 1rem;
      }
    `}</style>
    </Layout>
  );
};
