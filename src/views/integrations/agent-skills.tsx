import { PageHeader } from "../components/page-header";
import { Layout } from "../layout";

export const AgentSkillsIntegrationPage = (theme?: string) => (
  <Layout title="Agent Skills Integration - nomoji.dev" theme={theme}>
    <main class="integration-page">
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/setup">Setup</a>
          </li>
          <li>Agent Skills</li>
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
        title="Agent Skills"
        subtitle="One skill, every tool — install nomoji across 35+ AI coding assistants"
      />

      <div class="content-section">
        <p>
          nomoji is published as an{" "}
          <a href="https://agentskills.io">Agent Skill</a> — an open standard
          adopted by Claude Code, Cursor, OpenAI Codex, Gemini CLI, and dozens
          of other AI tools. Install once per tool and every generated file,
          doc, and commit stays emoji-free.
        </p>
      </div>

      <div class="quick-setup">
        <h2>Install by Tool</h2>

        {/* Claude Code */}
        <div class="tool-section">
          <div class="tool-header">
            <h3>Claude Code</h3>
            <span class="badge badge-recommended">Recommended</span>
          </div>
          <p>
            Skills live in <code>.claude/skills/</code>. The{" "}
            <code>allowed-tools</code> frontmatter pre-approves Read, Grep,
            Glob, and Bash so nomoji runs without permission prompts.
          </p>
          <div class="install-tabs">
            <div class="install-option">
              <h4>Project-level</h4>
              <div class="code-with-copy">
                <code id="cc-project">
                  mkdir -p .claude/skills/nomoji && curl
                  https://nomoji.dev/skill -o .claude/skills/nomoji/SKILL.md
                </code>
                <button type="button" onclick="copy('cc-project')">
                  Copy
                </button>
              </div>
            </div>
            <div class="install-option">
              <h4>User-level (all projects)</h4>
              <div class="code-with-copy">
                <code id="cc-user">
                  mkdir -p ~/.claude/skills/nomoji && curl
                  https://nomoji.dev/skill -o ~/.claude/skills/nomoji/SKILL.md
                </code>
                <button type="button" onclick="copy('cc-user')">
                  Copy
                </button>
              </div>
            </div>
          </div>
          <p class="note">
            Skill is auto-discovered. Use <code>/nomoji</code> to invoke
            manually, or Claude applies it automatically when generating
            content.
          </p>
          <a href="/integrations/claude-code" class="btn-link">
            Full Claude Code guide →
          </a>
        </div>

        <div class="section-divider"></div>

        {/* Cursor */}
        <div class="tool-section">
          <div class="tool-header">
            <h3>Cursor</h3>
            <span class="badge badge-secondary">IDE</span>
          </div>
          <p>
            Skills live in <code>.cursor/skills/</code>. Cursor auto-discovers
            them at startup and makes them available in Agent chat.
          </p>
          <div class="install-tabs">
            <div class="install-option">
              <h4>Project-level</h4>
              <div class="code-with-copy">
                <code id="cursor-project">
                  mkdir -p .cursor/skills/nomoji && curl
                  https://nomoji.dev/skill -o .cursor/skills/nomoji/SKILL.md
                </code>
                <button type="button" onclick="copy('cursor-project')">
                  Copy
                </button>
              </div>
            </div>
            <div class="install-option">
              <h4>Via Cursor UI</h4>
              <p>
                In Cursor Agent chat, paste the skill URL and Cursor will import
                it automatically:
              </p>
              <div class="code-with-copy">
                <code id="cursor-url">https://nomoji.dev/skill</code>
                <button type="button" onclick="copy('cursor-url')">
                  Copy
                </button>
              </div>
            </div>
          </div>
          <p class="note">
            Use <code>/nomoji</code> in Agent chat to invoke manually.
          </p>
        </div>

        <div class="section-divider"></div>

        {/* OpenAI Codex */}
        <div class="tool-section">
          <div class="tool-header">
            <h3>OpenAI Codex</h3>
            <span class="badge badge-secondary">CLI</span>
          </div>
          <p>
            Codex loads skills from <code>.agents/skills/</code> (project) or{" "}
            <code>~/.agents/skills/</code> (user). The <code>.agents/</code>{" "}
            path takes precedence over tool-specific directories.
          </p>
          <div class="install-tabs">
            <div class="install-option">
              <h4>Project-level</h4>
              <div class="code-with-copy">
                <code id="codex-project">
                  mkdir -p .agents/skills/nomoji && curl
                  https://nomoji.dev/skill -o .agents/skills/nomoji/SKILL.md
                </code>
                <button type="button" onclick="copy('codex-project')">
                  Copy
                </button>
              </div>
            </div>
            <div class="install-option">
              <h4>User-level</h4>
              <div class="code-with-copy">
                <code id="codex-user">
                  mkdir -p ~/.agents/skills/nomoji && curl
                  https://nomoji.dev/skill -o ~/.agents/skills/nomoji/SKILL.md
                </code>
                <button type="button" onclick="copy('codex-user')">
                  Copy
                </button>
              </div>
            </div>
          </div>
          <p class="note">
            Codex auto-detects skill changes. Restart if updates do not appear.
          </p>
        </div>

        <div class="section-divider"></div>

        {/* Gemini CLI */}
        <div class="tool-section">
          <div class="tool-header">
            <h3>Gemini CLI</h3>
            <span class="badge badge-secondary">CLI</span>
          </div>
          <p>
            Gemini CLI supports both <code>.agents/skills/</code> and{" "}
            <code>.gemini/skills/</code>. Install via the built-in{" "}
            <code>gemini skills</code> command or manually.
          </p>
          <div class="install-tabs">
            <div class="install-option">
              <h4>Via CLI (recommended)</h4>
              <div class="code-with-copy">
                <code id="gemini-cli">
                  gemini skills install https://github.com/nomoji/nomoji.dev
                  --path examples/agent-skills/nomoji
                </code>
                <button type="button" onclick="copy('gemini-cli')">
                  Copy
                </button>
              </div>
            </div>
            <div class="install-option">
              <h4>Manual (project-level)</h4>
              <div class="code-with-copy">
                <code id="gemini-manual">
                  mkdir -p .gemini/skills/nomoji && curl
                  https://nomoji.dev/skill -o .gemini/skills/nomoji/SKILL.md
                </code>
                <button type="button" onclick="copy('gemini-manual')">
                  Copy
                </button>
              </div>
            </div>
            <div class="install-option">
              <h4>User-level</h4>
              <div class="code-with-copy">
                <code id="gemini-user">
                  mkdir -p ~/.gemini/skills/nomoji && curl
                  https://nomoji.dev/skill -o ~/.gemini/skills/nomoji/SKILL.md
                </code>
                <button type="button" onclick="copy('gemini-user')">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>Skill Directory Paths Reference</h2>
        <div class="paths-table-container">
          <table class="paths-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Project-level</th>
                <th>User-level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Claude Code</td>
                <td>
                  <code>.claude/skills/nomoji/SKILL.md</code>
                </td>
                <td>
                  <code>~/.claude/skills/nomoji/SKILL.md</code>
                </td>
              </tr>
              <tr>
                <td>Cursor</td>
                <td>
                  <code>.cursor/skills/nomoji/SKILL.md</code>
                </td>
                <td>—</td>
              </tr>
              <tr>
                <td>OpenAI Codex</td>
                <td>
                  <code>.agents/skills/nomoji/SKILL.md</code>
                </td>
                <td>
                  <code>~/.agents/skills/nomoji/SKILL.md</code>
                </td>
              </tr>
              <tr>
                <td>Gemini CLI</td>
                <td>
                  <code>.gemini/skills/nomoji/SKILL.md</code>
                </td>
                <td>
                  <code>~/.gemini/skills/nomoji/SKILL.md</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content-section">
        <h2>About the Skill Format</h2>
        <p>
          nomoji uses the open{" "}
          <a href="https://agentskills.io">Agent Skills standard</a> — a{" "}
          <code>SKILL.md</code> file with YAML frontmatter. The frontmatter
          drives how each tool discovers and invokes the skill:
        </p>
        <div class="code-block">
          <code>
            ---{"\n"}
            name: nomoji{"\n"}
            description: Enforce no-emoji standards. Use after generating code,
            docs, comments, logs, CLI output, or commit messages to remove
            emojis and keep output professional and accessible.{"\n"}
            allowed-tools: Read Grep Glob Bash{"\n"}
            ---
          </code>
        </div>
        <ul class="feature-list">
          <li>
            <strong>name</strong> — how you invoke it manually (
            <code>/nomoji</code>)
          </li>
          <li>
            <strong>description</strong> — what Claude reads to decide when to
            auto-apply the skill; front-loaded with key terms
          </li>
          <li>
            <strong>allowed-tools</strong> — pre-approves Read, Grep, Glob, Bash
            so the skill runs without per-use permission prompts
          </li>
        </ul>
      </div>

      <div class="content-section">
        <h2>Customize Your Skill</h2>
        <p>
          The <code>/api/skill/:userId</code> endpoint generates a personalized
          SKILL.md based on your configuration. Use your user ID to embed your
          exact preset and context settings:
        </p>
        <div class="code-with-copy">
          <code id="custom">
            curl https://nomoji.dev/api/skill/YOUR-USER-ID -o SKILL.md
          </code>
          <button type="button" onclick="copy('custom')">
            Copy
          </button>
        </div>
        <p>
          <a href="/setup">Configure your preset →</a>
        </p>
      </div>

      <div class="related-links">
        <h2>Related Resources</h2>
        <ul>
          <li>
            <a href="/integrations/claude-code">Claude Code guide</a>
          </li>
          <li>
            <a href="/setup">Setup Wizard</a>
          </li>
          <li>
            <a href="/docs">API Documentation</a>
          </li>
          <li>
            <a href="https://agentskills.io">agentskills.io — Open Standard</a>
          </li>
          <li>
            <a href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview">
              Anthropic Agent Skills Docs
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
