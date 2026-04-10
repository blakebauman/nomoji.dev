import { Layout } from "./layout";

export const WhyPage = (theme?: string) => (
  <Layout
    title="Why No Emojis in AI Code? - nomoji.dev"
    description="Emojis in AI-generated code hurt accessibility, professionalism, log readability, and cross-platform rendering. Here's why nomoji.dev exists."
    canonical="https://nomoji.dev/why"
    theme={theme}
  >
    <main class="simple-page">
      <nav class="breadcrumb-container" aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>Why</li>
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
        <h1>Why no emojis?</h1>
        <p>
          AI tools default to emoji-heavy output. Here's why that's a problem.
        </p>
      </div>

      <div class="why-list">
        <div class="why-item">
          <div class="why-label">Accessibility</div>
          <div class="why-body">
            <h2>Screen readers narrate every emoji</h2>
            <p>
              A screen reader renders <code>✅ Build passed</code> as "white
              heavy check mark Build passed". A log full of emojis becomes a
              spoken wall of Unicode descriptions. Blind and low-vision
              developers — and anyone using assistive tech — get the worst of AI
              output.
            </p>
          </div>
        </div>

        <div class="why-item">
          <div class="why-label">Professionalism</div>
          <div class="why-body">
            <h2>Enterprise code has standards</h2>
            <p>
              Code reviews, PRs, commit history, and documentation are permanent
              records. An emoji in a commit message or a{" "}
              <code>🚀 Deploying...</code> in a log line looks fine in a
              tutorial — not in a production incident report or a compliance
              audit.
            </p>
          </div>
        </div>

        <div class="why-item">
          <div class="why-label">Clean logs</div>
          <div class="why-body">
            <h2>Emojis break log tooling</h2>
            <p>
              grep, sed, awk, and most log aggregators handle Unicode
              inconsistently. Emojis in log lines corrupt regex searches, break
              structured log parsers, inflate log storage, and cause encoding
              errors in pipelines that expect ASCII. A <code>🔥 Error</code> is
              harder to grep than <code>ERROR</code>.
            </p>
          </div>
        </div>

        <div class="why-item">
          <div class="why-label">Cross-platform</div>
          <div class="why-body">
            <h2>Rendering is inconsistent</h2>
            <p>
              The same emoji renders differently on macOS, Windows, Linux
              terminals, and CI environments. Some terminals show the Unicode
              codepoint. Some show a box. Some show nothing. Code that looks
              polished on your machine can look broken in CI output or a
              teammate's terminal.
            </p>
          </div>
        </div>

        <div class="why-item">
          <div class="why-label">Signal vs noise</div>
          <div class="why-body">
            <h2>Emojis dilute important output</h2>
            <p>
              When every log line, every comment, and every commit message has
              decoration, nothing stands out. Errors get buried in visual noise.
              The discipline of emoji-free output means that when something
              needs attention, the words carry the signal — not the decoration
              around them.
            </p>
          </div>
        </div>
      </div>

      <div class="simple-footer-links">
        <a href="/how" class="btn btn-primary">
          How to install →
        </a>
        <a href="/" class="btn-link">
          Back to home
        </a>
      </div>
    </main>
  </Layout>
);
