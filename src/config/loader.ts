import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { parse as parseTOML } from 'smol-toml';
import { DEFAULT_CONFIG } from './defaults.js';
import { validateConfig } from './schema.js';
import type { Config } from '../types.js';

function findConfigPath(): string | null {
  // 1. Environment variable
  const envPath = process.env['AGENT_STATUS_LINE_CONFIG'];
  if (envPath && existsSync(envPath)) {
    return envPath;
  }

  // 2. CWD
  const cwdPath = join(process.cwd(), '.agent-status-line.toml');
  if (existsSync(cwdPath)) {
    return cwdPath;
  }

  // 3. XDG / home config
  const homePath = join(homedir(), '.config', 'agent-status-line', 'config.toml');
  if (existsSync(homePath)) {
    return homePath;
  }

  return null;
}

export function loadConfig(): Config {
  const configPath = findConfigPath();

  if (!configPath) {
    return { ...DEFAULT_CONFIG };
  }

  try {
    const raw = readFileSync(configPath, 'utf-8');
    const parsed = parseTOML(raw);
    return validateConfig(parsed);
  } catch {
    // If config is malformed, fall back to defaults
    return { ...DEFAULT_CONFIG };
  }
}
