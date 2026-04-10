import { Layout } from "./layout";

export const HowPage = (theme?: string) => (
  <Layout
    title="How to Install nomoji - nomoji.dev"
    description="Install the nomoji Agent Skill for Claude Code, Cursor, OpenAI Codex, Gemini CLI, GitHub Copilot, or via Git Hooks. One command."
    canonical="https://nomoji.dev/how"
    theme={theme}
  >
    <main class="simple-page">
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>How</li>
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

      <div class="simple-header">
        <h1>How to install</h1>
        <p>Pick your tool. Run the command. Done.</p>
      </div>

      <div class="switcher-block">
        <div class="switcher" role="tablist" aria-label="Select your tool">
          <button
            class="switcher-btn active"
            data-panel="claude"
            type="button"
            role="tab"
            aria-selected="true"
          >
            Claude Code
          </button>
          <button
            class="switcher-btn"
            data-panel="cursor"
            type="button"
            role="tab"
            aria-selected="false"
          >
            Cursor
          </button>
          <button
            class="switcher-btn"
            data-panel="codex"
            type="button"
            role="tab"
            aria-selected="false"
          >
            Codex
          </button>
          <button
            class="switcher-btn"
            data-panel="gemini"
            type="button"
            role="tab"
            aria-selected="false"
          >
            Gemini CLI
          </button>
          <button
            class="switcher-btn"
            data-panel="copilot"
            type="button"
            role="tab"
            aria-selected="false"
          >
            Copilot
          </button>
          <button
            class="switcher-btn"
            data-panel="hooks"
            type="button"
            role="tab"
            aria-selected="false"
          >
            Git Hooks
          </button>
        </div>

        {/* Claude Code */}
        <div class="tool-panel active" id="panel-claude" role="tabpanel">
          <p class="panel-note">
            Skills live in <code>.claude/skills/</code>. Claude Code
            auto-discovers them.
          </p>
          <div class="panel-option">
            <span class="option-label">Project</span>
            <div class="code-with-copy">
              <code id="claude-project">
                mkdir -p .claude/skills/nomoji && curl https://nomoji.dev/skill
                -o .claude/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('claude-project')">
                Copy
              </button>
            </div>
          </div>
          <div class="panel-option">
            <span class="option-label">Global</span>
            <div class="code-with-copy">
              <code id="claude-global">
                mkdir -p ~/.claude/skills/nomoji && curl
                https://nomoji.dev/skill -o ~/.claude/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('claude-global')">
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Cursor */}
        <div class="tool-panel" id="panel-cursor" role="tabpanel">
          <p class="panel-note">
            Skills live in <code>.cursor/skills/</code>. Cursor loads them at
            startup.
          </p>
          <div class="panel-option">
            <span class="option-label">Project</span>
            <div class="code-with-copy">
              <code id="cursor-project">
                mkdir -p .cursor/skills/nomoji && curl https://nomoji.dev/skill
                -o .cursor/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('cursor-project')">
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* OpenAI Codex */}
        <div class="tool-panel" id="panel-codex" role="tabpanel">
          <p class="panel-note">
            Skills live in <code>.agents/skills/</code>. Codex auto-detects
            changes.
          </p>
          <div class="panel-option">
            <span class="option-label">Project</span>
            <div class="code-with-copy">
              <code id="codex-project">
                mkdir -p .agents/skills/nomoji && curl https://nomoji.dev/skill
                -o .agents/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('codex-project')">
                Copy
              </button>
            </div>
          </div>
          <div class="panel-option">
            <span class="option-label">Global</span>
            <div class="code-with-copy">
              <code id="codex-global">
                mkdir -p ~/.agents/skills/nomoji && curl
                https://nomoji.dev/skill -o ~/.agents/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('codex-global')">
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Gemini CLI */}
        <div class="tool-panel" id="panel-gemini" role="tabpanel">
          <p class="panel-note">
            Skills live in <code>.gemini/skills/</code>. Gemini CLI loads them
            at startup.
          </p>
          <div class="panel-option">
            <span class="option-label">Project</span>
            <div class="code-with-copy">
              <code id="gemini-project">
                mkdir -p .gemini/skills/nomoji && curl https://nomoji.dev/skill
                -o .gemini/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('gemini-project')">
                Copy
              </button>
            </div>
          </div>
          <div class="panel-option">
            <span class="option-label">Global</span>
            <div class="code-with-copy">
              <code id="gemini-global">
                mkdir -p ~/.gemini/skills/nomoji && curl
                https://nomoji.dev/skill -o ~/.gemini/skills/nomoji/SKILL.md
              </code>
              <button type="button" onclick="copy('gemini-global')">
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* GitHub Copilot */}
        <div class="tool-panel" id="panel-copilot" role="tabpanel">
          <p class="panel-note">
            Add a <code>.github/copilot-instructions.md</code> to your repo —
            Copilot reads it automatically.
          </p>
          <div class="panel-option">
            <span class="option-label">Create file</span>
            <div class="code-with-copy">
              <code id="copilot-file">
                curl https://nomoji.dev/api/template/default/copilot -o
                .github/copilot-instructions.md
              </code>
              <button type="button" onclick="copy('copilot-file')">
                Copy
              </button>
            </div>
          </div>
          <div class="panel-option">
            <span class="option-label">VS Code settings.json</span>
            <div class="code-with-copy">
              <code id="copilot-vscode">{`"github.copilot.chat.codeGeneration.instructions": [
  { "text": "Do not use emojis in code, documentation, console output, CLI tools, logging, or commit messages." }
]`}</code>
              <button type="button" onclick="copy('copilot-vscode')">
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Git Hooks */}
        <div class="tool-panel" id="panel-hooks" role="tabpanel">
          <p class="panel-note">
            Blocks emoji in staged files and commit messages before they land.
          </p>
          <div class="panel-option">
            <span class="option-label">One-line install</span>
            <div class="code-with-copy">
              <code id="hooks-quick">
                curl -s https://nomoji.dev/examples/scripts/setup-hooks.sh |
                bash
              </code>
              <button type="button" onclick="copy('hooks-quick')">
                Copy
              </button>
            </div>
          </div>
          <div class="panel-option">
            <span class="option-label">Lefthook</span>
            <div class="code-with-copy">
              <code id="hooks-lefthook">
                npm install --save-dev lefthook && curl
                https://nomoji.dev/examples/lefthook.yml -o lefthook.yml && npx
                lefthook install
              </code>
              <button type="button" onclick="copy('hooks-lefthook')">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="simple-footer-links">
        <a href="/setup" class="btn-link">
          Customize your rules →
        </a>
        <a href="/why" class="btn-link">
          Why no emojis?
        </a>
      </div>
    </main>

    <script>{`
      document.querySelectorAll('.switcher-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.switcher-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
        });
      });

      function copy(id) {
        const el = document.getElementById(id);
        const text = el.textContent || el.innerText;
        navigator.clipboard.writeText(text.trim()).then(() => {
          const btn = el.nextElementSibling;
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = orig, 2000);
        });
      }
    `}</script>
  </Layout>
);
