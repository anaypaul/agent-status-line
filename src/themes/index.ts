import { readFileSync } from 'node:fs';
import type { ThemeDefinition } from '../types.js';

import { defaultTheme } from './builtin/default.js';
import { monokaiTheme } from './builtin/monokai.js';
import { solarizedTheme } from './builtin/solarized.js';
import { catppuccinTheme } from './builtin/catppuccin.js';
import { gruvboxTheme } from './builtin/gruvbox.js';
import { nordTheme } from './builtin/nord.js';

import { defaultLightTheme } from './builtin/default-light.js';
import { monokaiLightTheme } from './builtin/monokai-light.js';
import { solarizedLightTheme } from './builtin/solarized-light.js';
import { catppuccinLightTheme } from './builtin/catppuccin-light.js';
import { gruvboxLightTheme } from './builtin/gruvbox-light.js';
import { nordLightTheme } from './builtin/nord-light.js';

const builtinThemes: Record<string, ThemeDefinition> = {
  default: defaultTheme,
  monokai: monokaiTheme,
  solarized: solarizedTheme,
  catppuccin: catppuccinTheme,
  gruvbox: gruvboxTheme,
  nord: nordTheme,
  'default-light': defaultLightTheme,
  'monokai-light': monokaiLightTheme,
  'solarized-light': solarizedLightTheme,
  'catppuccin-light': catppuccinLightTheme,
  'gruvbox-light': gruvboxLightTheme,
  'nord-light': nordLightTheme,
};

export const THEME_FAMILIES: Record<string, { dark: string; light: string }> = {
  default: { dark: 'default', light: 'default-light' },
  monokai: { dark: 'monokai', light: 'monokai-light' },
  solarized: { dark: 'solarized', light: 'solarized-light' },
  catppuccin: { dark: 'catppuccin', light: 'catppuccin-light' },
  gruvbox: { dark: 'gruvbox', light: 'gruvbox-light' },
  nord: { dark: 'nord', light: 'nord-light' },
};

export function resolveThemeName(
  configTheme: string,
  detectedVariant: 'dark' | 'light',
): string {
  if (configTheme === 'auto') {
    return detectedVariant === 'light' ? 'default-light' : 'default';
  }

  const family = THEME_FAMILIES[configTheme];
  if (family) {
    return family[detectedVariant];
  }

  // Explicit variant name or file path — return as-is
  return configTheme;
}

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
