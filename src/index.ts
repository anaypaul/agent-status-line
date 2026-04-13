import type { UnifiedInput, Config, Segment } from './types.js';
import { getAgents } from './agents/registry.js';
import { loadConfig } from './config/loader.js';
import { getTheme, resolveThemeName, THEME_FAMILIES } from './themes/index.js';
import { render } from './render/pipeline.js';
import { readStdinInput } from './input.js';
import { detectTerminalBackground } from './utils/terminal-background.js';

export function run(input: UnifiedInput, config?: Config): string {
  const cfg = config ?? loadConfig();
  const variant = cfg.theme === 'auto' || THEME_FAMILIES[cfg.theme]
    ? detectTerminalBackground() : undefined;
  const themeName = variant ? resolveThemeName(cfg.theme, variant) : cfg.theme;
  const theme = getTheme(themeName);
  const agents = getAgents(cfg);

  const segments: Segment[] = [];
  for (const agent of agents) {
    const seg = agent.compute(input, cfg);
    if (seg) segments.push(seg);
  }

  return render(segments, cfg, theme);
}

export function main(): void {
  try {
    const input = readStdinInput();
    const output = run(input);
    process.stdout.write(output + '\n');
  } catch {
    // Silent failure — status line should never crash Claude Code
    process.exit(0);
  }
}

export { loadConfig } from './config/loader.js';
export { getTheme, resolveThemeName, THEME_FAMILIES } from './themes/index.js';
export { getAgents } from './agents/registry.js';
export { detectProvider, getProviderByName } from './providers/detect.js';
export { detectTerminalBackground } from './utils/terminal-background.js';
export type { UnifiedInput, ClaudeCodeInput, Config, Segment, ThemeDefinition, ProviderName } from './types.js';
