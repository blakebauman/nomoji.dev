#!/usr/bin/env node
/**
 * Regenerate marketplace/ bundles from the live nomoji.dev API.
 *
 * The Agent Skills standard (https://agentskills.io) means one SKILL.md
 * works across 37+ AI tools. This script fetches that single canonical file
 * and writes it into all bundles that ship the skill:
 *   - marketplace/nomoji/SKILL.md                       (universal bundle)
 *   - marketplace/claude-plugin/skills/nomoji/SKILL.md  (Claude plugin wrap)
 *   - examples/agent-skills/nomoji/SKILL.md             (docs example)
 *
 * KNOWN GAP: the API has no preset-by-name endpoint. `/api/skill/:userId`
 * looks up KV by userId and falls back to DEFAULT_CONFIG when missing.
 * DEFAULT_CONFIG is *not* PRESETS.strict (comments at moderate, UI disabled).
 *
 * To regenerate the canonical strict-preset bundle, do one of:
 *   1. Pre-seed a marketplace userId in KV with PRESETS.strict and set
 *      MARKETPLACE_USER_ID below to that userId.
 *   2. Add `/api/skill/preset/:name` to the API.
 *   3. Hand-edit marketplace/nomoji/SKILL.md (current state).
 *
 * Usage:
 *   node scripts/build-marketplace.mjs
 *   NOMOJI_BASE_URL=http://localhost:8787 node scripts/build-marketplace.mjs
 *   MARKETPLACE_USER_ID=marketplace-strict node scripts/build-marketplace.mjs
 */

import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = process.env.NOMOJI_BASE_URL ?? "https://nomoji.dev";
const USER_ID = process.env.MARKETPLACE_USER_ID ?? "marketplace-strict";

const ROOT = resolve(fileURLToPath(import.meta.url), "../..");
const PRIMARY = resolve(ROOT, "marketplace/nomoji/SKILL.md");
const PLUGIN_COPY = resolve(
  ROOT,
  "marketplace/claude-plugin/skills/nomoji/SKILL.md",
);
const EXAMPLE_COPY = resolve(ROOT, "examples/agent-skills/nomoji/SKILL.md");

const url = `${BASE_URL}/api/skill/${USER_ID}`;
process.stdout.write(`fetching ${url} ... `);

const res = await fetch(url);
if (!res.ok) {
  console.error(`FAILED: HTTP ${res.status}`);
  process.exit(1);
}
const body = await res.text();

await mkdir(dirname(PRIMARY), { recursive: true });
await writeFile(PRIMARY, body, "utf8");
process.stdout.write(`wrote ${PRIMARY}\n`);

await mkdir(dirname(PLUGIN_COPY), { recursive: true });
await copyFile(PRIMARY, PLUGIN_COPY);
process.stdout.write(`copied to ${PLUGIN_COPY}\n`);

await mkdir(dirname(EXAMPLE_COPY), { recursive: true });
await copyFile(PRIMARY, EXAMPLE_COPY);
process.stdout.write(`copied to ${EXAMPLE_COPY}\n`);

console.log("\nmarketplace bundles regenerated");
