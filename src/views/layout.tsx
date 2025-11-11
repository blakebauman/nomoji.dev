import { html, raw } from "hono/html";

export const Layout = (props: {
  children?: unknown;
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: string;
  theme?: string;
}) => {
  const defaultTitle = "nomoji.dev - Stop AI from Adding Emojis to Your Code";
  const defaultDescription =
    "Control emoji usage in AI-generated code, documentation, and logs. Free rules for Cursor, Claude Code, GitHub Copilot, and more. Keep your code professional and accessible.";
  const title = props.title || defaultTitle;
  const description = props.description || defaultDescription;
  const keywords =
    props.keywords ||
    "AI code generation, emoji control, Cursor rules, Claude Code, GitHub Copilot, code quality, accessibility, professional code, developer tools, AI assistants";
  const canonical = props.canonical || "https://nomoji.dev";
  const ogImage = props.ogImage || "https://nomoji.dev/og-image.png";

  return html`
<!DOCTYPE html>
<html lang="en" data-theme="${props.theme || "light"}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${title}</title>
  <meta name="title" content="${title}">
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="nomoji.dev">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="${canonical}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${props.ogType || "website"}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="nomoji.dev">
  <meta property="og:locale" content="en_US">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonical}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="twitter:creator" content="@nomojidev">
  
  <!-- Additional SEO -->
  <meta name="theme-color" content="#0a0a0a">
  <meta name="color-scheme" content="light dark">
  <link rel="manifest" href="/manifest.json">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  
  <!-- Favicons and Icons -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/icon-96.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">
  
  <!-- Alternate formats for LLMs and AI crawlers -->
  <link rel="alternate" type="application/json" href="/api">
  <link rel="alternate" type="application/json+ld" href="/structured-data.json">
  
  <!-- Structured Data for AI Understanding -->
  ${props.structuredData ? raw(`<script type="application/ld+json">${props.structuredData}</script>`) : ""}
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg: #ffffff;
      --text: #0a0a0a;
      --primary: #1a1a1a;
      --primary-dark: #000000;
      --secondary: #666666;
      --border: #e0e0e0;
      --border-subtle: #f0f0f0;
      --success: #2a2a2a;
      --danger: #1a1a1a;
      --warning: #333333;
      --code-bg: #f5f5f5;
      --card-bg: #fafafa;
      --shadow: rgba(0, 0, 0, 0.08);
      --accent: #4a4a4a;
      --button-hover-scale: 0.98;
    }

    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
        --bg: #0a0a0a;
        --text: #e5e5e5;
        --primary: #f5f5f5;
        --primary-dark: #ffffff;
        --secondary: #a0a0a0;
        --border: #333333;
        --border-subtle: #252525;
        --code-bg: #1a1a1a;
        --card-bg: #0f0f0f;
        --shadow: rgba(255, 255, 255, 0.05);
        --accent: #8a8a8a;
        --success: #e5e5e5;
        --danger: #f5f5f5;
        --warning: #cccccc;
      }
    }

    html[data-theme="dark"] {
      --bg: #0a0a0a;
      --text: #e5e5e5;
      --primary: #f5f5f5;
      --primary-dark: #ffffff;
      --secondary: #a0a0a0;
      --border: #333333;
      --border-subtle: #252525;
      --code-bg: #1a1a1a;
      --card-bg: #0f0f0f;
      --shadow: rgba(255, 255, 255, 0.05);
      --accent: #8a8a8a;
      --success: #e5e5e5;
      --danger: #f5f5f5;
      --warning: #cccccc;
    }

    body {
      font-family: ui-monospace, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 20px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: transparent;
      position: relative;
      overflow-x: hidden;
      margin: 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    header {
      text-align: center;
      padding: 40px 0;
      border-bottom: 1px solid var(--border);
      margin-bottom: 40px;
      position: relative;
    }

    .theme-toggle {
      position: absolute;
      top: 20px;
      right: 0;
      background: transparent;
      border: 1px solid var(--border);
      padding: 8px 16px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: monospace !important;
      color: var(--text);
      font-weight: 500;
    }

    .theme-toggle:hover {
      border-color: var(--text);
      background: var(--card-bg);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .theme-toggle:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      color: var(--text);
      letter-spacing: -0.5px;
    }

    .tagline {
      font-size: 0.95rem;
      color: var(--secondary);
      margin-bottom: 20px;
      font-weight: 400;
    }

    .hero {
      text-align: center;
      padding: 40px 20px;
      margin-bottom: 60px;
    }

    .hero-text {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--text);
      max-width: 800px;
      margin: 0 auto 30px auto;
      font-weight: 400;
    }

    .hero-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    .hero-actions .btn {
      width: auto;
      padding: 12px 24px;
      font-size: 0.9rem;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .hero-actions .btn-primary {
      background: var(--text);
      color: var(--bg);
      border: 1px solid var(--text);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .hero-actions .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .hero-actions .btn-primary:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .hero-actions .btn-secondary {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .hero-actions .btn-secondary:hover {
      border-color: var(--text);
      background: var(--card-bg);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .hero-actions .btn-secondary:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) .hero-actions .btn-primary {
        background: #e5e5e5;
        color: #0a0a0a;
        border-color: #e5e5e5;
        box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.05);
      }

      html:not([data-theme="light"]) .hero-actions .btn-primary:hover {
        background: #ffffff;
        border-color: #ffffff;
        box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
      }

      html:not([data-theme="light"]) .hero-actions .btn-secondary {
        border-color: #333333;
        box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.05);
      }

      html:not([data-theme="light"]) .hero-actions .btn-secondary:hover {
        border-color: #666666;
        background: #1a1a1a;
        box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
      }
    }

    html[data-theme="dark"] .hero-actions .btn-primary {
      background: #e5e5e5;
      color: #0a0a0a;
      border-color: #e5e5e5;
      box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.05);
    }

    html[data-theme="dark"] .hero-actions .btn-primary:hover {
      background: #ffffff;
      border-color: #ffffff;
      box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
    }

    html[data-theme="dark"] .hero-actions .btn-secondary {
      border-color: #333333;
      box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.05);
    }

    html[data-theme="dark"] .hero-actions .btn-secondary:hover {
      border-color: #666666;
      background: #1a1a1a;
      box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
    }

    .integrations {
      margin-bottom: 60px;
    }

    .integrations h2 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 10px;
      font-weight: 600;
      letter-spacing: -0.3px;
    }

    .subtitle {
      text-align: center;
      font-size: 0.9rem;
      color: var(--secondary);
      margin-bottom: 40px;
      font-weight: 400;
    }

    .integration-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
      margin-top: 30px;
      max-width: 1100px;
      margin-left: auto;
      margin-right: auto;
    }

    .integration-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 30px;
      display: flex;
      flex-direction: column;
      min-height: 280px;
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) .integration-card {
        background: #121212;
        border-color: #2a2a2a;
      }
    }

    html[data-theme="dark"] .integration-card {
      background: #121212;
      border-color: #2a2a2a;
    }

    .integration-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .integration-header h3 {
      font-size: 1.2rem;
      margin: 0;
      color: var(--text);
      font-weight: 600;
      letter-spacing: -0.2px;
    }

    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 2px;
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 1px solid var(--border);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .badge-recommended {
      background: var(--text);
      color: var(--bg);
      border-color: var(--text);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .badge-new {
      background: transparent;
      color: var(--text);
      border-color: var(--text);
    }

    .badge-secondary {
      background: transparent;
      color: var(--secondary);
      border-color: var(--border);
    }

    .integration-card > p {
      color: var(--secondary);
      margin-bottom: 15px;
      flex-grow: 1;
    }

    .code-block {
      background: var(--code-bg);
      border: 1px dotted var(--accent);
      border-radius: 0;
      padding: 20px;
      margin: 15px 0;
      font-family: ui-monospace, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      position: relative;
      min-height: 80px;
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) .code-block {
        border-color: #666666;
      }
    }

    html[data-theme="dark"] .code-block {
      border-color: #666666;
    }

    .code-block code {
      display: block;
      padding: 6px 0;
      background: transparent;
      color: var(--text);
      font-size: 0.825rem;
      line-height: 1.6;
      word-break: break-word;
      overflow-wrap: break-word;
      border: none;
    }

    .card-actions {
      display: flex;
      gap: 10px;
      margin-top: auto;
      padding-top: 15px;
    }

    .card-actions .btn {
      flex: 1;
      padding: 10px 16px;
      font-size: 0.85rem;
      text-align: center;
      text-decoration: none;
      border-radius: 0;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      display: inline-block;
    }

    .card-actions .btn-link {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
      text-decoration: none;
      margin: 0;
    }

    .card-actions .btn-link:hover {
      border-color: var(--text);
      background: var(--card-bg);
      opacity: 1;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .card-actions .btn-link:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .card-actions .btn-secondary-sm {
      background: var(--text);
      color: var(--bg);
      border: 1px solid var(--text);
      text-decoration: none;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .card-actions .btn-secondary-sm:hover {
      background: var(--primary-dark);
      border-color: var(--primary-dark);
      color: var(--bg);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .card-actions .btn-secondary-sm:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) .card-actions .btn-link {
        border-color: #2a2a2a;
      }

      html:not([data-theme="light"]) .card-actions .btn-link:hover {
        border-color: #666666;
        background: #1a1a1a;
        box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
      }

      html:not([data-theme="light"]) .card-actions .btn-secondary-sm {
        background: #e5e5e5;
        color: #0a0a0a;
        border-color: #e5e5e5;
        box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.05);
      }

      html:not([data-theme="light"]) .card-actions .btn-secondary-sm:hover {
        background: #ffffff;
        border-color: #ffffff;
        box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
      }
    }

    html[data-theme="dark"] .card-actions .btn-link {
      border-color: #2a2a2a;
    }

    html[data-theme="dark"] .card-actions .btn-link:hover {
      border-color: #666666;
      background: #1a1a1a;
      box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
    }

    html[data-theme="dark"] .card-actions .btn-secondary-sm {
      background: #e5e5e5;
      color: #0a0a0a;
      border-color: #e5e5e5;
      box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.05);
    }

    html[data-theme="dark"] .card-actions .btn-secondary-sm:hover {
      background: #ffffff;
      border-color: #ffffff;
      box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06);
    }

    .why-section {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 0;
      padding: 40px 30px;
      margin-bottom: 60px;
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) .why-section {
        background: #0f0f0f;
        border-color: #2a2a2a;
      }
    }

    html[data-theme="dark"] .why-section {
      background: #0f0f0f;
      border-color: #2a2a2a;
    }

    .why-section h2 {
      text-align: center;
      font-size: 1.3rem;
      margin-bottom: 30px;
      font-weight: 600;
      letter-spacing: -0.3px;
    }

    .reasons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .reason-card {
      text-align: center;
      padding: 20px;
    }

    .reason-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 15px;
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.7rem;
      color: var(--text);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .reason-card:hover .reason-icon {
      border-color: var(--text);
      transform: scale(1.05);
    }

    .reason-card h4 {
      font-size: 0.95rem;
      margin-bottom: 8px;
      color: var(--text);
      font-weight: 600;
      letter-spacing: -0.2px;
    }

    .reason-card p {
      font-size: 0.85rem;
      color: var(--secondary);
      font-weight: 400;
    }

    .extras {
      margin-bottom: 60px;
    }

    .extras h2 {
      text-align: center;
      font-size: 1.3rem;
      margin-bottom: 30px;
      font-weight: 600;
      letter-spacing: -0.3px;
    }

    .tool-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 0;
      padding: 30px;
      margin-bottom: 20px;
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) .tool-card {
        background: #121212;
        border-color: #2a2a2a;
      }
    }

    html[data-theme="dark"] .tool-card {
      background: #121212;
      border-color: #2a2a2a;
    }

    .tool-card h3 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: var(--text);
      font-weight: 600;
      letter-spacing: -0.2px;
    }

    .tool-card p {
      color: var(--secondary);
      margin-bottom: 15px;
      font-size: 0.9rem;
      font-weight: 400;
    }

    .endpoint-list {
      background: var(--code-bg);
      border: 1px dotted var(--accent);
      border-radius: 0;
      padding: 15px;
      margin: 15px 0;
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) .endpoint-list {
        border-color: #666666;
      }
    }

    html[data-theme="dark"] .endpoint-list {
      border-color: #666666;
    }

    .endpoint-list code {
      display: block;
      padding: 8px 0;
      color: var(--text);
      font-size: 0.825rem;
      font-family: ui-monospace, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      border: none;
      background: transparent;
    }

    .btn-link {
      color: var(--text);
      text-decoration: underline;
      font-weight: 500;
      display: inline-block;
      margin-top: 10px;
      transition: opacity 0.2s;
      font-size: 0.9rem;
    }

    .btn-link:hover {
      opacity: 0.7;
    }

    .btn {
      display: inline-block;
      padding: 12px 24px;
      background: var(--text);
      color: var(--bg);
      text-decoration: none;
      border-radius: 0;
      font-weight: 500;
      border: 1px solid var(--text);
      cursor: pointer;
      transition: all 0.15s ease;
      width: 100%;
      text-align: center;
      margin-top: auto;
      font-size: 0.85rem;
    }

    .btn:hover {
      background: transparent;
      color: var(--text);
    }

    .btn-secondary {
      background: var(--secondary);
    }

    .btn-danger {
      background: var(--danger);
    }

    .btn-success {
      background: var(--success);
    }

    code {
      background: var(--code-bg);
      padding: 2px 6px;
      border-radius: 0;
      font-family: ui-monospace, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      font-size: 0.875em;
      border: 1px solid var(--border);
    }

    pre {
      background: var(--code-bg);
      padding: 20px;
      border-radius: 0;
      overflow-x: auto;
      margin: 15px 0;
      border: 1px dotted var(--accent);
    }

    pre code {
      border: none;
      padding: 0;
      background: transparent;
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) pre {
        border-color: #666666;
      }
    }

    html[data-theme="dark"] pre {
      border-color: #666666;
    }

    footer {
      text-align: center;
      padding: 40px 0;
      border-top: 1px solid var(--border);
      margin-top: 60px;
      color: var(--secondary);
    }

    .footer-main {
      margin-bottom: 10px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .footer-tagline {
      margin-top: 10px;
      font-size: 0.85rem;
      font-weight: 400;
    }

    .footer-links {
      margin-top: 5px;
      font-size: 0.85rem;
    }

    .footer-links a {
      color: var(--text);
      text-decoration: underline;
      transition: opacity 0.2s;
      font-weight: 400;
    }

    .footer-links a:hover {
      opacity: 0.7;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-in {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .section-divider {
      height: 1px;
      background: linear-gradient(to right, transparent, var(--border), transparent);
      margin: 60px 0;
    }

    .copy-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: var(--text);
      color: var(--bg);
      border: 1px solid var(--text);
      border-radius: 0;
      padding: 6px 12px;
      font-size: 0.7rem;
      cursor: pointer;
      opacity: 0;
      transition: all 0.15s ease;
      font-weight: 500;
      font-family: ui-monospace, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .code-block:hover .copy-btn {
      opacity: 1;
    }

    .copy-btn:hover {
      background: transparent;
      color: var(--text);
    }

    .copy-btn.copied {
      background: transparent;
      color: var(--text);
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 1.8rem;
      }

      .tagline {
        font-size: 0.85rem;
      }

      .hero-text {
        font-size: 0.95rem;
      }

      .integration-grid {
        grid-template-columns: 1fr;
      }

      .reasons-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .code-block code {
        font-size: 0.75rem;
      }

      .copy-btn {
        opacity: 1;
      }
    }

    /* Integration Page Styles */
    .integration-page {
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
      color: var(--secondary);
      font-size: 0.875rem;
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
      color: var(--secondary);
      text-decoration: none;
    }

    .breadcrumb a:hover {
      color: var(--primary);
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

    .page-header {
      margin-bottom: 3rem;
      position: relative;
    }

    .page-header h1 {
      margin-bottom: 0.5rem;
    }

    .page-header .subtitle {
      font-size: 1.25rem;
      color: var(--secondary);
    }

    .quick-setup {
      background: var(--card-bg);
      border: 2px solid var(--border);
      padding: 2rem;
      margin-bottom: 3rem;
    }

    .quick-setup h2 {
      margin-bottom: 1.5rem;
    }

    .setup-box {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .command-step {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .step-label {
      font-weight: bold;
      color: var(--primary);
    }

    .code-with-copy {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px dotted var(--accent);
      border-radius: 0;
      background: var(--code-bg);
      padding: 0.5rem;
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) .code-with-copy {
        border-color: #666666;
      }
    }

    html[data-theme="dark"] .code-with-copy {
      border-color: #666666;
    }

    .code-with-copy code {
      flex: 1;
      background: transparent;
      padding: 0.25rem;
      font-family: inherit;
      display: block;
      overflow-x: auto;
      border: none;
    }

    .code-with-copy button {
      padding: 0.5rem 1rem;
      background: var(--primary);
      color: var(--bg);
      border: none;
      border-radius: 0;
      cursor: pointer;
      font-family: inherit;
      white-space: nowrap;
    }

    .code-with-copy button:hover {
      background: var(--primary-dark);
    }

    .content-section {
      margin: 3rem 0;
    }

    .content-section h2 {
      margin-bottom: 1rem;
    }

    .content-section p {
      margin-bottom: 1rem;
    }

    .content-section ol, .content-section ul {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }

    .content-section ul {
      list-style-type: disc;
    }

    .content-section ol {
      list-style-type: decimal;
    }

    .content-section li {
      margin: 0.5rem 0;
      line-height: 1.6;
    }

    .feature-list,
    .content-section .feature-list {
      list-style: none !important;
      padding: 0;
      padding-left: 0;
    }

    .feature-list li,
    .content-section .feature-list li {
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
      margin: 0.5rem 0;
    }

    .feature-list li:before,
    .content-section .feature-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      font-weight: bold;
    }

    .preset-grid {
      display: grid;
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .preset-option {
      border: 1px solid var(--border);
      padding: 1.5rem;
      background: var(--card-bg);
    }

    .preset-option h3 {
      margin-bottom: 0.5rem;
    }

    .preset-option p {
      color: var(--secondary);
      margin-bottom: 1rem;
    }

    .comparison-table {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .comparison-item {
      border: 1px solid var(--border);
      padding: 1.5rem;
      background: var(--card-bg);
    }

    .comparison-item h3 {
      margin-bottom: 1rem;
    }

    .comparison-item p {
      margin-bottom: 1rem;
    }

    .comparison-item code {
      display: block;
      background: var(--code-bg);
      padding: 0.5rem;
      margin: 0.75rem 0;
      font-family: inherit;
      border: none;
    }

    .comparison-item ul, .comparison-item ol {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }

    .comparison-item ul {
      list-style-type: disc;
    }

    .comparison-item ol {
      list-style-type: decimal;
    }

    .comparison-item li {
      margin: 0.5rem 0;
      line-height: 1.6;
    }

    .inline-code {
      background: var(--code-bg);
      padding: 0.2rem 0.5rem;
      font-family: inherit;
      border: none;
    }

    .accordion {
      border: 1px solid var(--border);
      padding: 1.5rem;
      background: var(--card-bg);
    }

    .accordion summary {
      cursor: pointer;
      font-weight: bold;
      list-style: none;
    }

    .accordion summary h2 {
      display: inline;
      font-size: 1.5rem;
    }

    .accordion summary::-webkit-details-marker {
      display: none;
    }

    .accordion-content {
      margin-top: 1.5rem;
    }

    .accordion-content h3 {
      margin: 1.5rem 0 0.75rem 0;
    }

    .accordion-content ol, .accordion-content ul {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }

    .accordion-content ul {
      list-style-type: disc;
    }

    .accordion-content ol {
      list-style-type: decimal;
    }

    .accordion-content li {
      margin: 0.5rem 0;
      line-height: 1.6;
    }

    .accordion-content code {
      border: none;
    }

    .code-example {
      display: block;
      background: var(--code-bg);
      border: 1px dotted var(--accent);
      border-radius: 0;
      padding: 1rem;
      margin: 1rem 0;
      white-space: pre-wrap;
      font-family: ui-monospace, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      font-size: 0.875rem;
      line-height: 1.6;
    }

    .usage-examples {
      margin: 1.5rem 0;
    }

    .usage-examples h3 {
      margin-bottom: 0.75rem;
    }

    .related-links {
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 2px solid var(--border);
    }

    .related-links ul {
      list-style: disc;
      padding-left: 1.5rem;
    }

    .related-links li {
      padding: 0.5rem 0;
      line-height: 1.6;
    }

    .related-links a {
      color: var(--primary);
      text-decoration: none;
    }

    .related-links a:hover {
      text-decoration: underline;
    }

    .warning-text {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      color: var(--secondary);
      font-size: 0.875rem;
    }

    .warning-icon {
      flex-shrink: 0;
      color: var(--warning);
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

    .example-note {
      color: var(--secondary);
      font-size: 0.875rem;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      font-style: italic;
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-theme="light"]) .comparison-item {
        background: #121212;
        border-color: #2a2a2a;
      }

      html:not([data-theme="light"]) .accordion {
        background: #121212;
        border-color: #2a2a2a;
      }

      html:not([data-theme="light"]) .preset-option {
        background: #121212;
        border-color: #2a2a2a;
      }

      html:not([data-theme="light"]) .inline-code {
        background: #1a1a1a;
        border: none;
      }

      html:not([data-theme="light"]) .code-example {
        background: #1a1a1a;
        border-color: #666666;
      }

      html:not([data-theme="light"]) .related-links {
        border-top-color: #333333;
      }

      html:not([data-theme="light"]) .quick-setup {
        background: #0f0f0f;
        border-color: #2a2a2a;
      }
    }

    html[data-theme="dark"] .comparison-item {
      background: #121212;
      border-color: #2a2a2a;
    }

    html[data-theme="dark"] .accordion {
      background: #121212;
      border-color: #2a2a2a;
    }

    html[data-theme="dark"] .preset-option {
      background: #121212;
      border-color: #2a2a2a;
    }

    html[data-theme="dark"] .inline-code {
      background: #1a1a1a;
      border: none;
    }

    html[data-theme="dark"] .code-example {
      background: #1a1a1a;
      border-color: #666666;
    }

    html[data-theme="dark"] .related-links {
      border-top-color: #333333;
    }

    html[data-theme="dark"] .quick-setup {
      background: #0f0f0f;
      border-color: #2a2a2a;
    }

    @media (max-width: 640px) {
      .code-with-copy {
        flex-direction: column;
        align-items: stretch;
      }

      .comparison-table {
        grid-template-columns: 1fr;
      }
    }

  </style>
</head>
<body>
  <div class="container">
    ${props.children}
    <footer>
      <p class="footer-main">
        <strong>nomoji.dev</strong> - Professional code deserves professional
        standards
      </p>
      <p class="footer-tagline">
        Open source. Free forever. Powered by Cloudflare Workers.
      </p>
      <p class="footer-links">
        <a href="https://github.com/blakebauman/nomoji.dev">GitHub</a> | <a href="/docs">API Docs</a>
      </p>
    </footer>
  </div>
  <script>
    // Theme toggle functionality - synced with Scalar API docs via localStorage
    (function() {
      function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // Use the same localStorage key as Scalar API docs for sync
        localStorage.setItem('colorMode', theme);
        
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
          toggleBtn.textContent = theme === 'dark' ? '[L]' : '[D]';
        }
      }

      function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
      }

      // Initialize theme from localStorage (synced with Scalar) or system preference
      const savedTheme = localStorage.getItem('colorMode');
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }

      // Expose toggle function globally
      window.toggleTheme = toggleTheme;
    })();

    // Global copy function for integration pages
    window.copy = function(elementId) {
      const element = document.getElementById(elementId);
      if (!element) return;
      
      const text = element.textContent || element.innerText;
      const button = element.parentElement.querySelector('button');
      
      navigator.clipboard.writeText(text).then(function() {
        if (button) {
          const originalText = button.textContent;
          button.textContent = 'Copied!';
          button.style.opacity = '0.7';
          
          setTimeout(function() {
            button.textContent = originalText;
            button.style.opacity = '1';
          }, 2000);
        }
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        if (button) {
          button.textContent = 'Failed';
          setTimeout(function() {
            button.textContent = 'Copy';
          }, 2000);
        }
      });
    };

    // Copy to clipboard functionality for homepage code blocks
    document.addEventListener('DOMContentLoaded', function() {
      const codeBlocks = document.querySelectorAll('.code-block');
      
      codeBlocks.forEach(function(block) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        
        copyBtn.addEventListener('click', function() {
          const codes = block.querySelectorAll('code');
          const text = Array.from(codes).map(c => c.textContent).join('\\n');
          
          navigator.clipboard.writeText(text).then(function() {
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(function() {
              copyBtn.textContent = 'Copy';
              copyBtn.classList.remove('copied');
            }, 2000);
          }).catch(function(err) {
            console.error('Failed to copy:', err);
          });
        });
        
        block.appendChild(copyBtn);
      });
    });

    // No background - removed per user preference
  </script>
</body>
</html>
`;
};
