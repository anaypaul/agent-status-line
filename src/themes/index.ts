import { readFileSync } from 'node:fs';
import type { ThemeDefinition } from '../types.js';

import { defaultTheme } from './builtin/default.js';
import { monokaiTheme } from './builtin/monokai.js';
import { solarizedTheme } from './builtin/solarized.js';
import { catppuccinTheme } from './builtin/catppuccin.js';
import { gruvboxTheme } from './builtin/gruvbox.js';
import { nordTheme } from './builtin/nord.js';

const builtinThemes: Record<string, ThemeDefinition> = {
  default: defaultTheme,
  monokai: monokaiTheme,
  solarized: solarizedTheme,
  catppuccin: catppuccinTheme,
  gruvbox: gruvboxTheme,
  nord: nordTheme,
};

export function getTheme(name: string): ThemeDefinition {
  // If name looks like a file path, try loading it
  if (name.includes('/') || name.endsWith('.json')) {
    try {
      const raw = readFileSync(name, 'utf-8');
      return JSON.parse(raw) as ThemeDefinition;
    } catch {
      throw new Error(`Failed to load theme from file: ${name}`);
    }
  }

  const theme = builtinThemes[name];
  if (!theme) {
    throw new Error(
      `Unknown theme "${name}". Available: ${Object.keys(builtinThemes).join(', ')}`,
    );
  }

  return theme;
}
