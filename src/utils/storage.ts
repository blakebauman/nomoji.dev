import { DEFAULT_CONFIG } from "../config/defaults";
import type { Env, NomojiConfig, UserPreferences } from "../types";

/**
 * Storage utilities for KV operations
 */

const PREFERENCES_PREFIX = "prefs:";
const CONFIG_PREFIX = "config:";

/**
 * Generate user-specific key
 */
function getUserKey(userId: string): string {
  return `${PREFERENCES_PREFIX}${userId}`;
}

/**
 * Generate config-specific key
 */
function getConfigKey(configId: string): string {
  return `${CONFIG_PREFIX}${configId}`;
}

/**
 * Get user preferences from KV
 */
export async function getUserPreferences(
  env: Env,
  userId: string,
): Promise<UserPreferences | null> {
  const key = getUserKey(userId);
  const data = await env.PREFERENCES.get(key, "json");
  return data as UserPreferences | null;
}

/**
 * Save user preferences to KV
 */
export async function saveUserPreferences(
  env: Env,
  userId: string,
  preferences: UserPreferences,
): Promise<void> {
  const key = getUserKey(userId);
  await env.PREFERENCES.put(key, JSON.stringify(preferences));
}

/**
 * Get or create user config
 */
export async function getOrCreateUserConfig(
  env: Env,
  userId: string,
): Promise<NomojiConfig> {
  const preferences = await getUserPreferences(env, userId);

  if (preferences?.config) {
    return preferences.config;
  }

  // Return default config with metadata
  return {
    ...DEFAULT_CONFIG,
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId,
    },
  };
}

/**
 * Update user config
 */
export async function updateUserConfig(
  env: Env,
  userId: string,
  config: Partial<NomojiConfig>,
): Promise<NomojiConfig> {
  const existingPrefs = await getUserPreferences(env, userId);

  const updatedConfig: NomojiConfig = {
    ...(existingPrefs?.config || DEFAULT_CONFIG),
    ...config,
    metadata: {
      createdAt:
        existingPrefs?.config?.metadata?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId,
    },
  };

  const preferences: UserPreferences = {
    userId,
    config: updatedConfig,
    integrations: existingPrefs?.integrations || {},
  };

  await saveUserPreferences(env, userId, preferences);
  return updatedConfig;
}

/**
 * Delete user preferences
 */
export async function deleteUserPreferences(
  env: Env,
  userId: string,
): Promise<void> {
  const key = getUserKey(userId);
  await env.PREFERENCES.delete(key);
}

/**
 * List all user IDs (for admin purposes)
 */
export async function listAllUsers(env: Env): Promise<string[]> {
  const list = await env.PREFERENCES.list({ prefix: PREFERENCES_PREFIX });
  return list.keys.map((key) => key.name.replace(PREFERENCES_PREFIX, ""));
}

/**
 * Save a shared config with custom ID
 * Shared configs expire after 30 days
 */
export async function saveSharedConfig(
  env: Env,
  configId: string,
  config: NomojiConfig,
): Promise<void> {
  const key = getConfigKey(configId);
  const ttl = 30 * 24 * 60 * 60; // 30 days in seconds
  await env.PREFERENCES.put(key, JSON.stringify(config), {
    expirationTtl: ttl,
  });
}

/**
 * Get a shared config by ID
 */
export async function getSharedConfig(
  env: Env,
  configId: string,
): Promise<NomojiConfig | null> {
  const key = getConfigKey(configId);
  const data = await env.PREFERENCES.get(key, "json");
  return data as NomojiConfig | null;
}
